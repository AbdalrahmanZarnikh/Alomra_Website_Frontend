import { useSelector } from "react-redux";
import Image from "../Image/Image";
import { useNavigate } from "react-router-dom";
import CardUser from "../CardUser/CardUser";
import { useState } from "react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useSelector((state) => state.userSlice);

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  // 🟢 فلترة البيانات
  const filteredData =
    data
      ?.filter((ele) => ele.omra?.name === omra)
      .filter((ele) => {
        if (Filter !== "الكل" && Filter !== "جواً" && Filter !== "براً") {
          return ele.room === Filter;
        } else if (Filter === "براً" || Filter === "جواً") {
          return ele.safar === Filter;
        } else {
          return ele;
        }
      }) || [];

  const lastNumber = filteredData.length;

  if (Filter !== "الكل" && Filter !== "جواً" && Filter !== "براً") {
    var room =filteredData[0].roomType
  }

  return (
    <div id="print-area" className="w-full">
      <h1 className={`flex ${room ?"justify-center gap-10":"justify-center"} items-center mb-5 text-5xl text-primary/90`}>
        <span>{Filter}</span>
        {room && <span className="text-black font-bold">{room}</span>}
      </h1>

      <div className=" m-5  font-bold">
        {filteredData.length > 0 ? (
          <p>
            العدد الكلي في الجدول هو:{" "}
            <span className="text-2xl md:text-3xl text-primary/90 m-2 ">
              {lastNumber}
            </span>{" "}
          </p>
        ) : (
          "لا توجد بيانات حالياً"
        )}
      </div>

      {/* نسخة الديسكتوب */}
      <div className="w-full overflow-x-auto hidden md:block print:block">
        <table className="w-full bg-white rounded-lg shadow-md border border-gray-300 text-right">
          <thead className="bg-gray-800 text-white text-sm md:text-base">
            <tr>
              <th className="p-3 text-center">#</th>
              {headTable.map((head, index) => (
                <th
                  key={index}
                  className={`p-3 text-center ${
                    !checked[head] && "print:hidden"
                  }`}
                >
                  <div className="flex justify-center items-center gap-1">
                    <span>{head}</span>
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
            {filteredData.map((ele, index) => {
              return (
                <tr
                  key={ele._id}
                  className="border-t border-gray-500 hover:bg-yellow-100 transition"
                >
                  <td className="p-3 text-center font-bold">{index + 1}</td>

                  <td
                    className={`p-3 text-center ${
                      !checked.الاسم && "print:hidden"
                    }`}
                  >
                    {ele.name}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["رقم الجوال"] && "print:hidden"
                    }`}
                  >
                    {ele.phone || "—"}
                  </td>

                  <td
                    className={`p-3 text-center text-green-700 ${
                      !checked["المبلغ المدفوع"] && "print:hidden"
                    }`}
                  >
                    {ele.paidAmount}
                  </td>

                  <td
                    className={`p-3 text-center text-red-700 ${
                      !checked["المبلغ المتبقي"] && "print:hidden"
                    }`}
                  >
                    {ele.totalAmount - ele.paidAmount > 0 ? (
                      ele.totalAmount - ele.paidAmount
                    ) : (
                      <p className="text-green-700">تم الدفع</p>
                    )}
                  </td>

                  <td
                    className={`p-3 text-center text-gray-800 font-bold ${
                      !checked.الغرفة && "print:hidden"
                    }`}
                  >
                    {ele.room || "—"}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked.ملاحظات && "print:hidden"
                    }`}
                  >
                    {ele.details || "—"}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["حالة الجواز"] && "print:hidden"
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
                      !checked.السفر && "print:hidden"
                    }`}
                  >
                    {ele.safar || "—"}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["نوع الغرفة"] && "print:hidden"
                    }`}
                  >
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap  ${
                        ele.roomType === "رباعية"
                          ? "bg-green-600"
                          : ele.roomType === "ثلاثية"
                          ? "bg-blue-600"
                          : ele.roomType === "ثنائية"
                          ? "bg-red-600"
                          : "bg-zinc-800"
                      }`}
                    >
                      {ele.roomType}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["التكلفة الإجمالية"] && "print:hidden"
                    }`}
                  >
                    <span className="inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap bg-yellow-500">
                      {ele.totalAmount}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked.الصور && "print:hidden"
                    }`}
                  >
                    <div className="grid grid-cols-3 place-items-center gap-2">
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* نسخة الموبايل */}
      <div className="grid gap-4 md:hidden print:hidden">
        <div className="relative inline-block text-right">
          <button
            type="button"
            className="inline-flex justify-between w-64 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            حدد ماتريد طباعته
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-y-auto ">
              <div className="p-2 space-y-2">
                {headTable.map((head) => (
                  <label
                    key={head}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-green-600"
                      checked={checked[head]}
                      onChange={(e) => {
                        setChecked((prev) => ({
                          ...prev,
                          [head]: e.target.checked,
                        }));
                      }}
                    />
                    <span>{head}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredData.map((ele, index) => (
          <div
            key={ele._id}
            className="bg-gray-500 rounded-lg shadow p-3 border border-gray-200 print:hidden"
          >
            <CardUser
              name={ele.name}
              phone={ele.phone}
              index={index}
              safar={ele.safar}
              room={ele.room}
              paidAmount={ele.paidAmount}
              totalAmount={ele.totalAmount}
              images={ele.images}
              roomType={ele.roomType}
              taslim={ele.taslim}
              details={ele.details}
            />
            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded text-sm hover:bg-blue-400"
                onClick={() => navigate(`/edit-user/${ele._id}`)}
              >
                تعديل
              </button>
              <button
                onClick={() => CheckPass(ele._id)}
                className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm hover:bg-red-400"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
