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
import PopUp from "../components/PopUp/PopUp";

export default function Alhuda() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUpdateMode = typeof id === "string";

  const navigate = useNavigate();

  const today = new Date();

  const hijriYear = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
    year: "numeric",
  }).format(today);

  console.log(hijriYear);
  // مثال: "1447 هـ"

  const [show, setShow] = useState(false);
  const [newId, setNewId] = useState("");

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

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
  const LastSum = data
    ?.filter(
      (task) =>
        task.nameUser !== "عبد الرحمن" &&
        task.nameUser !== "أبو حسين" &&
        task.nameUser !== "أحمد حمدو" &&
        task.nameUser !== "محمد زرنيخ" &&
        task.status !== "عمرة",
    )
    .reduce((acc, ele) => {
      return acc + Number(ele.sum);
    }, 0);

  const SumOmra = data
    ?.filter((task) => task.status === "عمرة")
    .reduce((acc, ele) => {
      return acc + Number(ele.sum);
    }, 0);

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
    const form = new FormData();

    form.append("title", data.title);
    form.append("nameUser", data.nameUser);
    form.append("status", data.status);

    const action = isUpdateMode
      ? updateTask({ id: id, data: form })
      : createTask(form);

    dispatch(action).then(() => {
      if (!isUpdateMode) {
        reset({
          title: "",
          nameUser: "",
          status: "",
        });
      }

      navigate("/alhuda");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <PopUp
        msg={"هل أنت متأكد من الحذف ؟"}
        id={newId}
        thunk={deleteTask}
        showVar={show}
        onClose={() => {
          setShow(false);
        }}
      />

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
          جرد سنة <span className="text-black">{hijriYear}</span>
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
                      CheckPass(task._id);
                    }}
                    className="border px-3 py-1 rounded hover:bg-red-200 cursor-pointer print:hidden bg-white text-red-800">
                    حذف
                  </button>
                </div>
              </div>

              <p className="text-center mt-10">المجموع : {task.sum}</p>
            </div>
          ))}

        <p className="text-5xl my-10">
          {" "}
          المجموع النهائي (بالعملة السورية) بدون مقبوضات العمرة :{" "}
          <span className="text-primary text-6xl ">{LastSum}</span>
        </p>

        <p className="text-5xl">
          {" "}
          مقبوضات العمرة  :
          <span className="text-primary text-6xl ">{SumOmra} </span>دولار
        </p>
      </div>
    </div>
  );
}
