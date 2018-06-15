$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $playerContainer = $(".player-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deletePlayer);
  $(document).on("click", "button.score", toggleComplete);
  $(document).on("click", ".player-item", editPlayer);
  $(document).on("keyup", ".player-item", finishEdit);
  $(document).on("blur", ".player-item", cancelEdit);
  $(document).on("submit", "#player-form", insertPlayer);

  // Our initial todos array
  var players = [];

  // Getting todos from database when page loads
  getPlayers();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    $playerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < players.length; i++) {
      rowsToAdd.push(createNewRow(players[i]));
    }
    $playerContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getPlayers() {
    $.get("/api/players", function(data) {
      console.log(data);
      
      players = data;
      initializeRows(); 
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deletePlayer(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/players/" + id
    }).then(getPlayers);
  }

  // This function handles showing the input box for a user to edit a todo
  function editPlayer() {
    var currentPlayer = $(this).data("player");
    $(this).children().hide();
    $(this).children("input.edit").val(currentPlayer.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var player = $(this).parent().data("player");
    player.score = !player.score;
    updatePlayer(player);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedPlayer = $(this).data("player");
    if (event.which === 13) {
      updatedPlayer.text = $(this).children("input").val().trim();
      $(this).blur();
      updatePlayer(updatedPlayer);
    }
  }

  // This function updates a todo in our database
  function updatePlayer(player) {
    $.ajax({
      method: "PUT",
      url: "/api/players",
      data: player
    }).then(getPlayers);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentPlayer = $(this).data("player");
    if (currentPlayer) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentPlayer.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(player) {
    var $newInputRow = $(
      [
        "<li class='list-group-item player-item'>",
        "<span>",
        player.name,
        "</span>",
        "<span>",
        player.score,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", player.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("player", player);
    if (player.score) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertPlayer(event) {
    event.preventDefault();
    var player = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/players", player, getPlayers);
    $newItemInput.val("");
  }
});
