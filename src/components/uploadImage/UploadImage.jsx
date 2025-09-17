import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useParams } from "react-router-dom";


const UploadImage = ({ form, type, records }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");


  const { id } = useParams();

  const isUpdateMode = typeof id === "string";

  
useEffect(() => {
  if (isUpdateMode && Array.isArray(records) && id) {
    const record = records.find((item) => item._id === id);

    if (record && record[type] && record[type].url) {
      setImage(record[type].url);
    }
  }
}, [id, isUpdateMode, records, type]);


  return (
    <div className="flex justify-center items-center cursor-pointer">
      <div className="bg-white rounded-lg w-60 p-2 flex flex-col justify-center items-center">
        <div
          className="w-full h-52 rounded-lg border-dashed border-2 border-gray-400 text-[#FF8D4C] flex justify-center items-center overflow-hidden"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          {image ? (
            <img className="w-full object-contain " src={image} />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <AiOutlineCloudUpload size={60} className="text-[#FF8D4C]" />
              Browse Image To Upload
            </div>
          )}
        </div>
        <div className="w-full mt-2 ">
          <div className="w-full flex justify-between items-center bg-[#FF8D4C] p-2 rounded-lg gap-4">
            <FaRegFileImage
              size={20}
              className="text-black hover:text-gray-300"
              onClick={() => {
                inputRef.current.click();
              }}
            />
            <TiDelete
              size={20}
              className="hover:bg-white hover:text-red-600 rounded-full"
              onClick={() => {
                inputRef.current.value = "";
                setImage("");
              }}
            />
          </div>
        </div>

        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          ref={inputRef}
          onChange={(e) => {
            if (e.target && e.target.files.length > 0) {
              const file = e.target.files[0];
              setImage(URL.createObjectURL(file));
              form.append(
                `${
                  type == "image" ? "image" : type == "photo" ? "photo" : "icon"
                }`,
                file
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default UploadImage;
