import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../components/PopUp/PopUp";
import FilterTable from "../components/FilterTable/FilterTable";
import Table from "../components/Table/Table";
import { deleteUser, getUsers } from "../redux/slice/user/userSlice";
import { getOmras } from "../redux/slice/category/omraSlice";
import loading from "../utils/loading.json";
import { headTable, keywords, statusUsers } from "../constants/data";
import { NavLink } from "react-router-dom";
import { Bus, Printer, SlidersHorizontal } from "lucide-react";

function Home() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);
  const [omra, setOmra] = useState("");
  const [Filter, setFilter] = useState("الكل");
  const [FilterStatus, setFilterStatus] = useState("الكل");
  const [show, setShow] = useState(false);
  const [newId, setNewId] = useState("");

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUsers());
      await dispatch(getOmras());
    };
    fn();
  }, [dispatch]);

  useEffect(() => {
    if (omras?.length > 1) {
      setOmra(omras[1]?.name);
    } else {
      setOmra(omras[0]?.name);
    }
  }, [omras]);

  const [checked, setChecked] = useState({
    الاسم: true,
    الجنس: false,
    "رقم الجوال": false,
    المبلغ: false,
    الغرفة: true,
    ملاحظات: true,
    "حالة الجواز": false,
    السفر: true,
    "نوع الغرفة": true,
    "حالة التأشيرة": true,
    "رقم المقعد": false,
    // الصور: false,
  });

  return (
    <>
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-4 md:p-6 overflow-x-auto ">
          <PopUp
            msg={"هل أنت متأكد من الحذف ؟"}
            id={newId}
            thunk={deleteUser}
            showVar={show}
            onClose={() => {
              setShow(false);
            }}
          />

          {/* Start Head Section  */}
          <h1 className="flex justify-center items-center flex-wrap gap-2 mb-6 font-display text-3xl md:text-5xl font-black text-center text-neutral-900">
            {omra?.split(" ")[0]}
            <span>
              {omra?.split(" ").map((ele, index) => {
                if (index !== 0) return ele + " ";
              })}
            </span>
          </h1>
          {/* End Head Section  */}

          {/*Start Filter Section */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-4 md:p-5 mb-6 print:hidden">
            <div className="flex items-center gap-2 mb-4 text-neutral-700 font-bold">
              <SlidersHorizontal size={18} className="text-primary" />
              <span>فلترة وعرض البيانات</span>
            </div>
            <div className="flex flex-col items-stretch md:flex-row justify-between gap-4">
              <div className="w-full">
                <h2 className="mb-1 text-sm font-semibold text-neutral-500">
                  حدد العمرة
                </h2>
                <FilterTable data={omras} setFunction={setOmra} value={omra} />
              </div>

              <div className="w-full">
                <h2 className="mb-1 text-sm font-semibold text-neutral-500">
                  فلترة عامة
                </h2>
                <FilterTable
                  data={keywords}
                  setFunction={setFilter}
                  value={Filter}
                />
              </div>

              <div className="w-full">
                <h2 className="mb-1 text-sm font-semibold text-neutral-500">
                  حالة التسجيل
                </h2>
                <FilterTable
                  data={statusUsers}
                  setFunction={setFilterStatus}
                  value={FilterStatus}
                />
              </div>
            </div>
          </div>
          {/* End Filter Section */}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
            <div className="hidden md:flex items-center gap-3">
              <NavLink
                to="/bus/1"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold shadow-sm transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "bg-primary text-white hover:bg-primary-700"
                  }`
                }>
                <Bus size={18} />
                الباصات{" "}
              </NavLink>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-semibold text-white shadow-sm cursor-pointer hover:bg-primary-700 transition-colors">
              <Printer size={18} />
              حفظ القائمة كملف PDF
            </button>
          </div>

          {/* Start Table */}

          <Table
            Filter={Filter}
            FilterStatus={FilterStatus}
            headTable={headTable}
            checked={checked}
            setChecked={setChecked}
            setShow={setShow}
            setNewId={setNewId}
            omra={omra}
          />

          {/* End Table */}
        </div>
      )}
    </>
  );
}

export default Home;
