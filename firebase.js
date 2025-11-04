// firebase.js
import { initializeApp as initializeApp1 } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase as getDatabase1, ref as ref1, set as set1, push as push1 } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// ================= โปรเจกต์เดิม =================
const firebaseConfig1 = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};

// ================= โปรเจกต์ใหม่ =================
const firebaseConfig2 = {
  apiKey: "AIzaSyAy88t3sZ_OEoQP0jRxVYKOLG1gucvRGsg",
  authDomain: "fera-ergonomics.firebaseapp.com",
  databaseURL: "https://fera-ergonomics-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-ergonomics",
  storageBucket: "fera-ergonomics.firebasestorage.app",
  messagingSenderId: "111595993339",
  appId: "1:111595993339:web:80119030f63a850447985e",
  measurementId: "G-2T11CCPNY7"
};

// ====== Initialize ทั้งสองโปรเจกต์ ======
const app1 = initializeApp1(firebaseConfig1, "app1");
const app2 = initializeApp1(firebaseConfig2, "app2");

// ====== Database ของทั้งสองโปรเจกต์ ======
const db1 = getDatabase1(app1);
const db2 = getDatabase1(app2);

// ====== ฟังก์ชันบันทึกข้อมูลไปทั้งสองที่ ======
function saveToBoth(data) {
  const refA = push1(ref1(db1, "responses"));
  const refB = push1(ref1(db2, "responses"));

  // บันทึกไปทั้งสองฐาน
  const save1 = set1(refA, data);
  const save2 = set1(refB, data);

  return Promise.all([save1, save2]);
}

// ====== Export ให้ script.js ใช้ ======
export { db1 as db, ref1 as ref, set1 as set, push1 as push, saveToBoth };
