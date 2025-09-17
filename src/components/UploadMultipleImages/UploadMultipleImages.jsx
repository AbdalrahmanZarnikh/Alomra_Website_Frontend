import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { useParams } from "react-router-dom";



const UploadMultipleImages = ({ form, records }) => {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode && Array.isArray(records) && id) {
      const record = records.find((item) => item._id === id);
      if (record && Array.isArray(record.images)) {
        const urls = record.images.map((img) => img.url);
        setImages(urls);
      }
    }
  }, [id, isUpdateMode, records]);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      form.append("images", file);
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
    });
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);

  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div
        className="w-60 h-52 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer text-[#FF8D4C]"
        onClick={() => inputRef.current.click()}
      >
        <div className="flex flex-col items-center">
          <AiOutlineCloudUpload size={60} />
          <p>اضغط هنا لإدارج الصور</p>
        </div>
      </div>

      <input
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/gif"
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
          }
        }}
      />

      <div className="grid grid-cols-3 gap-2">
        {images.map((img, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={img}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover rounded"
            />
            <TiDelete
              size={20}
              className="absolute top-1 right-1 text-red-600 bg-white rounded-full cursor-pointer"
              onClick={() => removeImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadMultipleImages;
