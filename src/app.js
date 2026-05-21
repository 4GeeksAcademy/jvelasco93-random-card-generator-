import "bootstrap";
import "./style.css";

class FrenchDeck {
  static SUITS = {
    HEARTS: { symbol: "♥", colorClass: "text-danger" },
    DIAMONDS: { symbol: "♦", colorClass: "text-danger" },
    SPADES: { symbol: "♠", colorClass: "text-dark" },
    CLUBS: { symbol: "♣", colorClass: "text-dark" }
  };

  static VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  static COLOR_CLASSES = [
    ...new Set(
      Object.values(FrenchDeck.SUITS).map(suite => {
        return suite.colorClass;
      })
    )
  ]

  generate() {
    return {
      suit: randomItem(Object.values(FrenchDeck.SUITS)),
      value: randomItem(FrenchDeck.VALUES)
    }
  }
}

function renderCard(aCard) {
  const topSuit = document.getElementById('topSuit');
  const bottomSuit = document.getElementById('bottomSuit');
  const cardValue = document.getElementById('cardValue');

  topSuit.textContent = aCard.suit.symbol;
  bottomSuit.textContent = aCard.suit.symbol;
  cardValue.textContent = aCard.value;

  [topSuit, bottomSuit, cardValue].forEach(component => {
    component.classList.remove(...FrenchDeck.COLOR_CLASSES);
    component.classList.add(aCard.suit.colorClass);
  })
}

const deck = new FrenchDeck();

window.onload = function () {
  renderCard(deck.generate());
  document
    .getElementById('generateCardButton')
    .addEventListener("click", () => renderCard(deck.generate()));
};

function randomItem(anArray) {
  return anArray[Math.floor(Math.random() * anArray.length)];
}