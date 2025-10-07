import React, { useState } from "react";
import { storage } from "../../utils/appwriteClient";
import toast from "react-hot-toast";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return toast.error("اختر ملف PDF أولاً");
    setUploading(true);

    try {
      const res = await storage.createFile(
        "68e3f68b0010d81f0045", // استبدل بالBucket ID الخاص بك
        "unique()",
        file
      );

      const viewUrl = storage.getFileView("68e3f68b0010d81f0045", res.$id);
      setUrl(viewUrl); // لا تستخدم .href لأن getFileView ترجع URL كسلسلة
      toast.success(" تم رفع الملف بنجاح!");
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error(" حدث خطأ أثناء رفع الملف");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">📤 رفع ملف PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-100 file:text-blue-700
                   hover:file:bg-blue-200"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 px-4 rounded-xl text-white font-semibold
                    ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
      >
        {uploading ? "جاري الرفع..." : "رفع الملف"}
      </button>

      {url && (
        <div className="mt-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            🔗 عرض الملف المرفوع
          </a>
        </div>
      )}
    </div>
  );
}
