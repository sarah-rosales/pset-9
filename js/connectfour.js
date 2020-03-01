///////////////////// CONSTANTS /////////////////////////////////////
///////////////////// APP STATE (VARIABLES) /////////////////////////
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
///////////////////// EVENT LISTENERS ///////////////////////////////
///////////////////// FUNCTIONS /////////////////////////////////////
$(document).ready(function() {
  const connect4 = new Connect4("#connect4")
});

class Connect4 {
  constructor(selector) {
    this.ROWS = 6;
    this.COLMS = 7;
    this.selector = selector;
    this.createGrid();
  }

  createGrid() {
    const $board = $(this.selector);
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $("<div>")
        .addClass("row");
      for (let column = 0; column < this.COLMS; column++) {
        const $column = $("<div>")
          .addClass("column empty");
        $row.append($column);
      }
      $board.append($row);
    }
  }
}
