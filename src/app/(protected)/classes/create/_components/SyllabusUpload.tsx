import { FaFilePdf } from "react-icons/fa6";

export default function SyllabusUpload() {
  return (
    <div className="w-full">
      <label
        htmlFor="class-syllabus"
        className="flex flex-col gap-4 items-center justify-center w-full text-center py-8 px-6 bg-blue-500/10 outline-dashed outline-1 outline-blue-500/75 cursor-pointer transition-all rounded-sm backdrop-blur-2xl"
      >
        <FaFilePdf className="text-6xl" />
        <div className="space-y-1">
          <p className="font-black">Drag & drop or browse files</p>
          <small className="tracking-widest">
            Accepts JPEG/JPG, PNG, PDF and TXT files
          </small>
        </div>
        <button
          className="py-2 px-4 rounded-full bg-blue-500 text-sm"
          type="button"
        >
          Browse files
        </button>
      </label>
      <input id="class-syllabus" type="file" accept=".pdf" className="hidden" />
    </div>
  );
}
