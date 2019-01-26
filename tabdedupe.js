box = document.querySelector('body p');

function Dupe(tabs) {
	tabs.forEach((tab) => {
		browser.tabs.remove(tab.id);
	});
	box.textContent = `Removed ${tabs.length} duplicate${tabs.length == 1 ? "" : "s"}`
}

function noDupe() {
	box.textContent = "No duplicates"
}

browser.tabs.query(
	{ currentWindow: true, active: true })
	.then((current) => {
		browser.tabs.query({ url: current[0].url, active: false })
			.then((tabs) => {
				if (tabs.length == 0) {
					noDupe();
				} else {
					Dupe(tabs);
				}
			});
	});
