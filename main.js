import { Pane } from "tweakpane";
import "./style.css";

const pane = new Pane({
	title: "Config",
	expanded: true,
});

const debugConfig = {
	debug: false,
};

pane.addBinding(debugConfig, "debug", {
	label: "Debug",
});

const cardHeight = {
	cardHeight: 400,
};

const cardConfig = pane.addFolder({
	title: "Cards",
	expanded: true,
});

cardConfig.addBinding(cardHeight, "cardHeight", {
	label: "Height",
	min: 100,
	max: 1000,
	step: 10,
});

const stickyPosition = {
	stickyPosition: "top",
};

cardConfig.addBinding(stickyPosition, "stickyPosition", {
	label: "Sticky Position",
	options: {
		top: "top",
		middle: "middle",
		bottom: "bottom",
	},
});

let isUpdating = false;
let timeoutId = null;

const update = () => {
	if (isUpdating) return;
	isUpdating = true;

	try {
		document.documentElement.dataset.debug = debugConfig.debug;
		document.documentElement.style.setProperty("--card-height", `${cardHeight.cardHeight}px`);
		document.documentElement.dataset.stickyPosition = stickyPosition.stickyPosition;
		//console.log(`${cardHeight.cardHeight}px`);
	} finally {
		isUpdating = false;
	}
};

const sync = (event) => {
	console.log({ event });

	// Clear any pending updates
	if (timeoutId) {
		clearTimeout(timeoutId);
	}

	// Debounce the update
	timeoutId = setTimeout(() => {
		if (!document.startViewTransition) {
			update();
		} else {
			try {
				document.startViewTransition(() => update());
			} catch (error) {
				console.warn("View transition failed, falling back to direct update:", error);
				update();
			}
		}
	}, 16); // ~60fps
};

pane.on("change", sync);
update();
