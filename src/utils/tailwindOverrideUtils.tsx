export const TEXT_ALIGN_CLASSES = [
  "text-left",
  "text-center",
  "text-right",
  "text-justify",
];

export const removeTextAlignmentClasses = () => {
  document.body.classList.remove(...TEXT_ALIGN_CLASSES);
  document
    .querySelectorAll("h1, h2, h3, h4, h5, h6, span, p, div")
    .forEach((el) => {
      el.classList.remove(...TEXT_ALIGN_CLASSES);
    });
};
