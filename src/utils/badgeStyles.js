const ROOM_TYPE_STYLES = {
  رباعية: "bg-success-light text-success",
  ثلاثية: "bg-info-light text-info",
  ثنائية: "bg-danger-light text-danger",
  خاصة: "bg-neutral-200 text-neutral-800",
};

export const roomTypeClass = (type) => ROOM_TYPE_STYLES[type] ?? "bg-warning-light text-warning";

export const statusClass = (isTrue) =>
  isTrue ? "bg-success-light text-success" : "bg-danger-light text-danger";
