const AUTO_CARD_INTERVAL_IN_MS = 2 * 1000;

let autoCardIntervalId = null;

export function setupAutoCard(changeCard) {
    updateAutoCardUi();

    document
        .getElementById("autoCardButton")
        .addEventListener("click", function () {
            if (autoCardIntervalId !== null) {
                stopAutoCard();
                return;
            }
            startAutoCard(changeCard);
        });
}

function stopAutoCard() {
    clearInterval(autoCardIntervalId);
    autoCardIntervalId = null;
    updateAutoCardUi();
}

function startAutoCard(changeCard) {
   autoCardIntervalId = setInterval(
        changeCard,
        AUTO_CARD_INTERVAL_IN_MS
    );
    updateAutoCardUi();
}

function updateAutoCardUi() {
    const isRunning = autoCardIntervalId !== null;

    updateAutoCardButton(isRunning);
    renderAutoStatusAlert(isRunning);
}

function updateAutoCardButton(isRunning) {
    const autoCardButton = document.getElementById("autoCardButton");
    const autoCardButtonText = autoCardButton.querySelector("span");

    autoCardButtonText.textContent = isRunning ? "stop auto" : "start auto";

    autoCardButton.classList.toggle("btn-primary", !isRunning);
    autoCardButton.classList.toggle("btn-outline-light", isRunning);
}

function renderAutoStatusAlert(isRunning) {
    const alertContainer = document.getElementById("autoStatusAlertContainer");

    const autoStatusMessage = isRunning
        ? `Auto mode is on. A new card appears every ${AUTO_CARD_INTERVAL_IN_MS / 1000} seconds.`
        : "Auto mode is off.";

    alertContainer.innerHTML = `
        <div class="alert ${isRunning ? 'alert-info' : 'alert-light'} py-2 px-3 mb-0 text-center shadow-sm" role="alert">
            ${autoStatusMessage}
        </div>
    `;
}
