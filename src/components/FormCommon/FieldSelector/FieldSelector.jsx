import { ChevronDown } from "lucide-react";

const FieldSelector = ({
  data,
  label,
  option,
  register,
  nameInDocument,
  errors,
  required,
}) => {
  if (!Array.isArray(data) || data.length === 0) return null;


  const validationRules = required ? { required: "يرجى الاختيار" } : {};

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={nameInDocument} className="text-sm font-semibold text-neutral-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={nameInDocument}
          {...register(nameInDocument, validationRules)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-300 bg-white px-4 py-3 pl-9 text-neutral-900 shadow-xs
           transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30">
          <option value=""> {option}</option>
          {data.map((ele) => {
            const value = typeof ele === "object" ? ele._id : ele;
            const label = typeof ele === "object" ? ele.name || "خيار" : ele;

            return (
              <option key={value} value={value} className="font-bold text-xl">
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
      </div>
      {errors?.[nameInDocument] && (
        <span className="text-xs font-medium text-danger">
          {errors[nameInDocument].message}
        </span>
      )}
    </div>
  );
};

export default FieldSelector;
