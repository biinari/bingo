const calls = {
  1: 'Partridge in a Pear tree',
  2: 'One little duck',
  3: 'Cup of tea',
  4: 'Knock at the door',
  5: 'Man alive',
  6: 'Half a dozen',
  7: 'Lucky',
  8: 'Garden gate',
  9: 'Ladies dancing',
  10: 'Boris\'s den',
  11: 'Ski lines',
  12: 'One dozen',
  13: 'Unlucky for some',
  14: 'A fortnight',
  15: 'A rugby team',
  16: 'Four by four',
  17: 'Driving age',
  18: 'Voting age',
  19: 'End of the teens',
  20: 'One score',
  21: 'Key to the door',
  22: 'Two little ducks',
  23: 'Thee and me',
  24: 'Two dozen',
  25: 'Duck and dive',
  26: 'Pick and mix',
  27: 'Duck and a crutch',
  28: 'In a state',
  29: 'Rise and shine',
  30: 'Blind 30',
  31: 'Get up and run',
  32: 'Buckle my shoe',
  33: 'Sherwood Forest - all the trees',
  34: 'Ask for more',
  35: 'Jump and jive',
  36: 'Three dozen',
  37: 'More than 11',
  38: 'Christmas cake',
  39: '39 Steps',
  40: 'Life begins',
  41: 'Time for fun',
  42: 'The answer to the ultimate question of life, the universe and everything',
  43: 'My lucky number',
  44: 'All the fours',
  45: 'Halfway there',
  46: 'Up to tricks',
  47: 'Calling Norway',
  48: 'Four dozen',
  49: 'Lucky squared',
  50: 'Bullseye',
  51: 'Tweak of the thumb',
  52: 'Pack of cards',
  53: 'Here comes Herbie!',
  54: 'Clean the floor',
  55: 'All the fives',
  56: 'Calling Chile',
  57: 'Heinz varieties',
  58: 'Make them wait',
  59: 'Brighton line',
  60: 'Five dozen',
  61: 'Bakers bun',
  62: 'Tickety-boo',
  63: 'Tickle me',
  64: 'Commodore',
  65: 'Calling Singapore',
  66: 'Clickety click',
  67: 'Stairway to Heaven',
  68: 'Erbium',
  69: 'Thulium',
  70: 'Three score and 10',
  71: 'Bang on the drum',
  72: 'Six dozen',
  73: 'Queen bee',
  74: 'Hit the floor',
  75: 'Strive and strive',
  76: 'Trombones',
  77: 'All the sevens',
  78: 'Heaven\'s gate',
  79: 'One more time',
  80: 'Ate nothing, Gandhi\'s breakfast',
  81: 'Stop and run',
  82: 'Straight on through',
  83: 'Late for tea',
  84: 'Waiting for',
  85: 'Staying alive',
  86: 'Between the sticks',
  87: 'Torquay in Devon',
  88: 'Two snowmen',
  89: 'Nearly there',
  90: 'Top of the shop'
};
Object.freeze(calls);

const LOG_SIZE = 5;

// Bingo caller
class BingoCaller {
  constructor(current, log, nextBtn, resetBtn) {
    this.current = current;
    this.log = log;
    this.lastIndex = null;
    this.uncalled = Object.entries(calls);

    nextBtn.addEventListener('click', (event) => {
      this.next();
    });
    resetBtn.addEventListener('click', (event) => {
      if (window.confirm('Start a new game?')) {
        this.reset();
      }
    });
  }

  reset() {
    this.lastIndex = null;
    this.current.innerHTML = '&nbsp;';
    this.log.innerHTML = '';
    this.uncalled = Object.entries(calls);
    for (let i = 1; i <= 90; i++) {
      let cell = document.getElementById('grid_'+i);
      cell.className = '';
    }
  }

  createTable() {
    let table = document.createElement('table');
    for (let y = 0; y < 9; y++) {
      let row = document.createElement('tr');
      for (let x = 1; x <= 10; x++) {
        let i = y * 10 + x;
        let cell = document.createElement('td');
        cell.id = 'grid_'+i;
        cell.innerText = '' + i;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    let container = document.getElementById('grid');
    container.innerHtml = '';
    container.appendChild(table);
  }

  next() {
    let len = this.uncalled.length;
    if (len === 0) {
      this.current.innerText = 'Game Over';
      return;
    }
    let i = Math.floor(Math.random() * len);
    let [key, val] = this.uncalled[i];
    this.uncalled.splice(i, 1); // delete at index i
    if (this.lastIndex !== null) {
      let prev = document.getElementById('grid_'+this.lastIndex);
      prev.className = 'called';
      this.prependLog(this.current.innerText);
    }
    this.current.innerText = `${key}: ${val}`;
    let cell = document.getElementById('grid_'+key);
    cell.className = 'just-called';
    this.lastIndex = key;
  }

  prependLog(text) {
    let log = document.createElement('div');
    log.innerText = text;
    if (this.log.hasChildNodes()) {
      this.log.insertBefore(log, this.log.firstChild);
      if (this.log.childElementCount > LOG_SIZE) {
        this.log.removeChild(this.log.lastElementChild);
      }
    } else {
      this.log.appendChild(log);
    }
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  let current = document.getElementById('current');
  let log = document.getElementById('log');
  let nextBtn = document.getElementById('next');
  let resetBtn = document.getElementById('reset');
  bingo = new BingoCaller(current, log, nextBtn, resetBtn);

  window.bingo = bingo;
  bingo.createTable();
});
