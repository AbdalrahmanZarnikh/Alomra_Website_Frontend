import React from "react";

const PopUp = ({msg,children}) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-xl mb-4">{msg}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
