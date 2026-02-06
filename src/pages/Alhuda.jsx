import { useEffect } from "react";
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

export default function Alhuda() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUpdateMode = typeof id === "string";

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

  const dayArabic = "";

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
      label: "العنوان",
      placeholder: "ادخل عنوان المهمة",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "nameUser",
    },
    {
      type: "text",
      label: "الحالة",
      placeholder: "ادخل الحالة ",
      register: register,
      errors: errors,
      nameInDocument: "status",
    },
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
      navigate("/alhuda");
    });
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">الجرد السنوي </h1>
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
        <h1 className="text-center text-3xl font-bold mb-10 bg-primary/90 text-white p-4 rounded-lg">
          جرد سنة 2026 <span className="text-black">{dayArabic}</span>
        </h1>
        {data
          ?.filter(
            (task) =>
              task.nameUser !== "عبد الرحمن" &&
              task.nameUser !== "أبو حسين" &&
              task.nameUser !== "أحمد حمدو" &&
              task.nameUser !== "محمد زرنيخ",
          )
          .map((task) => (
            <div
              key={task._id}
              className={`border rounded-lg p-4 space-y-2 text-4xl 
           
            
            `}>
              <h2 className="font-semibold text-center mb-10 bg-primary w-fit m-auto px-4 py-2 rounded-lg text-white">
                {task.nameUser}
              </h2>
              <p className="mb-4 grid grid-cols-6 gap-2">
                {task.title
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => (
                    <p
                      key={index}
                      className={` bg-primary mb-2 rounded-lg  text-white flex items-center justify-center `}>
                      {line} +
                    </p>
                  ))}
                  
              </p>

              <div className="flex justify-between items-end ">
                <div>
                  <button
                    onClick={() => {
                      navigate(`/edit-alhuda/${task._id}`);
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
              </div>

              <p>المجموع : {task.sum}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
