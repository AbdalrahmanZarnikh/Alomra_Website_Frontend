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
  const [Filter, setFilter] = useState("الكل");

  const [checked, setChecked] = useState({
    الاسم: true,
    "رقم الجوال": true,
    المبلغ: true,
    الغرفة: true,
    ملاحظات: true,
    "حالة الجواز": false,
    السفر: true,
    الصور: false,
  });

  const headTable = [
    "الاسم",
    "رقم الجوال",
    "المبلغ",
    "الغرفة",
    "ملاحظات",
    "حالة الجواز",
    "السفر",
    "الصور",
  ];

  const keywords = [
    "الكل",
    "براً",
    "جواً",
    "غرفة 1",
    "غرفة 2",
    "غرفة 3",
    "غرفة 4",
    "غرفة 5",
    "غرفة 6",
    "غرفة 7",
    "غرفة 8",
    "غرفة 9",
    "غرفة 10",
    "غرفة 11",
    "غرفة 12",
  ];

  useEffect(() => {
    if (omras?.length > 0) {
      setOmra(omras[0]?.name);
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
          <div className="flex justify-between">
            <div>
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
            </div>
            <div>
              {keywords?.length > 0 && (
                <select
                  className="mb-5 p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
                  value={Filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {keywords.map((ele) => (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <h1 className="flex justify-center mb-7 text-4xl">
            عمرة{" "}
            <span className="mx-2  text-[#FF8D4C]/90 font-bold">{omra}</span>
          </h1>

          <h1
            className="mb-4 bg-[#FF8D4C]/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-[#FF8D4C]/50"
            onClick={() => window.print()}
          >
            حفظ القائمة كملف PDF
          </h1>

          <div id="print-area" className="w-full">
            <h1 className="flex justify-center items-center mb-5 text-5xl text-[#FF8D4C]/90">
              {Filter}
            </h1>
            <div className="container mx-auto overflow-x-auto">
              <table className="min-w-[1000px] w-full bg-white rounded-lg shadow-md border border-gray-300 text-right">
                <thead className="bg-gray-800 text-white text-sm md:text-base">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    {headTable.map((head, index) => (
                      <th
                        key={index}
                        className={`p-3 text-center ${
                          checked[head] ? "" : "print:hidden"
                        }`}
                      >
                        <div className="flex justify-center items-center gap-1">
                          <span className="">{head}</span>
                          <input
                            type="checkbox"
                            className="print:hidden w-5 h-5 accent-green-600 cursor-pointer"
                            checked={checked[head]}
                            onChange={(e) => {
                              console.log(e.target.checked);
                              setChecked((prev) => ({
                                ...prev,
                                [head]: e.target.checked,
                              }));
                            }}
                          />
                        </div>
                      </th>
                    ))}
                    <th className="p-3 text-center print:hidden">التحكم</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base bg-yellow-50">
                  {data
                    ?.filter((ele) => ele.omra?.name === omra)
                    .filter((ele) => {
                      if (
                        Filter !== "الكل" &&
                        Filter !== "جواً" &&
                        Filter != "براً"
                      ) {
                        return ele.room == Filter;
                      } else if (Filter == "براً" || Filter == "جواً") {
                        return ele.safar == Filter;
                      } else {
                        return ele;
                      }
                    })
                    .map((ele, index) => (
                      <tr
                        key={ele._id}
                        className="border-t border-gray-500 hover:bg-yellow-100 transition"
                      >
                        <td className="p-3 text-center font-bold">
                          {index + 1}
                        </td>
                        <td
                          className={`p-3 text-center ${
                            checked.الاسم ? "" : "print:hidden"
                          }`}
                        >
                          {ele.name}
                        </td>
                        <td
                          className={`p-3 text-center ${
                            checked["رقم الجوال"] ? "" : "print:hidden"
                          }`}
                        >
                          {ele.phone || "—"}
                        </td>
                        <td
                          className={`p-3 text-center ${
                            checked["المبلغ"] ? "" : "print:hidden"
                          }`}
                        >
                          {ele.paidAmount}
                        </td>
                        <td
                          className={`p-3 text-center text-gray-800 font-bold ${
                            checked.الغرفة ? "" : "print:hidden"
                          }`}
                        >
                          {ele.room || "—"}
                        </td>

                        <td
                          className={`p-3 text-center ${
                            checked.ملاحظات ? "" : "print:hidden"
                          }`}
                        >
                          {ele.details || "—"}
                        </td>
                        <td
                          className={`p-3 text-center ${
                            checked["حالة الجواز"] ? "" : "print:hidden"
                          }`}
                        >
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
                        <td
                          className={`p-3 text-center ${
                            checked.السفر ? "" : "print:hidden"
                          }`}
                        >
                          {ele.safar || "—"}
                        </td>

                        <td
                          className={`p-3 text-center ${
                            checked.الصور ? "" : "print:hidden"
                          }`}
                        >
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
