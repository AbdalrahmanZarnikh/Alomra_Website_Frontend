import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { playSound } from "../../utils/playSound";

const PopUp = ({ msg, id, thunk, showVar, onClose }) => {
  const dispatch = useDispatch();
  const [pass, setPass] = useState("");
  const { data } = useSelector((state) => state.userSlice);

  const handleDelete = async () => {
    const found = data.find((item) => item._id === id);
    if (pass == "3415") {
      await dispatch(thunk(id));
      if (found) {
        toast.success(`تم حذف بيانات ${found.name}`);
        playSound();
      } else {
        toast.success(`تم الحذف بنجاح`);
        playSound();
      }

      onClose();
    } else {
      toast.error("الرمز السري خاطئ");
      playSound("/error.mp3");
    }
  };

  return (
    <div>
      {showVar && (
        <div className="fixed top-0 left-0 w-full h-full bg-neutral-900/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-4">
            <h2 className="text-xl mb-4 font-bold text-center text-neutral-800">{msg}</h2>
            <input
              type="text"
              placeholder="ادخل الرمز السري للحذف"
              className="w-full rounded-lg border border-neutral-300 p-3 text-center outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <div className="flex gap-2 mt-5">
              <button
                className="flex-1 rounded-lg bg-danger py-2.5 font-semibold text-white transition-colors hover:opacity-90 cursor-pointer"
                onClick={handleDelete}>
                إدخال
              </button>
              <button
                className="flex-1 rounded-lg border border-neutral-300 py-2.5 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 cursor-pointer"
                onClick={() => {
                  onClose();
                }}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
