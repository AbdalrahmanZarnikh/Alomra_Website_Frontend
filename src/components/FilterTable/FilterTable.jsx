import { ChevronDown } from "lucide-react";

const FilterTable = ({ data, setFunction, value }) => {
  return (
    <div className="w-full md:w-auto">
      {data?.length > 0 && (
        <div className="relative mb-5">
          <select
            className="w-full appearance-none rounded-lg border border-neutral-300 bg-white px-4 py-2.5 pr-4 pl-9 text-right text-sm font-semibold text-neutral-800 transition-colors cursor-pointer hover:border-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={value}
            onChange={(e) => setFunction(e.target.value)}
          >
            {data.map((ele, index) => {
              if (ele?.name) {
                return (
                  <option
                    key={ele._id ?? `${ele.name}-${index}`}
                    value={ele.name}
                  >
                    {ele.name}
                  </option>
                );
              }
              return (
                <option key={`${String(ele)}-${index}`} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        </div>
      )}
    </div>
  );
};

export default FilterTable;
