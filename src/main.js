//--- Libraries ---
import Lenis from "lenis";

// --- Page Animations ---
import homeAnimation from "./pages/home.js";
import aboutAnimation from "./pages/about.js";
import servicesAnimation from "./pages/services.js";

// --- Utils ---
import { loadRiveAnimation } from "./utils/rive.js";
import initGlobalAnimations from "./utils/global.js";

let lenis = new Lenis({
	lerp: 0.1,
	wheelMultiplier: 0.7,
	gestureOrientation: "vertical",
	normalizeWheel: false,
	smoothTouch: false,
	autoRaf: true
});

window.lenis = lenis;

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



$("[data-lenis-start]").on("click", function () {
	lenis.start();
});

$("[data-lenis-stop]").on("click", function () {
	lenis.stop();
});

$("[data-lenis-toggle]").on("click", function () {
	$(this).toggleClass("stop-scroll");
	if ($(this).hasClass("stop-scroll")) {
		lenis.stop();
	} else {
		lenis.start();
	}
});


window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
	'cmsload',
	(listInstances) => {
		console.log('CMS Load Successfully loaded!');

		const [listInstance] = listInstances;

		listInstance.on('renderitems', (renderedItems) => {

			setTimeout(() => {
				if (window.lenis) {
					window.lenis.resize();
				}
			}, 200);

		});
	},
]);

function initAnimations() {
	homeAnimation();
	aboutAnimation();
	loadRiveAnimation();
	servicesAnimation();
	initGlobalAnimations();
}

window.addEventListener("load", initAnimations);