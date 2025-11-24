import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

function heroAnimation() {
    const wrapper = document.querySelector('.hero-team_wrap');
    if (!wrapper) return;

    const container = wrapper.querySelector('.hero-team_layout');
    const containerleft = container.querySelector(".hero-team_left")
    const containerTop = container.querySelector(".hero-team_top")
    const containerBottom = container.querySelector('.hero-team_bottom');

    if (!container || !containerTop || !containerBottom || !containerleft) return;

    const allItems = container.querySelectorAll('[data-hero]');

    const tagline = containerBottom.querySelectorAll(".u-text-style-tagline")
    const heading = containerBottom.querySelector('.hero-team_heading');
    const desc = containerBottom.querySelector('.hero-team_desc');
    const button = containerBottom.querySelector('.button_main_wrap');

    let textAnimItems = [tagline, heading, desc, button];

    if (typeof SplitText !== "undefined" && heading && desc) {
        const splitOuter = new SplitText([heading, desc], {
            type: "lines",
            linesClass: "line-mask",
            // mask: true
        });

        const splitInner = new SplitText([heading, desc], {
            type: "lines",
            linesClass: "line-inner",
            // mask: true
        });

        gsap.set(splitOuter.lines, { overflow: 'hidden' });

        textAnimItems = [tagline, splitInner.lines, button];
    }

    gsap.set(allItems, { width: "100%" });
    gsap.set(container, { gap: 0 });
    gsap.set(containerTop, { height: "100%" });
    gsap.set(containerBottom, { height: 0, gap: 0 });
    gsap.set(containerleft, { width: 0 });

    gsap.set(textAnimItems, { y: "100%", autoAlpha: 0 });

    // if (button) gsap.set([button, tagline], { y: 20, autoAlpha: 0 });

    const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" }
    });

    let mm = gsap.matchMedia(),
        breakPoint = 800;

    mm.add({
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;

        tl.to(containerTop, { height: isDesktop ? "50%" : "40%" }, 1)
            .to(container, { gap: isDesktop ? "1rem" : "0.5rem" }, "<")
            .to(containerBottom, { height: isDesktop ? "50%" : "60%" }, "<")
            .to(allItems[2], { width: "100%" }, "<")
            .to(allItems[2], { width: isDesktop ? "50%" : "20%" }, ">")
            .to(containerBottom, { gap: isDesktop ? "1rem" : "0.5rem" }, "<")
            .to(containerleft, { width: isDesktop ? "50%" : "80%" }, "<")
            .to(textAnimItems.flat(), {
                y: "0%",
                autoAlpha: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            }, "<+0.5")
    });
}

function revealAnimationColor() {
    const items = document.querySelectorAll('[data-scroll-animation="reveal color"]');

    items.forEach(element => {

        const split = new SplitText(element, { type: "words,chars" });

        gsap.set(split.chars, { color: '#fff' });

        const tl = gsap.timeline();

        tl.to(split.chars, {
            color: 'var(--swatch--brand-500)',
            stagger: 0.05,
            duration: 1,
            ease: "power2.out"
        });

        ScrollTrigger.create({
            trigger: element,
            start: "top 90%",
            end: "bottom 75%",
            animation: tl,
            scrub: true,
        });
    });
}

// function revealAnimation() {
//     const items = document.querySelectorAll('[data-scroll-animation="reveal"]');

//     items.forEach(element => {
//         const originalColor = gsap.getProperty(element, "color");
//         const split = new SplitText(element, { type: "words,chars" });
//         const tl = gsap.timeline();

//         // gsap.set(split.chars, { color: 'transparent' });

//         tl
//             .to(split.chars, {
//                 color: 'var(--swatch--brand-500)',
//                 stagger: 0.05,
//                 duration: 0.1,
//                 ease: "expo2.out"
//             })
//             .to(split.chars, {
//                 color: originalColor,
//                 stagger: 0.05,
//                 duration: 0.1,
//                 ease: "expo2.out"
//             }, 0.1);

//         ScrollTrigger.create({
//             trigger: element,
//             start: "top 90%",
//             // end: "bottom 75%",
//             animation: tl,
//             once: true,
//         });
//     });
// }

export default function aboutAnimation() {
    heroAnimation();
    revealAnimationColor();
    // revealAnimation();
}