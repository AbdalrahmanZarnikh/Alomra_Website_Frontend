import React from "react";
import Seat from "../components/Seat/Seat";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";

export default function Bus() {
  const { data } = useSelector((state) => state.userSlice);
  const { id } = useParams();
  const seatMap = {};
  data?.forEach((p) => {
    if (p?.sitNumber && p.sitNumber.split(" - ")[1] == id) {
      const [n] = p.sitNumber.split(" - ");
      const seatNum = parseInt(n.trim());
      seatMap[seatNum] = p.name;
    }
  });


  // Seat pattern
  const rows = [
    [3, [1, 2]],
    [6, [4, 5]],
    [9, [7, 8]],
    [12, [10, 11]],
    [15, [13, 14]],
    [18, [16, 17]],
    [21, [19, 20]],
    [22, ["__", "__"]],
    [23, ["__", "__"]],
    [26, [24, 25]],
    [29, [27, 28]],
    [32, [30, 31]],
    [35, [33, 34]],
    [38, [36, 37]],

    // last row special case
    [
      [41, 42],
      [39, 40],
    ],
  ];

  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <ButtonReverse text={"رجوع"} />

      <h1
        className="mb-4 bg-primary/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-primary/50"
        onClick={() => window.print()}>
        حفظ القائمة كملف PDF
      </h1>

      <div id="print-area">
        <h2 className="text-2xl font-bold mb-4 text-center">
          مخطط مقاعد الحافلة
        </h2>

        <div className="flex flex-col gap-4 items-center">
          {rows.map((row, idx) => {
            const [single, pair] = row;

            return (
              <div key={idx} className="flex gap-10 items-center">
                {/* RIGHT side */}
                <div className="flex gap-2 ml-20">
                  <Seat number={pair[0]} person={seatMap[pair[0]]} />
                  <Seat number={pair[1]} person={seatMap[pair[1]]} />
                </div>

                {/* LEFT (single or double) */}
                {Array.isArray(single) ? (
                  <div className="flex gap-2">
                    <Seat number={single[0]} person={seatMap[single[0]]} />
                    <Seat number={single[1]} person={seatMap[single[1]]} />
                  </div>
                ) : (
                  <Seat number={single} person={seatMap[single]} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
