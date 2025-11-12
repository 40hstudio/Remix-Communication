import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
    revealAnimationColor();
    // revealAnimation();
}