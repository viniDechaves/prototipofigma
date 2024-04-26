document.addEventListener("DOMContentLoaded", function() {
    const gameList = document.getElementById("game-list");
    const addGameForm = document.getElementById("add-game-form");

    addGameForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const gameNameInput = document.getElementById("game-name");
        const gameCategoryInput = document.getElementById("game-category");
        const gameName = gameNameInput.value;
        const gameCategory = gameCategoryInput.value;
        if (gameName && gameCategory) {
            addGameToList(gameName, gameCategory);
            gameNameInput.value = "";
            gameCategoryInput.value = "";
        }
    });

    function addGameToList(name, category) {
        const li = document.createElement("li");
        li.textContent = `${name} - ${category}`;
        gameList.appendChild(li);
    }
});
