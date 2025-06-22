export const isArabic = (str: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(str);
};

export const getTextDirection = (text: string): "ltr" | "rtl" => {
  const trimmedText = text.trim();
  return trimmedText.length > 0 && isArabic(trimmedText[0]) ? "rtl" : "ltr";
};
