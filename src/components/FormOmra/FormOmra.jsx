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
import { useParams } from "react-router-dom";
import FormLayout from "../FormLayout/FormLayout";
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

  const Fields = [
    {
      type: "text",
      label: "الاسم",
      placeholder: "ادخل اسم",
      register: register,
      required: true,
      errors: errors.name,
      nameInDocument: "name",
    },
  ];

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
      <FormLayout
        id={id}
        isLoading={isLoading}
        Submit={handleSubmit(onSubmit)}
        contentFormFilds={Fields}
      />

      {omras.length > 0 &&
        omras.map((omra) => {
          return (
            <div className="flex  items-center gap-2 bg-gray-400 w-fit p-2 mb-2 rounded-lg mt-5">
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
