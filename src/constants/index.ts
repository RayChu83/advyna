import z from "zod";

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, index);

  return `${size.toFixed(size < 10 && index > 0 ? 1 : 0)} ${units[index]}`;
}

// ZOD SCHEMAS
export const ClassTitleSchema = z
  .string({
    error: "Class title must be a valid string",
  })
  .trim()
  .min(3, { message: "Class title must be at least 3 characters long" })
  .max(50, { message: "Class title should not exceed 50 characters long" });

export const ClassSyllabusTextSchema = z
  .string({
    error: "Syllabus text must be a valid string",
  })
  .trim()
  .min(100, "Syllabus must be at least 100 characters")
  .max(10_000, "Syllabus must be no more than 10,000 characters");

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/markdown",
] as const;

type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];

export const isAllowedFileType = (type: string): type is AllowedFileType =>
  ALLOWED_FILE_TYPES.includes(type as AllowedFileType);

export const ClassSyllabusFilesSchema = z
  .array(
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "Each file must be less than 5MB"
      )
      .refine(
        (file) => isAllowedFileType(file.type),
        "Your file type is not supported"
      )
  )
  .min(1, "At least one file is required")
  .max(5, "You can only upload up to 5 files");

// TYPEs
export type FILE_TYPE = {
  upload: File;
  status: "idle" | "loading" | "uploaded" | "fail";
  loadPercent: number;
  key: string;
};
