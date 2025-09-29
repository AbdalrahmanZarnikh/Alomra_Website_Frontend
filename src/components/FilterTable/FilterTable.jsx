

const FilterTable = ({ data, setFunction, value }) => {
  return (
    <div>
      {data?.length > 0 && (
        <select
          className="mb-5 p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
          value={value}
          onChange={(e) => setFunction(e.target.value)}
        >
          {data.map((ele) => {
            if (ele.name) {
              return (
                <option key={ele.name} value={ele.name}>
                  {ele.name}
                </option>
              );
            } else {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            }
          })}
        </select>
      )}
    </div>
  );
};

export default FilterTable;
