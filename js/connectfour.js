///////////////////// CONSTANTS /////////////////////////////////////
$(document).ready(function() {
  const connect4 = new Connect4("#connect4")

  connect4.onPlayerMove = function() {
    $("#player").text(connect4.player);
  }

  $("#restart").click(function() {
    connect4.restart();
  })
});
///////////////////// APP STATE (VARIABLES) /////////////////////////
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
///////////////////// EVENT LISTENERS ///////////////////////////////
///////////////////// FUNCTIONS /////////////////////////////////////
class Connect4 {
  constructor(selector) {
    this.ROWS = 6;
    this.COLMS = 7;
    this.player = "red";
    this.selector = selector;
    this.isGameOver = false;
    this.onPlayerMove = function() {};
    this.createGrid();
    this.setupEventListeners();
  }

  createGrid() {
    const $board = $(this.selector);
    $board.empty();
    this.isGameOver = false;
    this.player = "red";
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
      if (that.isGameOver) return;
      const column = $(this).data("column");
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.addClass(`next-${that.player}`);
    });

    $board.on("mouseleave", ".column", function() {
      $(".column").removeClass(`next-${that.player}`);
    });

    $board.on("click", ".column.empty", function() {
      if (that.isGameOver) return;
      const column = $(this).data("column");
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data("player", that.player);

      const winner = that.checkForWinner(
        $lastEmptyCell.data("row"),
        $lastEmptyCell.data("column")
      )
      if (winner) {
        that.isGameOver = true;
        alert(`It's game over! Player ${that.player} has won.`);
        $(".column.empty").removeClass("empty");
        return;
      }

      that.player = (that.player === "red") ? "black" : "red";
      that.onPlayerMove();
      $(this).trigger("mouseenter");
    });
  }

  checkForWinner(row, column) {
    const that = this;

    function $getCell(i, j) {
      return $(`.column[data-row='${i}'][data-column='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = column + direction.j;
      let $next = $getCell(i, j);
      while (i >= 0 &&
        i < that.ROWS &&
        j >= 0 &&
        j < that.COLMS &&
        $next.data('player') === that.player
      ) {
        total++;
        i += direction.i;
        j += direction.j;
        $next = $getCell(i, j);
      }
      return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
    }

    function checkDiagonalBLtoTR() {
      return checkWin({i: 1, j: -1}, {i: 1, j: 1});
    }

    function checkDiagonalTLtoBR() {
      return checkWin({i: 1, j: 1}, {i: -1, j: -1});
    }

    function checkVerticals() {
      return checkWin({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkHorizontals() {
      return checkWin({i: 0, j: -1}, {i: 0, j: 1});
    }

    return checkVerticals() ||
      checkHorizontals() ||
      checkDiagonalBLtoTR() ||
      checkDiagonalTLtoBR();
  }
  restart () {
    this.createGrid();
    this.onPlayerMove();
  }
}
