const FieldSelector = ({
  data,
  label,
  option,
  register,
  nameInDocument,
  errors,
  required,
  setFunction, 
}) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const validationRules = required ? { required: "يرجى الاختيار" } : {};

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    const selectedItem = data.find((ele) => {
      const value =
        typeof ele === "object" ? ele._id || ele.name || ele.type : ele;
      return value === selectedValue;
    });

    if (
      selectedItem &&
      typeof selectedItem === "object" &&
      selectedItem.type &&
      typeof setFunction === "function"
    ) {
      setFunction(selectedItem.amount);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={nameInDocument}>{label}</label>
      <select
        id={nameInDocument}
        {...register(nameInDocument, validationRules)}
        className="cursor-pointer"
        onChange={handleChange}
      >
        <option value="">{option}</option>
        {data.map((ele, idx) => {
          const value =
            typeof ele === "object"
              ? ele._id || ele.name || ele.type || idx
              : ele;
          const label =
            typeof ele === "object"
              ? ele.name || ele._id || ele.type || "خيار"
              : ele;

          return (
            <option key={value} value={value}>
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
