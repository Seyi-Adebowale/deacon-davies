document.addEventListener("DOMContentLoaded", function () {
  const headerContainers = document.querySelectorAll(".header");
  const footerContainers = document.querySelectorAll(".footer");

  function loadHeader(container) {
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        const navLinks = container.querySelector("#navlinks");
        const menuBtnOpen = container.querySelector(".menu__btn--open");

        let isMenuOpen = false;

        function toggleMenu() {
          if (isMenuOpen) {
            hideMenu();
          } else {
            showMenu();
          }
          isMenuOpen = !isMenuOpen;
        }

        function showMenu() {
          navLinks.style.top = "80px";
        }

        function hideMenu() {
          navLinks.style.top = "-1000px";
        }

        menuBtnOpen.addEventListener("click", toggleMenu);

        const navLink = container.querySelectorAll("#navlinks ul li a");
        const currentPage = location.pathname;

        navLink.forEach((link) => {
          const linkText = link.innerHTML.trim();
          const linkPath = link.getAttribute("href");

          if (
            linkText === "Home" &&
            (currentPage === "/" || currentPage.includes("index"))
          ) {
            link.classList.add("selected");
          } else if (currentPage.includes(linkPath)) {
            link.classList.add("selected");
          } else {
            link.classList.remove("selected");
          }
        });
      })

      .catch((error) => {
        console.error("Error loading header:", error);
      });
  }

  function loadFooter(container) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }

  headerContainers.forEach((container) => {
    loadHeader(container);
  });

  footerContainers.forEach((container) => {
    loadFooter(container);
  });
});

var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
});
document
  .querySelector(".swiper-btn-next")
  .addEventListener("click", function () {
    swiper.slideNext();
  });

document
  .querySelector(".swiper-btn-prev")
  .addEventListener("click", function () {
    swiper.slidePrev();
  });
