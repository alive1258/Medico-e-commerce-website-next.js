import React from 'react';
import { Controller } from 'react-hook-form';
import type { IInputRadio } from '../../../types/forms';

const InputRadio = React.forwardRef<HTMLInputElement, IInputRadio>(
    ({ name, options, label, required = false, error, layout = 'horizontal', control, className }, ref) => {


        return (
            <div className="space-y-3 text-[16px] text-primary-50 ">
                {label && (
                    <label className="block">
                        {label}
                        {required && <span>*</span>}
                    </label>
                )}

                <div >
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <div className={`flex flex-col space-y-4 ${className}`}>
                                {options.map((option, index) => {
                                    const isSelected = field.value === option.value;
                                    const isDisabled = option.disabled;

                                    return (
                                        <div>
                                            <div
                                                key={option.value + index}
                                                className={`space-y-2 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => {
                                                    if (!isDisabled) {
                                                        // Toggle selection
                                                        if (isSelected) {
                                                            field.onChange(undefined);
                                                        } else {
                                                            field.onChange(option.value);
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className={`flex ${layout !== 'horizontal' ? 'flex-col-reverse gap-2' : 'items-center gap-4'}`}>
                                                    {/* Hidden input for form accessibility */}
                                                    <input
                                                        type="radio"
                                                        {...field}
                                                        value={option.value}
                                                        checked={isSelected}
                                                        onChange={(e) => {
                                                            if (!isDisabled) {
                                                                // Toggle selection
                                                                if (isSelected) {
                                                                    field.onChange(undefined);
                                                                } else {
                                                                    field.onChange(e.target.value);
                                                                }
                                                            }
                                                        }}
                                                        disabled={isDisabled}
                                                        className="sr-only"
                                                        ref={ref}
                                                    />
                                                    {/* Custom radio circle */}
                                                    <div className={`w-3.5 h-3.5 rounded-full bg-gray-base flex items-center justify-center cursor-pointer ring-6 ring-neutral-800
                                                                ${field.value === option.value
                                                            ? 'bg-linear-to-b from-white to-white/20'
                                                            : 'border-black-solid'
                                                        } ${option.disabled ? 'border-gray-300' : ''}
                                                `}>

                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center">
                                                            {option.icon && (
                                                                <span className="mr-2 text-gray-500">{option.icon}</span>
                                                            )}
                                                            <span >
                                                                {option.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                {option.description && (
                                                    <p className={`text-sm mt-1 ${!isDisabled ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                                        {option.description}
                                                    </p>
                                                )}

                                            </div>
                                            {
                                                option.isLearnMore && (
                                                    <p onClick={option.handleLearnMore} className="text-primary-muted cursor-pointer hover:underline">Learn more</p>
                                                )
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                )}
            </div>
        );
    }
);

export default InputRadio;