import Input from "./Input";
import Label from "./Label";

export default function InputTextGroup({
  title,
  placeholder,
  id,
  error,
  value,
  setValue,
  type,
  labelClass,
  inputClass,
  required,
}: {
  title: string;
  placeholder: string;
  id: string;
  error?: string;
  value: string;
  setValue: (value: string) => void;
  type: "input" | "textarea";
  labelClass?: string;
  inputClass?: string;
  required: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-3">
      <Label
        id={id}
        required={required}
        title={title}
        labelClass={labelClass}
      />
      <Input
        id={id}
        placeholder={placeholder}
        setValue={setValue}
        type={type}
        value={value}
        error={error}
        inputClass={inputClass}
      />
    </div>
  );
}
