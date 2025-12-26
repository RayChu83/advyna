import { cn } from "@/lib/utils";

export default function Input({
  placeholder,
  id,
  error,
  value,
  setValue,
  type,
  inputClass,
}: {
  placeholder: string;
  id: string;
  error?: string;
  value: string;
  setValue: (value: string) => void;
  type: "input" | "textarea";
  inputClass?: string;
}) {
  return (
    <div className="w-full space-y-1.5">
      {type === "input" ? (
        <input
          type="text"
          className={cn(
            "bg-zinc-800 text-neutral-300 px-4 py-2 w-full rounded-sm outline-offset-2 transition-all border border-zinc-600 outline-2",
            error
              ? "outline-red-400/60"
              : "outline-transparent focus:outline-zinc-400/60",
            inputClass
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          id={id}
        />
      ) : (
        <textarea
          className={cn(
            "bg-zinc-800 text-neutral-300 px-4 py-2 w-full rounded-sm outline-offset-2 transition-all border border-zinc-600 outline-2",
            error
              ? "outline-red-400/60"
              : "outline-transparent focus:outline-zinc-400/60",
            inputClass
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          id={id}
        />
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
