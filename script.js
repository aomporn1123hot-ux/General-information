import { db, ref, set, push } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  let current = 0;
  pages[current].classList.add("active");

  function showPage(i) {
    pages[current].classList.remove("active");
    current = i;
    pages[current].classList.add("active");
    validatePage();
  }

  function validatePage() {
    const nextBtn = pages[current].querySelector(".next, .submit");
    if (!nextBtn) return;
    const selected = pages[current].querySelector(".option.selected");
    nextBtn.disabled = !selected;
  }

  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      const group = opt.dataset.group;
      document.querySelectorAll(`.option[data-group="${group}"]`).forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      validatePage();
    });
  });

  document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => showPage(current + 1)));
  document.querySelectorAll(".prev").forEach(btn => btn.addEventListener("click", () => showPage(current - 1)));

  document.querySelector(".submit").addEventListener("click", async () => {
    const data = {};
    document.querySelectorAll(".option.selected").forEach(opt => {
      data[opt.dataset.group] = opt.dataset.value;
    });
    data.timestamp = new Date().toISOString();

    try {
      const newRef = push(ref(db, "responses"));
      await set(newRef, data);
      showPage(current + 1);
    } catch (err) {
      console.error("Error saving to Firebase:", err);
      alert("Failed to save data");
    }
  });

  validatePage();
});
