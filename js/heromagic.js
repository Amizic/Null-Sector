function randomHex() {
    return Math.floor(Math.random() * 0xFFFF)
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");
}

function hexScramble(element, duration = 1800, speed = 40) {
    const originalHTML = element.innerHTML;

    // Extract text parts
    const temp = document.createElement("div");
    temp.innerHTML = originalHTML;

    const spanText = temp.querySelector("span")?.textContent || "";
    const fullText = temp.textContent;

    const chars = Array.from(fullText);
    const startTime = Date.now();

    const interval = setInterval(() => {
        const progress = (Date.now() - startTime) / duration;

        if (progress >= 1) {
            clearInterval(interval);
            element.innerHTML = originalHTML;
            return;
        }

        let result = "";
        let charIndex = 0;

        // Walk through original DOM structure
        temp.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;

                for (let ch of text) {
                    const isSpace = ch === " ";

                    let displayChar;

                    if (isSpace) {
                        displayChar = " ";
                    } else if (charIndex / chars.length < progress) {
                        // LOCKED CHARACTER -> wrap in span with class
                        displayChar = `<span class="revealed">${ch}</span>`;
                    } else {
                        // SCRAMBLE
                        displayChar = `<span class="scrambling">${randomHex()}</span>`;
                    }

                    result += displayChar;
                    charIndex++;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Preserve existing span (NULL stays intact)
                const text = node.textContent;
                result += `<span class="${node.className}">`;

                for (let ch of text) {
                    const isSpace = ch === " ";

                    let displayChar;

                    if (isSpace) {
                        displayChar = " ";
                    } else if (charIndex / chars.length < progress) {
                        displayChar = `<span class="revealed">${ch}</span>`;
                    } else {
                        displayChar = `<span class="scrambling">${randomHex()}</span>`;
                    }

                    result += displayChar;
                    charIndex++;
                }

                result += `</span>`;
            }
        });

        element.innerHTML = result;
    }, speed);
}

// RUN
if (!sessionStorage.getItem("hexScramblePlayed")) {
    hexScramble(document.getElementById("hero-heading"), 2200, 35);
    hexScramble(document.getElementById("hero-under-heading"), 2200, 35);

    sessionStorage.setItem("hexScramblePlayed", "true");
}