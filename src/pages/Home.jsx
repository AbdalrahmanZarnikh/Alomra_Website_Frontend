import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../components/PopUp/PopUp";
import FilterTable from "../components/FilterTable/FilterTable";
import Table from "../components/Table/Table";
import { deleteUser, getUsers } from "../redux/slice/user/userSlice";
import { getOmras } from "../redux/slice/category/omraSlice";
import loading from "../utils/loading.json";

function Home() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);
  const [omra, setOmra] = useState("");
  const [Filter, setFilter] = useState("الكل");
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
    if (omras?.length > 0) {
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
    "التكلفة الإجمالية": false,
    الصور: false,
  });

  const headTable = [
    "الاسم",
    "رقم الجوال",
    "المبلغ المدفوع",
    "المبلغ المتبقي",
    "الغرفة",
    "ملاحظات",
    "حالة الجواز",
    "السفر",
    "نوع الغرفة",
    "التكلفة الإجمالية",
    "الصور",
  ];

  const keywords = [
    "الكل",
    "براً",
    "جواً",
    "غرفة 1",
    "غرفة 2",
    "غرفة 3",
    "غرفة 4",
    "غرفة 5",
    "غرفة 6",
    "غرفة 7",
    "غرفة 8",
    "غرفة 9",
    "غرفة 10",
    "غرفة 11",
    "غرفة 12",
  ];

  return (
    <>
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-5 overflow-x-auto">
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

          <div className="flex justify-between">
            <FilterTable data={omras} setFunction={setOmra} value={omra} />

            <FilterTable
              data={keywords}
              setFunction={setFilter}
              value={Filter}
            />
          </div>
          {/* End Filter Section */}

          {/* Start Head Section  */}

          <h1 className="flex justify-center mb-10 text-2xl md:text-4xl mt-5 ">
            عمرة
            <span className="mx-2  text-[#FF8D4C]/90 font-bold">{omra}</span>
          </h1>
          {/* End Head Section  */}

          {/* Save Or Print Table */}

            <h1
              className="mb-4 bg-[#FF8D4C]/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-[#FF8D4C]/50"
              onClick={() => window.print()}
            >
              حفظ القائمة كملف PDF
            </h1>

       

          {/* Save Or Print Table */}

          {/* Start Table */}

          <Table
            Filter={Filter}
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
