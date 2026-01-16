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
  return (
    <div className="form-group">
      <label htmlFor="Name">{label} </label>

      {isTextarea ? (
        <textarea
          rows="5"
          placeholder={` ${placeholder} ...`}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm
           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
           sm:text-sm"
          {...register(
            nameInDocument,
            required && { required: `هذا الحقل مطلوب` }
          )}></textarea>
      ) : (
        <input
          id="Name"
          type={type}
          placeholder={` ${placeholder} ...`}
          {...register(
            nameInDocument,
            required && { required: `هذا الحقل مطلوب` }
          )}
          className="placeholder:text-gray-500"
        />
      )}
      {errors?.[nameInDocument] && (
        <span className="text-red-400">{errors[nameInDocument].message}</span>
      )}
    </div>
  );
};

export default Field;
