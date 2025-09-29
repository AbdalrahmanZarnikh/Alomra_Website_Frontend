import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, updateUser } from "../../redux/slice/user/userSlice";
import { getOmras } from "../../redux/slice/category/omraSlice";
import ButtonReverse from "../ButtonReverse/ButtonReverse";
import FormLayout from "../FormLayout/FormLayout";
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

  const { data, isLoading } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);
  const isUpdateMode = typeof id === "string";

  const typeSafar = ["جواً", "براً"];

  const contentFormFilds = [
    {
      type: "text",
      label: "الاسم",
      placeholder: "ادخل اسم",
      register: register,
      required: true,
      errors: errors.name,
      nameInDocument: "name",
    },
    {
      type: "text",
      label: "رقم الجوّال",
      placeholder: "ادخل رقم الجوّال",
      register: register,
      required: false,
      errors: errors.phone,
      nameInDocument: "phone",
    },
    {
      type: "number",
      label: "المبلغ",
      placeholder: "ادخل المبلغ المدفوع",
      register: register,
      required: false,
      errors: errors.paidAmount,
      nameInDocument: "paidAmount",
    },
    {
      type: "number",
      label: "التكلفة الإجمالية",
      placeholder: "ادخل التكلفة الإجمالية",
      register: register,
      required: false,
      errors: errors.totalAmount,
      nameInDocument: "totalAmount",
    },
    {
      type: "text",
      label: "ملاحظات",
      placeholder: "ادخل  ملاحظاتك",
      register: register,
      required: false,
      errors: errors.details,
      nameInDocument: "details",
    },
    {
      type: "text",
      label: "الغرفة",
      placeholder: "ادخل  الغرفة",
      register: register,
      required: false,
      errors: errors.room,
      nameInDocument: "room",
    },
  ];

  const contentFormFieldsSelector = [
    {
      data: omras,
      label: "العمرة",
      register: register,
      required: true,
      option: "اختر شهر العمرة",
      errors: errors.omra,
      nameInDocument: "omra",
    },
    {
      data: typeSafar,
      label: "السفر",
      register: register,
      required: false,
      option: "اختر طريقة السفر",
      errors: errors.safar,
      nameInDocument: "safar",
    },
  ];
  const contentFormFieldsCheckBox = [
    {
      labelOne: "تسليم الجواز",
      labelTwo: "هل تم تسليم الجواز ؟",
      register: register,
      nameInDocument: "taslim",
      errors: errors.taslim,
    },
  ];
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
          totalAmount: found.totalAmount,
          details: found.details,
          room: found.room,
          omra: found.omra?._id || "",
          safar: found.safar,
        });
      }
    }
  }, [id, isUpdateMode, data, reset]);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit = (data) => {
    form.append("name", data.name);
    form.append("paidAmount", +data.paidAmount);
    form.append("totalAmount", +data.totalAmount);
    form.append("phone", data.phone);
    form.append("details", data.details);
    form.append("taslim", data.taslim);
    form.append("safar", data.safar);
    form.append("room", data.room);

    if (omras.length > 0) {
      form.append("omra", data.omra);
    }

    const action = isUpdateMode
      ? updateUser({ id: id, data: form })
      : createUser(form);

    dispatch(action).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="p-10">
      <ButtonReverse text={"رجوع"} />

      <FormLayout
        data={data}
        id={id}
        isLoading={isLoading}
        Submit={handleSubmit(onSubmit)}
        contentFormFilds={contentFormFilds}
        contentFormFieldsCheckBox={contentFormFieldsCheckBox}
        contentFormFieldsSelector={contentFormFieldsSelector}
        multipleImages={true}
        form={form}
      />
    </div>
  );
};

export default Form;
