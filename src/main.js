import homeAnimation from "./pages/home.js";
import aboutAnimation from "./pages/about.js";
import servicesAnimation from "./pages/services.js";

// --- Utils ---
import { loadRiveAnimation } from "./utils/rive.js";

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
	loadRiveAnimation();
	servicesAnimation();
}

window.addEventListener("load", initAnimations);