import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    provenCardAnimation();
}