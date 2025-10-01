import { useNavigate } from "react-router-dom";

const ButtonReverse = ({ text, to = -1 }) => {
  const navigate = useNavigate();
  return (
    <div
      className="mb-4  bg-[#FF8D4C]/90 w-fit p-2 rounded-lg text-white cursor-pointer hover:bg-[#FF8D4C]/50"
      onClick={() => {
        navigate(to);
      }}
    >
      {text}
    </div>
  );
};

export default ButtonReverse;
