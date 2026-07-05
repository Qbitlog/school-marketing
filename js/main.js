/* School OS — Marketing Website interactions */
(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".header");

  function updateHeaderShadow() {
    header.classList.toggle("header--scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  navToggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("nav--open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      nav.classList.remove("nav--open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });

  /* ---------- Contact form & package pre-selection ---------- */
  var contactForm = document.getElementById("contact-form");
  var contactSection = document.getElementById("contact");
  var packageSelect = document.getElementById("contact-package");
  var contactSuccess = document.getElementById("contact-success");
  var validPackages = ["demo", "starter", "growth", "premium", "enterprise"];

  function getPackageFromUrl() {
    var hash = window.location.hash || "";
    var hashMatch = hash.match(/[?&]package=([^&]+)/);
    if (hashMatch) {
      return decodeURIComponent(hashMatch[1]).toLowerCase();
    }

    var params = new URLSearchParams(window.location.search);
    var searchPackage = params.get("package");
    if (searchPackage) {
      return searchPackage.toLowerCase();
    }

    return null;
  }

  function isContactHash() {
    var hash = window.location.hash || "";
    return hash === "#contact" || hash.indexOf("#contact?") === 0;
  }

  function scrollToContact() {
    if (!contactSection) return;
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function applyPackageSelection() {
    if (!packageSelect) return;

    var selected = getPackageFromUrl();
    if (selected && validPackages.indexOf(selected) !== -1) {
      packageSelect.value = selected;
    }
  }

  function focusPackageField() {
    if (!packageSelect) return;
    packageSelect.focus({ preventScroll: true });
  }

  function navigateToContact(packageName) {
    var url = packageName
      ? "#contact?package=" + encodeURIComponent(packageName)
      : "#contact";

    if (window.location.hash !== url) {
      history.pushState(null, "", url);
    }

    if (packageSelect && packageName && validPackages.indexOf(packageName) !== -1) {
      packageSelect.value = packageName;
    } else {
      applyPackageSelection();
    }
  }

  function handleContactHash() {
    applyPackageSelection();

    if (!isContactHash()) return;

    scrollToContact();

    var selected = getPackageFromUrl();
    if (selected && validPackages.indexOf(selected) !== -1) {
      focusPackageField();
    }
  }

  document.querySelectorAll("a[data-package]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var selectedPackage = (link.getAttribute("data-package") || "").toLowerCase();
      if (selectedPackage && validPackages.indexOf(selectedPackage) === -1) {
        return;
      }

      navigateToContact(selectedPackage);
      scrollToContact();
    });
  });

  window.addEventListener("hashchange", handleContactHash);
  window.addEventListener("popstate", handleContactHash);

  if (isContactHash()) {
    requestAnimationFrame(function () {
      handleContactHash();
    });
  } else {
    applyPackageSelection();
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactForm.reset();
      if (contactSuccess) {
        contactSuccess.hidden = false;
      }

      setTimeout(function () {
        if (contactSuccess) {
          contactSuccess.hidden = true;
        }
      }, 6000);
    });
  }

  /* ---------- Testimonials carousel ---------- */
  var carousel = document.getElementById("testimonials-carousel");
  if (!carousel) return;

  var track = carousel.querySelector("[data-carousel-track]");
  var slides = track.children;
  var prevBtn = carousel.querySelector("[data-carousel-prev]");
  var nextBtn = carousel.querySelector("[data-carousel-next]");
  var dotsWrap = carousel.querySelector("[data-carousel-dots]");
  var current = 0;
  var autoTimer = null;
  var AUTO_DELAY = 5000;

  var dots = [];
  for (var i = 0; i < slides.length; i++) {
    (function (index) {
      var dot = document.createElement("button");
      dot.className = "testimonials__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to testimonial " + (index + 1));
      dot.addEventListener("click", function () {
        goTo(index);
        restartAuto();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    })(i);
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + current * 100 + "%)";
    dots.forEach(function (dot, i) {
      dot.classList.toggle("testimonials__dot--active", i === current);
      dot.setAttribute("aria-selected", String(i === current));
    });
  }

  function startAuto() {
    autoTimer = setInterval(function () {
      goTo(current + 1);
    }, AUTO_DELAY);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  prevBtn.addEventListener("click", function () {
    goTo(current - 1);
    restartAuto();
  });

  nextBtn.addEventListener("click", function () {
    goTo(current + 1);
    restartAuto();
  });

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);

  var touchStartX = 0;

  track.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.touches[0].clientX;
      stopAuto();
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    function (event) {
      var deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        goTo(deltaX < 0 ? current + 1 : current - 1);
      }
      startAuto();
    },
    { passive: true }
  );

  goTo(0);
  startAuto();
})();
