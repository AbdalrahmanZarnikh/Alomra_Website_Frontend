import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [path, setPath] = React.useState(window.location.pathname);


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
    </div>
  );
};

export default Header;
