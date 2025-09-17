import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "../uploadImage/UploadImage";
import UploadMultipleImages from "../UploadMultipleImages/UploadMultipleImages";
import "./Forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, updateUser } from "../../redux/slice/user/userSlice";
import { getOmras } from "../../redux/slice/category/omraSlice";
const Form = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });

  const { data, isLoading, error } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);
  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    dispatch(getOmras());

    if (isUpdateMode && data.length > 0) {
      const found = data.find((item) => item._id === id);
      if (found) {
        reset({
          name: found.name,
          phone: found.phone,
          paidAmount: found.paidAmount,
          taslim: found.taslim,
          details: found.details,
          omra: found.omra?._id || "",
        });
      }
    }
  }, [id, isUpdateMode, data, reset]);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit = (data) => {
    form.append("name", data.name);
    form.append("paidAmount", +data.paidAmount);
    form.append("phone", data.phone);
    form.append("details", data.details);
    form.append("taslim", data.taslim);
    if (omras.length > 0) {
      form.append("omra", data.omra);
    }

    const action = isUpdateMode
      ? updateUser({ id: id, data: form })
      : createUser(form);

    dispatch(action).then(() => {
      navigate("/");
    });

    console.log(data);
  };
  return (
    <div className="p-10">

    <div className="mb-4  bg-[#FF8D4C]/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-[#FF8D4C]/50" onClick={()=>{
      navigate(-1);
    }}>رجوع</div>
      <form
        className="student-form-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Name">الاسم </label>
          <input
            id="Name"
            type="text"
            placeholder="ادخل اسم ..."
            {...register("name", { required: "The Name is Required" })}
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="Phone">رقم الجوّال </label>
          <input
            id="Phone"
            type="text"
            placeholder="ادخل رقم الجوّال ..."
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-400">{errors.phone.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="PaidAmount">المبلغ</label>
          <input
            id="PaidAmount"
            type="number"
            min={"0"}
            placeholder="ادخل المبلغ المدفوع ..."
            {...register("paidAmount")}
          />
          {errors.paidAmount && (
            <span className="text-red-400">{errors.paidAmount.message}</span>
          )}
        </div>

        {omras.length > 0 && (
          <div className="form-group">
            <label htmlFor="Omra">العمرة</label>
            <select id="Omra" {...register("omra")} className="cursor-pointer">
              <option value="">اختر شهر العمرة</option>
              {omras.map((omr) => (
                <option key={omr._id} value={omr._id}>
                  {omr.name}
                </option>
              ))}
            </select>
            {errors.omra && (
              <span className="text-red-400">{errors.omra.message}</span>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="Details">ملاحظات </label>
          <input
            id="Details"
            type="text"
            placeholder="ادخل ملاحظاتك ..."
            {...register("details")}
          />
          {errors.details && (
            <span className="text-red-400">{errors.details.message}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-2 mb-4">
          <label htmlFor="Taslim" className="text-lg font-medium text-gray-700">
            تسليم الجواز
          </label>
          <div className="flex items-center gap-3">
            <input
              id="Taslim"
              type="checkbox"
              {...register("taslim")}
              className="w-6 h-6 accent-green-600 cursor-pointer"
            />
            <span className="text-sm text-gray-600">هل تم تسليم الجواز؟</span>
          </div>
          {errors.taslim && (
            <span className="text-sm text-red-500 mt-1">
              {errors.taslim.message}
            </span>
          )}
        </div>

        <UploadMultipleImages form={form} records={data} />

        <button type="submit" className="submit-button m-auto cursor-pointer">
          {typeof id == "string" ? "تعديل" : "اضافة"}
          {isLoading == "Pending" && "....."}
        </button>
      </form>
    </div>
  );
};

export default Form;
