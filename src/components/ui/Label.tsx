import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export default function Label({
  title,
  id,
  labelClass,
  required,
}: {
  title: string;
  id: string;
  labelClass?: string;
  required: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "font-medium tracking-wide text-lg text-neutral-300",
        labelClass
      )}
    >
      {title}
      {required ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-red-700"> *</span>
          </TooltipTrigger>
          <TooltipContent>Field is required</TooltipContent>
        </Tooltip>
      ) : null}
    </label>
  );
}
