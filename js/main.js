// update year
const currentYear = new Date().getFullYear();
const yearEl = document.querySelector(".year");
yearEl.textContent = currentYear;

// handle mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNav.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
});

// handle smooth scrolling
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = link.getAttribute("href");

        // scroll back to top
        if (href === "#") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

        // scroll back to the targeted section
        if (href !== "#" && href.startsWith("#")) {
            // const sectionEl = document.querySelectorAll(href);
            // sectionEl.forEach(function (link) {
            //     link.scrollIntoView({ behavior: "smooth" });
            // });

            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        if (link.classList.contains("main-nav-link")) {
            headerEl.classList.toggle("nav-open");
        }
    });
});

// handle sticky navigation
const heroSec = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) {
            document.body.classList.add("sticky");
        }
        if (ent.isIntersecting) {
            document.body.classList.remove("sticky");
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
    }
);
observer.observe(heroSec);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
