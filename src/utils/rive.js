import { Rive } from "@rive-app/webgl2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function loadRiveAnimation() {
    const visual = document.querySelector("[data-rive='proven']");

    if (!visual) {
        console.log("canvas element [data-rive='proven'] not found.");
        return;
    }

    const RIVEURL = "https://cdn.prod.website-files.com/6912c1a5568b338bf17b0719/691559cf6920c2d7e2a42755_cosmic-remix-proven_process.riv";

    const artboard = "PROVEN_PROCESS";
    const sm = "State Machine 1";

    if (window.innerWidth < 991) {
        return;
    }

    const r = new Rive({
        src: RIVEURL,
        canvas: visual,
        stateMachines: sm,
        artboard: artboard,
        autoplay: true,
        isTouchScrollEnabled: true,
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            const inputs = r.stateMachineInputs(sm);
            const playTrigger = inputs.find((i) => i.name === "Start Trig");

            const triggerElement = visual.parentElement;

            if (!triggerElement) {
                console.error("Rive canvas tidak memiliki parent element untuk ScrollTrigger.");
                return;
            }


            ScrollTrigger.create({
                trigger: ".proven_bottom",
                start: "top 80%",
                once: true,
                onEnter: () => {
                    if (playTrigger) {
                        playTrigger.fire();
                    }
                },
            });
        },
        onLoadError: (err) => {
            console.error("Rive loading error:", err);
        },
    });
}