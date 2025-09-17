import { useDispatch } from "react-redux";
import Image from "../Image/Image";
import { deleteUser } from "../../redux/slice/user/userSlice";
import { useNavigate } from "react-router-dom";

const CardUser = ({
  index,
  omra,
  id,
  name,
  phone,
  paidAmount,
  taslim,
  images,
  details,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await dispatch(deleteUser(id));
  };

  return (
    <div className="flex  flex-col md:flex-row justify-between items-center bg-yellow-100 p-5 rounded-lg shadow-xl mb-4 gap-4 print:flex-row">
      <span className="bg-gray-700 w-10 h-10 rounded-full text-center flex justify-center items-center font-bold text-white">
        {index}
      </span>
      {Array.isArray(images) && images.length > 0 && (
        <img src={images[0]?.url} className="w-20 h-20 print:hidden" alt="" />
      )}

      {/* <h1 className="text-lg ">
        {" "}
        عمرة <span className="text-red-500">{omra}</span>{" "}
      </h1> */}
      <h1 className="text-lg font-bold">
        الاسم : <span className="font-light">{name}</span>
      </h1>
      <h1 className="text-lg font-bold">
        الرقم : <span className="font-light">{phone}</span>
      </h1>
      <h1 className="text-lg font-bold">
        المبلغ المدفوع : <span className="font-light">{paidAmount}</span>
      </h1>

      {details && (
        <h1 className="text-lg font-bold">
          ملاحظات : <span className="font-light">{details}</span>
        </h1>
      )}
      <h1
        className={`${
          taslim ? "bg-green-500" : "bg-red-500"
        } p-2 rounded-md text-white text-sm md:text-lg font-bold text-center`}
      >
        {taslim ? "تم تسليم الجواز" : "لم يتم تسليم الجواز"}
      </h1>

      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {Array.isArray(images) &&
          images.map((img, index) => {
            if (index === 0) return null;
            return (
              <Image key={index} url={img.url} name={`${name} ${index + 1}`} />
            );
          })}
      </div>

      {/* <DownloadFile
        url={"/أنس وزان.pdf"}
        name={"أنس"}
        text={"اضغط لتحميل الصور ك pdf"}
      /> */}

      <div className="flex gap-2 justify-center items-center">
        <button
          className="bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-300 print:hidden"
          onClick={() => {
            navigate(`/edit-user/${id}`);
          }}
        >
          تعديل
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-300 print:hidden"
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default CardUser;
