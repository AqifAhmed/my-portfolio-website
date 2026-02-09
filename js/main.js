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
        toggleClass: {className: "bg-darker", targets: ".navbar"}
    });
});
