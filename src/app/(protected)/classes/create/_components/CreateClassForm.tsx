"use client";
import { useRef, useState } from "react";
import InputTextGroup from "@/components/ui/InputTextGroup";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import SyllabusUpload from "./SyllabusUpload";

export default function CreateClassForm() {
  const [classDetails, setClassDetails] = useState<{
    "class-title": string;
    "class-syllabus-text": string;
    "class-syllabus-files": File[];
  }>({
    "class-title": "",
    "class-syllabus-text": "",
    "class-syllabus-files": [],
  });
  const [classDetailErrors, setClassDetailErrors] = useState({
    "class-title": "",
    "class-syllabus-text": "",
    "class-syllabus-files": "",
  });
  const [syllabusType, setSyllabusType] = useState<"Files" | "Text">("Files");

  return (
    <form className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold tracking-wide text-neutral-200">
          Add your Class
        </h1>
        <p className="text-neutral-400 text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          ducimus aperiam.
        </p>
      </header>
      <InputTextGroup
        id="class-title"
        placeholder="ENGL 101"
        setValue={(value) =>
          setClassDetails((prev) => ({ ...prev, "class-title": value }))
        }
        title="Class title"
        value={classDetails["class-title"]}
        error={classDetailErrors["class-title"]}
        type="input"
        required={true}
      />
      <div className="flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <Label id="class-syllabus" required={true} title="Class Syllabus" />
          <aside className="p-1 rounded-sm bg-zinc-800 outline outline-zinc-600 w-fit space-x-1">
            <button
              className={cn(
                "px-3 py-0.5 rounded-sm text-sm",
                syllabusType === "Files"
                  ? "bg-zinc-700"
                  : "hover:bg-zinc-700/50 cursor-pointer"
              )}
              type="button"
              onClick={() => setSyllabusType("Files")}
            >
              File
            </button>
            <button
              className={cn(
                "px-3 py-0.5 rounded-sm text-sm",
                syllabusType === "Text"
                  ? "bg-zinc-700"
                  : "hover:bg-zinc-700/50 cursor-pointer"
              )}
              type="button"
              onClick={() => setSyllabusType("Text")}
            >
              Text
            </button>
          </aside>
        </header>
        {syllabusType === "Files" ? (
          <SyllabusUpload
            files={classDetails["class-syllabus-files"]}
            setFiles={(files: File[]) =>
              setClassDetails((prev) => ({
                ...prev,
                "class-syllabus-files": files,
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
                "class-syllabus-text": value,
              }))
            }
            value={classDetails["class-syllabus-text"]}
            error={classDetailErrors["class-syllabus-text"]}
            type="textarea"
            inputClass="h-48"
          />
        )}
      </div>
      {/* <SyllabusUpload /> */}
      <div className="flex items-center gap-4">
        <button
          className="py-2 px-3 rounded-md bg-zinc-800 outline outline-zinc-600 cursor-pointer hover:brightness-110 transition-all"
          type="button"
        >
          Reset
        </button>
        <button
          className="py-2 px-3 rounded-md bg-white text-black outline outline-zinc-600 cursor-pointer hover:brightness-90 transition-all disabled:brightness-50 disabled:pointer-events-none"
          disabled={
            !classDetails["class-title"] ||
            (!classDetails["class-syllabus-text"] &&
              !classDetails["class-syllabus-files"].length)
          }
        >
          Continue
        </button>
      </div>
    </form>
  );
}
