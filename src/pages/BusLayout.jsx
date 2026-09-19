import React, { useEffect, useState } from "react";
import Seat from "../components/Seat/Seat";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";
import FilterTable from "../components/FilterTable/FilterTable";
import { BusFront, DoorOpen, Printer, ArrowLeftRight } from "lucide-react";
import { updateUser } from "../redux/slice/user/userSlice";
import {
  getBusCapacity,
  setBusCapacity,
  FIRST_ASSIGNABLE_SEAT,
  ALL_BUS_IDS,
} from "../utils/busCapacity";
import toast from "react-hot-toast";

const BusLayout = () => {
  const seatMap = {};
  const { id } = useParams();
  const otherBuses = ALL_BUS_IDS.filter((busId) => String(busId) !== id);
  const dispatch = useDispatch();

  const [omra, setOmra] = useState("");
  const { omras } = useSelector((state) => state.omraSlice);

  const [draggedSeat, setDraggedSeat] = useState(null);
  const [dragOverSeat, setDragOverSeat] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatsCount, setSeatsCount] = useState(() => getBusCapacity(id));

  useEffect(() => {
    setSeatsCount(getBusCapacity(id));
  }, [id]);

  const handleSeatsCountChange = (count) => {
    setSeatsCount(count);
    setBusCapacity(id, count);
  };

  useEffect(() => {
    if (omras?.length > 0) {
      setOmra(omras[0]?.name);
    }
  }, [omras]);

  // جعله تعليق من أجل باص فارغ

  const { data } = useSelector((state) => state.userSlice);

  let filteredData = data?.filter((ele) => ele.omra?.name === omra);

  filteredData?.forEach((p) => {
    if (p?.sitNumber && p.sitNumber.split(" - ")[1] == id) {
      const [n] = p.sitNumber.split(" - ");
      const seatNum = parseInt(n.trim());
      seatMap[seatNum] = { id: p._id, name: p.name };
    }
  });

  const moveToSeat = (seatNumber, sourceUserId, busId = id) => {
    const form = new FormData();
    form.append("sitNumber", `${seatNumber} - ${busId}`);
    dispatch(updateUser({ id: sourceUserId, data: form }));
  };

  const performSwap = (sourceSeat, targetSeat) => {
    if (sourceSeat == null || sourceSeat === targetSeat) return;

    const sourceOccupant = seatMap[sourceSeat];
    const targetOccupant = seatMap[targetSeat];
    if (!sourceOccupant) return;

    moveToSeat(targetSeat, sourceOccupant.id);
    if (targetOccupant) {
      moveToSeat(sourceSeat, targetOccupant.id);
    }
  };

  // ينقل المعتمر المحدد إلى أول مقعد شاغر في باص آخر محدد
  const transferToOtherBus = (sourceSeat, targetBusId) => {
    const occupant = seatMap[sourceSeat];
    if (!occupant) return;

    const occupiedInTargetBus = new Set(
      filteredData
        ?.filter((p) => p?.sitNumber && p.sitNumber.split(" - ")[1] == targetBusId)
        .map((p) => parseInt(p.sitNumber.split(" - ")[0].trim())),
    );

    const targetBusCapacity = getBusCapacity(targetBusId);
    let freeSeat = null;
    for (
      let seatNum = FIRST_ASSIGNABLE_SEAT;
      seatNum <= targetBusCapacity;
      seatNum++
    ) {
      if (!occupiedInTargetBus.has(seatNum)) {
        freeSeat = seatNum;
        break;
      }
    }

    if (freeSeat == null) {
      toast.error(`الباص ${targetBusId} ممتلئ، لا يوجد مقعد شاغر`);
      return;
    }

    moveToSeat(freeSeat, occupant.id, targetBusId);
    toast.success(
      `تم نقل ${occupant.name} إلى المقعد ${freeSeat} في الباص ${targetBusId}`,
    );
    setSelectedSeat(null);
  };

  const handleDropOnSeat = (targetSeat) => {
    setDragOverSeat(null);
    const sourceSeat = draggedSeat;
    setDraggedSeat(null);
    performSwap(sourceSeat, targetSeat);
  };

  // يدعم التبديل بالنقر (مقعد ثم مقعد آخر) كبديل عن السحب،
  // مفيد بين مقعدين بعيدين لا يظهران معاً على الشاشة دفعة واحدة
  const handleSeatClick = (number) => {
    if (selectedSeat == null) {
      if (seatMap[number]) setSelectedSeat(number);
      return;
    }
    if (selectedSeat === number) {
      setSelectedSeat(null);
      return;
    }
    performSwap(selectedSeat, number);
    setSelectedSeat(null);
  };

  const renderSeat = (number, key) => (
    <Seat
      key={key}
      number={number}
      person={seatMap[number]?.name}
      isDragOver={dragOverSeat === number}
      isBeingDragged={draggedSeat === number}
      isSelected={selectedSeat === number}
      onDragStart={setDraggedSeat}
      onDragOverSeat={setDragOverSeat}
      onDragLeaveSeat={() => setDragOverSeat(null)}
      onDragEnd={() => {
        setDraggedSeat(null);
        setDragOverSeat(null);
      }}
      onDrop={handleDropOnSeat}
      onSeatClick={handleSeatClick}
    />
  );

  // جعله تعليق من أجل باص فارغ

  // Seat pattern لباص 42 مقعد (المزدوج يمين، المفرد يسار)
  const allRows = [
    [3, [1, 2]],
    [6, [4, 5]],
    [9, [7, 8]],
    [12, [10, 11]],
    [15, [13, 14]],
    [18, [16, 17]],
    [21, [19, 20]],
    [22, ["_________", "_________"]],
    [23, ["_________", "_________"]],
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

  // Seat pattern لباص 38 مقعد (المفرد يمين، المزدوج يسار)
  // الترقيم يبدأ من المقعد المفرد ويستمر تصاعديًا يمين إلى يسار
  const rows38 = [
    [1, [2, 3]],
    [4, [5, 6]],
    [7, [8, 9]],
    [10, [11, 12]],
    [13, [14, 15]],
    [16, [17, 18]],
    [19, [20, 21]],
    [22, ["_________", "_________"]],
    [23, ["_________", "_________"]],
    [24, [25, 26]],
    [27, [28, 29]],
    [30, [31, 32]],
    [33, [34, 35]],
    [36, [37, 38]],
  ];

  const rows = seatsCount === 38 ? rows38 : allRows;

  return (
    <div className="p-3 sm:p-4 md:p-6 w-full flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3 print:hidden">
        <ButtonReverse text={"رجوع"} to={"/"}/>

        <div className="flex items-center gap-2 rounded-lg border-2 border-primary/40 p-1 flex-wrap">
          {ALL_BUS_IDS.map((busId) => (
            <NavLink
              key={busId}
              to={`/bus/${busId}`}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                }`
              }>
              <BusFront size={16} />
              الباص {busId}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-primary/90 px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-primary/50 transition-colors">
          <Printer size={18} />
          حفظ القائمة كملف PDF
        </button>
      </div>

      <div className="w-72 m-auto print:hidden">
        <FilterTable data={omras} setFunction={setOmra} value={omra} />
      </div>

      <div className="flex items-center justify-center gap-2 print:hidden">
        <span className="text-sm font-semibold text-neutral-600">عدد المقاعد:</span>
        <div className="flex rounded-lg overflow-hidden border-2 border-primary/40">
          {[38, 42].map((count) => (
            <button
              key={count}
              onClick={() => handleSeatsCountChange(count)}
              className={`px-4 py-1.5 text-sm font-bold transition-colors cursor-pointer ${
                seatsCount === count
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary/10"
              }`}>
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* الدليل */}
      <div className="flex flex-col items-center gap-2 print:hidden">
        <div className="flex items-center justify-center gap-6 flex-wrap text-sm font-semibold text-neutral-600">
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-md bg-gradient-to-b from-primary/20 to-primary/10 border-2 border-primary/40" />
            مقعد محجوز
          </span>
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-md bg-neutral-50 border-2 border-dashed border-neutral-300" />
            مقعد شاغر
          </span>
        </div>
        <p className="text-xs text-neutral-400 text-center">
          اسحب مقعدًا وأفلته على مقعد آخر لتبديل مكانه أو نقله، أو انقر على
          مقعد ثم انقر على آخر (مفيد بين مقعدين بعيدين لا يظهران معًا)
        </p>
      </div>

      {/* يبقى ظاهرًا أثناء التمرير للوصول إلى المقعد الهدف */}
      {selectedSeat != null && (
        <div className="sticky top-2 z-30 mx-auto flex w-fit flex-col items-center gap-2 print:hidden">
          <p className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg">
            تم تحديد المقعد {selectedSeat} — انقر على المقعد الذي تريد
            التبديل معه
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {otherBuses.map((busId) => (
              <button
                key={busId}
                onClick={() => transferToOtherBus(selectedSeat, busId)}
                className="flex items-center gap-2 rounded-full bg-neutral-900/90 px-4 py-2 text-sm font-bold text-white shadow-lg cursor-pointer hover:bg-neutral-900 transition-colors">
                <ArrowLeftRight size={16} />
                نقل إلى الباص {busId}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id="print-area" className="bus-print-area">
        <h2 className="bus-title font-display text-3xl md:text-5xl font-black m-7 text-center text-primary ">
          الباص {id}
        </h2>

        <div className="bus-frame mx-auto w-fit max-w-full overflow-x-auto rounded-3xl md:rounded-[2.5rem] border-4 border-neutral-200 bg-gradient-to-b from-neutral-50 to-white px-2 sm:px-6 md:px-10 py-5 md:py-8 shadow-inner">
          {/* مقدمة الباص */}
          <div className="bus-intro flex items-center justify-center gap-2 mb-4 md:mb-6 text-neutral-400">
            <DoorOpen size={18} />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">
              مقدمة الباص
            </span>
            <BusFront size={18} />
          </div>

          <div className="bus-rows flex flex-col gap-2 sm:gap-3 md:gap-4 items-center">
            {rows.map((row, idx) => {
              const [single, pair] = row;

              const singleBlock = Array.isArray(single) ? (
                <div className="bus-seat-group flex gap-1 sm:gap-2">
                  {renderSeat(single[0], `${idx}-single-0`)}
                  {renderSeat(single[1], `${idx}-single-1`)}
                </div>
              ) : (
                renderSeat(single, `${idx}-single`)
              );

              const pairBlock = Array.isArray(pair) && (
                <div className="bus-seat-group flex gap-1 sm:gap-2">
                  {renderSeat(pair[0], `${idx}-pair-0`)}
                  {renderSeat(pair[1], `${idx}-pair-1`)}
                </div>
              );

              const aisle = (
                <div className="bus-aisle w-2 sm:w-6 md:w-10 self-stretch border-l-2 border-dashed border-neutral-200" />
              );

              // في باص ال 38 مقعد فقط: الجهة المفردة يمين والمزدوجة يسار
              return (
                <div
                  key={idx}
                  className="bus-row flex gap-1.5 sm:gap-4 md:gap-8 items-center">
                  {seatsCount === 38 ? (
                    <>
                      {singleBlock}
                      {aisle}
                      {pairBlock}
                    </>
                  ) : (
                    <>
                      {pairBlock}
                      {aisle}
                      {singleBlock}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusLayout;
