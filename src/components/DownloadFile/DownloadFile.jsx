import { saveAs } from "file-saver";

const DownloadFile = ({ url, name, text = "اضغط لتحميل الصورة" }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("فشل التحميل");

      const blob = await response.blob();
      saveAs(blob, name);
    } catch (error) {
      console.error("خطأ أثناء التحميل:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="text-sm bg-white p-2 rounded-lg hover:bg-white/50 cursor-pointer print:hidden"
      >
        {text}
      </button>
    </div>
  );
};

export default DownloadFile;
