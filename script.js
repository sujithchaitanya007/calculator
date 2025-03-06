function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteValue() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(document.getElementById("display").value);
        if (isNaN(result)) {
            document.getElementById("display").value = "Error";
        } else {
            document.getElementById("display").value = result;
        }
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let bubblesContainer = document.querySelector(".bubbles");
    for (let i = 0; i < 20; i++) {
        let bubble = document.createElement("span");
        let size = Math.random() * 30 + 20;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.left = Math.random() * 100 + "%";
        bubble.style.animationDuration = Math.random() * 10 + 10 + "s";
        bubblesContainer.appendChild(bubble);
    }
});
