import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function duplicateMarquee() {
    const originalMarquee = document.querySelector('.marquee_list');

    if (!originalMarquee) {
        console.warn('.marquee_list not found');
        return;
    }

    let duplicatedMarquee = null;

    const mediaQuery = window.matchMedia('(max-width: 1240px)');

    const handleMediaChange = (event) => {
        if (event.matches) {
            if (!duplicatedMarquee) {
                duplicatedMarquee = originalMarquee.cloneNode(true);

                duplicatedMarquee.classList.add('marquee_duplicate');

                originalMarquee.after(duplicatedMarquee);
            }
        } else {
            if (duplicatedMarquee) {
                duplicatedMarquee.remove();
                duplicatedMarquee = null;
            }
        }
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    handleMediaChange(mediaQuery);
}

export default function homeAnimation() {
    // duplicateMarquee();
    countAnimation();
}