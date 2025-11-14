// utils/contactUtils.js

// دالة لإنشاء vCard
export const generateVCard = (user) => {
  // تنظيف البيانات
  const name = (user.name || "مستخدم").trim();
  const omra= user.omra.name;
  const phone = (user.phone || "").replace(/\D/g, "");

  const newOmra=name +" "+ omra;
  // بناء vCard بصيغة صحيحة
  const vCard = `BEGIN:VCARD
VERSION:3.0
N:;${newOmra};;;
FN:${newOmra}
TEL;TYPE=CELL,VOICE:${phone}
REV:${new Date().toISOString()}
END:VCARD`;

  return vCard;
};

// دالة لتحميل جهة اتصال واحدة
export const downloadVCard = (user) => {
  try {
    const vCardContent = generateVCard(user);

    // إنشاء ملف vCard
    const blob = new Blob([vCardContent], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // تحرير الذاكرة
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    return true;
  } catch (error) {
    console.error("خطأ في إنشاء ملف جهة الاتصال:", error);
    alert("حدث خطأ في إنشاء ملف جهة الاتصال");
    return false;
  }
};

// دالة لتحميل جميع جهات الاتصال
export const downloadAllVCards = (users) => {
  try {
    let allVCards = "";

    users.forEach((user) => {
      allVCards += generateVCard(user) + "\n";
    });

    const blob = new Blob([allVCards], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "جهات_الاتصال.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    return true;
  } catch (error) {
    console.error("خطأ في إنشاء الملف:", error);
    alert("حدث خطأ في إنشاء ملف جهات الاتصال");
    return false;
  }
};
