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
    }
    else{
      setOmra(omras[0]?.name);
    }
  }, [omras]);

  const [checked, setChecked] = useState({
    الاسم: true,
    "رقم الجوال": true,
    المبلغ: true,
    الغرفة: true,
    ملاحظات: true,
    "حالة الجواز": false,
    السفر: true,
    "نوع الغرفة": true,
    "حالة التأشيرة": true,
    "رقم المقعد": false,
    // الصور: false,
  });

  console.log(FilterStatus);
  return (
    <>
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-5 overflow-x-auto ">
          <PopUp
            msg={"هل أنت متأكد من الحذف ؟"}
            id={newId}
            thunk={deleteUser}
            showVar={show}
            onClose={() => {
              setShow(false);
            }}
          />

          {/*Start Filter Section */}

          <div className="flex flex-col items-center  md:flex-row justify-between gap-4">
            <div className="w-full">
              <h1 className="text-yellow-900">حدد العمرة :</h1>
              <FilterTable data={omras} setFunction={setOmra} value={omra} />
            </div>

            <div className="w-full">
              <h1 className="text-yellow-900"> فلترة عامة :</h1>
              <FilterTable
                data={keywords}
                setFunction={setFilter}
                value={Filter}
                />
            </div>

            <div className="w-full">
              <h1 className="text-yellow-900"> حدد حسب حالة التسجيل :</h1>
              <FilterTable
                data={statusUsers}
                setFunction={setFilterStatus}
                value={FilterStatus}
              />
            </div>
          </div>
          {/* End Filter Section */}

          <div className="hidden md:flex  items-center gap-5 ">
            <NavLink
              to="/bus/1"
              className={({ isActive }) =>
                `rounded-lg p-3 ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-primary text-white hover:bg-primary/60 "
                }`
              }>
              الباص الأول
            </NavLink>
            <NavLink
              to="/bus/2"
              className={({ isActive }) =>
                `rounded-lg p-3 ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-primary text-white hover:bg-primary/60 "
                }`
              }>
              الباص الثاني
            </NavLink>
          </div>

          {/* Start Head Section  */}

          <h1 className="flex justify-center mb-10 text-2xl md:text-4xl mt-5 ">
            {omra.split(" ")[0]}
            <span className="mx-2  text-primary/90 font-bold">
              {omra.split(" ").map((ele, index) => {
                if (index !== 0) return ele + " ";
              })}
            </span>
          </h1>
          {/* End Head Section  */}

          {/* Save Or Print Table */}

          <h1
            className="mb-4 bg-primary/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-primary/50"
            onClick={() => window.print()}>
            حفظ القائمة كملف PDF
          </h1>
          {/* Save Or Print Table */}

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
