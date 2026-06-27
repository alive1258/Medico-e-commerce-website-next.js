import { useRef, useState, useMemo, useEffect } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { ChevronDown, X } from "lucide-react";
import { useThemeColors } from "../../../redux/features/useThemeColors";

export interface SelectOption {
  id: string;
  name: string;
}

interface SelectAndSearchProps<TForm extends FieldValues> {
  label?: string;
  options: SelectOption[];
  name: Path<TForm>;
  displayName?: Path<TForm>;
  setValue: UseFormSetValue<TForm>;
  errors?: FieldErrors<TForm>;
  placeholder?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
}

const SelectAndSearch = <TForm extends FieldValues>({
  label,
  options,
  name,
  displayName,
  setValue,
  errors,
  placeholder = "Select option",
  required = true,
  value,
  disabled = false,
}: SelectAndSearchProps<TForm>) => {
  const { theme } = useThemeColors();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

const selected = useMemo(
  () => options.find((opt) => String(opt.id) === String(value)) || null,
  [value, options],
);


  // Sync search text when selection changes or dropdown closes
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearch(selected?.name || "");
    }
  }, [selected, open]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption | null) => {
    if (disabled) return;

    const newValue = option ? option.id : "";
    const newName = option ? option.name : "";

    // Update Main Value
    setValue(name, newValue as any, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Update Display Name if exists
    if (displayName) {
      setValue(displayName, newName as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    setSearch(newName);
    setOpen(false);
  };

//   const handleSelect = (option: SelectOption | null) => {
//   if (disabled) return;

//   const newValue = option ? option.id : "";
//   const newName = option ? option.name : "";

//   // Update Main Value
//   setValue(name, newValue as any, {
//     shouldValidate: true,
//     shouldDirty: true,
//   });

//   // Update Display Name if exists
//   if (displayName) {
//     setValue(displayName, newName as any, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   }

//   // Set the search text to the selected option's name
//   setSearch(newName);
//   setOpen(false);
// };


  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
    // Focus input when opening
    if (!open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const isError = !!errors?.[name];

  return (
    <div ref={wrapperRef} className="w-full relative">
      {label && (
        <label className="block text-sm font-medium mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        onClick={toggleDropdown}
        className={`
          group flex items-center px-3 py-2 rounded-md border transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            theme === "dark"
              ? " border-gray-800 text-white focus-within:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 focus-within:border-blue-500"
          }
          ${isError ? "border-red-500" : ""}
          ${open ? "ring-2 ring-blue-500/20" : ""}
        `}
      >
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onClick={(e) => e.stopPropagation()} // Prevent double-toggling
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
          autoComplete="off"
          disabled={disabled}
        />

        <div className="flex items-center gap-1">
          {!disabled && value && (
            <X
              size={16}
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(null);
              }}
            />
          )}
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && !disabled && (
        <div
          className={`
            absolute z-100 mt-1 w-full max-h-60 overflow-y-auto rounded-md border shadow-2xl
            ${theme === "dark" ? "bg-[#0f1013] border-gray-800" : "bg-white border-gray-200"}
          `}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
                className={`
                  px-3 py-2.5 text-sm cursor-pointer transition-colors
                  ${
                    option.id === value
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-gray-500 text-center italic">
              No results for "{search}"
            </div>
          )}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectAndSearch;
