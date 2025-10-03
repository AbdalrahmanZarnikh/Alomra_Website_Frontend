

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
    <div className="form-group">
      <label htmlFor={nameInDocument}>{label}</label>
      <select
        id={nameInDocument}
        {...register(nameInDocument, validationRules)}
        className="cursor-pointer"
      >
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
      {errors?.[nameInDocument] && (
        <span className="text-red-400">{errors[nameInDocument].message}</span>
      )}
    </div>
  );
};

export default FieldSelector;
