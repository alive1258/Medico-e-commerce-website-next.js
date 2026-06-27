import { Controller } from "react-hook-form";
import ToggleButton from "../buttons/ToggleButton";
import type { IInputToggleProps } from "../../../types/forms";

export default function InputToggle({
    label,
    text,
    control,
    errors,
    required = false,
    readOnly = false,
    color,
}: IInputToggleProps) {
    return (
        <div
            className={`space-y-1 flex gap-2 items-center mb-0.5`}
        >
        
            {/* Controlled Toggle */}
           
                <Controller
                    name={text}
                    control={control}
                    rules={{
                        required: required ? `${label} is required` : false,
                    }}
                    render={({ field }) => (
                        <ToggleButton
                            color={color}
                            isActive={field?.value || false}
                            setIsActive={(val) => {
                                if (!readOnly) {
                                    field.onChange(val);
                                }
                            }}
                        />
                    )}
                />

            {/* Label */}
            <div>
                <label className="text-[16px] text-primary-muted">
                    <span>{label}</span>
                </label>
            </div>

            {/* Error */}
            <div className="h-2.5">
                {errors?.[text] && (
                    <p role="alert" className="text-danger-base text-xs">
                        {errors[text]?.message}
                    </p>
                )}
            </div>
        </div>
    );
}
