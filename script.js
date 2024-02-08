function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function removeCookie(cname) {
    setCookie(cname, "", -1);
}

function pushToCookie(cookieName, newValue, expirationDays) {
    let currentValues = getCookie(cookieName);
    if (!currentValues) {
        currentValues = [newValue];
    } else {
        currentValues = JSON.parse(currentValues);
        currentValues.push(newValue);
    }
    const updatedValue = JSON.stringify(currentValues);
    setCookie(cookieName, updatedValue, expirationDays);
}

function reloadHistory() {

    let history = getCookie('history');
    let elHistory = document.getElementById('table_history');

    console.log(history)
    if (history) {
        history = JSON.parse(history);
        elHistory.innerHTML = '';
        history.map((item) => {
            elHistory.innerHTML += `<span>${item}</span><br>`;
        });
    } else {
        elHistory.innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    reloadHistory();
});

const arrDice = {
    1: 'gourd',
    2: 'chicken',
    3: 'deer',
    4: 'shrimp',
    5: 'fish',
    6: 'crab'
}

let elDiceOne = document.getElementById('dice1');
let elDiceTwo = document.getElementById('dice2');
let elDiceThree = document.getElementById('dice3');
let elComeOut = document.getElementById('roll');
let elDeleteHistory = document.getElementById('delete_history');
console.log(elDeleteHistory);

elComeOut.onclick = async function () {
    let result = await rollDiceNumTimes(10);
    let textResult = "";
    result.map((dice, index) => {
        let text = arrDice[dice];
        if (index === 2)
            textResult += text;
        else
            textResult += text + " - ";
    });

    pushToCookie('history', textResult, 30);
    reloadHistory();
    console.log(result, textResult);
};

elDeleteHistory.addEventListener("click", () => {
    removeCookie('history');
    reloadHistory();
});

async function rollDiceNumTimes(num) {
    for (let i = 1; i <= num; i++) {
        await new Promise(resolve => setTimeout(resolve, i * 10 + 100));
        rollDice();
    }
    return rollDice();
}

function rollDice() {

    let diceOne = Math.floor((Math.random() * 6) + 1);
    let diceTwo = Math.floor((Math.random() * 6) + 1);
    let diceThree = Math.floor((Math.random() * 6) + 1);
    for (let i = 1; i <= 6; i++) {
        elDiceOne.classList.remove('show-' + i);
        if (diceOne === i) {
            elDiceOne.classList.add('show-' + i);
        }
    }

    for (let k = 1; k <= 6; k++) {
        elDiceTwo.classList.remove('show-' + k);
        if (diceTwo === k) {
            elDiceTwo.classList.add('show-' + k);
        }
    }

    for (let j = 1; j <= 6; j++) {
        elDiceThree.classList.remove('show-' + j);
        if (diceThree === j) {
            elDiceThree.classList.add('show-' + j);
        }
    }

    return [diceThree, diceTwo, diceOne];
}