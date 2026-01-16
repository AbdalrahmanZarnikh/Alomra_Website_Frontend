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

export default function Tasks() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUpdateMode = typeof id === "string";

  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getTasks())
  },[dispatch])

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
      isTextarea:true
    },
  ];

  const contentFormFieldsSelector = [
    {
      data: ["أبوحسين", "عبد الرحمن", "أحمد حمدو", "محمد زرنيخ"],
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
      <h1 className="text-2xl font-bold mb-6">إدارة مهام الفريق</h1>
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
        <h1 className="text-center text-3xl font-bold">برنامج المهام اليومي</h1>
        {data?.map((task) => (
          <div
            key={task.id}
            className={`border rounded-lg p-4 space-y-2 text-xl 
           
            
            `}>
            <h2 className="font-semibold text-center">{task.nameUser}</h2>
            <p className="">{task.title}</p>

            <div className="flex justify-between items-end ">
              <p
                className={`bg-white px-2 rounded-lg ${
                  task.status === "مكتمل" ? "text-green-800" : "text-red-800"
                } `}>
                {task.status}
              </p>

              <div>
                <button
                  onClick={() => {
                    navigate(`/edit-task/${task._id}`);
                  }}
                  className="border px-3 py-1 mx-4 rounded hover:bg-gray-400 cursor-pointer print:hidden bg-white text-green-800">
                  تعديل
                </button>
                <button
                  onClick={() => {dispatch(deleteTask(task._id))}}
                  className="border px-3 py-1 rounded hover:bg-gray-400 cursor-pointer print:hidden bg-white text-red-800">
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
