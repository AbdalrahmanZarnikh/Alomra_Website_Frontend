
const ButtonFrom = ({id,isLoading}) => {

  return (
    <button
      type="submit"
      className="col-span-full flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5
      text-base font-bold text-white shadow-sm transition-all cursor-pointer
      hover:bg-primary-700 active:scale-[0.98]">
      {typeof id == "string" ? "تعديل" : "اضافة"}
      {isLoading === "Pending" ? "..." : ""}
    </button>
  );
};

export default ButtonFrom;
