// import React from "react";
// const Seat = ({ number, person }) => {
//   return (
//     <div className="border rounded-xl p-2 w-60 h-20 flex flex-col items-center font-bold justify-center text-lg shadow">
//       {" "}
//       <p className="text-3xl text-primary">{number}</p> <p className="text-lg">{person}</p>{" "}
//     </div>
//   );
// };
// export default Seat;

import React from "react";

export default function Seat({ number, person }) {
  return (
    <div className="relative w-60 h-20 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-3xl shadow-2xl border-2 border-yellow-600 flex flex-col items-center justify-start overflow-hidden">
      {/* VIP Badge */}
      <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
        VIP
      </div>

      {/* Seat Number */}
      <p className="text-3xl font-extrabold text-yellow-800 mt-2 drop-shadow">
        {number}
      </p>

      {/* Person Name displayed on seat */}
      <p className="font-bold text-xl"> {person}</p>

    </div>
  );
}
