import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardUser from "../CardUser/CardUser";
import { useState } from "react";
import { downloadAllVCards } from "../../utils/contactUtils";
// import ButtonSits from "../ButtonSits/ButtonSits";

const Table = ({
  Filter,
  FilterStatus,
  headTable,
  checked,
  setChecked,
  setShow,
  setNewId,
  omra,
}) => {
  const convertGender = {
    ذكر: "رجال",
    أنثى: "نساء",
  };

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [order, setOrder] = useState(false);

  const { data, selectedUsers } = useSelector((state) => state.userSlice);
  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  const Room = {
    1: "خاصة",
    2: "ثنائية",
    3: "ثلاثية",
    4: "رباعية",
    5: "خماسية",
    6: "خماسية",
  };

  // 🟢 فلترة البيانات
  let filteredData =
    data
      ?.filter((ele) => ele.omra?.name === omra)
      .filter((ele) => {
        if (
          Filter !== "الكل" &&
          Filter !== "جواً" &&
          Filter !== "براً" &&
          Filter !== "خالد قوجة" &&
          Filter !== "أحمد المصري" &&
          Filter !== "عبد الرزاق بيلوني" &&
          Filter !== "باص 1" &&
          Filter !== "باص 2"
        ) {
          return ele.room === Filter;
        } else if (Filter === "براً" || Filter === "جواً") {
          return ele.safar === Filter && ele.name !== "إدارة  الحملة";
        } else if (Filter == "خالد قوجة" || Filter == "أحمد المصري") {
          return ele.details.includes(Filter);
        } else if (Filter == "عبد الرزاق بيلوني") {
          return (
            !ele.details.includes("خالد قوجة") &&
            !ele.details.includes("أحمد المصري") &&
            ele.name !== "إدارة  الحملة"
          );
        } else if (Filter == "باص 1" || Filter == "باص 2") {
          return ele.sitNumber.split(" ")[2] === Filter.split(" ")[1];
        } else {
          return ele;
        }
      })
      .filter((ele) => {
        if (FilterStatus === "لم يسلم الجواز") {
          return ele.taslim === false && ele.name !== "إدارة  الحملة";
        } else if (FilterStatus === "تم تسليم الجواز") {
          return ele.taslim === true && ele.name !== "إدارة  الحملة";
        } else if (FilterStatus == "لم يكمل الدفع") {
          return (
            ele.totalAmount - ele.paidAmount > 0 &&
            !ele.details.includes("خالد قوجة") &&
            !ele.details.includes("أحمد المصري") &&
            ele.name !== "إدارة  الحملة"
          );
        } else if (FilterStatus == "حصل على تأشيرة") {
          return ele.visa === true && ele.name !== "إدارة  الحملة";
        } else if (FilterStatus == "لم يحصل على تأشيرة") {
          return ele.visa === false && ele.name !== "إدارة  الحملة";
        } else if (FilterStatus == "ذكر" || FilterStatus == "أنثى") {
          return ele.gender === FilterStatus;
        } else {
          return ele;
        }
      }) || [];

  if (order) {
    filteredData.sort(
      (a, b) => +a.sitNumber.split(" ")[0] - +b.sitNumber.split(" ")[0],
    );
  }

  const lastNumber = filteredData.length;

  if (
    Filter !== "الكل" &&
    Filter !== "جواً" &&
    Filter !== "براً" &&
    Filter !== "تم تسليم الجواز" &&
    Filter !== "لم يسلم الجواز" &&
    Filter !== "لم يكمل الدفع" &&
    Filter !== "خالد قوجة" &&
    Filter !== "أحمد المصري" &&
    Filter !== "عبد الرزاق بيلوني" &&
    Filter !== "باص 1" &&
    Filter !== "باص 2"
  ) {
    const numberOfUsers = filteredData.length;

    var room = Room[numberOfUsers];
  }

  const totalPaid = filteredData.reduce((acc, ele) => {
    if (
      ele.name == "عبدالرزاق بيلوني" ||
      ele.details.includes("خالد قوجة") ||
      ele.details.includes("أحمد المصري")
    ) {
      return acc;
    }
    return acc + ele.paidAmount;
  }, 0);

  const totalAmountPred = filteredData.reduce((acc, ele) => {
    if (
      ele.name == "عبدالرزاق بيلوني" ||
      ele.details.includes("خالد قوجة") ||
      ele.details.includes("أحمد المصري")
    ) {
      return acc;
    }
    return acc + ele.totalAmount;
  }, 0);

  return (
    <div id="print-area" className="w-full">
      {/* <ButtonSits data={filteredData}/> */}
      <h1
        className={`flex ${
          room ? "justify-evenly gap-10" : "justify-center"
        } items-center mb-5 p-4 text-5xl text-primary/90`}>
        {FilterStatus === "ذكر" || FilterStatus === "أنثى" ? (
          <span>{convertGender[FilterStatus]}</span>
        ) : (
          <span>{Filter}</span>
        )}
        {room && (
          <span
            className={`inline-block px-4 py-1 rounded-full text-white font-bold text-3xl whitespace-nowrap  ${
              room === "رباعية"
                ? "bg-green-600"
                : room === "ثلاثية"
                  ? "bg-blue-600"
                  : room === "ثنائية"
                    ? "bg-red-600"
                    : "bg-zinc-800"
            }`}>
            {room}
          </span>
        )}
      </h1>

      <div className=" m-5  font-bold ">
        {filteredData.length > 0 && !room ? (
          <p className="flex flex-col md:flex-row gap-2 justify-between items-center ">
            <span>
              العدد الكلي في الجدول هو:{" "}
              <span className="text-2xl md:text-3xl text-primary/90 m-2 ">
                {lastNumber}
              </span>{" "}
              <div className="flex justify-start mt-2 items-center gap-4 print:hidden">
                <label htmlFor="Order">ترتيب حسب المقاعد</label>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-green-600 cursor-pointer"
                  name="order"
                  id="Order"
                  onChange={(e) => {
                    setOrder(e.target.checked);
                  }}
                />
              </div>
              <p
                className="bg-primary p-2 rounded-lg text-white mt-2 cursor-pointer hover:bg-primary/70 print:hidden"
                onClick={() => {
                  if (selectedUsers?.length > 0) {
                    downloadAllVCards(selectedUsers);
                  } else {
                    downloadAllVCards(filteredData);
                  }
                }}>
                إضافة جميع الأسماء إلى جهات الاتصال
              </p>
            </span>

            <span className="print:hidden">
              إجمالي المدفوعات:{" "}
              <span className="text-sm md:text-3xl text-primary/90 m-2 ">
                {totalPaid} $ /{" "}
                <span className="text-green-600">{totalAmountPred} $</span>
              </span>{" "}
            </span>
          </p>
        ) : (
          // "لا توجد بيانات حاليا"
          ""
        )}
      </div>

      {/* نسخة الديسكتوب */}
      <div className="w-full overflow-x-auto hidden md:block print:block ">
        <table className="w-full bg-white rounded-lg shadow-md border border-gray-300 text-right">
          <thead className="bg-gray-800 text-white text-sm md:text-base">
            <tr className="">
              <th className="p-3 text-center">#</th>
              {headTable.map((head, index) => (
                <th
                  key={index}
                  className={`p-3 text-center ${
                    !checked[head] && "print:hidden"
                  }`}>
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
              // console.log(ele.sitNumber.split(" ")[2]);
              return (
                <tr
                  key={ele._id}
                  className="border-t border-gray-500 hover:bg-yellow-100 transition">
                  <td className="p-3 text-center font-bold">{index + 1}</td>

                  <td
                    className={`p-3 text-center ${
                      !checked.الاسم && "print:hidden"
                    } `}>
                    {ele.name}
                  </td>
                  <td
                    className={`p-3 text-center ${
                      !checked.الجنس && "print:hidden"
                    } `}>
                    {ele.gender}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["رقم الجوال"] && "print:hidden"
                    }`}>
                    {ele.phone || "—"}
                  </td>

                  <td
                    className={`p-3 text-center text-green-700 ${
                      !checked["المبلغ المدفوع"] && "print:hidden"
                    } text-lg`}>
                    {ele.paidAmount}
                  </td>

                  <td
                    className={`p-3 text-center text-red-700 ${
                      !checked["المبلغ المتبقي"] && "print:hidden"
                    } text-lg`}>
                    {ele.totalAmount - ele.paidAmount > 0 ? (
                      ele.totalAmount - ele.paidAmount
                    ) : (
                      <p className="text-green-700">تم الدفع</p>
                    )}
                  </td>

                  <td
                    className={`p-3 text-center text-gray-800 font-bold ${
                      !checked.الغرفة && "print:hidden"
                    }`}>
                    {ele.room || "—"}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["حالة الجواز"] && "print:hidden"
                    }`}>
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap ${
                        ele.taslim ? "bg-green-600" : "bg-red-600"
                      }`}>
                      {ele.taslim ? "تم تسليم الجواز" : "لم يتم تسليم الجواز"}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked.السفر && "print:hidden"
                    }`}>
                    {ele.safar || "—"}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["نوع الغرفة"] && "print:hidden"
                    }`}>
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap  ${
                        ele.roomType === "رباعية"
                          ? "bg-green-600"
                          : ele.roomType === "ثلاثية"
                            ? "bg-blue-600"
                            : ele.roomType === "ثنائية"
                              ? "bg-red-600"
                              : ele.roomType === "خاصة"
                                ? "bg-zinc-800"
                                : "bg-orange-800"
                      }`}>
                      {ele.roomType}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["رقم المقعد"] && "print:hidden"
                    }`}>
                    {Filter == "باص 1" || Filter == "باص 2" ? (
                      <span className="inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-lg whitespace-nowrap bg-gray-800">
                        {ele.sitNumber.split(" ")[0] || "—"}
                      </span>
                    ) : (
                      <span className="inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-lg whitespace-nowrap bg-gray-800">
                        {ele.sitNumber || "—"}
                      </span>
                    )}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["حالة التأشيرة"] && "print:hidden"
                    }`}>
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap ${
                        ele.visa ? "bg-green-600" : "bg-red-600"
                      }`}>
                      {ele.visa ? "صدرت التأشيرة" : "لم تصدر التأشيرة "}
                    </span>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked.ملاحظات && "print:hidden"
                    }`}>
                    {ele.details || "—"}
                  </td>

                  {/* الصور */}

                  {/* <td
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
                  </td> */}

                  <td className="p-3 print:hidden">
                    <div className="flex gap-2 justify-end flex-wrap">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-400 text-xs md:text-sm cursor-pointer"
                        onClick={() => navigate(`/edit-user/${ele._id}`)}>
                        تعديل
                      </button>
                      <button
                        onClick={() => CheckPass(ele._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-400 text-xs md:text-sm cursor-pointer">
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
            onClick={() => setDropdownOpen(!dropdownOpen)}>
            حدد ماتريد طباعته
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
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
                    className="flex items-center gap-2 cursor-pointer">
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
            className="bg-primary/90 rounded-lg shadow p-3 border border-gray-200 print:hidden">
            <CardUser
              name={ele.name}
              ele={ele}
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
              sitNumber={ele.sitNumber}
            />
            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded text-sm hover:bg-blue-400"
                onClick={() => navigate(`/edit-user/${ele._id}`)}>
                تعديل
              </button>
              <button
                onClick={() => CheckPass(ele._id)}
                className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm hover:bg-red-400">
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
