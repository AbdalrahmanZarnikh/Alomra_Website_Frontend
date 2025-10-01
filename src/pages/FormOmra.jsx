import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addOmra,
  deleteOmra,
  getOmras,
} from "../redux/slice/category/omraSlice";
import PopUp from "../components/PopUp/PopUp";
import FormLayout from "../components/FormLayout/FormLayout";

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
      placeholder: "ادخل اسم للعمرة",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "name",
    },
    {
      type: "number",
      label: "الغرفة الثنائية",
      placeholder: "ادخل تكلفة الغرفة الثنائية",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "الثنائية",
    },
    {
      type: "number",
      label: "الغرفة الثلاثية",
      placeholder: "ادخل تكلفة الغرفة الثلاثية",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "الثلاثية",
    },
    {
      type: "number",
      label: "الغرفة الرباعية",
      placeholder: "ادخل تكلفة الغرفة الرباعية",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "الرباعية",
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
