import FileList from "../components/FileList/FileList";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";

const Test = () => {
  return (
    <div className="p-2 md:p-10">
      <ButtonReverse text={"رجوع"} to={"/"} />

      <FileList />
    </div>
  );
};

export default Test;
