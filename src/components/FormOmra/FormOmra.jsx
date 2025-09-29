import { useForm } from "react-hook-form";

import {
  addOmra,
  deleteOmra,
  getOmras,
} from "../../redux/slice/category/omraSlice";

import "../Form/Forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PopUp from "../PopUp/PopUp";
import Field from "../Field/Field";
import ButtonFrom from "../ButtonForm/ButtonFrom";
import { useParams } from "react-router-dom";
const FormOmra = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

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

  // Function To Handle Submit
  const onSubmit = async (data) => {
    await dispatch(addOmra(data));
  };

  const [newId, setNewId] = useState("");

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  return (
    <div className="p-10">
      <PopUp
        msg={"هل أنت متأكد من الحذف ؟"}
        id={newId}
        thunk={deleteOmra}
        showVar={show}
        onClose={() => {
          setShow(false);
        }}
      />
      <form
        className="student-form-form mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Form Fields */}
        <Field
          label={"الاسم"}
          type={"text"}
          register={register}
          errors={errors.name}
          placeholder={"ادخل اسم"}
          nameInDocument={"name"}
        />

        <ButtonFrom id={id} isLoading={isLoading} />
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
