import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatFileSize } from "@/constants";
import Link from "next/link";
import { useMemo } from "react";
import { CgClose } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa6";
import { RxArrowTopRight } from "react-icons/rx";

export default function SyllabusUpload({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const fileObjectURLs = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  return (
    <div className="w-full">
      {files.length ? (
        <>
          <ul className="w-full space-y-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center gap-6 p-3 rounded-sm bg-white/5"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={fileObjectURLs[index]}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <CiFileOn className="text-5xl" />
                )}
                <div className="grid grid-cols-8 gap-3 w-full">
                  <p className="col-span-4 overflow-hidden text-nowrap whitespace-nowrap truncate text-sm text-neutral-200">
                    {file.name}
                  </p>
                  <p className="col-span-2 text-sm font-extralight text-neutral-300">
                    {file.type}
                  </p>
                  <p className="col-span-2 text-end text-sm font-extralight text-neutral-300">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="p-2 bg-white/5 hover:bg-red-500/25 cursor-pointer rounded-md transition-all duration-300"
                        type="button"
                        onClick={() => {
                          setFiles(files.filter((_, i) => i !== index));
                          URL.revokeObjectURL(fileObjectURLs[index]);
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
              </li>
            ))}
            <label
              htmlFor="class-syllabus"
              className="flex flex-col gap-4 items-center justify-center w-full text-center p-4 bg-white/20 cursor-pointer transition-all rounded-sm backdrop-blur-2xl hover:brightness-125 focus:brightness-125 active:brightness-125 text-sm"
            >
              Select more files
            </label>
            <input
              id="class-syllabus"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                // Zod Type Validation in the future (HTML INPUT ACCEPT Not Good Enough)
                if (e.target.files) {
                  setFiles([...e.target.files]);
                }
              }}
              accept="image/jpeg,image/png,application/pdf,text/plain"
            />
          </ul>
        </>
      ) : (
        <>
          <label
            htmlFor="class-syllabus"
            className="flex flex-col gap-4 items-center justify-center w-full text-center py-8 px-6 bg-blue-500/10 outline-dashed outline-2 outline-blue-500/75 cursor-pointer transition-all rounded-sm backdrop-blur-2xl hover:brightness-125 focus:brightness-125 active:brightness-125"
          >
            <FaFilePdf className="text-6xl" />
            <div className="space-y-1">
              <p className="font-black">Drag & drop or browse files</p>
              <small className="tracking-widest text-neutral-300 font-light">
                Accepts JPEG/JPG, PNG, PDF and TXT files
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
                setFiles([...e.target.files]);
              }
            }}
            accept="image/jpeg,image/png,application/pdf,text/plain"
          />
        </>
      )}
    </div>
  );
}
// MAGIC UI
