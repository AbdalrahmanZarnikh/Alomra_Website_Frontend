const Field = ({
  label,
  type,
  register,
  errors,
  placeholder,
  nameInDocument,
  required,
  isTextarea,
}) => {
  const inputClass =
    "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-xs " +
    "placeholder:text-neutral-400 transition-colors focus:outline-none focus:border-primary " +
    "focus:ring-2 focus:ring-primary/30";

  return (
    <div className={`flex flex-col gap-1.5 ${isTextarea ? "col-span-full" : ""}`}>
      <label htmlFor="Name" className="text-sm font-semibold text-neutral-700">
        {label}
      </label>

      {isTextarea ? (
        <textarea
          rows="10"
          placeholder={` ${placeholder} ...`}
          className={`${inputClass} resize-y`}
          {...register(
            nameInDocument,
            required && { required: `هذا الحقل مطلوب` },
          )}></textarea>
      ) : (
        <input
          id="Name"
          type={type}
          placeholder={` ${placeholder} ...`}
          {...register(
            nameInDocument,
            required && { required: `هذا الحقل مطلوب` },
          )}
          className={inputClass}
        />
      )}
      {errors?.[nameInDocument] && (
        <span className="text-xs font-medium text-danger">
          {errors[nameInDocument].message}
        </span>
      )}
    </div>
  );
};

export default Field;
