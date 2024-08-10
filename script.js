const imgOverlay = document.querySelectorAll(".img-overlay");
const section = document.querySelectorAll(".section");
const textOverlay = document.querySelectorAll(".text-overlay");
const container = document.querySelector(".container");
const header = document.querySelector("header");

let lastScroll = 0;
// console.log("prevScrollpos" + " " + prevScrollpos);

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (lastScroll > currentScrollPos) {
    document.querySelector("header").style.top = "0";
  } else {
    //5 > 4
    document.querySelector("header").style.top = "-80px";
  }
  lastScroll = currentScrollPos; //5
};

let containerObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        header.classList.add("header");
      } else {
        header.classList.remove("header");
      }
    });
  },
  { root: null, threshold: 0, rootMargin: "-200px" }
);
containerObserver.observe(container);
let sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0,
  }
);
section.forEach((sec) => {
  sectionObserver.observe(sec);
});

let imageObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((img) => {
      //console.log(img.target);

      if (img.isIntersecting) {
        img.target.src = img.target.dataset.src;
        img.target.addEventListener("load", function () {
          img.target.classList.add("view");
        });
      }
    });
  },
  { root: null, threshold: 0 }
);
imgOverlay.forEach((img) => imageObserver.observe(img));

let textObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((text) => {
      if (text.isIntersecting) {
        text.target.classList.add("view-text");
      }
    });
  },
  { root: null, threshold: 0 }
);
textOverlay.forEach((text) => textObserver.observe(text));
