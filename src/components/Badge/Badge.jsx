const SIZE_CLASSES = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1 text-xs md:text-sm",
  lg: "px-3 py-1 text-xs md:text-base",
};

const Badge = ({ children, className = "", size = "md" }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-md font-bold ring-1 ring-inset ring-current/15 ${SIZE_CLASSES[size]} ${className}`}>
    {children}
  </span>
);

export default Badge;
