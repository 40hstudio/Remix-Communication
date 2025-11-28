import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { context } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

function heroAnimation() {
    const wrapper = document.querySelector('.hero-main_wrap');
    if (!wrapper) return;

    const container = wrapper.querySelector('.hero-main_top');
    const containerTop = container?.querySelector('.hero-main_image_top');
    const containerBottom = container?.querySelector('.hero-main_image_bottom');
    const containerLeft = container?.querySelector('.hero-main_image_left');

    if (!container || !containerBottom || !containerTop || !containerLeft) return;

    const allItems = container.querySelectorAll('[data-hero]');

    const heading = containerLeft.querySelector('.hero-main_heading');
    const desc = containerLeft.querySelector('.hero-main_desc');
    const button = containerLeft.querySelector('.button_main_wrap');

    let textAnimItems = [heading, desc, button];

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

        textAnimItems = [splitInner.lines, button];
    }

    gsap.set(allItems, { width: 0 });
    gsap.set([allItems[3], allItems[2]], { width: "100%" });
    gsap.set(allItems[2], { height: "100%" });
    gsap.set(allItems[3], { height: 0 });
    gsap.set(container, { gap: 0 });
    gsap.set(containerTop, { height: '100%', gap: 0 });
    gsap.set(containerLeft, { width: 0, gap: 0 });
    gsap.set(containerBottom, { height: 0, gap: 0 });

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

        tl.to(allItems[0], { width: "100%" })
            .to(containerTop, { height: isDesktop ? "15rem" : "10rem" })
            .to(container, { gap: isDesktop ? "1rem" : "0.5rem" }, "<")
            .to(containerBottom, { height: "100%" }, "<")
            .to(allItems[4], { width: "100%" }, "<")
            .to(allItems[4], { width: isDesktop ? "60%" : "20%" }, ">")
            .to(containerBottom, { gap: isDesktop ? "1rem" : "0.5rem" }, "<")
            .to(containerTop, { gap: isDesktop ? "1rem" : "0.5rem" }, "<")
            .to(containerLeft, { width: isDesktop ? "40%" : "100%" }, "<")
            .to(allItems[0], { width: isDesktop ? "70%" : "100%" }, "<")
            .to(allItems[1], { width: isDesktop ? "30%" : "20%" }, "<")
            .to(allItems[2], { height: "100%" }, "<")
            .to(containerLeft, { gap: isDesktop ? "1rem" : "0.5rem" }, ">")
            .to(allItems[3], { height: "100%", }, "<")
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

function countAnimation() {
    const items = document.querySelectorAll('[data-scroll-animation="count"]');

    items.forEach(element => {

        const targetCount = parseInt(element.dataset.count, 10);

        let counter = { value: 0 };

        ScrollTrigger.create({
            trigger: element,
            start: "top 90%",
            onEnter: () => {
                gsap.to(counter, {
                    value: targetCount,
                    duration: 2,
                    ease: "power1.out",
                    onUpdate: () => {
                        element.textContent = Math.round(counter.value);
                    },
                });
            },
            once: true,
        });
    });
}

// function voiceActiveHandler() {
//     const voiceElements = document.querySelectorAll('.voice_item');

//     if (!voiceElements || voiceElements.length === 0) {
//         console.warn('Tidak ada elemen .voice_item yang ditemukan.');
//         return;
//     }

//     voiceElements.forEach((clickedElement) => {
//         clickedElement.addEventListener('click', () => {
//             voiceElements.forEach((el) => {
//                 el.classList.remove('is-active');
//             });

//             clickedElement.classList.add('is-active');
//         });
//     });
// }

// function voiceActiveHandler() {
//     const section = document.querySelector('.voice_wrap');
//     const items = gsap.utils.toArray('.voice_item');

//     if (!section || items.length === 0) return;

//     ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: `+=${items.length * 100}vh`,
//         // pin: true,
//         scrub: true,
//     });

//     items.forEach((item, index) => {
//         ScrollTrigger.create({
//             trigger: section,
//             start: () => "top top-=" + (index * window.innerHeight),
//             end: () => "+=" + window.innerHeight,
//             toggleClass: { targets: item, className: "is-active" },
//             // markers: true,
//         });
//     });
// }
function voiceActiveHandler() {
    const section = document.querySelector('.voice_wrap');
    const items = gsap.utils.toArray('.voice_item');

    // const desktop = window.innerWidth < 991;

    if (!section || items.length === 0) return;

    items[0].classList.add('is-active');

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${items.length * 100}vh`,
        // pin: true, 
        scrub: true,
    });

    items.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: () => "top top-=" + (index * window.innerHeight),
            end: () => "+=" + window.innerHeight,

            onToggle: (self) => {
                if (self.isActive) {
                    item.classList.add("is-active");
                } else {
                    const isFirstAtTop = index === 0 && self.progress === 0;
                    const isLastAtBottom = index === items.length - 1 && self.progress === 1;

                    if (!isFirstAtTop && !isLastAtBottom) {
                        item.classList.remove("is-active");
                    }
                }
            }
        });
    });
}

export default function homeAnimation() {
    heroAnimation();
    voiceActiveHandler();
    countAnimation();
}