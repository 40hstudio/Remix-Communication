import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function heroAnimation() {
    const wrapper = document.querySelector('.hero-services_wrap');
    if (!wrapper) return;

    const container = wrapper.querySelector('.hero-services_layout');
    const containerRight = container.querySelector(".hero-services_right")
    const containerLeft = container.querySelector('.hero-services_left');

    if (!container || !containerRight || !containerLeft) return;

    const allItems = container.querySelectorAll('[data-hero]');

    const tagline = containerLeft.querySelectorAll(".u-text-style-tagline")
    const heading = containerLeft.querySelector('.hero-services_heading');
    const desc = containerLeft.querySelector('.hero-services_desc');
    const button = containerLeft.querySelector('.button_main_wrap');

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

    gsap.set(allItems, { height: 0 });
    gsap.set(allItems[3], { height: 0, transformOrigin: "top" });
    gsap.set(allItems[1], { height: "100%" });
    gsap.set(container, { gap: 0 });
    gsap.set(containerRight, { width: "100%", gap: 0 });
    gsap.set(containerLeft, { width: 0, gap: 0 });

    gsap.set(textAnimItems, { y: "100%", autoAlpha: 0 });

    if (button) gsap.set(button, { y: 20, autoAlpha: 0 });

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

        tl.to(allItems[3], { height: "100%" })
            .to(container, { gap: isDesktop ? "1rem" : "0.5rem" }, ">")
            .to(containerLeft, { width: isDesktop ? "100%" : "100%" }, "<")
            .to(containerRight, { width: isDesktop ? "100%" : "0%" }, "<")
            .to(containerLeft, { gap: isDesktop ? "1rem" : "0.5rem" }, ">")
            .to(allItems[0], { height: "100%" }, "<")
            .to(allItems[2], { height: "100%" }, "<")
            .to(textAnimItems.flat(), {
                y: "0%",
                autoAlpha: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            }, "<+=0.5").to(button, {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.8
            }, "<");
    });
}

function provenCardAnimation() {
    const items = document.querySelectorAll('.proven_item_wrap');

    const delay = 1.3;

    if (window.innerWidth < 991) {
        return;
    }

    items.forEach((element, index) => {
        const tl = gsap.timeline();

        tl.fromTo(element,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "none",
                duration: 0.6,
                delay: index * delay
            }
        );

        ScrollTrigger.create({
            trigger: ".proven_bottom",
            start: "top 90%",
            animation: tl,
            once: true,
        });
    });
    // const tl = gsap.timeline();

    // tl.fromTo(items,
    //     { y: 50, opacity: 0 },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         ease: "none",
    //         stagger: 0.4
    //     }
    // );

    // ScrollTrigger.create({
    //     trigger: '.proven_list',
    //     start: "top 90%",
    //     animation: tl,
    //     once: true,
    //     markers: true
    // });
}

export default function servicesAnimation() {
    heroAnimation();
    provenCardAnimation();
}