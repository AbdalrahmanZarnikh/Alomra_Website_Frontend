import { get, useForm } from "react-hook-form";

import {
  addOmra,
  deleteOmra,
  getOmras,
} from "../../redux/slice/category/omraSlice";

import "../Form/Forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PopUp from "../PopUp/PopUp";
const FormOmra = () => {
  const dispatch = useDispatch();

  const { omras, isLoading } = useSelector((state) => state.omraSlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(getOmras());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [pass, setPass] = useState("");

  // Function To Handle Submit
  const onSubmit = async (data) => {
    await dispatch(addOmra(data));
  };

  const [newId, setNewId] = useState("");

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  const handleDelete = async () => {
    if (pass == "3415") {
      await dispatch(deleteOmra(newId));
      setShow(false);
    } else {
      alert("الرمز السري خاطئ");
    }
  };
  return (
    <div className="p-10">
      {show && (
        <PopUp msg={"هل أنت متأكد من الحذف ؟"}>
          <div className="form-group">
            <input
              type="text"
              placeholder="ادخل الرمز السري للحذف"
              className="rounded-lg p-2"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>
          <div className="flex  gap-2">
            <button
              className="submit-button m-auto mt-5 cursor-pointer "
              onClick={handleDelete}
            >
              إدخال
            </button>
            <button className="submit-button m-auto mt-5  cursor-pointer " onClick={()=>{setShow(false)}}>
              إلغاء
            </button>
          </div>
        </PopUp>
      )}
      <form
        className="student-form-form mb-5"
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

        <button type="submit" className="submit-button m-auto cursor-pointer">
          {typeof id == "string" ? "تعديل" : "اضافة"}
          {isLoading === "Pending" ? "..." : ""}
        </button>
      </form>

      {omras.length > 0 &&
        omras.map((omra) => {
          return (
            <div className="flex  items-center gap-2 bg-gray-400 w-fit p-2 mb-2 rounded-lg ">
              <h1 key={omra._id} className="text-xl">
                {omra.name}
              </h1>
              <span
                className="text-red-600 cursor-pointer hover:text-red-400"
                onClick={() => {
                  CheckPass(omra._id);
                }}
              >
                X
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default FormOmra;
