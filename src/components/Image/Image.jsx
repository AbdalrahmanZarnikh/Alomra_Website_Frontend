import React from "react";
import DownloadFile from "../DownloadFile/DownloadFile";

const Image = ({url,name}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 print:hidden">
      <img src={url} className="w-15 h-15" alt="" />
      <DownloadFile url={url} name={name} />
    </div>
  );
};

export default Image;
