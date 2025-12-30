"use client";
import { Particles } from "@/components/ui/particles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FILE_TYPE, formatFileSize } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RxArrowTopRight } from "react-icons/rx";

export default function SyllabusUpload({
  files,
  setFiles,
  setError,
}: {
  files: FILE_TYPE[];
  setFiles: (files: FILE_TYPE[]) => void;
  setError: (error: string) => void;
}) {
  const fileObjectURLs = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file.upload));
  }, [files]);

  const removeSyllabus = async (key: string) => {
    const removeRes = await fetch("/api/supabase/syllabusUpload", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fileName: key,
      }),
    });
    console.log(removeRes.ok);
    console.log(await removeRes.json());
  };

  return (
    <div className="w-full">
      {files.length ? (
        <>
          <ul className="w-full space-y-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex flex-col gap-2 p-3 rounded-sm bg-white/5 outline outline-zinc-700 relative"
              >
                <section className="flex sm:items-center sm:flex-row flex-col gap-x-6 gap-y-4">
                  {file.upload.type.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fileObjectURLs[index]}
                      alt={file.upload.name}
                      className="sm:size-12 size-16 object-cover rounded"
                    />
                  ) : (
                    <BsFileEarmarkText className="sm:text-5xl text-[64px]" />
                  )}
                  <div className="sm:grid grid-cols-8 gap-3 w-full">
                    <p className="col-span-4 overflow-hidden text-nowrap whitespace-nowrap truncate text-sm text-neutral-200">
                      {file.upload.name}
                    </p>
                    <p className="col-span-2 text-sm font-extralight text-neutral-300">
                      {file.upload.type}
                    </p>
                    <p
                      className={cn(
                        "col-span-2 sm:text-end text-sm font-extralight",
                        file.status === "uploaded"
                          ? "text-emerald-500"
                          : file.status === "fail"
                          ? "text-red-500"
                          : "text-neutral-300"
                      )}
                    >
                      {file.status === "uploaded"
                        ? "Uploaded"
                        : file.status === "fail"
                        ? "Failed"
                        : formatFileSize(file.upload.size)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:static absolute top-3 right-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="p-2 bg-white/5 hover:bg-red-500/25 cursor-pointer rounded-md transition-all duration-300"
                          type="button"
                          onClick={() => {
                            const updatedFiles = files.filter(
                              (_, i) => i !== index
                            );
                            setFiles(updatedFiles);
                            setError(
                              updatedFiles.length > 5
                                ? "Maximum file limit reached"
                                : ""
                            );
                            URL.revokeObjectURL(fileObjectURLs[index]);
                            if (file.key) {
                              removeSyllabus(file.key);
                            }
                          }}
                        >
                          <CgClose className="text-xl" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Remove</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          className="p-2 bg-white/5 hover:bg-blue-500/25 cursor-pointer rounded-md transition-all duration-300"
                          href={fileObjectURLs[index]}
                          target="_blank"
                        >
                          <RxArrowTopRight className="text-xl" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Open in new tab</TooltipContent>
                    </Tooltip>
                  </div>
                </section>
                {file.status === "loading" ? (
                  <section className="flex items-center justify-between gap-4">
                    <div
                      className="h-[2] bg-emerald-500 rounded-full"
                      style={{ width: `${file.loadPercent}%` }}
                    />
                    <p className="text-emerald-500 font-black text-sm">
                      {file.loadPercent}%
                    </p>
                  </section>
                ) : null}
              </li>
            ))}
            <label
              htmlFor="class-syllabus"
              className="flex flex-col gap-4 items-center justify-center w-full text-center p-4 bg-white/20 cursor-pointer transition-all rounded-sm backdrop-blur-2xl hover:brightness-125 focus:brightness-125 active:brightness-125 text-sm outline outline-zinc-500 mb-0 relative"
            >
              <span>Select more files</span>
              <Particles className="absolute w-full h-full top-0 left-0" />
            </label>
            <input
              id="class-syllabus"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                // Zod Type Validation in the future (HTML INPUT ACCEPT Not Good Enough)
                if (e.target.files) {
                  const newFiles: FILE_TYPE[] = [...e.target.files].map(
                    (file): FILE_TYPE => ({
                      upload: file,
                      status: "idle",
                      loadPercent: 0,
                      key: "",
                    })
                  );

                  const updatedFiles = [...files, ...newFiles];
                  setFiles(updatedFiles);
                  setError(
                    updatedFiles.length > 5 ? "Maximum file limit reached" : ""
                  );
                }
              }}
              accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.rtf,.md"
            />
          </ul>
        </>
      ) : (
        <>
          <label
            htmlFor="class-syllabus"
            className="flex flex-col gap-4 items-center justify-center w-full text-center py-8 px-6 bg-blue-500/10 outline-dashed outline-2 outline-blue-500/75 cursor-pointer transition-all rounded-sm backdrop-blur-2xl hover:brightness-125 focus:brightness-125 active:brightness-125 relative overflow-hidden group"
          >
            <PiUploadSimpleBold className="text-6xl" />
            <Particles
              className="absolute w-full h-full top-0 left-0 -z-1"
              quantity={150}
              staticity={20}
            />
            <div className="space-y-1">
              <p className="font-black">Drag & drop or browse files</p>
              <small className="tracking-widest text-neutral-300 font-light">
                Accepts Images, PDF, Text and Markdown Files
              </small>
            </div>
            <div className="py-2 px-4 rounded-full bg-blue-500 text-sm outline -outline-offset-1 outline-transparent hover:outline-blue-400 transition-all duration-300">
              Browse files
            </div>
          </label>
          <input
            id="class-syllabus"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              // Zod Type Validation in the future (HTML INPUT ACCEPT Not Good Enough)
              if (e.target.files) {
                const updatedFiles: FILE_TYPE[] = [...e.target.files].map(
                  (file) => ({
                    upload: file,
                    status: "idle",
                    loadPercent: 0,
                    key: "",
                  })
                );
                setFiles(updatedFiles);
                setError(
                  updatedFiles.length > 5 ? "Maximum file limit reached" : ""
                );
              }
            }}
            accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.rtf,.md"
          />
        </>
      )}
    </div>
  );
}
