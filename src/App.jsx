import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { getUsers } from "./redux/slice/user/userSlice";
import CardUser from "./components/CardUser/CardUser";
import { getOmras } from "./redux/slice/category/omraSlice";
import Lottie from "lottie-react";
import loading from "./utils/loading.json";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUsers());
      await dispatch(getOmras());
    };
    fn();
  }, [dispatch]);

  const { isLoading, data } = useSelector((state) => state.userSlice);
  const { omras } = useSelector((state) => state.omraSlice);
  const [omra, setOmra] = useState("");

  useEffect(() => {
    if (omras?.length > 0) {
      setOmra(omras[0].name);
    }
  }, [omras]);

  return (
    <>
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen ">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-10">
          <div className="">
            {omras?.length > 0 && (
              <select
                className="mb-5 p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
                value={omra}
                onChange={(e) => {
                  setOmra(e.target.value);
                }}
              >
                {omras.map((omra) => (
                  <option key={omra.name} value={omra.name}>
                    {omra.name}
                  </option>
                ))}
              </select>
            )}
            <h1 className="flex justify-center mb-7 text-4xl">
              عمرة <span className="mx-2 text-red-600 font-bold">{omra}</span>
            </h1>

            <h1
              className="mb-4  bg-[#FF8D4C]/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-[#FF8D4C]/50"
              onClick={() => {
                window.print();
              }}
            >
              حفظ القائمة كملف pdf
            </h1>
          </div>
          <div id="print-area">
            {data?.length > 0 &&
              data
                .filter((ele) => ele.omra?.name === omra)
                .map((ele, index) => (
                  <CardUser
                    key={ele._id}
                    index={index + 1} // يبدأ العد من 1 لكل مجموعة عمرة
                    omra={ele?.omra?.name}
                    id={ele._id}
                    name={ele.name}
                    paidAmount={ele.paidAmount}
                    phone={ele.phone}
                    taslim={ele.taslim}
                    images={ele?.images}
                  />
                ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
