import { Query } from "appwrite";
import { storage } from "./appwriteClient";
import { saveFiles } from "../redux/slice/category/omraSlice";
import toast from "react-hot-toast";


  const bucketId = "68e3f68b0010d81f0045";

  export const fetchFiles = async (dispatch) => {
    try {
      const response = await storage.listFiles(bucketId, [
        Query.limit(100),
        Query.offset(0),
      ]);

      if (response.files) {
        dispatch(saveFiles(response.files));
      }
    } catch (err) {
      console.error("خطأ عند جلب الملفات:", err);
      toast.error("حدث خطأ أثناء تحميل الملفات");
    } 
  };