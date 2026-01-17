import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout/FormLayout";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../redux/slice/task/taskSlice";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";
import { CircleCheck } from "lucide-react";

export default function Tasks() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUpdateMode = typeof id === "string";

  const [isStatus, setIsStatus] = useState(true);

  const navigate = useNavigate();

  // الحصول على تاريخ الغد

  // const day = isStatus
  //   ? new Date()
  //   : new Date().setDate(new Date().getDate() + 1);

  // const tomorrow = new Date().setDate(new Date().getDate()+1);

  // عرض اسم اليوم بالعربية
  // const dayArabic = new Intl.DateTimeFormat("ar", { weekday: "long" }).format(
  //   day
  // );

  const dayArabic=""

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });
  const contentFormFilds = [
    {
      type: "text",
      label: "المهمة",
      placeholder: "ادخل وصف المهمة",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "title",
      isTextarea: true,
    },
  ];

  const contentFormFieldsSelector = [
    {
      data: ["أبو حسين", "عبد الرحمن", "أحمد حمدو", "محمد زرنيخ"],
      label: "اسم الموظف",
      register: register,
      required: true,
      option: "اختر الموظف ",
      errors: errors,
      nameInDocument: "nameUser",
    },
    {
      data: ["مكتمل", "غير مكتمل"],
      label: "الحالة",
      register: register,
      required: true,
      option: "اختر الحالة ",
      errors: errors,
      nameInDocument: "status",
    },
  ];

  const { data, isLoading } = useSelector((state) => state.taskSlice);

  useEffect(() => {
    if (isUpdateMode && data.length > 0) {
      const found = data.find((item) => item._id === id);
      if (found) {
        reset({
          title: found.title,
          nameUser: found.nameUser,
          status: found.status,
        });
      }
    }
  }, [id, isUpdateMode, reset, data]);

  const form = new FormData();
  const onSubmit = (data) => {
    form.append("title", data.title);
    form.append("nameUser", data.nameUser);
    form.append("status", data.status);

    const action = isUpdateMode
      ? updateTask({ id: id, data: form })
      : createTask(form);

    dispatch(action).then(() => {
      navigate("/tasks");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">إدارة مهام المكتبة</h1>
      <button onClick={()=>{
        setIsStatus(!isStatus)
      }} className="bg-primary/90 mb-10 px-4 py-2 rounded-lg hover:bg-primary/50 cursor-pointer text-white">
        تغيير صيغة العرض
      </button>
      {isUpdateMode && (
        <ButtonReverse text={"العودة لإنشاء مهمام "} to={"/tasks"} />
      )}
      <div className="border rounded-lg p-4 mb-6 space-y-3">
        <FormLayout
          data={data}
          id={id}
          isLoading={isLoading}
          Submit={handleSubmit(onSubmit)}
          contentFormFilds={contentFormFilds}
          contentFormFieldsSelector={contentFormFieldsSelector}
          form={form}
        />
      </div>
      <h1
        className="mb-4 bg-primary/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-primary/50"
        onClick={() => window.print()}>
        حفظ كملف PDF
      </h1>
      {/* Task List */}
      <div className="grid md:grid-cols-1 gap-4" id="print-area">
        {isStatus ? (
          <h1 className="text-center text-3xl font-bold mb-10 bg-primary/90 text-white p-4 rounded-lg">
            حالة مهام اليوم <span className="text-black">{dayArabic}</span>
          </h1>
        ) : (
          <h1 className="text-center text-3xl font-bold mb-10 bg-primary/90 text-white p-4 rounded-lg">
            توزيع مهام اليوم <span className="text-black">{dayArabic}</span>
          </h1>
        )}
        {data?.map((task) => (
          <div
            key={task._id}
            className={`border rounded-lg p-4 space-y-2 text-4xl 
           
            
            `}>
            <h2 className="font-semibold text-center mb-10 bg-primary w-fit m-auto px-4 py-2 rounded-lg text-white">
              {task.nameUser}
            </h2>
            <p className="mb-4">
              {task.title
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <p
                    key={index}
                    className={`bg-primary mb-2 rounded-lg  text-white flex items-center justify-between `}>
                    {index + 1}- {line}    
                  </p>
                ))}
            </p>

            <div className="flex justify-between items-end ">
              <div>
                <button
                  onClick={() => {
                    navigate(`/edit-task/${task._id}`);
                  }}
                  className="border px-3 py-1 mx-4 rounded hover:bg-blue-200 cursor-pointer print:hidden bg-white text-blue-800">
                  تعديل
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteTask(task._id));
                  }}
                  className="border px-3 py-1 rounded hover:bg-red-200 cursor-pointer print:hidden bg-white text-red-800">
                  حذف
                </button>
              </div>
              <p
                className={` px-2 rounded-lg ${
                  task.status === "مكتمل"
                    ? "bg-green-700 text-white px-4"
                    : "bg-red-700 text-white px-4"
                } `}>
                {task.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
