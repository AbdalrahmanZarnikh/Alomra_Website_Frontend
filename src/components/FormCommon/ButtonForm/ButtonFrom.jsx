
const ButtonFrom = ({id,isLoading}) => {

  return (
    <button type="submit" className="submit-button m-auto cursor-pointer bg-primary">
      {typeof id == "string" ? "تعديل" : "اضافة"}
      {isLoading === "Pending" ? "..." : ""}
    </button>
  );
};

export default ButtonFrom;
