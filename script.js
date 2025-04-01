document.addEventListener("DOMContentLoaded", () => {
    const bubbleContainer = document.querySelector(".bubbles");
    const fishContainer = document.querySelector(".fishes");
    function createBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.cssText = `
            width: 85px;
            height: 85px;
            left: ${Math.random() * 100}%;
            animation-duration: ${20 + Math.random() * 20}s;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.5};
            bottom: -10px;
            --float-height: ${80 + Math.random() * 20}vh;
        `;
        bubbleContainer.appendChild(bubble);
        setTimeout(() => bubble.remove(), 50000);
    }
    setInterval(createBubble, 2000);
    function createFish() {
        const fish = document.createElement("img");
        fish.src = Math.random() > 0.5 ? "fish.png" : "fishorange.png";
        fish.className = Math.random() > 0.5 ? "ltr" : "rtl";
        fish.style.cssText = `
            width: ${30 + Math.random() * 50}px;
            top: ${Math.random() * window.innerHeight * 0.95}px;
            animation-duration: ${40 + Math.random() * 60}s;
            animation-delay: ${Math.random() * 10}s;
            opacity: ${0.6 + Math.random() * 0.4};
        `;
        fishContainer.appendChild(fish);
    }
    function populateFish() {
        fishContainer.innerHTML = "";
        for (let i = 0; i < 10; i++) createFish();
    }
    window.addEventListener("resize", populateFish);
    populateFish();
});

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function appendValue(value) {
    let display = document.getElementById("display");
    let lastChar = display.value.slice(-1);
    if (isOperator(value) && (isOperator(lastChar) || lastChar === "√")) return;
    if (value === "√") {
        if (display.value === "" || isOperator(lastChar)) {
            display.value += value;
        } else {
            display.value += "*√";
        }
        return;
    }
    display.value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    try {
        let expression = document.getElementById("display").value
            .replace(/÷/g, "/")
            .replace(/×/g, "*")
            .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")
            .replace(/(\d+)\s*√/g, "$1*Math.sqrt")
            .replace(/(\d+)\^(\d+)/g, "Math.pow($1, $2)");
        let result = Function('"use strict"; return (' + expression + ')')();
        
        if (isNaN(result) || !isFinite(result)) {
            document.getElementById("display").value = "Error";
            setTimeout(clearDisplay, 1000);
        } else {
            document.getElementById("display").value = Number(result.toFixed(4));
        }
    } catch (error) {
        document.getElementById("display").value = "Error";
        setTimeout(clearDisplay, 1000);
    }
}
