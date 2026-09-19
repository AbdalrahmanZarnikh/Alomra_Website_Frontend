import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOmras } from "../redux/slice/category/omraSlice";
import { createUser, getUsers, updateUser } from "../redux/slice/user/userSlice";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";
import FormLayout from "../components/FormLayout/FormLayout";
import { useEffect, useMemo, useState } from "react";
import { Armchair } from "lucide-react";
import {
  typeRoom,
  typeSafar,
  rooms,
  sitNumbers,
  Gender,
  Years
} from "../constants/data";
import {
  getBusCapacity,
  FIRST_ASSIGNABLE_SEAT,
  ALL_BUS_IDS,
} from "../utils/busCapacity";

// يملأ كل باص حسب سعته المختارة (38 أو 42) بالترتيب ثم يفيض إلى الباص التالي
const findNextAvailableSeat = (occupiedSitNumbers) => {
  const occupied = new Set(
    occupiedSitNumbers.filter(Boolean).map((s) => s.trim()),
  );
  for (const busId of ALL_BUS_IDS) {
    const seatsPerBus = getBusCapacity(busId);
    for (let seatNum = FIRST_ASSIGNABLE_SEAT; seatNum <= seatsPerBus; seatNum++) {
      const candidate = `${seatNum} - ${busId}`;
      if (!occupied.has(candidate)) return candidate;
    }
  }
  return null;
};

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
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const { data, isLoading } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const watchedOmra = watch("omra");

  // يتيح تسجيل معتمر دون تعيين مقعد له فورًا (يُعيّن لاحقًا من صفحة الباص)
  const [assignSeatNow, setAssignSeatNow] = useState(true);

  const suggestedSeat = useMemo(() => {
    if (isUpdateMode || !watchedOmra) return null;
    const occupiedSitNumbers = (data || [])
      .filter((u) => u.omra?._id === watchedOmra)
      .map((u) => u.sitNumber);
    return findNextAvailableSeat(occupiedSitNumbers);
  }, [data, watchedOmra, isUpdateMode]);

  useEffect(() => {
    if (!isUpdateMode) {
      setValue("sitNumber", assignSeatNow ? suggestedSeat || "" : "");
    }
  }, [suggestedSeat, isUpdateMode, setValue, assignSeatNow]);

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
      label: "الحملة",
      register: register,
      required: true,
      option: "اختر الحملة ",
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
      required: true,
      option: "اختر طريقة السفر",
      errors: errors,
      nameInDocument: "safar",
    },
    {
      data: typeRoom,
      label: "نوع الغرفة",
      register: register,
      required: true,
      option: "اختر نوع الغرفة",
      errors: errors,
      nameInDocument: "roomType",
    },
    ...(isUpdateMode
      ? [
          {
            data: sitNumbers,
            label: "رقم المقعد",
            register: register,
            required: false,
            option: "اختر رقم المقعد",
            errors: errors,
            nameInDocument: "sitNumber",
          },
        ]
      : []),
    {
      data: Gender,
      label: "الجنس",
      register: register,
      required: false,
      option: "حدد الجنس",
      errors: errors,
      nameInDocument: "gender",
    },
     {
      data: Years,
      label: "العمر",
      register: register,
      required: false,
      option: "حدد العمر",
      errors: errors,
      nameInDocument: "age",
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
    {
      labelOne: "إصدار التأشيرة",
      labelTwo: "هل تم إصدار التأشيرة ؟",
      register: register,
      nameInDocument: "visa",
      errors: errors,
    },
  ];

  useEffect(() => {
    dispatch(getOmras());
  }, [dispatch]);

  useEffect(() => {
    if (isUpdateMode && data.length > 0) {
      const found = data.find((item) => item._id === id);
      if (found) {
        reset({
          name: found.name,
          gender:found.gender,
          phone: found.phone,
          paidAmount: found.paidAmount,
          taslim: found.taslim,
          totalAmount: found.totalAmount,
          visa: found.visa,
          details: found.details,
          room: found.room,
          roomType: found.roomType,
          omra: found.omra?._id || "",
          safar: found.safar,
          sitNumber: found.sitNumber,
          age:found.age
        });
      }
    }
  }, [id, isUpdateMode, reset, omras, data]);

  useEffect(() => {
    const subscription = watch((value) => {
      const foundOmra = omras.find((item) => item._id === value.omra);
      if (foundOmra && value.roomType) {
        if (value.safar === "جواً") {
          // setTotal(foundOmra[value.roomType] - 50);
          setTotal(foundOmra[value.roomType]);
        } else {
          setTotal(foundOmra[value.roomType]);
        }
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
    form.append("gender", data.gender);
    form.append("paidAmount", +data.paidAmount);
    form.append("phone", data.phone);
    form.append("details", data.details);
    form.append("taslim", data.taslim);
    form.append("safar", data.safar);
    form.append("room", data.room);
    form.append("roomType", data.roomType);
    form.append("sitNumber", data.sitNumber);
    form.append("visa", data.visa);
    form.append("age",data.age)

    if (omras.length > 0) {
      form.append("omra", data.omra);
      const found = omras.find((item) => item._id === data.omra);
      if (data.safar === "جواً") {
        // form.append("totalAmount", found[data.roomType] - 50);
        form.append("totalAmount", found[data.roomType]);
      } else {
        form.append("totalAmount", found[data.roomType]);
      }
    }

    const action = isUpdateMode
      ? updateUser({ id: id, data: form })
      : createUser(form);

    dispatch(action).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="flex justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-4xl">
      <ButtonReverse text={"رجوع"} to={"/"} />

      {!isUpdateMode && (
        <div className="max-w-md mx-auto mb-4 flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={assignSeatNow}
              onChange={(e) => setAssignSeatNow(e.target.checked)}
              className="h-4 w-4 accent-primary cursor-pointer"
            />
            تعيين مقعد في الباص الآن
          </label>

          {assignSeatNow ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Armchair size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  المقعد الذي سيتم تعيينه تلقائيًا
                </p>
                {!watchedOmra ? (
                  <p className="font-bold text-gray-400">اختر الحملة أولًا</p>
                ) : suggestedSeat ? (
                  <p className="font-bold text-primary">
                    مقعد {suggestedSeat.split(" - ")[0]} — الباص{" "}
                    {suggestedSeat.split(" - ")[1]}
                  </p>
                ) : (
                  <p className="font-bold text-red-600">
                    لا يوجد مقعد متاح في الباصين
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs font-semibold text-gray-500">
              سيتم تسجيل المعتمر بدون مقعد، ويمكن تعيينه لاحقًا من صفحة الباص
            </p>
          )}

          <input type="hidden" {...register("sitNumber")} />
        </div>
      )}

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
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
      </div>
    </div>
  );
};

export default Form;
