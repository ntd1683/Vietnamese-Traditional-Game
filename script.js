const arrDice = {
    1: 'bầu',
    2: 'gà',
    3: 'nai',
    4: 'tôm',
    5: 'cá',
    6: 'cua'
}

// Disable Devtools
console.warn("Đừng mở nếu bạn muốn chơi vui vẻ!");
console.warn("Don't open if you want to have fun!");
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 123) { // F12
        event.preventDefault();
    }
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) { // Ctrl + Shift + I
        event.preventDefault();
    }
});

function playRoll() {
    elContentRollDice.classList.remove("hidden");
    elRollAdd.classList.remove("hidden");
    elContent.classList.add("hidden");
}
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
    elContentRollDice.classList.add("hidden");
    elRollAdd.classList.add("hidden");

    if (getCookie('cookies-notification') !== "") {
        elCookie.classList.add("hidden");
    }
});

const elDiceOne = document.getElementById('dice1');
const elDiceTwo = document.getElementById('dice2');
const elDiceThree = document.getElementById('dice3');
const elComeOut = document.getElementById('roll');
const elDeleteHistory = document.getElementById('delete_history');
const elContent = document.getElementById('container_content');
const elContentRollDice = document.getElementById('container_roll_dice');
const elRollAdd = document.getElementById('container_additional');

const elCookie = document.getElementById("cookies");
const elCookieBtnClose = document.getElementById("cookies-close");

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
    let confirm = window.confirm("Bạn có chắc chắn muốn xóa lịch sử không?");

    if (!confirm) return;

    removeCookie('history');
    reloadHistory();
    alert("Xóa lịch sử thành công!");
});

elCookieBtnClose.addEventListener("click", () => {
    elCookie.classList.add("hidden");
    setCookie('cookies-notification', 'true', 30);
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

    return [diceOne, diceTwo, diceThree];
}

const toggleButton = document.getElementById('toggleButton');
const audioPlayer = document.getElementById('audioPlayer');
const audioPlay = document.getElementById('play_music');
const audioPause = document.getElementById('pause_music');

function toggleAudio() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        audioPause.classList.remove("hidden");
        audioPlay.classList.add("hidden");
    } else {
        audioPlayer.pause();
        audioPlay.classList.remove("hidden");
        audioPause.classList.add("hidden");
    }
}

// Gán sự kiện click cho nút
toggleButton.addEventListener('click', toggleAudio);