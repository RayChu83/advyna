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
} from "@/constants";
import { toast } from "sonner";
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
  const [classDetails, setClassDetails] = useState<{
    "class-title": string;
    "class-syllabus-text": string;
    "class-syllabus-files": File[];
  }>(initClassDetails);
  const [classDetailErrors, setClassDetailErrors] = useState(
    initClassDetailErrors
  );
  const [syllabusType, setSyllabusType] = useState<
    "class-syllabus-text" | "class-syllabus-files"
  >("class-syllabus-files");
  const router = useRouter();

  // Form Actions

  const handleReset = () => {
    setClassDetails(initClassDetails);
    setClassDetailErrors(initClassDetailErrors);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClassDetailErrors(initClassDetailErrors);
    // CHeck if both class title and syllabus are uploaded
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
          ? ClassSyllabusFilesSchema.safeParse(classDetails[syllabusType])
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
      // Handle class creation
      toast.success("Class was added to [YOUR SEMESTER NAME]");
      handleReset();
      router.push("/classes");
    } catch {
      toast.error("An unknown error occurred");
    }
    // restrictions
    // min 3 class text characters
    // no more than 5 files (add a tip message saying to just upload it as one PDF)
    // max file size 5mb
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
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
              setFiles={(files: File[]) =>
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
      <div className="flex items-center gap-4">
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
            !classDetails["class-title"] || !classDetails[syllabusType].length
          }
          className="disabled:animate-none disabled:pointer-events-none text-base py-4.5 px-3 hover:brightness-90 font-normal"
        >
          Continue
        </RainbowButton>
      </div>
    </form>
  );
}
