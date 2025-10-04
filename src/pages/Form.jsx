import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOmras } from "../redux/slice/category/omraSlice";
import { createUser, updateUser } from "../redux/slice/user/userSlice";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";
import FormLayout from "../components/FormLayout/FormLayout";
import { useEffect, useState } from "react";
import { typeRoom, typeSafar, rooms } from "../constants/data";

const Form = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const { data, isLoading } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);

  const contentFormFilds = [
    {
      type: "text",
      label: "الاسم",
      placeholder: "ادخل اسم",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "name",
    },
    {
      type: "text",
      label: "رقم الجوّال",
      placeholder: "ادخل رقم الجوّال",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "phone",
    },
    {
      type: "number",
      label: "المبلغ",
      placeholder: "ادخل المبلغ المدفوع",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "paidAmount",
    },
    {
      type: "text",
      label: "ملاحظات",
      placeholder: "ادخل  ملاحظاتك",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "details",
    },
  ];

  const contentFormFieldsSelector = [
    {
      data: omras,
      label: "العمرة",
      register: register,
      required: true,
      option: "اختر شهر العمرة",
      errors: errors,
      nameInDocument: "omra",
    },
    {
      data: rooms,
      label: "رقم الغرفة",
      register: register,
      required: false,
      option: "اختر رقم الغرفة",
      errors: errors,
      nameInDocument: "room",
    },
    {
      data: typeSafar,
      label: "السفر",
      register: register,
      required: false,
      option: "اختر طريقة السفر",
      errors: errors,
      nameInDocument: "safar",
    },
    {
      data: typeRoom,
      label: "نوع الغرفة",
      register: register,
      required: false,
      option: "اختر نوع الغرفة",
      errors: errors,
      nameInDocument: "roomType",
    },
  ];
  const contentFormFieldsCheckBox = [
    {
      labelOne: "تسليم الجواز",
      labelTwo: "هل تم تسليم الجواز ؟",
      register: register,
      nameInDocument: "taslim",
      errors: errors,
    },
  ];

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    dispatch(getOmras());
  }, []);

  useEffect(() => {
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
          roomType: found.roomType,
          omra: found.omra?._id || "",
          safar: found.safar,
        });

        // const omraFound = omras.find((item) => item._id === found.omra?._id);
        // if (omraFound && found.roomType) {
        //   setTotal(omraFound[found.roomType]);
        // }
      }
    }
  }, [id, isUpdateMode, reset, omras, data]);

  useEffect(() => {
    const subscription = watch((value) => {
      const foundOmra = omras.find((item) => item._id === value.omra);
      if (foundOmra && value.roomType) {
        setTotal(foundOmra[value.roomType]);
      } else {
        setTotal(0);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, omras]);

  const [total, setTotal] = useState(0);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit = (data) => {
    form.append("name", data.name);
    form.append("paidAmount", +data.paidAmount);
    form.append("phone", data.phone);
    form.append("details", data.details);
    form.append("taslim", data.taslim);
    form.append("safar", data.safar);
    form.append("room", data.room);
    form.append("roomType", data.roomType);

    if (omras.length > 0) {
      form.append("omra", data.omra);
      const found = omras.find((item) => item._id === data.omra);
      form.append("totalAmount", found[data.roomType]);
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
        total={total}
      />
    </div>
  );
};

export default Form;
