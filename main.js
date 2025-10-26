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

const cardConfig = pane.addFolder({
	title: "Cards",
	expanded: true,
});

const cardHeight = {
	cardHeight: 400,
};

cardConfig.addBinding(cardHeight, "cardHeight", {
	label: "Height(px)",
});

const cardOffset = {
	cardOffset: "1.5em",
};

cardConfig.addBinding(cardOffset, "cardOffset", {
	label: "Offset",
});

const stickyPosition = {
	stickyPosition: 0,
};

cardConfig.addBinding(stickyPosition, "stickyPosition", {
	label: "Position(%)",
	min: 0,
	max: 100,
	step: 1,
});

const cardGap = {
	cardGap: 25,
};

cardConfig.addBinding(cardGap, "cardGap", {
	label: "Gap(vh)",
	min: 1,
	max: 100,
	step: 1,
});

// const stickyPosition = {
// 	stickyPosition: "top",
// };

// cardConfig.addBinding(stickyPosition, "stickyPosition", {
// 	label: "Sticky Position",
// 	options: {
// 		top: "top",
// 		middle: "middle",
// 		bottom: "bottom",
// 	},
// });

let isUpdating = false;
let timeoutId = null;

const update = () => {
	if (isUpdating) return;
	isUpdating = true;

	try {
		document.documentElement.dataset.debug = debugConfig.debug;
		document.documentElement.style.setProperty("--card-height", `${cardHeight.cardHeight}px`);
		document.documentElement.style.setProperty("--card-gap", `${cardGap.cardGap}vh`);
		document.documentElement.style.setProperty("--card-top-offset", cardOffset.cardOffset);
		document.documentElement.style.setProperty("--sticky-position", `${stickyPosition.stickyPosition}%`);
		document.documentElement.dataset.stickyPosition = stickyPosition.stickyPosition;
	} finally {
		isUpdating = false;
	}
};

const sync = (event) => {
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
	}, 100);
};

pane.on("change", sync);
update();
