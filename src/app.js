import "bootstrap";
import "./style.css";

import { setupAutoCard } from "./autoCard.js";

class RandomCardGenerator {
  static SUITS = {
    HEARTS: { symbol: "♥", colorClass: "text-danger" },
    DIAMONDS: { symbol: "♦", colorClass: "text-danger" },
    SPADES: { symbol: "♠", colorClass: "text-dark" },
    CLUBS: { symbol: "♣", colorClass: "text-dark" }
  };

  static VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  static COLOR_CLASSES = ["text-danger", "text-dark"];

  static generate() {
    return {
      suit: randomItem(Object.values(RandomCardGenerator.SUITS)),
      value: randomItem(RandomCardGenerator.VALUES)
    };
  }
}

function renderCard(aCard) {
  const topSuit = document.getElementById("topSuit");
  const bottomSuit = document.getElementById("bottomSuit");
  const cardValue = document.getElementById("cardValue");

  topSuit.textContent = aCard.suit.symbol;
  bottomSuit.textContent = aCard.suit.symbol;
  cardValue.textContent = aCard.value;

  applySuitColor([topSuit, bottomSuit, cardValue], aCard.suit);
}

function generateAndRenderCard() {
  renderCard(RandomCardGenerator.generate());
}

window.onload = function () {
  generateAndRenderCard();

  document
    .getElementById("generateCardButton")
    .addEventListener("click", generateAndRenderCard);

  setupAutoCard(generateAndRenderCard);
};

function applySuitColor(elements, aSuit) {
  elements.forEach(element => {
    element.classList.remove(...RandomCardGenerator.COLOR_CLASSES);
    element.classList.add(aSuit.colorClass);
  });
}

function randomItem(anArray) {
  return anArray[Math.floor(Math.random() * anArray.length)];
}