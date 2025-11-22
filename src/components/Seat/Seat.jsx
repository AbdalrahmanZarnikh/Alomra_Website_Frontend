// import React from 'react'

// const Seat = ({ number, person }) => {
//   return (
//     <div className="relative w-28 h-40 flex flex-col items-center select-none">
//       {/* Headrest (front-facing) */}
//       <div className="w-20 h-6 bg-blue-700 rounded-t-xl shadow-md -mb-1"></div>

//       {/* Backrest (front-facing padding) */}
//       <div className="w-full h-20 bg-gradient-to-b from-blue-500 to-blue-600 rounded-md border-2 border-blue-700 flex items-center justify-center shadow-lg">
//         <p className="text-white font-bold text-xl drop-shadow-md">{number}</p>
//       </div>

//       {/* Cushion */}
//       <div className="w-full h-14 bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-blue-600 flex flex-col items-center justify-center rounded-b-2xl shadow-md">
//         <p className="text-sm font-semibold text-gray-700">{person}</p>
//       </div>

//       {/* Legs */}
//       <div className="absolute bottom-0 left-3 w-3 h-5 bg-blue-700 rounded-b-md shadow"></div>
//       <div className="absolute bottom-0 right-3 w-3 h-5 bg-blue-700 rounded-b-md shadow"></div>

//       {/* Side Curve (bus seat style) */}
//       <div className="absolute -left-2 top-6 w-2 h-20 bg-blue-700 rounded-l-full"></div>
//       <div className="absolute -right-2 top-6 w-2 h-20 bg-blue-700 rounded-r-full"></div>
//     </div>
//   )
// }

// export default Seat

import React from "react";
const Seat = ({ number, person }) => {
  return (
    <div className="border rounded-xl p-2 w-60 h-20 flex flex-col items-center font-bold justify-center text-lg shadow">
      {" "}
      <p className="text-3xl text-primary">{number}</p> <p className="text-lg">{person}</p>{" "}
    </div>
  );
};
export default Seat;
