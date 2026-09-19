import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addOmra,
  deleteOmra,
  getOmras,
  updateOmra,
} from "../redux/slice/category/omraSlice";
import PopUp from "../components/PopUp/PopUp";
import FormLayout from "../components/FormLayout/FormLayout";
import { Edit2, Trash2 } from "lucide-react";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";

const FormOmra = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { omras, isLoading } = useSelector((state) => state.omraSlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      ثنائية: "",
      ثلاثية: "",
      رباعية: "",
      خماسية: "",
      خاصة: "",
    },
  });

  useEffect(() => {
    dispatch(getOmras());
  }, [dispatch]);

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (!isUpdateMode) {
      reset({
        name: "",
        ثنائية: "",
        ثلاثية: "",
        رباعية: "",
        خماسية: "",
        خاصة: "",
      });
    }
    if (isUpdateMode && omras.length > 0) {
      const found = omras.find((item) => item._id === id);
      if (found) {
        reset({
          name: found.name,
          ثنائية: found.ثنائية,
          ثلاثية: found.ثلاثية,
          رباعية: found.رباعية,
          خماسية: found.خماسية,
          خاصة: found.خاصة,
        });
      }
    }
  }, [id, isUpdateMode, omras, reset]);

  // Function To Handle Submit
  const onSubmit = async (data) => {
    const action = isUpdateMode
      ? updateOmra({ id: id, data: data })
      : addOmra(data);

    await dispatch(action);
  };

  const [show, setShow] = useState(false);
  const [newId, setNewId] = useState("");

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  const Fields = [
    {
      type: "text",
      label: "الاسم",
      placeholder: "ادخل اسم للحملة",
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
      nameInDocument: "ثنائية",
    },
    {
      type: "number",
      label: "الغرفة الثلاثية",
      placeholder: "ادخل تكلفة الغرفة الثلاثية",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "ثلاثية",
    },
    {
      type: "number",
      label: "الغرفة الرباعية",
      placeholder: "ادخل تكلفة الغرفة الرباعية",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "رباعية",
    },
    {
      type: "number",
      label: "الغرفة الخماسية",
      placeholder: "ادخل تكلفة الغرفة الخماسية",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "خماسية",
    },
    {
      type: "number",
      label: "الغرفة الخاصة",
      placeholder: "ادخل تكلفة الغرفة الخاصة",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "خاصة",
    },
  ];

  return (
    <div className="flex justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-4xl">
      <ButtonReverse text={"رجوع"} to={"/"} />
      <PopUp
        msg={"هل أنت متأكد من الحذف ؟"}
        id={newId}
        thunk={deleteOmra}
        showVar={show}
        onClose={() => {
          setShow(false);
        }}
      />
      {isUpdateMode && (
        <ButtonReverse text={"العودة لإنشاء عمرة "} to={"/add-omra"} />
      )}

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <FormLayout
          id={id}
          isLoading={isLoading}
          Submit={handleSubmit(onSubmit)}
          contentFormFilds={Fields}
        />
      </div>

      {omras.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {omras.map((omra) => (
            <div
              key={omra._id}
              className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2">
              <h1 className="text-sm font-semibold text-neutral-700">
                {omra.name}
              </h1>

              <span
                className="cursor-pointer text-info hover:opacity-70"
                onClick={() => {
                  navigate(`/edit-omra/${omra._id}`);
                }}>
                <Edit2 size={16} />
              </span>
              <span
                className="cursor-pointer text-danger hover:opacity-70"
                onClick={() => {
                  CheckPass(omra._id);
                }}>
                <Trash2 size={16} />
              </span>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default FormOmra;
