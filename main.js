const board = document.querySelector(".gameboard");

board.addEventListener("click", placeTile, false);

function placeTile(e) {
    if(e.target !== e.currentTarget) { 
        const clickedTile = e.target.id;
        console.log(clickedTile);
        const currentButton = document.getElementById(clickedTile);
        if (currentButton.innerHTML.trim() == "") {
            currentButton.innerHTML = "X"
        }
        
    }
}

const Player = (name, marker) => {
    name,
    marker

}

