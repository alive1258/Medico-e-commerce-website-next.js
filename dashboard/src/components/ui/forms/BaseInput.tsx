import { TriangleAlert } from "lucide-react";
import type { IBaseInputProps } from "../../../types/forms";

const BaseInput: React.FC<IBaseInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  value,
  onChange,
  readOnly = false,
  required = true,
  customRef,
}) => {
  return (
    <div className="space-y-4 text-[16px] text-primary-50 ">
      {label && (
        <div>
          <label>
            {label}
            {required && <abbr className={`pl-1`}>*</abbr>}
          </label>
        </div>
      )}

      <div className="relative space-y-1">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          className="input-default"
          onChange={(e) => onChange?.(e.target.value)}
          {...(register
            ? register(name, {
                required: required ? `${label} is required` : false,
              })
            : {})}
          ref={(el) => {
            if (!el) return;

            if (register) register(name).ref(el);

            if (customRef) {
              if (typeof customRef === "function") customRef(el);
              else customRef.current = el;
            }
          }}
        />

        {errors?.[name] && (
          <div className="flex gap-1 items-center text-danger-muted text-xs">
            <TriangleAlert className="w-4 h-4" />
            <p role="alert">{errors[name]?.message as string}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseInput;
