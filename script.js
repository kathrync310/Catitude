const moodPhotos = {
	happy: ["images/happy_cat1.jpeg"],
	sad: ["images/sad_cat1.jpeg", "images/sad_cat2.jpeg", "images/sad_cat3.jpeg"],
	disgusted: ["images/disgusted_cat1.jpeg", "images/disgusted_cat2.jpeg", "images/disgusted_cat3.jpeg"],
	angry: ["images/angry_cat1.jpeg", "images/angry_cat2.jpeg", "images/angry_cat3.jpeg"],
	tired: ["images/sleepy_cat1.jpeg", "images/sleepy_cat2.jpeg", "images/sleepy_cat3.jpeg"],
	calm: ["images/calm_cat1.jpeg", "images/calm_cat2.jpeg", "images/calm_cat3.jpeg"],
	crazy: ["images/crazy_cat1.jpeg", "images/crazy_cat2.jpeg", "images/crazy_cat3.jpeg"],
	surprised: ["images/surprised_cat1.jpeg", "images/surprised_cat2.jpeg", "images/surprised_cat3.jpeg"]
};

const moodLabels = {
	happy: "Happy",
	sad: "Sad",
	disgusted: "Disgusted",
	angry: "Angry",
	tired: "Sleepy",
	calm: "Calm",
	crazy: "Crazy",
	surprised: "Surprised"
};

document.addEventListener("DOMContentLoaded", () => {
	const moodButtons = document.querySelector(".mood-buttons");
	const resultSection = document.querySelector("#mood-result, .result-page");
	const resultHeading = document.querySelector("#result-heading");
	const resultMessage = document.querySelector("#result-message");
	const resultPhoto = document.querySelector("#result-photo");

	const showResult = (mood, photo) => {
		if (!resultSection || !resultHeading || !resultMessage || !resultPhoto) return;

		resultSection.hidden = false;
		if (moodButtons) moodButtons.hidden = true;
		resultHeading.textContent = `Your Cat: ${moodLabels[mood]}`;

		if (!photo) {
			resultPhoto.hidden = true;
			resultMessage.textContent = `No cat photos have been added for ${moodLabels[mood].toLowerCase()} yet.`;
			return;
		}

		if (!moodPhotos[mood].includes(photo)) {
			resultPhoto.hidden = true;
			resultMessage.textContent = "That photo is not in this mood's collection.";
			return;
		}

		resultPhoto.hidden = true;
		resultMessage.textContent = "Loading your cat...";
		resultPhoto.alt = `A cat for when you feel ${moodLabels[mood].toLowerCase()}`;
		resultPhoto.addEventListener("load", () => {
			resultPhoto.hidden = false;
			resultMessage.textContent = "";
		}, { once: true });
		resultPhoto.addEventListener("error", () => {
			resultPhoto.hidden = true;
			resultMessage.textContent = "This photo could not be loaded. Check its file name and location.";
		}, { once: true });
		resultPhoto.src = photo;
	};

	if (moodButtons) {
		moodButtons.addEventListener("click", (event) => {
			const button = event.target.closest("button[data-mood]");

			if (!button || !moodButtons.contains(button)) return;

			const mood = button.dataset.mood;
			if (!Object.prototype.hasOwnProperty.call(moodPhotos, mood)) return;

			const photos = moodPhotos[mood];
			const photo = photos.length
				? photos[Math.floor(Math.random() * photos.length)]
				: "";
			showResult(mood, photo);
		});
	}

	const chooseAgain = document.querySelector(".choose-again");
	if (chooseAgain && moodButtons && resultSection) {
		chooseAgain.addEventListener("click", (event) => {
			event.preventDefault();
			resultSection.hidden = true;
			moodButtons.hidden = false;
		});
	}

	if (!resultHeading || !resultMessage || !resultPhoto || moodButtons) return;

	const params = new URLSearchParams(window.location.search);
	const mood = params.get("mood");
	const photo = params.get("photo");

	if (!mood || !Object.prototype.hasOwnProperty.call(moodPhotos, mood)) {
		if (resultSection) {
			resultSection.hidden = false;
			resultHeading.textContent = "No mood selected";
			resultMessage.textContent = "Choose a mood to see your cat.";
		}
		return;
	}

	showResult(mood, photo);
});

