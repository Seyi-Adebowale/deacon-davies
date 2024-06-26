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
            resumeSlideshow(); // Resume the slideshow when menu is closed
          } else {
            showMenu();
            pauseSlideshow(); // Pause the slideshow when menu is opened
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

        const nav = document.querySelectorAll("#navlinks ul li a");
        for (let i = 0; i < nav.length; i++) {
          if (
            nav[i].innerHTML.includes("Home") &&
            (location.pathname === "/" || location.pathname.includes("index"))
          ) {
            nav[0].classList.add("selected");
          } else if (
            nav[i].innerHTML.includes("About") &&
            location.pathname.includes("about")
          ) {
            nav[i].classList.add("selected");
          } else if (
            nav[i].innerHTML.includes("Media") &&
            location.pathname.includes("media")
          ) {
            nav[i].classList.add("selected");
          } else if (
            nav[i].innerHTML.includes("Downloads") &&
            location.pathname.includes("downloads")
          ) {
            nav[i].classList.add("selected");
          } else if (
            nav[i].innerHTML.includes("Contact") &&
            location.pathname.includes("contact")
          ) {
            nav[i].classList.add("selected");
          } else if (
            nav[i].innerHTML.includes("Give") &&
            location.pathname.includes("give")
          ) {
            nav[i].classList.add("selected");
          } else {
            nav[i].classList.remove("selected");
          }
        }

        const dropdownToggle = document.querySelector(".dropdown-toggle");
        const dropdownContent = document.querySelector(".dropdown-content");

          // Function to show dropdown content
          function showDropdown() {
            dropdownContent.style.display = "block";
          }

          // Function to hide dropdown content
          function hideDropdown() {
            dropdownContent.style.display = "none";
          }

        // Function to toggle visibility of dropdown content
        function toggleDropdown() {
          // Check if dropdown content is currently visible
          const isDropdownVisible = dropdownContent.style.display === "block";

        

          // Toggle the visibility based on its current state
          if (isDropdownVisible) {
            hideDropdown();
          } else {
            showDropdown();
          }
        }

        // Toggle dropdown content when clicking the toggle button
        dropdownToggle.addEventListener("click", function (e) {
          e.preventDefault();
          toggleDropdown();
        });

        // Close the dropdown when clicking outside of it
        document.addEventListener("click", function (e) {
          if (!dropdownToggle.contains(e.target) && !dropdownContent.contains(e.target)) {
            hideDropdown();
          }
        });




        // Event listener for mouseenter event on dropdown toggle
        dropdownToggle.addEventListener("mouseenter", function () {
          showDropdown();
        });

        // Event listener for mouseleave event on dropdown toggle
        dropdownToggle.addEventListener("mouseleave", function () {
          hideDropdown();
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
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Function to pause the Swiper slideshow
function pauseSlideshow() {
  swiper.autoplay.stop();
}

// Function to resume the Swiper slideshow
function resumeSlideshow() {
  swiper.autoplay.start();
}

// document.addEventListener("DOMContentLoaded", function () {
//   var header = document.querySelector(".header");
//   var scrollThreshold = 400;

//   window.addEventListener("scroll", function () {
//     if (window.scrollY > scrollThreshold) {
//       header.classList.add("fixed");
//     } else {
//       header.classList.remove("fixed");
//     }
//   });
// });
