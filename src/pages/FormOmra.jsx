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
import { FcDeleteColumn } from "react-icons/fc";
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
        });
      }
    }
  }, [id, isUpdateMode, omras, reset]);

  const [show, setShow] = useState(false);

  // Function To Handle Submit
  const onSubmit = async (data) => {
    const action = isUpdateMode
      ? updateOmra({ id: id, data: data })
      : addOmra(data);

    await dispatch(action);
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
      {isUpdateMode && (
        <ButtonReverse text={"العودة لإنشاء عمرة "} to={"/add-omra"} />
      )}

      <FormLayout
        id={id}
        isLoading={isLoading}
        Submit={handleSubmit(onSubmit)}
        contentFormFilds={Fields}
      />

      {omras.length > 0 &&
        omras.map((omra) => {
          return (
            <div className="flex   items-center gap-2 bg-gray-200 w-fit p-2 mb-2 rounded-lg mt-5">
              <h1 key={omra._id} className="text-xl">
                {omra.name}
              </h1>

              <span
                className="text-blue-600 cursor-pointer hover:text-red-400 "
                onClick={() => {
                  navigate(`/edit-omra/${omra._id}`);
                }}
              >
                <Edit2 />
              </span>
              <span
                className="text-red-600 cursor-pointer hover:text-red-400"
                onClick={() => {
                  CheckPass(omra._id);
                }}
              >
                <Trash2 />
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default FormOmra;
