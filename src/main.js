import homeAnimation from "./pages/home.js";
import aboutAnimation from "./pages/about.js";

import Lenis from "lenis";

let lenis = new Lenis({
	lerp: 0.1,
	wheelMultiplier: 0.7,
	gestureOrientation: "vertical",
	normalizeWheel: false,
	smoothTouch: false,
});
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function initAnimations() {
	homeAnimation();
	aboutAnimation();
}

window.addEventListener("load", initAnimations);