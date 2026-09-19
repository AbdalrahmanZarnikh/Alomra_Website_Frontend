import { useDispatch } from "react-redux";
import { Contact, Phone } from "lucide-react";
import { downloadVCard } from "../../utils/contactUtils";
import { addUserSelected } from "../../redux/slice/user/userSlice";
import Badge from "../Badge/Badge";
import { roomTypeClass, statusClass } from "../../utils/badgeStyles";

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
  const dispatch = useDispatch();
  const remaining = totalAmount - paidAmount;

  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 border border-neutral-200 mb-4">
      {/* الرأس: الترتيب + الاسم + تحديد */}
      <div className="flex items-center gap-3 mb-4">
        <input
          id="VCard"
          type="checkbox"
          className="w-4 h-4 accent-primary cursor-pointer shrink-0"
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(addUserSelected(ele));
            }
          }}
        />
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
          {index + 1}
        </div>
        <h2 className="text-neutral-800 font-bold text-lg flex-1">{name}</h2>
      </div>

      {/* التفاصيل الأساسية */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="rounded-lg bg-neutral-50 p-2.5">
          <p className="text-xs font-semibold text-neutral-500 mb-0.5">
            رقم الجوال
          </p>
          <p className="flex items-center gap-1 font-bold text-neutral-800">
            <Phone size={13} className="text-neutral-400" />
            {phone || "—"}
          </p>
        </div>

        <div className="rounded-lg bg-neutral-50 p-2.5">
          <p className="text-xs font-semibold text-neutral-500 mb-0.5">
            رقم الغرفة
          </p>
          <p className="font-bold text-neutral-800">{room || "—"}</p>
        </div>

        <div className="rounded-lg bg-success-light p-2.5">
          <p className="text-xs font-semibold text-success mb-0.5">
            المبلغ المدفوع
          </p>
          <p className="font-bold text-success">{paidAmount} $</p>
        </div>

        <div
          className={`rounded-lg p-2.5 ${
            remaining > 0 ? "bg-danger-light" : "bg-success-light"
          }`}>
          <p
            className={`text-xs font-semibold mb-0.5 ${
              remaining > 0 ? "text-danger" : "text-success"
            }`}>
            المبلغ المتبقي
          </p>
          <p
            className={`font-bold ${
              remaining > 0 ? "text-danger" : "text-success"
            }`}>
            {remaining > 0 ? `${remaining} $` : "تم الدفع"}
          </p>
        </div>

        <div className="rounded-lg bg-neutral-50 p-2.5">
          <p className="text-xs font-semibold text-neutral-500 mb-0.5">
            رقم المقعد
          </p>
          <p className="font-bold text-neutral-800">{sitNumber || "—"}</p>
        </div>

        <div className="rounded-lg bg-neutral-50 p-2.5">
          <p className="text-xs font-semibold text-neutral-500 mb-0.5">
            التكلفة الإجمالية
          </p>
          <p className="font-bold text-neutral-800">{totalAmount} $</p>
        </div>

        <div className="col-span-2 rounded-lg bg-neutral-50 p-2.5">
          <p className="text-xs font-semibold text-neutral-500 mb-0.5">
            ملاحظات
          </p>
          <p className="font-bold text-neutral-800">{details || "—"}</p>
        </div>
      </div>

      {/* البادجات */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm" className={roomTypeClass(roomType)}>
          {roomType}
        </Badge>

        <Badge size="sm" className={statusClass(taslim)}>
          {taslim ? "تم تسليم الجواز" : "لم يتم تسليم الجواز"}
        </Badge>

        <Badge size="sm" className="bg-neutral-100 text-neutral-700">
          {safar}
        </Badge>

        <button
          className="px-3 py-1 cursor-pointer rounded-full flex justify-center items-center gap-1.5 text-white text-xs font-bold bg-primary hover:bg-primary-700 transition-colors"
          onClick={() => {
            downloadVCard(ele);
          }}>
          <Contact size={13} />
          جهات الاتصال
        </button>
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
