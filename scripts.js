// Variaveis de estados de jogo

let flippedCards = []; // Array que armazena as cartas viradas
let matchedPairs = 0; // Contador de pares encontrados
let attemps = 0; // Tentativas
let isCheckingPairs = false; // Trava o jogo enquanto verifica o par

// Array de todas as cartas do jogo
const cardItems = [
  { id: 1, content: "🥶", matched: false },
  { id: 2, content: "🥶", matched: false },
  { id: 3, content: "🤫", matched: false },
  { id: 4, content: "🤫", matched: false },
  { id: 5, content: "👻", matched: false },
  { id: 6, content: "👻", matched: false },
  { id: 7, content: "🎮", matched: false },
  { id: 8, content: "🎮", matched: false },
  { id: 9, content: "🎧", matched: false },
  { id: 10, content: "🎧", matched: false },
  { id: 11, content: "🎷", matched: false },
  { id: 12, content: "🎷", matched: false },
  { id: 13, content: "🗿", matched: false },
  { id: 14, content: "🗿", matched: false },
  { id: 15, content: "🛩", matched: false },
  { id: 16, content: "🛩", matched: false },
];

// Função para embaralhar
function shuffleCards(array) {
  const shuffled = array.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return shuffled;
}

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const emoji = document.createElement("span");
  emoji.className = "card-emoji";
  emoji.textContent = card.content;

  cardElement.appendChild(emoji);

  cardElement.addEventListener("click", () =>
    handleCardClick(cardElement, card)
  );

  return cardElement;
}

function renderCards() {
  const deck = document.getElementById("deck");
  deck.innerHTML = "";
  const cards = shuffleCards(cardItems);
  cards.forEach((item) => {
    const cardElement = createCard(item);
    deck.appendChild(cardElement);
  });
}

function handleCardClick(cardElement, card) {
  if (isCheckingPairs || cardElement.classList.contains("revelead")) {
    return;
  }

  // Revela a carta
  cardElement.classList.add("revelead");

  // Adiciona no Array as cartas que foram reveladas
  flippedCards.push({ cardElement, card });

  // Verifica se a carta é igual
  if (flippedCards.length === 2) {
    // Atualiza para Verdadeiro para sinalizar que vamos verificar o par
    isCheckingPairs = true;
    // incrementa o contador de tentativas
    attemps++;

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.card.content === secondCard.card.content) {
      // Incrementa os pares encontrados...
      matchedPairs++;
      cardItems.forEach((item) => {
        if (item.content === firstCard.card.content) {
          item.matched = true;
        }
      });
      flippedCards = [];
      isCheckingPairs = false;
      updateStats();

      const toFind = cardItems.find((item) => item.matched === false);
      if (!toFind) {
        alert("Parabéns você encontrou todos os pares!");
      }
    } else {
      setTimeout(() => {
        flippedCards = [];
        isCheckingPairs = false;
        updateStats();
        firstCard.cardElement.classList.remove("revelead");
        secondCard.cardElement.classList.remove("revelead");
      }, 1000);
    }
  }
}

function updateStats() {
  document.getElementById(
    "stats"
  ).textContent = `${matchedPairs} acertos de ${attemps} tentativas`;
}

// Função que reinicia o jogo
function resetGame() {
  flippedCards = [];
  matchedPairs = 0;
  attemps = 0;
  isCheckingPairs = false;

  // Desmarcar as cartas
  cardItems.forEach((item) => (item.matched = false));
  renderCards();
  updateStats();
}

function initGame() {
  renderCards();

  document.getElementById("restart").addEventListener("click", resetGame);
}

initGame();
