// Шаблон, если будут нужны будут нужны разные стили для ПК и мобильных устройств (с тачпадом)

("use strict");

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  // document.body.classList.add("_touch");
  // const menuItemServices = document.querySelector(".menu__item-services");
  const menuLinkChevron = document.querySelector(".menu__link-chevron");
  const menuSubMenu = document.querySelector(".menu__sub-menu");

  document.addEventListener("click", showHeaderSubMenu);

  function showHeaderSubMenu(event) {
    if (!event.target.closest(".menu__item-services")) {
      menuSubMenu.classList.remove("_open");
      menuLinkChevron.classList.remove("_rotated");
    } else if (event.target !== menuSubMenu) {
      menuSubMenu.classList.toggle("_open");
      menuLinkChevron.classList.toggle("_rotated");
    }
  }
}
// else {
//   document.body.classList.add("_pc");
// }

// ======= intro popup video ====== //
// Открытие и закрытие окна

const introPlayVideoBtn = document.querySelector(".intro__play-video-btn");
const popupVideoClose = document.querySelector(".popup-video__close");
const popupVideo = document.querySelector(".popup-video");
const popupVideoVideo = document.querySelector(".popup-video__video");
const body = document.querySelector("body");

introPlayVideoBtn.addEventListener("click", openPopup);
popupVideoClose.addEventListener("click", closePopup);
popupVideo.addEventListener("click", closePopup2);
document.addEventListener("keydown", closePopup3);

function openPopup() {
  popupVideo.classList.add("_open-popup");
  body.classList.add("_lock");
  popupVideoVideo.contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    "*"
  );
}

function closePopup() {
  popupVideo.classList.remove("_open-popup");
  body.classList.remove("_lock");
  popupVideoVideo.contentWindow.postMessage(
    '{"event":"command","func":"pauseVideo","args":""}',
    "*"
  );
}

function closePopup2(event) {
  if (!event.target.closest(".popup-video__content")) {
    popupVideo.classList.remove("_open-popup");
    body.classList.remove("_lock");
    popupVideoVideo.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }
}

function closePopup3(event) {
  if (event.code == "Escape") {
    popupVideo.classList.remove("_open-popup");
    body.classList.remove("_lock");
    popupVideoVideo.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }
}

// ========== gsap - circles animation ========== //

gsap.registerPlugin(ScrollTrigger);

const circle = document.querySelectorAll(".progress-ring__circle");

let circumference;

circle.forEach(function (item) {
  const radius = item.r.baseVal.value;
  circumference = 2 * Math.PI * radius;
  item.style.strokeDasharray = `${circumference} ${circumference}`;
  item.style.strokeDashoffset = circumference;
  gsap.to(item, {
    scrollTrigger: {
      trigger: ".achievements__item-top",
      start: "bottom bottom",
    },
    strokeDashoffset: setProgress(item.dataset.percent),
    duration: 3,
  });
});

function setProgress(percent) {
  return circumference - (percent / 100) * circumference;
}

gsap.from(".achievements__number span", {
  scrollTrigger: {
    trigger: ".achievements__item-top",
    start: "bottom bottom",
  },
  innerText: 0,
  duration: 10,
  snap: { innerText: 1 },
  duration: 3,
});

// ======== services tabs ======= //

const servicesTabButtonAll = document.querySelectorAll(".services__tab-button");
const servicesContent = document.querySelectorAll(".services__content");

servicesTabButtonAll.forEach((item) => {
  item.addEventListener("click", openServicePage);
});

function openServicePage(event) {
  for (let i = 0; i < servicesTabButtonAll.length; i++) {
    servicesTabButtonAll[i].classList.remove("_active");
  }

  event.target.classList.add("_active");

  for (let item of servicesContent) {
    item.classList.add("_hidden");
    if (item.dataset.service === event.target.id) {
      item.classList.remove("_hidden");
    }
  }
}

// ========= faq-spoilers ======== //

const faqQuestionAll = document.querySelectorAll(".faq__question");
const faqQuestionBlockAll = document.querySelectorAll(".faq__question-block");
const faqAnswerAll = document.querySelectorAll(".faq__answer");

faqQuestionAll.forEach((item) => {
  if (item.classList.contains("_active")) {
    const faqAnswer = item
      .closest(".faq__question-block")
      .querySelector(".faq__answer");
    const faqAnswerHeight = faqAnswer.scrollHeight + "px";
    faqAnswer.style = `margin-top: 0.75rem; max-height: ${faqAnswerHeight}`;
  }
});

faqQuestionBlockAll.forEach((item) => {
  item.addEventListener("click", showAnswer);
});

function showAnswer() {
  faqQuestionAll.forEach((item) => {
    item.classList.remove("_active");
  });
  faqAnswerAll.forEach((item) => {
    item.style = "";
  });
  this.querySelector(".faq__question").classList.add("_active");
  const faqAnswer = this.querySelector(".faq__answer");
  const faqAnswerHeight = faqAnswer.scrollHeight + "px";
  faqAnswer.style = `margin-top: 0.75rem; max-height: ${faqAnswerHeight}`;
}

// ========== client-case swiper ========== //

const swiperClientCase = new Swiper(".client-case__items", {
  navigation: {
    nextEl: ".client-case__swiper-button-next",
    prevEl: ".client-case__swiper-button-prev",
  },

  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,

  keyboard: {
    enabled: true,
  },

  breakpoints: {
    767.98: {
      spaceBetween: 25,
      slidesPerView: 2,
    },
    1199.98: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
  },
});

// ========== prices-button__period ========== //
// pricing-plan - переключение month/year

let pricesButtonPeriod = document.querySelectorAll(".prices__button-period");

pricesButtonPeriod = Array.from(pricesButtonPeriod);

const pricePlanPriceNumber = document.querySelectorAll(
  ".price-plan__price-number"
);

const pricePlanPriceText = document.querySelectorAll(".price-plan__price-text");

pricesButtonPeriod.forEach(function (item) {
  item.addEventListener("click", changePeriod);
});

function changePeriod(event) {
  for (let i = 0; i < pricesButtonPeriod.length; i++) {
    pricesButtonPeriod[i].classList.remove("_active");
  }

  event.currentTarget.classList.add("_active");

  if (pricesButtonPeriod.indexOf(event.currentTarget) === 0) {
    for (const item of pricePlanPriceNumber) {
      item.innerText = item.dataset.price1;
    }
    for (const item of pricePlanPriceText) {
      item.innerText = item.dataset.period1;
    }
  } else {
    for (const item of pricePlanPriceNumber) {
      item.innerText = item.dataset.price2;
    }
    for (const item of pricePlanPriceText) {
      item.innerText = item.dataset.period2;
    }
  }
}

// ========== testimonials-swiper ========= //

const testimonialsSwiper = new Swiper(".testimonials__swiper", {
  navigation: {
    nextEl: ".testimonials__swiper-button-next",
    prevEl: ".testimonials__swiper-button-prev",
  },
  spaceBetween: 20,
  slidesPerView: 1,
  slidesPerGroup: 1,
  keyboard: {
    enabled: true,
  },
});
