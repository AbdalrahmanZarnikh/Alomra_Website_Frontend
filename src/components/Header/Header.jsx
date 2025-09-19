import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getUsersBySearch from "../../redux/slice/user/act/getUsersBySearch";
import { getUsers } from "../../redux/slice/user/userSlice";

const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location = window.location;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== "") {
        dispatch(getUsersBySearch(searchTerm));
        navigate("/");
      } else if (trimmed === "" && location.pathname === "/") {
        dispatch(getUsers());
      }
    }, 500);


    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch, navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-between items-center bg-[#FF8D4C]/90 p-5 ">
      <div className="flex justify-center items-center   ">
        <img src="image.png" className="w-25 h-25" alt="" />
      </div>

      <div className="hidden md:flex justify-center gap-4 text-lg font-bold">
        <Link
          to={"/"}
          className={`bg-white rounded-lg p-4 hover:bg-white/50 hover:text-white cursor-pointer`}
        >
          قائمة المعتمرين
        </Link>
        <Link
          to={"/add-user"}
          className={`bg-white rounded-lg p-4 hover:bg-white/50 hover:text-white cursor-pointer `}
        >
          تسجيل معتمرين
        </Link>

        <Link
          to={"/add-omra"}
          className={`bg-white rounded-lg p-4 hover:bg-white/50 hover:text-white cursor-pointer `}
        >
          إنشاء عمرة جديدة
        </Link>
      </div>
      <div className="relative w-1/2 ">
        <input
          type="text"
          placeholder="ابحث بالاسم او الغرفة"
          className="p-4 w-full rounded-lg border border-gray-300 bg-white text-[10px] md:text-lg text-right"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
        <BiSearch
          className="absolute left-2 top-4 md:top-5  text-gray-500 "
          size={21}
        />
      </div>
      <Link
        to={"/add-user"}
        className="md:hidden bg-white rounded-lg p-4 text-centerة m-2 hover:bg-white/50 hover:text-white cursor-pointer text-sm font-bold"
      >
        أضف معمترين
      </Link>
    </div>
  );
};

export default Header;
