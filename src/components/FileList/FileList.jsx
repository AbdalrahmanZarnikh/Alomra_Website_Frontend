import React, { useEffect, useState } from "react";
import { storage } from "../../utils/appwriteClient";
import {Query} from "appwrite"
import toast from "react-hot-toast";

export default function FileList({ refreshFlag, onDelete }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await storage.listFiles("68e3f68b0010d81f0045", [
          Query.limit(100),
          Query.offset(0),
        ]);
        if (response.files) setFiles(response.files);
      } catch (err) {
        console.error(" خطأ عند جلب الملفات:", err);
      }
    };
    fetchFiles();
  }, [refreshFlag]);

  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الملف؟");
    if (!confirmDelete) return;

    try {
      await storage.deleteFile("68e3f68b0010d81f0045", fileId);
      toast.success(" تم حذف الملف بنجاح!");
      setFiles(files.filter((f) => f.$id !== fileId));

      if (onDelete) onDelete(); // لإعادة تحميل القائمة إذا أردت
    } catch (err) {
      console.error(" خطأ عند حذف الملف:", err);
      toast.error("حدث خطأ أثناء حذف الملف");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">📚 الملفات المرفوعة</h2>
      {files.length === 0 && <p className="text-center text-gray-500">لا توجد ملفات بعد</p>}
      <ul className="space-y-4 text-left">
        {files.map((f) => {
          const viewUrl = storage.getFileView("68e3f68b0010d81f0045", f.$id);
          const downloadUrl = storage.getFileDownload("68e3f68b0010d81f0045", f.$id);

          return (
            <li
              key={f.$id}
              className="flex justify-between items-center p-3 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div>
                <p className="font-medium">📄 {f.name}</p>
                <div className="mt-1 space-x-4">
                  <a
                    href={viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    عرض الملف
                  </a>
                  <a
                    href={downloadUrl}
                    download
                    className="text-green-600 hover:underline font-medium"
                  >
                    تحميل
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleDelete(f.$id)}
                className="text-red-600 text-3xl font-bold hover:text-red-800 ml-4 cursor-pointer"
                title="حذف الملف"
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
