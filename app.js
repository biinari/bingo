// Bingo Cards
class BingoCards {
  constructor(cards) {
    this.cards = cards;
  }

  generate() {
    for (let i = 0; i < 6; i++) {
      this.drawCard();
    }
  }

  drawCard() {
    let card = this.createCard();
    let table = document.createElement('table');
    for (let y = 0; y < 3; y++) {
      let row = document.createElement('tr');
      for (let x = 0; x < rowLen; x++) {
        let cell = document.createElement('td');
        let value = card[y][x];
        cell.innerText = value;
        row.appendChild(cell);
        if (value !== blankCell) {
          cell.addEventListener('click', (event) => {
            this.toggleCell(cell);
          });
        } else {
          cell.className = 'blank';
        }
      }
      table.appendChild(row);
    }
    this.cards.appendChild(table);
  }

  createCard() {
    let card = this.blankCard();
    for (let x = 0; x < rowLen; x++) {
      let [from, to] = colRanges[x];
      let nums = [];
      let offset = 0;
      for (let y = 0; y < card.length; y++) {
        if (card[y][x] == '#') {
          let num = randRange(from, to-offset);
          while (nums.includes(num)) {
            num++;
          }
          nums.push(num);
          offset++;
        }
      }
      nums.sort();
      let i = 0;
      for (let y = 0; y < card.length; y++) {
        if (card[y][x] == '#') {
          card[y][x] = nums[i];
          i++;
        }
      }
    }
    return card;
  }

  // blankCard creates a card with spaces marked '_' and numbers marked '#'
  blankCard() {
    let card = [];
    for (let y = 0; y < 3; y++) {
      let row = ['#', '#', '#', '#', '#', '#', '#', '#', '#'];
      for (let i = 0; i < 4; i++) {
        let space = rand(rowLen-i);
        while (row[space] != '#') {
          space++;
        }
        row[space] = blankCell;
      }
      card.push(row);
    }
    return card;
  }

  toggleCell(cell) {
    if (cell.className == 'called') {
      cell.className = '';
    } else {
      cell.className = 'called';
    }
  }
}

const blankCell = ''; // '\xa0';
const rowLen = 9;
const colRanges = [
  [1, 9],
  [10, 19],
  [20, 29],
  [30, 39],
  [40, 49],
  [50, 59],
  [60, 69],
  [70, 79],
  [80, 90]
];

// rand returns a random int between 0 and n-1 (inclusive)
function rand(n) {
  return Math.floor(Math.random() * n);
}

// randRange returns a random int between a and b (inclusive)
function randRange(a, b) {
  let x = rand(b+1-a);
  return x + a;
}

document.addEventListener('DOMContentLoaded', (event) => {
  let cards = document.getElementById('cards');
  bingo = new BingoCards(cards);

  window.bingo = bingo;
  bingo.generate();
});
