import React from 'react';
import { Controller } from 'react-hook-form';
import type { IInputCheckbox } from '../../../types/forms';

const InputCheckbox = React.forwardRef<HTMLInputElement, IInputCheckbox>(
    ({ name, label, description, control, errors, disabled = false, required = false }, ref) => {
        const error = errors?.[name]?.message;

        return (
            <div className="space-y-3 text-[16px] text-primary-50">
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        const isChecked = field.value === true || field.value === 'true';

                        return (
                            <div className="space-y-2">
                                <div
                                    className={`space-y-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => {
                                        if (!disabled) {
                                            field.onChange(!isChecked);
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            {...field}
                                            checked={isChecked}
                                            onChange={(e) => {
                                                if (!disabled) {
                                                    field.onChange(e.target.checked);
                                                }
                                            }}
                                            disabled={disabled}
                                            className="sr-only"
                                            ref={ref}
                                        />

                                        {/* Custom checkbox circle - using similar styling as your radio */}
                                        <div className={`size-6 p-1 rounded-md bg-neutral-800 flex items-center justify-center cursor-pointer ring-gray-base
                                            ${isChecked
                                                ? 'bg-white'
                                                : 'border-black-solid'
                                            }
                                            ${disabled ? 'border-gray-300' : ''}
                    `}>
                                            {isChecked ? (
                                                <p className='text-xs text-black-solid font-semibold'>✔</p>
                                            ): (
                                                    <p className='text-xs text-black-solid font-semibold'>✔</p>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <span className={disabled ? 'text-gray-base' : ''}>
                                                    {label}
                                                    {required && <span className='ml-1'>*</span>}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {description && (
                                        <p className={`text-sm mt-1 ${disabled ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                            {description}
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-sm text-red-600 mt-1">{error}</p>
                                )}
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
);

export default InputCheckbox;