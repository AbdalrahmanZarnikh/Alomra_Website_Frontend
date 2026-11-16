import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardUser from "../CardUser/CardUser";
import Badge from "../Badge/Badge";
import { useState } from "react";
import { downloadAllVCards } from "../../utils/contactUtils";
import { roomTypeClass, statusClass } from "../../utils/badgeStyles";
import {
  ChevronDown,
  Contact,
  Pencil,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
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

  const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - parseInt(birthYear);
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

  const detailsText = (ele) =>
    typeof ele?.details === "string" ? ele.details : "";
  const sitParts = (ele) =>
    typeof ele?.sitNumber === "string" ? ele.sitNumber.split(" ") : [];

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
          Filter !== "الصابوني" &&
          Filter !== "عبد الرزاق بيلوني" &&
          !(typeof Filter === "string" && Filter.startsWith("باص "))
        ) {
          return ele.room === Filter;
        } else if (Filter === "براً" || Filter === "جواً") {
          return ele.safar === Filter && ele.name !== "إدارة  الحملة";
        } else if (
          Filter == "خالد قوجة" ||
          Filter == "أحمد المصري" ||
          Filter == "الصابوني"
        ) {
          return detailsText(ele).includes(Filter);
        } else if (Filter == "عبد الرزاق بيلوني") {
          return (
            !detailsText(ele).includes("خالد قوجة") &&
            !detailsText(ele).includes("أحمد المصري") &&
            !detailsText(ele).includes("الصابوني") &&
            ele.name !== "إدارة  الحملة"
          );
        } else if (typeof Filter === "string" && Filter.startsWith("باص ")) {
          return sitParts(ele)[2] === Filter.split(" ")[1];
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
            !detailsText(ele).includes("خالد قوجة") &&
            !detailsText(ele).includes("أحمد المصري") &&
            ele.name !== "إدارة  الحملة"
          );
        } else if (FilterStatus == "حصل على تأشيرة") {
          return ele.visa === true && ele.name !== "إدارة  الحملة";
        } else if (FilterStatus == "لم يحصل على تأشيرة") {
          return ele.visa === false && ele.name !== "إدارة  الحملة";
        } else if (
          FilterStatus == "ذكر" ||
          FilterStatus == "أنثى" ||
          FilterStatus == "طفل"
        ) {
          return ele.gender === FilterStatus;
        } else {
          return ele;
        }
      }) || [];

  if (order) {
    filteredData.sort(
      (a, b) => +(sitParts(a)[0] || 0) - +(sitParts(b)[0] || 0),
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
    !(typeof Filter === "string" && Filter.startsWith("باص "))
  ) {
    const numberOfUsers = filteredData.length;

    var room = Room[numberOfUsers];
  }

  const totalPaid = filteredData.reduce((acc, ele) => {
    if (
      ele.name == "عبدالرزاق بيلوني" ||
      detailsText(ele).includes("خالد قوجة") ||
      detailsText(ele).includes("أحمد المصري")
    ) {
      return acc;
    }
    return acc + (ele.paidAmount || 0);
  }, 0);

  const totalAmountPred = filteredData.reduce((acc, ele) => {
    if (
      ele.name == "عبدالرزاق بيلوني" ||
      detailsText(ele).includes("خالد قوجة") ||
      detailsText(ele).includes("أحمد المصري")
    ) {
      return acc;
    }
    return acc + (ele.totalAmount || 0);
  }, 0);

  return (
    <div id="print-area" className="w-full">
      {/* <ButtonSits data={filteredData}/> */}
      <h1
        className={`flex flex-wrap ${
          room ? "justify-center gap-4" : "justify-center"
        } items-center mb-6 p-4 font-display text-3xl md:text-5xl font-black text-primary`}>
        {FilterStatus === "ذكر" || FilterStatus === "أنثى" ? (
          <span>{convertGender[FilterStatus]}</span>
        ) : (
          <span>{Filter}</span>
        )}
        {room && (
          <span
            className={`inline-block px-4 py-1 rounded-full font-bold text-xl md:text-3xl whitespace-nowrap ${roomTypeClass(room)}`}>
            {room}
          </span>
        )}
      </h1>

      {filteredData.length > 0 && !room ? (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500">
                العدد الكلي في الجدول
              </p>
              <p className="font-display text-3xl font-black text-neutral-900">{lastNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-light text-success">
              <Wallet size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500">
                إجمالي المدفوعات
              </p>
              <p className="font-display text-3xl font-black text-neutral-900">
                {totalPaid} $
                <span className="mx-1 text-sm font-medium text-neutral-400">
                  /
                </span>
                <span className="text-base font-bold text-success">
                  {totalAmountPred} $
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <label
              htmlFor="Order"
              className="flex items-center justify-between gap-2 cursor-pointer text-sm font-semibold text-neutral-600">
              ترتيب حسب المقاعد
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary cursor-pointer"
                name="order"
                id="Order"
                onChange={(e) => {
                  setOrder(e.target.checked);
                }}
              />
            </label>
            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-primary-700 transition-colors"
              onClick={() => {
                if (selectedUsers?.length > 0) {
                  downloadAllVCards(selectedUsers);
                } else {
                  downloadAllVCards(filteredData);
                }
              }}>
              <Contact size={16} />
              إضافة الأسماء إلى جهات الاتصال
            </button>
          </div>
        </div>
      ) : null}

      {/* نسخة الديسكتوب */}
      <div className="w-full overflow-x-auto hidden md:block print:block rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full bg-white text-right">
          <thead className="border-b-2 border-brass bg-white text-neutral-600 text-sm font-semibold">
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

          <tbody className="text-sm md:text-base">
            {filteredData.map((ele, index) => {
              // console.log(ele.sitNumber.split(" ")[2]);
              return (
                <tr
                  key={ele._id}
                  className="border-t border-neutral-200 bg-white hover:bg-primary-50 transition-colors">
                  <td className="p-3 text-center font-bold text-neutral-400">
                    {index + 1}
                  </td>

                  <td
                    className={`p-3 text-center font-bold text-neutral-800 ${
                      !checked.الاسم && "print:hidden"
                    } `}>
                    {ele.name}
                  </td>
                  <td
                    className={`p-3 text-center ${
                      !checked.الجنس && "print:hidden"
                    }`}>
                    {ele.gender}
                    {ele.age  ?
                      <p className="text-danger text-xl">
                        {calculateAge(ele.age)}{" "}
                        {+calculateAge(ele.age) > 10 ? "سنة" : "سنوات"}
                      </p>
                      :<p>—</p>
                    }
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["رقم الجوال"] && "print:hidden"
                    }`}>
                    {ele.phone || "—"}
                  </td>

                  <td
                    className={`p-3 text-center text-success ${
                      !checked["المبلغ المدفوع"] && "print:hidden"
                    } text-lg`}>
                    {ele.paidAmount}
                  </td>

                  <td
                    className={`p-3 text-center text-danger ${
                      !checked["المبلغ المتبقي"] && "print:hidden"
                    } text-lg`}>
                    {ele.totalAmount - ele.paidAmount > 0 ? (
                      ele.totalAmount - ele.paidAmount
                    ) : (
                      <p className="text-success">تم الدفع</p>
                    )}
                  </td>

                  <td
                    className={`p-3 text-center text-neutral-800 font-bold ${
                      !checked.الغرفة && "print:hidden"
                    }`}>
                    {ele.room || "—"}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["حالة الجواز"] && "print:hidden"
                    }`}>
                    <Badge className={statusClass(ele.taslim)}>
                      {ele.taslim ? "تم تسليم الجواز" : "لم يتم تسليم الجواز"}
                    </Badge>
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
                    <Badge className={roomTypeClass(ele.roomType)}>
                      {ele.roomType}
                    </Badge>
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["رقم المقعد"] && "print:hidden"
                    }`}>
                    {typeof Filter === "string" && Filter.startsWith("باص ") ? (
                      <Badge size="lg" className="bg-neutral-800 text-white">
                        {sitParts(ele)[0] || "—"}
                      </Badge>
                    ) : (
                      <Badge size="lg" className="bg-neutral-800 text-white">
                        {ele.sitNumber || "—"}
                      </Badge>
                    )}
                  </td>

                  <td
                    className={`p-3 text-center ${
                      !checked["حالة التأشيرة"] && "print:hidden"
                    }`}>
                    <Badge className={statusClass(ele.visa)}>
                      {ele.visa ? "صدرت التأشيرة" : "لم تصدر التأشيرة "}
                    </Badge>
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
                        className="flex items-center gap-1 bg-info text-white px-3 py-1.5 rounded-lg hover:opacity-90 text-xs md:text-sm cursor-pointer transition-colors"
                        onClick={() => navigate(`/edit-user/${ele._id}`)}>
                        <Pencil size={14} />
                        تعديل
                      </button>
                      <button
                        onClick={() => CheckPass(ele._id)}
                        className="flex items-center gap-1 bg-danger text-white px-3 py-1.5 rounded-lg hover:opacity-90 text-xs md:text-sm cursor-pointer transition-colors">
                        <Trash2 size={14} />
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
            className="inline-flex items-center justify-between w-64 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}>
            حدد ماتريد طباعته
            <ChevronDown
              size={18}
              className={`ml-2 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-64 rounded-lg bg-white shadow-md border border-neutral-200 max-h-60 overflow-y-auto ">
              <div className="p-2 space-y-2">
                {headTable.map((head) => (
                  <label
                    key={head}
                    className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-primary"
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
          <div key={ele._id} className="print:hidden">
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
            <div className="flex gap-2 -mt-2 mb-4">
              <button
                className="flex items-center gap-1.5 flex-1 justify-center bg-info cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-colors"
                onClick={() => navigate(`/edit-user/${ele._id}`)}>
                <Pencil size={14} />
                تعديل
              </button>
              <button
                onClick={() => CheckPass(ele._id)}
                className="flex items-center gap-1.5 flex-1 justify-center bg-danger cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-colors">
                <Trash2 size={14} />
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
