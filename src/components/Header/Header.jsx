import { useEffect, useRef, useState } from "react";
import {
  Search,
  Menu,
  X,
  Table2,
  UserPlus,
  Megaphone,
  FolderOpen,
  ListChecks,
  BookOpen,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import getUsersBySearch from "../../redux/slice/user/act/getUsersBySearch";
import { getUsers } from "../../redux/slice/user/userSlice";

const NAV_LINKS = [
  { to: "/", label: "الجدول", icon: Table2 },
  { to: "/add-user", label: "تسجيل جديد", icon: UserPlus },
  { to: "/add-omra", label: "إنشاء حملة جديدة", icon: Megaphone },
  { to: "/pdf", label: "ملفاتي", icon: FolderOpen },
  { to: "/tasks", label: "إدارة المهام", icon: ListChecks },
  { to: "/alhuda", label: "الجرد السنوي", icon: BookOpen },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg border-r-[3px] px-4 py-2.5 text-[15px] font-medium transition-colors ${
    isActive
      ? "border-brass bg-white/10 text-white"
      : "border-transparent text-white/65 hover:bg-white/5 hover:text-white"
  }`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = window.location;
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const input = useRef(null);

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

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const searchBox = (
    <div className="relative">
      <Search
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
        size={18}
      />
      <input
        type="text"
        ref={input}
        placeholder="ابحث عن اسم"
        className="w-full rounded-lg border border-white/10 bg-white/10 py-2.5 pr-10 pl-9 text-sm text-white placeholder:text-white/45 focus:border-brass focus:outline-none"
        onChange={handleSearch}
      />
      {searchTerm.length > 0 && (
        <button
          type="button"
          aria-label="مسح البحث"
          onClick={() => {
            input.current.value = "";
            setSearchTerm("");
          }}
          className="absolute left-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white cursor-pointer">
          <X size={12} />
        </button>
      )}
    </div>
  );

  const brand = (
    <div className="flex items-center gap-3">
      <img src="/image.png" alt="" className="h-11 w-11 shrink-0" />
      <div className="leading-tight">
        <p className="font-display text-lg font-bold text-white">
          مكتبة الهدى
        </p>
        <p className="text-xs text-white/55">نظام العمرة والحج</p>
      </div>
    </div>
  );

  return (
    <header className="print:hidden">
      {/* شريط جانبي — سطح المكتب */}
      <aside className="fixed right-0 top-0 z-40 hidden h-screen w-72 flex-col gap-8 bg-primary-800 px-5 py-7 md:flex">
        {brand}
        {searchBox}
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-auto border-t border-white/10 pt-4 text-xs text-white/40">
          عمرة مكتبة الهدى
        </p>
      </aside>

      {/* شريط علوي — الموبايل */}
      <div className="relative bg-primary-800 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          {brand}
          <button
            aria-label="القائمة"
            className="text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        <div className="mt-3">{searchBox}</div>

        {menuOpen && (
          <nav className="absolute left-0 top-full z-50 flex w-full flex-col gap-1 bg-primary-800 px-4 pb-4 shadow-lg">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
