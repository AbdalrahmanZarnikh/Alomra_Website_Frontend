import { GripVertical, User } from "lucide-react";

export default function Seat({
  number,
  person,
  isDragOver = false,
  isBeingDragged = false,
  isSelected = false,
  onDragStart,
  onDragOverSeat,
  onDragLeaveSeat,
  onDragEnd,
  onDrop,
  onSeatClick,
}) {
  const isOccupied = Boolean(person);
  const isRealSeat = typeof number === "number";

  if (!isRealSeat) {
    return (
      <div className="bus-seat w-20 sm:w-32 md:w-72 h-14 sm:h-16 md:h-20 rounded-xl md:rounded-2xl border-2 border-dashed border-neutral-100" />
    );
  }

  return (
    <div
      draggable={isOccupied}
      onClick={() => onSeatClick?.(number)}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.(number);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverSeat?.(number);
      }}
      onDragLeave={() => onDragLeaveSeat?.(number)}
      onDragEnd={() => onDragEnd?.()}
      onDrop={(e) => {
        e.preventDefault();
        onDrop?.(number);
      }}
      className={`bus-seat relative w-20 sm:w-32 md:w-72 h-14 sm:h-16 md:h-20 rounded-xl md:rounded-2xl shadow-md border-2 flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 md:px-4 transition-all print:cursor-default ${
        isOccupied
          ? "bg-gradient-to-b from-primary/20 to-primary/10 border-primary/40 cursor-pointer active:cursor-grabbing"
          : "bg-neutral-50 border-dashed border-neutral-300 cursor-pointer"
      } ${isBeingDragged ? "opacity-40" : ""} ${
        isSelected
          ? "ring-4 ring-info scale-105"
          : isDragOver
            ? "ring-4 ring-primary scale-105"
            : ""
      }`}>
      {/* رقم المقعد */}
      <div
        className={`bus-seat-badge flex h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl font-extrabold text-[11px] sm:text-sm md:text-base ${
          isOccupied
            ? "bg-primary text-white"
            : "bg-neutral-200 text-neutral-500"
        }`}>
        {number}
      </div>

      {/* اسم الراكب أو حالة الشغور */}
      <div className="min-w-0 flex-1">
        {isOccupied ? (
          <p className="bus-seat-name truncate font-bold text-[10px] sm:text-xs md:text-base text-neutral-800">
            {person}
          </p>
        ) : (
          <p className="bus-seat-name flex items-center gap-1 text-[10px] sm:text-xs md:text-sm font-semibold text-neutral-400">
            <User size={12} className="hidden sm:block print:hidden" />
            شاغر
          </p>
        )}
      </div>

      {/* مقبض السحب */}
      {isOccupied && (
        <GripVertical
          size={14}
          className="shrink-0 text-primary/40 print:hidden hidden sm:block"
        />
      )}
    </div>
  );
}
