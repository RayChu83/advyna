"use client";
import { FormEvent, useState } from "react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import SyllabusUpload from "./SyllabusUpload";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { CiCircleQuestion } from "react-icons/ci";
import {
  ClassSyllabusFilesSchema,
  ClassSyllabusTextSchema,
  ClassTitleSchema,
  FILE_TYPE,
} from "@/constants";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const initClassDetails = {
  "class-title": "",
  "class-syllabus-text": "",
  "class-syllabus-files": [],
};

const initClassDetailErrors = {
  "class-title": "",
  "class-syllabus-text": "",
  "class-syllabus-files": "",
};

export default function CreateClassForm() {
  const router = useRouter();
  const [classDetails, setClassDetails] = useState<{
    "class-title": string;
    "class-syllabus-text": string;
    "class-syllabus-files": FILE_TYPE[];
  }>(initClassDetails);
  const [classDetailErrors, setClassDetailErrors] = useState(
    initClassDetailErrors
  );
  const [syllabusType, setSyllabusType] = useState<
    "class-syllabus-text" | "class-syllabus-files"
  >("class-syllabus-files");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const uploadFile = async (file: FILE_TYPE) => {
    try {
      const preSignedUrlRes = await fetch("/api/supabase/syllabusUpload", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fileName: file.upload.name,
          contentType: file.upload.type,
          size: file.upload.size,
        }),
      });
      if (!preSignedUrlRes.ok) {
        toast.error("Failed to fetch pre-signed URL");
        return;
      }
      const { url, filePath } = await preSignedUrlRes.json();

      await axios.put(url, file.upload, {
        headers: {
          "Content-Type": file.upload.type,
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setClassDetails((prev) => ({
            ...prev,
            "class-syllabus-files": prev["class-syllabus-files"].map(
              (prevFile) =>
                prevFile.upload === file.upload
                  ? { ...prevFile, status: "loading", loadPercent: percent }
                  : prevFile
            ),
          }));
        },
      });

      // Mark the file as uploaded
      setClassDetails((prev) => ({
        ...prev,
        "class-syllabus-files": prev["class-syllabus-files"].map((prevFile) =>
          prevFile.upload === file.upload
            ? { ...prevFile, status: "uploaded", loadPercent: 0, key: filePath }
            : prevFile
        ),
      }));

      return filePath;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong when uploading your file", {
        description: file.upload.name,
      });
      setClassDetails((prev) => ({
        ...prev,
        "class-syllabus-files": prev["class-syllabus-files"].map((prevFile) =>
          prevFile.upload === file.upload
            ? { ...prevFile, status: "fail", loadPercent: 0 }
            : prevFile
        ),
      }));
      return null;
    }
  };

  // Form Actions

  const handleReset = () => {
    setClassDetails(initClassDetails);
    setClassDetailErrors(initClassDetailErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClassDetailErrors(initClassDetailErrors);
    // CHeck if both class title and syllabus are uploaded (ensure no missing fields)
    if (!classDetails["class-title"] || !classDetails[syllabusType]) {
      setClassDetailErrors((prev) => ({
        ...prev,
        "class-title": !classDetails["class-title"]
          ? "Please fill in the required field."
          : "",
        [syllabusType]: !classDetails[syllabusType]
          ? "Please fill in the required field."
          : "",
      }));
      return;
    }
    try {
      const classTitleRes = ClassTitleSchema.safeParse(
        classDetails["class-title"]
      );
      const classSyllabusRes =
        syllabusType === "class-syllabus-files"
          ? ClassSyllabusFilesSchema.safeParse(
              classDetails[syllabusType].map((file) => file.upload)
            )
          : ClassSyllabusTextSchema.safeParse(classDetails[syllabusType]);

      if (!classTitleRes.success || !classSyllabusRes.success) {
        if (!classTitleRes.success) {
          const issue = classTitleRes.error.issues[0].message;
          setClassDetailErrors((prev) => ({ ...prev, "class-title": issue }));
        }
        if (!classSyllabusRes.success) {
          const issue = classSyllabusRes.error.issues[0].message;
          setClassDetailErrors((prev) => ({ ...prev, [syllabusType]: issue }));
        }
        return;
      }

      const syllabusKeys = [];

      // Upload files to S3
      if (syllabusType === "class-syllabus-files") {
        // files which have failed to upload (Status: !== uploaded)
        const filteredFiles = classDetails["class-syllabus-files"].filter(
          (file) => file.status !== "uploaded"
        );
        for (const file of filteredFiles) {
          const key = await uploadFile(file);
          if (!key) {
            // error message is thrown in the uploadFile func
            return;
          }
          syllabusKeys.push(key);
        }
      }

      // Create a class

      toast.success(`Class ${classDetails["class-title"]} has been created`);
      handleReset();
      router.push("/classes");
    } catch {
      toast.error("An unknown error occurred");
    } finally {
      setStatus("idle");
    }
    // restrictions
    // min 3 class text characters
    // no more than 5 files (add a tip message saying to just upload it as one PDF)
    // max file size 5mb
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        setStatus("submitting");
        handleSubmit(e);
      }}
    >
      <header>
        <h1 className="text-2xl font-bold tracking-wide text-neutral-200">
          Add your Class
        </h1>
        <p className="text-neutral-400 text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          ducimus aperiam.
        </p>
      </header>
      <div className="flex flex-col items-start gap-3">
        <header className="flex items-center justify-between w-full">
          <Label id="class-title" required={true} title="Class Title" />
          <aside className={cn("flex items-center gap-3")}>
            <p
              className={cn(
                "test-sm",
                classDetails["class-title"].length > 50
                  ? "text-red-400"
                  : "text-neutral-300"
              )}
            >
              {classDetails["class-title"].length} / 50
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <CiCircleQuestion className="text-lg" />
              </TooltipTrigger>
              <TooltipContent>Must be between 3-50 characters</TooltipContent>
            </Tooltip>
          </aside>
        </header>
        <Input
          id="class-title"
          placeholder="ENGL 101"
          error={classDetailErrors["class-title"]}
          setError={(error) =>
            setClassDetailErrors((prev) => ({ ...prev, "class-title": error }))
          }
          type="input"
          setValue={(value) =>
            setClassDetails((prev) => ({ ...prev, "class-title": value }))
          }
          value={classDetails["class-title"]}
          showErrorMsg={true}
          max={50}
        />
      </div>
      <div className="flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <Label id="class-syllabus" required={true} title="Class Syllabus" />
          <aside className={cn("flex items-center gap-3")}>
            <div className="p-1 rounded-sm bg-zinc-800 outline outline-zinc-700 w-fit space-x-1">
              <button
                className={cn(
                  "px-3 py-0.5 rounded-sm text-sm",
                  syllabusType === "class-syllabus-files"
                    ? "bg-zinc-700"
                    : "hover:bg-zinc-700/50 cursor-pointer"
                )}
                type="button"
                onClick={() => setSyllabusType("class-syllabus-files")}
              >
                File
              </button>
              <button
                className={cn(
                  "px-3 py-0.5 rounded-sm text-sm",
                  syllabusType === "class-syllabus-text"
                    ? "bg-zinc-700"
                    : "hover:bg-zinc-700/50 cursor-pointer"
                )}
                type="button"
                onClick={() => setSyllabusType("class-syllabus-text")}
              >
                Text
              </button>
            </div>
          </aside>
        </header>
        <div>
          {syllabusType === "class-syllabus-files" ? (
            <SyllabusUpload
              files={classDetails[syllabusType]}
              setFiles={(files: FILE_TYPE[]) =>
                setClassDetails((prev) => ({
                  ...prev,
                  [syllabusType]: files,
                }))
              }
              setError={(error) =>
                setClassDetailErrors((prev) => ({
                  ...prev,
                  [syllabusType]: error,
                }))
              }
            />
          ) : (
            <Input
              id="class-syllabus"
              placeholder="Enter class syllabus as text"
              setValue={(value) =>
                setClassDetails((prev) => ({
                  ...prev,
                  [syllabusType]: value,
                }))
              }
              value={classDetails[syllabusType]}
              error={classDetailErrors[syllabusType]}
              setError={(error) =>
                setClassDetailErrors((prev) => ({
                  ...prev,
                  [syllabusType]: error,
                }))
              }
              type="textarea"
              inputClass="h-48"
              showErrorMsg={false}
              max={10000}
            />
          )}
          <div className="mt-1 flex items-center justify-between">
            <p className="text-red-400 text-sm">
              {classDetailErrors[syllabusType]}
            </p>
            <aside className="flex items-center gap-3">
              <p
                className={cn(
                  "test-sm",
                  classDetails[syllabusType].length >
                    (syllabusType === "class-syllabus-files" ? 5 : 10000)
                    ? "text-red-400"
                    : "text-neutral-300"
                )}
              >
                {`${classDetails[syllabusType].length} / ${
                  syllabusType === "class-syllabus-files" ? "5" : "10,000"
                }`}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CiCircleQuestion className="text-lg" />
                </TooltipTrigger>
                <TooltipContent>
                  {syllabusType === "class-syllabus-files"
                    ? "Must include 1 file (max 5 files)"
                    : "Must be between 100 - 10,000 characters"}
                </TooltipContent>
              </Tooltip>
            </aside>
          </div>
        </div>
      </div>
      {/* <SyllabusUpload /> */}
      <div className="flex items-center justify-between">
        <aside className="space-x-4 flex">
          <button
            className="py-2 px-3 rounded-md bg-zinc-800 outline outline-zinc-700 cursor-pointer hover:brightness-110 transition-all"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <RainbowButton
            variant="default"
            disabled={
              !classDetails["class-title"] ||
              !classDetails[syllabusType].length ||
              status === "submitting"
            }
            className="disabled:animate-none disabled:pointer-events-none text-base py-4.5 px-3 hover:brightness-90 font-normal flex items-center gap-3"
          >
            <span>{status === "idle" ? "Continue" : "Loading"}</span>
            <div
              role="status"
              className={cn(status === "idle" ? "hidden" : "block")}
            >
              <svg
                aria-hidden="true"
                className="size-4 text-neutral-tertiary animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#000"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#FFF"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </RainbowButton>
        </aside>
      </div>
    </form>
  );
}
