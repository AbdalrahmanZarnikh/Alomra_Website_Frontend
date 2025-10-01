

const FieldCheckbox = ({labelOne,labelTwo,register,errors,nameInDocument}) => {
  return (
    <div className="form-group flex flex-col gap-2 mb-4">
      <label htmlFor="Taslim" className="text-lg font-medium text-gray-700">
       {labelOne}
      </label>
      <div className="flex items-center gap-3">
        <input
          id="Taslim"
          type="checkbox"
          {...register(nameInDocument)}
          className="w-6 h-6 accent-green-600 cursor-pointer"
        />
        <span className="text-sm text-gray-600"> {labelTwo}  </span>
      </div>
      {errors && (
        <span className="text-sm text-red-500 mt-1">
          {errors[nameInDocument]?.message}
        </span>
      )}
    </div>
  );
};

export default FieldCheckbox;
