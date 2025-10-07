import React, { useEffect, useState } from "react";
import { storage } from "../../utils/appwriteClient";
import { Query } from "appwrite";
import toast from "react-hot-toast";
import {
  AiOutlineEye,
  AiOutlineDownload,
  AiOutlineDelete,
  AiOutlineFilePdf,
} from "react-icons/ai";
import { motion } from "framer-motion";

export default function FileList({ refreshFlag, onDelete }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await storage.listFiles("68e3f68b0010d81f0045", [
          Query.limit(100),
          Query.offset(0),
        ]);
        if (response.files) setFiles(response.files);
      } catch (err) {
        console.error("خطأ عند جلب الملفات:", err);
        toast.error("حدث خطأ أثناء تحميل الملفات");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [refreshFlag]);

  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الملف؟");
    if (!confirmDelete) return;

    try {
      await storage.deleteFile("68e3f68b0010d81f0045", fileId);
      toast.success("تم حذف الملف بنجاح!");
      setFiles((prev) => prev.filter((f) => f.$id !== fileId));
      if (onDelete) onDelete();
    } catch (err) {
      console.error("خطأ عند حذف الملف:", err);
      toast.error("حدث خطأ أثناء حذف الملف");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 py-10 bg-[#FF8D4C]  rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
        📁 الجوازات PDF 
      </h2>

      {/* حالة التحميل */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#FF8D4C] rounded-full animate-spin mb-4"></div>
          <p>جاري تحميل الملفات...</p>
        </div>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-500 italic py-16">
          لا توجد ملفات بعد 📭
        </p>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((f, index) => {
            const viewUrl = storage.getFileView("68e3f68b0010d81f0045", f.$id);
            const downloadUrl = storage.getFileDownload(
              "68e3f68b0010d81f0045",
              f.$id
            );

            return (
              <motion.div
                key={f.$id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-[#FFF3EB] text-[#FF8D4C] rounded-full mb-4">
                  <AiOutlineFilePdf size={36} />
                </div>
                <h3 className="font-semibold text-gray-800 truncate w-full">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(f.$createdAt).toLocaleDateString("ar-SY")}
                </p>

                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href={viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="عرض الملف"
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                  >
                    <AiOutlineEye size={22} />
                  </a>
                  <a
                    href={downloadUrl}
                    download
                    title="تحميل الملف"
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                  >
                    <AiOutlineDownload size={22} />
                  </a>
                  <button
                    onClick={() => handleDelete(f.$id)}
                    title="حذف الملف"
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <AiOutlineDelete size={22} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
