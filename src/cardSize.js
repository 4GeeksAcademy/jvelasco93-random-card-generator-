const BASE_SUIT_FONT_SIZE_IN_REM = 4;
const BASE_VALUE_FONT_SIZE_IN_REM = 6;

export function setupCardSizeControls() {
    const card = document.querySelector(".playing-card");
    const controls = getControls();

    const initialSize = getCardSize(card);

    updateCardSize(initialSize);

    controls.widthRange.addEventListener("input", function () {
        updateCardSize({
            width: Number(controls.widthRange.value),
            height: Number(controls.heightRange.value)
        });
    });

    controls.heightRange.addEventListener("input", function () {
        updateCardSize({
            width: Number(controls.widthRange.value),
            height: Number(controls.heightRange.value)
        });
    });

    controls.resetButton.addEventListener("click", function () {
        updateCardSize(initialSize);
    });

    function updateCardSize(size) {
        const scale = size.width / initialSize.width;

        card.style.setProperty("--card-width", `${size.width}px`);
        card.style.setProperty("--card-height", `${size.height}px`);
        card.style.setProperty("--card-suit-size", `${BASE_SUIT_FONT_SIZE_IN_REM * scale}rem`);
        card.style.setProperty("--card-value-size", `${BASE_VALUE_FONT_SIZE_IN_REM * scale}rem`);

        controls.widthRange.value = size.width;
        controls.heightRange.value = size.height;

        controls.widthValue.textContent = size.width;
        controls.heightValue.textContent = size.height;
    }
}

function getControls() {
    return {
        widthRange: document.getElementById("cardWidthRange"),
        heightRange: document.getElementById("cardHeightRange"),
        widthValue: document.getElementById("cardWidthValue"),
        heightValue: document.getElementById("cardHeightValue"),
        resetButton: document.getElementById("resetCardSizeButton")
    };
}

function getCardSize(card) {
    const cardStyles = window.getComputedStyle(card);

    return {
        width: Math.round(parseFloat(cardStyles.width)),
        height: Math.round(parseFloat(cardStyles.height))
    };
}