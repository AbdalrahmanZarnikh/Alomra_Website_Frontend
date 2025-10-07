// appwriteClient.js
import { Client, Storage } from "appwrite";

// 🔧 ضع بيانات مشروعك هنا
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // أو http://localhost/v1 لو كنت تستخدم Appwrite محلي
  .setProject("68e3f64c000d61c410ee"); // من لوحة Appwrite

export const storage = new Storage(client);

