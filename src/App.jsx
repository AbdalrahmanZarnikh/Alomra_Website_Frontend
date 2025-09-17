import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./redux/slice/user/userSlice";
import { getOmras } from "./redux/slice/category/omraSlice";
import Lottie from "lottie-react";
import loading from "./utils/loading.json";
import { useNavigate } from "react-router-dom";
import Image from "./components/Image/Image";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUsers());
      await dispatch(getOmras());
    };
    fn();
  }, [dispatch]);

  const { isLoading, data } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);
  const [omra, setOmra] = useState("");

  useEffect(() => {
    if (omras?.length > 0) {
      setOmra(omras[0].name);
    }
  }, [omras]);

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
  };

  return (
    <>
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-5 overflow-x-auto">
          {omras?.length > 0 && (
            <select
              className="mb-5 p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
              value={omra}
              onChange={(e) => setOmra(e.target.value)}
            >
              {omras.map((omra) => (
                <option key={omra.name} value={omra.name}>
                  {omra.name}
                </option>
              ))}
            </select>
          )}

          <h1 className="flex justify-center mb-7 text-4xl">
            عمرة <span className="mx-2 text-red-600 font-bold">{omra}</span>
          </h1>

          <h1
            className="mb-4 bg-[#FF8D4C]/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-[#FF8D4C]/50"
            onClick={() => window.print()}
          >
            حفظ القائمة كملف PDF
          </h1>

          <div id="print-area" className="w-full">
            <div className="container mx-auto overflow-x-auto">
              <table className="min-w-[1000px] w-full bg-white rounded-lg shadow-md border border-gray-300 text-right">
                <thead className="bg-gray-800 text-white text-sm md:text-base">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">الاسم</th>
                    <th className="p-3">الهاتف</th>
                    <th className="p-3">المبلغ المدفوع</th>
                    <th className="p-3">ملاحظات</th>
                    <th className="p-3">حالة الجواز</th>
                    <th className="p-3 print:hidden">الصور</th>
                    <th className="p-3 print:hidden">التحكم</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base bg-yellow-50">
                  {data
                    ?.filter((ele) => ele.omra?.name === omra)
                    .map((ele, index) => (
                      <tr
                        key={ele._id}
                        className="border-t border-gray-300 hover:bg-yellow-100 transition"
                      >
                        <td className="p-3 text-center font-bold">
                          {index + 1}
                        </td>
                        <td className="p-3">{ele.name}</td>
                        <td className="p-3">{ele.phone || "—"}</td>
                        <td className="p-3">{ele.paidAmount}</td>
                        <td className="p-3">{ele.details || "—"}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap ${
                              ele.taslim ? "bg-green-600" : "bg-red-600"
                            }`}
                          >
                            {ele.taslim
                              ? "تم تسليم الجواز"
                              : "لم يتم تسليم الجواز"}
                          </span>
                        </td>

                        <td className="p-3 print:hidden">
                          <div className="flex flex-wrap gap-2 justify-end">
                            {Array.isArray(ele.images) &&
                              ele.images.map((img, i) => (
                                <Image
                                  key={i}
                                  url={img.url}
                                  name={`${ele.name} ${i + 1}`}
                                />
                              ))}
                          </div>
                        </td>
                        <td className="p-3 print:hidden">
                          <div className="flex gap-2 justify-end flex-wrap">
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-400 text-xs md:text-sm"
                              onClick={() => navigate(`/edit-user/${ele._id}`)}
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleDelete(ele._id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-400 text-xs md:text-sm"
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
