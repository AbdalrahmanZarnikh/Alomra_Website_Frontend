import { useDispatch } from "react-redux";
import { downloadVCard } from "../../utils/contactUtils";
import {addUserSelected} from "../../redux/slice/user/userSlice"

const CardUser = ({
  index,
  name,
  phone,
  totalAmount,
  room,
  safar,
  paidAmount,
  taslim,
  sitNumber,
  details,
  ele,
  roomType,
}) => {
  const dispatch=useDispatch();

 

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 mb-4">
      {/* العنوان + الاسم */}
      <div className="flex items-center gap-3">
        <input
          id="VCard"
          type="checkbox"
          className="w-4 h-4 accent-green-600 cursor-pointer"
          onChange={(e)=>{
               if(e.target.checked){
                dispatch(addUserSelected(ele));
               }
          }}
        />
        {/* <span className="text-sm text-gray-600">  </span> */}
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-red-600 font-bold text-lg">{index + 1}</span>
        <h2 className="text-gray-800 font-bold text-2xl m-auto mb-4">{name}</h2>
      </div>

      {/* التفاصيل الأساسية */}
      <div className="space-y-2 text-sm text-gray-700">
        <p className="flex justify-between bg-primary/70 px-4 shadow-2xl text-gray-900 p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">رقم الجوال:</span>
          <span>{phone || "—"}</span>
        </p>

        <p className="flex justify-between bg-primary/70 px-4 text-white p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">المبلغ المدفوع:</span>
          <span className="text-green-600 bg-yellow-100 px-2 py-0.5 rounded-md font-bold">
            {paidAmount}
          </span>
        </p>

        <p className="flex justify-between bg-primary/70 px-4 text-white p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">المبلغ المتبقي:</span>
          {totalAmount - paidAmount > 0 ? (
            <span className="text-red-600 font-bold bg-yellow-100 px-2 py-0.5 rounded-md">
              {totalAmount - paidAmount}
            </span>
          ) : (
            <span className="text-green-600 bg-yellow-100 px-2 py-0.5 rounded-md font-bold">
              تم الدفع
            </span>
          )}
        </p>

        <p className="flex justify-between bg-primary/70 px-4 text-gray-900 p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">ملاحظات:</span>
          <span>{details || "—"}</span>
        </p>

        <p className="flex justify-between bg-primary/70 px-4 text-gray-900 p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">رقم الغرفة:</span>
          <span>{room || "—"}</span>
        </p>

        <p className="flex justify-between bg-primary/70 px-4 text-white p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">رقم المقعد:</span>
          <span className="bg-yellow-100 px-2 py-0.5 rounded-md font-bold text-yellow-800">
            {sitNumber}
          </span>
        </p>

        <p className="flex justify-between bg-primary/70 px-4 text-white p-2 rounded-lg w-full">
          <span className="font-semibold text-gray-900">
            التكلفة الإجمالية:
          </span>
          <span className="bg-yellow-100 px-2 py-0.5 rounded-md font-bold text-yellow-800">
            {totalAmount}
          </span>
        </p>
      </div>

      {/* البادجات */}
      <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
            roomType === "رباعية"
              ? "bg-green-600"
              : roomType === "ثلاثية"
              ? "bg-blue-600"
              : roomType === "ثنائية"
              ? "bg-red-600"
              : "bg-zinc-800"
          }`}>
          {roomType}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
            taslim ? "bg-green-600" : "bg-red-600"
          }`}>
          {taslim ? "تم تسليم الجواز" : "لم يتم تسليم الجواز"}
        </span>

        <span className="px-3 py-1 rounded-full text-white text-xs font-bold bg-indigo-600">
          {safar}
        </span>

        <span
          className="px-3 py-1 cursor-pointer rounded-full flex justify-center items-center gap-2 text-white text-xs font-bold bg-yellow-600"
          onClick={() => {
            downloadVCard(ele);
          }}>
          إضافة إلى جهات الاتصال{" "}
        </span>
      </div>

      {/* الصور */}
      {/* {Array.isArray(images) && images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {images.map((img, i) => (
            <Image key={i} url={img.url} name={`${name} ${i + 1}`} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default CardUser;
