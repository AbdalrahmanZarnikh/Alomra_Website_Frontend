import { useSelector } from "react-redux";
import Image from "../Image/Image";
import { useNavigate } from "react-router-dom";

const Table = ({
  Filter,
  headTable,
  checked,
  setChecked,
  setShow,
  setNewId,
  omra,
}) => {
  const navigate = useNavigate();
  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  const { data } = useSelector((state) => state.userSlice);

  return (
    <div id="print-area" className="w-full">
      <h1 className="flex justify-center items-center mb-5 text-5xl text-[#FF8D4C]/90">
        {Filter}
      </h1>
      <div className="container mx-auto overflow-x-auto">
        <table className=" w-full bg-white rounded-lg shadow-md border border-gray-300 text-right">
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
                  <td className="p-3 text-center font-bold">{index + 1}</td>
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
                      checked["المبلغ المدفوع"] ? "" : "print:hidden"
                    } text-green-700`}
                  >
                    {ele.paidAmount}
                  </td>
                  <td
                    className={`p-3 text-center ${
                      checked["المبلغ المتبقي"] ? "" : "print:hidden"
                    } text-red-700`}
                  >
                    {ele.totalAmount - ele.paidAmount > 0 ? (
                      ele.totalAmount - ele.paidAmount
                    ) : (
                      <p className="text-green-700">تم الدفع</p>
                    )}
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
                      {ele.taslim ? "تم تسليم الجواز" : "لم يتم تسليم الجواز"}
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
                      checked["نوع الغرفة"] ? "" : "print:hidden"
                    }`}
                  >
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap  ${
                        ele.roomType == "رباعية"
                          ? "bg-green-600"
                          : ele.roomType == "ثلاثية"
                          ? "bg-blue-600"
                          : "bg-red-600"
                      }`}
                    >
                      {ele.roomType}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      checked["التكلفة الإجمالية"] ? "" : "print:hidden"
                    }`}
                  >
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap bg-orange-500`}
                    >
                      {ele.totalAmount}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      checked.الصور ? "" : "print:hidden"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-2">
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
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-400 text-xs md:text-sm cursor-pointer"
                        onClick={() => navigate(`/edit-user/${ele._id}`)}
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => CheckPass(ele._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-400 text-xs md:text-sm cursor-pointer"
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
  );
};

export default Table;
