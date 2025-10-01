

const Field = ({label,type,register,errors,placeholder,nameInDocument ,required}) => {
  return (
    <div className="form-group">
      <label htmlFor="Name">{label} </label>
      <input
        id="Name"
        type={type}
        placeholder={` ${placeholder} ...`}
        {...register(nameInDocument, required && { required: `هذا الحقل مطلوب` })}
      />
      {errors?.[nameInDocument] && (
        <span className="text-red-400">{errors[nameInDocument].message}</span>
      )}
    </div>
  );
};

export default Field;
