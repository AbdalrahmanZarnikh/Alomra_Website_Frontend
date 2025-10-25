

const Field = ({label,type,register,errors,placeholder,nameInDocument ,required}) => {
  return (
    <div className="form-group">
      <label htmlFor="Name">{label} </label>
      <input
        id="Name"
        type={type}
        placeholder={` ${placeholder} ...`}
        {...register(nameInDocument, required && { required: `هذا الحقل مطلوب` })}
        className="placeholder:text-gray-500"
      />
      {errors?.[nameInDocument] && (
        <span className="text-red-400">{errors[nameInDocument].message}</span>
      )}
    </div>
  );
};

export default Field;
