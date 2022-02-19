let keys = ["F", "F'", "F2", "R", "R'", "R2", "U", "U'", "U2"];
corrguess = []
guesses = 0
currguess = []
cdict = []
const ROWS = 10;
const COLS = 8;

async function main(url) {
    let data = await fetch(url);
    let rawData = await data.text();
    let rows = rawData.split("\r\n");
    let rowNum = rows.length;
    cubledict = {};
    for (i = 1; i < rowNum; i++) {
        let row = rows[i];
        let elements = row.split(",");
        cubledict[i] = elements;
    };
    return new Promise((resolve, reject) => {
        if (1 in cubledict) {
            resolve(cubledict)
        }
        else {
            reject("Error loading CSV")
        }
    }).then((cd) => {
        x = Math.floor(1000 * Math.random())
        gamedata = cd[x]
        for (let i = 1; i < gamedata.length; i++) {
            corrguess.push(gamedata[i])
        }
        document.getElementById("scramble").innerHTML = "Scramble: " + gamedata[0]
        generateKeyboard();
        generateGrid();
    }).catch((message) => {
        console.log(message)
    })
}
main("cuble.csv");
console.log(cdict);

function generateGrid() {
    container = document.getElementsByClassName("guess-container")[0]
    for (let i = 0; i < ROWS; i++) {
        row_container = document.createElement("div")
        row_container.setAttribute("class", "grid-row")
        lpadding = document.createElement("div")
        lpadding.setAttribute("class", "grid-padding")
        row_container.appendChild(lpadding)
        for (let j = 0; j < COLS; j++) {
            _square = document.createElement("div")
            _square.setAttribute("class", "black-square")
            _square.setAttribute("id", `${i},${j}`)
            row_container.appendChild(_square)
        }
        container.appendChild(row_container)
    }
}

function endTurn() {
    let correct_moves = 0
    if (currguess.length === 8) {
        for (let i = 0; i < 8; i++) {
            _sq = document.getElementById(`${guesses},${i}`)
            if (currguess[i] === corrguess[i]) {
                _sq.setAttribute("class", "green-square")
                correct_moves ++;
            }
            else if (corrguess.includes(currguess[i])) {
                _sq.setAttribute("class", "yellow-square")
            }
            else {
                _sq.setAttribute("class", "red-square")
            }
        }
        guesses ++;
        currguess = [];
        if (correct_moves === 8) {
            alert(`You Won in ${guesses} guesses!`)
        }
        else if (guesses > 9) {
            alert(`Game over, correct solution: ${corrguess}`)
        }
    }
}

function applyKey(k) {
    if (k != "undo" && k != "submit" && currguess.length < 8) {
        _sq = document.getElementById(`${guesses},${currguess.length}`);
        _sq.innerHTML = `${k}`;
        currguess.push(k)
    }
    else if (k == "undo" && currguess.length > 0) {
        _sq = document.getElementById(`${guesses},${currguess.length - 1}`);
        _sq.innerHTML = "";
        currguess.pop();
    }
    else if (k == "submit" && currguess.length === 8) {
        endTurn();
    }
}

function generateKeyboard() {
    container = document.getElementsByClassName("keyboard")[0]
    // Valid Moves
    for (let i = 0; i < 9; i++) {
        _key = document.createElement("div")
        _key.setAttribute("class", "key")
        _key.setAttribute("onclick", `applyKey("${keys[i]}")`)
        _key.innerHTML = keys[i]
        container.appendChild(_key)
    }
    // Undo Move
    _key = document.createElement("div")
    _key.setAttribute("class", "key")
    _key.setAttribute("onclick", `applyKey("undo")`)
    _key.innerHTML = "undo"
    container.appendChild(_key)
    // Apply Scramble
    _key = document.createElement("div")
    _key.setAttribute("class", "key")
    _key.setAttribute("onclick", `applyKey("submit")`)
    _key.innerHTML = "submit"
    container.appendChild(_key)
}