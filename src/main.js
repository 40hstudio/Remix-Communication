//--- Libraries ---
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

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

lenis.scrollTo(0);

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

function handleLoadMore() {
	const loadMoreBtn = document.querySelector('[data-button="load-more"]');

	if (loadMoreBtn) {
		loadMoreBtn.addEventListener("click", function () {
			console.log("Load more clicked, waiting for content...");

			setTimeout(() => {
				if (window.lenis) window.lenis.resize();
			}, 500);

			setTimeout(() => {
				if (window.lenis) {
					window.lenis.resize();
					console.log("Lenis resized final");
				}
			}, 1000);
		});
	}
}

function navbar() {
	const nav = document.querySelector('.nav_component');
	const lightSections = gsap.utils.toArray('.u-theme-light');

	lightSections.forEach(section => {
		ScrollTrigger.create({
			trigger: section,
			start: "10% start",
			end: "bottom 20%",
			onToggle: (self) => {
				if (self.isActive) {
					nav.classList.remove("is-light-text");
				} else {
					nav.classList.add("is-light-text");
				}
			}
		});
	});
}

function initAnimations() {
	homeAnimation();
	aboutAnimation();
	loadRiveAnimation();
	servicesAnimation();
	initGlobalAnimations();
	handleLoadMore();
	navbar();
}

document.addEventListener("DOMContentLoaded", initAnimations);