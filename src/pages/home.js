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

function voiceActiveHandler() {
    const voiceElements = document.querySelectorAll('.voice_item');

    if (!voiceElements || voiceElements.length === 0) {
        console.warn('Tidak ada elemen .voice_item yang ditemukan.');
        return;
    }

    voiceElements.forEach((clickedElement) => {
        clickedElement.addEventListener('click', () => {
            voiceElements.forEach((el) => {
                el.classList.remove('is-active');
            });

            clickedElement.classList.add('is-active');
        });
    });
}

export default function homeAnimation() {
    voiceActiveHandler();
    countAnimation();
}