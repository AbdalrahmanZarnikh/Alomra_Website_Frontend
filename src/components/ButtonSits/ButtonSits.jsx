// import React from "react";

// const ButtonSits = ({ data }) => {
//   const handleClick = (forword) => {
//     data.forEach((ele) => {
//       const numberSit = +ele.sitNumber.split(" - ")[0];

//       if (forword) {
//         if (numberSit !== 21 && numberSit !== 22) {
//           ele.sitNumber = `${ele.sitNumber.split(" - ")[1]} - ${numberSit - 3}`;
//         } else {
//           ele.sitNumber = `${ele.sitNumber.split(" - ")[1]} - ${numberSit - 1}`;
//         }
//       } else {
//         if (numberSit !== 21 && numberSit !== 22) {
//           ele.sitNumber = `${ele.sitNumber.split(" - ")[1]} - ${numberSit + 3}`;
//         } else {
//           ele.sitNumber = `${ele.sitNumber.split(" - ")[1]} - ${numberSit + 1}`;
//         }
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col justify-start items-start gap-2">
//       <button
//         onClick={() => {
//           handleClick(false);
//         }}
//         className="bg-primary rounded-lg p-2 text-white hover:bg-primary/50 cursor-pointer">
//         الإزاحة مقعد واحد إلى الخلف
//       </button>
//       <button
//         onClick={() => {
//           handleClick(true);
//         }}
//         className="bg-primary rounded-lg p-2 text-white hover:bg-primary/50 cursor-pointer">
//         الإزاحة مقعد واحد إلى الأمام
//       </button>
//     </div>
//   );
// };

// export default ButtonSits;
