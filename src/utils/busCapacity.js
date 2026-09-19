const STORAGE_KEY = "busCapacities";

// أرقام الباصات المستخدمة في النظام حاليًا
export const ALL_BUS_IDS = [1, 2, 3, 4, 5];

export const DEFAULT_BUS_CAPACITY = 42;

// المقاعد 1-6 محجوزة، أول مقعد قابل للتعيين هو رقم 7
export const FIRST_ASSIGNABLE_SEAT = 7;

export const getBusCapacities = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getBusCapacity = (busId) => {
  const capacities = getBusCapacities();
  return capacities[busId] || DEFAULT_BUS_CAPACITY;
};

export const setBusCapacity = (busId, capacity) => {
  const capacities = getBusCapacities();
  capacities[busId] = capacity;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(capacities));
};
