import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
import getUsersBySearch from "../../redux/slice/user/act/getUsersBySearch";
import { getUsers } from "../../redux/slice/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = window.location;
  const [searchTerm, setSearchTerm] = useState("");
  const input=useRef(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== "") {
        dispatch(getUsersBySearch(searchTerm));
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-lg p-4 cursor-pointer ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          قائمة المعتمرين
        </NavLink>

        <NavLink
          to="/add-user"
          className={({ isActive }) =>
            `rounded-lg p-4 cursor-pointer ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          تسجيل معتمرين
        </NavLink>

        <NavLink
          to="/add-omra"
          className={({ isActive }) =>
            `rounded-lg p-4 cursor-pointer ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          إنشاء عمرة جديدة
        </NavLink>
      </div>
      <div className="relative w-1/2 ">
        <input
          type="text"
          ref={input}
          placeholder="ابحث عن معتمر"
          className="p-4 w-full rounded-lg border border-gray-300 bg-white text-[10px] md:text-lg text-center"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
        <span className={`absolute right-2 top-2  md:top-5   ${!searchTerm.length>0 && "hidden"} bg-gray-300 text-red-500 w-2 h-2 md:w-5 md:h-5  p-4 rounded-full text-center flex justify-center items-center  cursor-pointer hover:bg-gray-200`} onClick={()=>{
           input.current.value=""
           setSearchTerm("")
        }} >X</span>
        <BiSearch
          className="absolute left-2 top-4 md:top-5  text-gray-500 "
          size={21}
        />
      </div>
      <Link
        to={"/add-user"}
        className="md:hidden bg-white rounded-lg p-4 text-centerة m-2 hover:bg-white/50 hover:text-white cursor-pointer text-sm font-bold"
      >
         تسجيل
      </Link>
    </div>
  );
};

export default Header;
