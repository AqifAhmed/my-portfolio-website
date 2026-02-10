document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Reveal Animations for Hero
    const tl = gsap.timeline();

    tl.to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Scroll Animations for elements

    // Fade Up Elements
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.fromTo(elem,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Side Reveal
    gsap.utils.toArray('.reveal-side').forEach(elem => {
        gsap.fromTo(elem,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                }
            }
        );
    });

    // Scale Reveal
    gsap.utils.toArray('.reveal-scale').forEach(elem => {
        gsap.fromTo(elem,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                }
            }
        );
    });

    // Navbar background change on scroll
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "bg-darker", targets: ".navbar" }
    });

    // Initialize GitHub Calendar
    GitHubCalendar(".calendar", "AqifAhmed", {
        responsive: false,
        tooltips: true
    }).then(function () {
        console.log("GitHub Calendar loaded.");

        // Force cleanup: remove unwanted elements via JS
        var cal = document.querySelector('.calendar');
        if (cal) {
            // Remove all anchor links (e.g. "Skip to contributions year list")
            cal.querySelectorAll('a').forEach(function (el) { el.remove(); });
            // Remove headings (e.g. "X contributions in the last year")
            cal.querySelectorAll('h2').forEach(function (el) { el.remove(); });
            // Remove footer, legend, stats columns, misc text
            cal.querySelectorAll('.contrib-footer, .contrib-legend, .contrib-column, .text-small, .monospace, .float-right, .px-md-5').forEach(function (el) { el.remove(); });

            // Remove duplicate month labels (GitHub shows ~13 months, causing duplicates)
            // The library may render months as SVG <text> or HTML <span> elements
            var allLabels = cal.querySelectorAll('td.ContributionCalendar-label span[aria-hidden="true"], text.ContributionCalendar-label');
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var seenMonths = {};
            allLabels.forEach(function (label) {
                var text = label.textContent.trim();
                if (months.indexOf(text) !== -1) {
                    if (seenMonths[text]) {
                        // Duplicate: remove the first occurrence, keep the latest
                        seenMonths[text].remove();
                    }
                    seenMonths[text] = label;
                }
            });

            // Mobile: scroll to end (latest months) automatically
            scrollToEnd();
            window.addEventListener('resize', scrollToEnd);
        }
    }).catch(function (e) {
        console.error("GitHub Calendar failed to load:", e);
        document.querySelector(".calendar").innerHTML = "<p class='text-center text-muted'>Unable to load GitHub data.</p>";
    });

    /**
     * On mobile, the calendar is scrollable horizontally.
     * This function scrolls it to the far right so the latest months are visible.
     */
    function scrollToEnd() {
        var wrapper = document.querySelector('.calendar-wrapper');
        if (wrapper && window.innerWidth <= 991) {
            wrapper.scrollLeft = wrapper.scrollWidth;
        }
    }

    // Auto-close mobile menu when a link is clicked
    var navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // On mobile/touch: let the btn-pixelated fill animation play before navigating
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('a.btn-pixelated');
        if (!btn) return;

        // Only delay on touch devices (mobile)
        if (!('ontouchstart' in window)) return;

        var href = btn.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        e.stopPropagation();

        // Trigger the hover/fill animation
        btn.classList.add('btn-pixelated--active');

        // Wait for the CSS transition (300ms) to finish, then navigate
        setTimeout(function () {
            var target = btn.getAttribute('target');
            if (target === '_blank') {
                window.open(href, '_blank');
            } else {
                window.location.href = href;
            }
            btn.classList.remove('btn-pixelated--active');
        }, 350);
    }, true);
});
