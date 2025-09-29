const FieldSelector = ({
  data,
  label,
  option,
  register,
  nameInDocument,
  errors,
  required,
}) => {
  if (data.length === 0) return null;

  return (
    <div className="form-group">
      <label htmlFor="Omra">{label}</label>
      <select
        id="Omra"
        {...register(nameInDocument, required && { required: "يرجى الاختيار" })}
        className="cursor-pointer"
      >
        <option value="">{option}</option>
        {data.map((ele) => (
          <option key={ele._id || ele} value={ele._id || ele}>
            {ele.name || ele}
          </option>
        ))}
      </select>
      {errors && <span className="text-red-400">{errors.message}</span>}
    </div>
  );
};

export default FieldSelector;
