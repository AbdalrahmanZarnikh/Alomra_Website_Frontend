import React from "react";
import DownloadFile from "../DownloadFile/DownloadFile";

const Image = ({url,name}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <img src={url} className="w-20 h-20" alt="" />
      <DownloadFile url={url} name={name} />
    </div>
  );
};

export default Image;
