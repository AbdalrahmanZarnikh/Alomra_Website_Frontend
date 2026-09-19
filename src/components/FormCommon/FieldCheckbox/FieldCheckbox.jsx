

const FieldCheckbox = ({labelOne,labelTwo,register,errors,nameInDocument}) => {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <label htmlFor="Taslim" className="text-sm font-semibold text-neutral-700">
       {labelOne}
      </label>
      <div className="flex items-center gap-3">
        <input
          id="Taslim"
          type="checkbox"
          {...register(nameInDocument)}
          className="w-5 h-5 rounded-md accent-primary cursor-pointer"
        />
        <span className="text-sm text-neutral-600"> {labelTwo}  </span>
      </div>
      {errors && (
        <span className="text-xs font-medium text-danger mt-1">
          {errors[nameInDocument]?.message}
        </span>
      )}
    </div>
  );
};

export default FieldCheckbox;
