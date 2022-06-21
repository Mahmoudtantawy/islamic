// // explore button
// let exploreBtn = document.querySelector("title .btn"),
//   HadithSection = document.querySelector(".hadith");
// exploreBtn.addEventListener("click", () => {
//   HadithSection.scrollIntoView({
//     behavior: "smooth",
//   });
// });

// header onscroll
let fixedNav = document.querySelector(".header");
let scrollBtn = document.querySelector(".scrollBtn");
window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");
  window.scrollY > 800
    ? scrollBtn.classList.add("active")
    : scrollBtn.classList.remove("active");
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// hadith changer
let hadithContainer = document.querySelector(".hadithContainer"),
  next = document.querySelector(".buttons .next"),
  prev = document.querySelector(".buttons .prev"),
  number = document.querySelector(".buttons .number");

let hadithindex = 0;

HadithChanger();
function HadithChanger() {
  fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then((response) => response.json())
    .then((data) => {
      let Hadiths = data.data.hadiths;

      changeHadith();
      next.addEventListener("click", () => {
        hadithindex == 299 ? (hadithindex = 0) : hadithindex++;
        changeHadith();
      });

      prev.addEventListener("click", () => {
        hadithindex == 0 ? (hadithindex = 299) : hadithindex--;
        changeHadith();
      });
      function changeHadith() {
        hadithContainer.innerText = Hadiths[hadithindex].arab;
        number.innerText = `300 - ${hadithindex + 1}`;
      }
    });
}

// link section
let sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// surah api
let surahsContainer = document.querySelector(".surhasContainer");
getSurahs();
function getSurahs() {
  // fetch surahs meta data (name of surahs)
  fetch("http://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      let surahs = data.data.surahs.references;
      let numberOfSurahs = 114;
      surahsContainer.innerHTML = "";
      for (let i = 0; i < numberOfSurahs; i++) {
        surahsContainer.innerHTML += `
          <div class="surah">
            <p>${surahs[i].name}</p>
            <p>${surahs[i].englishName}</p>
          </div>
        `;
      }
      let surahsTitels = document.querySelectorAll(".surah");
      let popup = document.querySelector(".surah-popup"),
        ayatContainer = document.querySelector(".ayat");
      surahsTitels.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              ayatContainer.innerHTML = "";
              let Ayat = data.data.ayahs;
              Ayat.forEach((aya) => {
                popup.classList.add("active");
                ayatContainer.innerHTML += `
                <p>(${aya.numberInSurah}) - ${aya.text}</p>
                `;
              });
            });
        });
      });
      let closePopup = document.querySelector(".close-popup");
      closePopup.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    });
}

// praytime api
let cards = document.querySelector(".cards");
prayTimes();
function prayTimes() {
  fetch(
    "http://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United Arab egypt&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerText = "";
      for (let time in times) {
        // console.log(time);
        // console.log(times[time]);
        cards.innerHTML += `
        <div class="card">
            <div class="circle">
              <svg>
                <circle cx="100" cy="100" r="100"></circle>
              </svg>
              <div class="praytime">${times[time]}</div>
            </div>
            <p>${time}</p>
          </div>
        `;
      }
    });
}

// active sidebar
let bars = document.querySelector(".bars"),
  sidebar = document.querySelector(".header ul");

bars.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
