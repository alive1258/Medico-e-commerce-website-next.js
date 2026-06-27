
import type { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface Option {
  id: string | number;
  name: string;
}

interface CustomSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  options?: Option[];
  placeholder?: string;
  loading?: boolean;
}

function CustomSelect<T extends FieldValues = any>({
  label,
  name,
  register,
  errors = {},
  options = [],
  placeholder = "Select an option",
  loading = false,
}: CustomSelectProps<T>) {
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="col-span-full md:col-span-2 relative group">
      <label className="block mb-2 font-semibold text-sm">{label}</label>

      <select
        {...register(name, { required: `${label} is required` })}
        className={`w-full px-3 py-2 pr-10 border rounded-lg bg-black-base text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
          error ? "border-red-500" : "border-gray-700"
        }`}
        defaultValue=""
      >
        <option
          value=""
          disabled
          hidden
          className="bg-black-base text-gray-400"
        >
          {loading ? "Loading..." : placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="bg-black-base text-gray-200"
          >
            {option.name}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 top-6 right-2 flex items-center text-gray-400">
        <svg
          className="w-4 h-4 transition-transform duration-200 group-focus-within:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default CustomSelect;