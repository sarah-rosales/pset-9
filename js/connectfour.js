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
    this.player = "red";
    this.selector = selector;
    this.createGrid();
    this.setupEventListeners();
  }

  createGrid() {
    const $board = $(this.selector);
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $("<div>")
        .addClass("row");
      for (let column = 0; column < this.COLMS; column++) {
        const $column = $("<div>")
          .addClass("column empty")
          .attr("data-column", column)
          .attr("data-row", row);
        $row.append($column);
      }
      $board.append($row);
    }
  }

  setupEventListeners() {
    const $board = $(this.selector);
    const that = this;

    function findLastEmptyCell(column) {
      const cells = $(`.column[data-column="${column}"]`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass("empty")) {
          return $cell;
        }
      }
      return null;
    }

    $board.on("mouseenter", ".column.empty", function() {
      const column = $(this).data("column");
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.addClass(`next-${that.player}`);
    });

    $board.on("mouseleave", ".column", function() {
      $(".column").removeClass(`next-${that.player}`);
    });

    $board.on("click", ".column.empty", function() {
      const column = $(this).data("column");
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      that.player = (that.player === "red") ? "black" : "red";
      $(this).trigger("mouseenter");
    });
  }
}
