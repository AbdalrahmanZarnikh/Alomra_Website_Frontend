import { saveAs } from "file-saver";
import { ArrowDownCircleIcon, DownloadIcon } from "lucide-react";

const DownloadFile = ({ url, name }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(url, {
        mode: "cors",
      });

      if (!response.ok) throw new Error("فشل التحميل");

      const blob = await response.blob(); // نحصل على النوع الحقيقي من السيرفر
      saveAs(blob, name);
    } catch (error) {
      console.error("خطأ أثناء التحميل:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="text-sm bg-gray-700 text-white p-1 rounded-lg hover:bg-gray-400 cursor-pointer print:hidden"
      >
        <DownloadIcon/>
      </button>
    </div>
  );
};

export default DownloadFile;
