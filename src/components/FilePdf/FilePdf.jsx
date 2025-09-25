import DownloadFile from "../DownloadFile/DownloadFile";

const FilePdf = ({url,name}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
       <img src="/image.png"/>
      <DownloadFile url={url} name={name} text="اضغط لتحميل الملف" />
      
    </div>
  );
};

export default FilePdf;
