import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initScrubAnimations() {
    gsap.utils.toArray("[data-scrub-animation]").forEach(el => {
        const type = el.getAttribute("data-scrub-animation");
        if (type === "parallax") initParallaxEffect(el);
        else if (type === "slow-zoom") initSlowZoomEffect(el);
    });
}

function initParallaxEffect(el) {
    const item = el.querySelector("[data-scrub-animation='parallax'] img");
    const offset = item.offsetHeight * 0.05;

    gsap.set(item, { y: -offset * 1.5 });
    gsap.to(item, {
        y: offset * 1.5,
        ease: "none",
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom+=20% top",
            scrub: true
        }
    });
}

function initSlowZoomEffect(el) {
    const item = el.querySelector("[data-scrub-animation='parallax'] img");
    gsap.set(item, { scale: 0.9 });
    gsap.to(item, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: item, start: "top 90%", end: "bottom 10%", scrub: true }
    });
}

export default function initGlobalAnimations() {
    initScrubAnimations();
}