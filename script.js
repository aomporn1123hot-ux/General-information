// script.js
import { db, ref, set, push } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  let current = 0;
  const totalSteps = pages.length - 1;
  pages[current].classList.add("active");

  function showPage(i) {
    pages[current].classList.remove("active");
    current = i;
    pages[current].classList.add("active");
    updateProgress();
    validatePage();
  }

  function updateProgress() {
    const percent = (current / (totalSteps - 1)) * 100;
    const seed = document.getElementById("progressSeed");
    const fill = document.getElementById("progressFill");

    seed.style.left = percent + "%";
    fill.style.width = percent + "%";

    if (current === 0) seed.textContent = "🌱";
    else if (current < totalSteps - 2) seed.textContent = "🌿";
    else seed.textContent = "🌳";
  }

  function validatePage() {
    const nextBtn = pages[current].querySelector(".next, .submit");
    if (!nextBtn) return;

    let valid = false;
    switch (current) {
      case 0:
        valid = !!document.querySelector(".option[data-group='gender'].selected");
        break;
      case 1:
        valid = !!pages[current].querySelector("input").value;
        break;
      case 2:
        const diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
        if (diseaseOpt) {
          valid = diseaseOpt.dataset.value === "Yes" ? !!document.getElementById("disease-text").value : true;
        }
        break;
      case 3:
        valid = !!pages[current].querySelector("input").value;
        break;
      case 4:
        valid = !!pages[current].querySelector("input").value;
        break;
      case 5:
        const workOpt = document.querySelector(".option[data-group='worktype'].selected");
        if (workOpt) {
          if (workOpt.dataset.value === "Rice Farming") valid = true;
          else valid = !!document.querySelector(".workimg.selected");
        }
        break;
      default:
        valid = true;
    }
    nextBtn.disabled = !valid;
  }

  document.querySelectorAll("input").forEach(inp => inp.addEventListener("input", validatePage));
  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      const group = opt.dataset.group;
      document.querySelectorAll(`.option[data-group="${group}"]`).forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      if (group === "disease") {
        document.getElementById("disease-detail").classList.toggle("hidden", opt.dataset.value !== "Yes");
      }

      if (group === "worktype") {
        const container = document.getElementById("work-images");
        container.innerHTML = "";
        if (opt.dataset.value === "Rice Farming") {
          container.innerHTML = `<img src="1.png" class="workimg" style="pointer-events:none;">`;
        } else if (opt.dataset.value === "Field Farming") {
          container.innerHTML = `<img src="S.png" class="workimg"><img src="R.png" class="workimg"><img src="C.png" class="workimg">`;
        } else if (opt.dataset.value === "Gardening") {
          container.innerHTML = `<img src="V.png" class="workimg"><img src="T.png" class="workimg">`;
        }

        document.querySelectorAll(".workimg").forEach(img => {
          if (opt.dataset.value !== "Rice Farming") {
            img.addEventListener("click", () => {
              document.querySelectorAll(".workimg").forEach(i => i.classList.remove("selected"));
              img.classList.add("selected");
              validatePage();
            });
          }
        });
      }

      validatePage();
    });
  });

  document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => showPage(current + 1)));
  document.querySelectorAll(".prev").forEach(btn => btn.addEventListener("click", () => showPage(current - 1)));

  document.querySelector(".submit").addEventListener("click", () => {
    const gender = document.querySelector(".option[data-group='gender'].selected")?.dataset.value || "";
    const age = document.getElementById("age").value || "";
    const diseaseOpt = document.querySelector(".option[data-group='disease'].selected");
    const disease = diseaseOpt ? diseaseOpt.dataset.value : "";
    const diseaseText = disease === "Yes" ? document.getElementById("disease-text").value : "";
    const exp = document.getElementById("exp").value || "";
    const workhours = document.getElementById("workhours").value || "";
    const worktype = document.querySelector(".option[data-group='worktype'].selected")?.dataset.value || "";
    const workimg = document.querySelector(".workimg.selected")?.src || "";

    const data = {
      gender,
      age,
      disease,
      diseaseText,
      exp,
      workhours,
      worktype,
      workimg,
      timestamp: new Date().toISOString()
    };

    const newRef = push(ref(db, "responses"));
    set(newRef, data)
      .then(() => {
        showPage(current + 1);
      })
      .catch(err => {
        console.error("Error ❌", err);
        alert("Failed to save data");
      });
  });

  const feraBtn = document.getElementById("feraBtn");
  if (feraBtn) {
    feraBtn.addEventListener("click", () => {
      window.open("https://aomporn1123hot-ux.github.io/Risk-Assessment/", "_blank");
    });
    feraBtn.addEventListener("mouseover", () => feraBtn.style.transform = "scale(1.05)");
    feraBtn.addEventListener("mouseout", () => feraBtn.style.transform = "scale(1)");
  }

  updateProgress();
  validatePage();
});
