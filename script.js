const paragraphs = [
  "Bhutan, a small Himalayan kingdom nestled between India and China, is celebrated for its serene landscapes and preserved culture. The country's unique development philosophy, Gross National Happiness (GNH), prioritizes the well-being and contentment of its citizens over material wealth.",
  "Bhutan is renowned for its stunning monasteries and fortresses, known as dzongs, which stand as architectural marvels against breathtaking backdrops. The Paro Taktsang, or 'Tiger's Nest' monastery, perched precariously on a cliff, is one of Bhutan's most iconic and visited landmarks.",
  "Bhutan's capital city, Thimphu, combines modernity with traditional Bhutanese charm, offering visitors a glimpse into the nation's evolving culture. The Bhutanese people are warm and welcoming, and their culture is steeped in rich traditions, colorful festivals, and intricate art forms.",
  "Bhutan's official language is Dzongkha, and Buddhism plays a central role in the lives of its citizens. The country's environmental commitment is evident in its lush forests, diverse wildlife, and stringent conservation efforts.",
  "Bhutan's cuisine includes spicy and flavorful dishes like ema datshi (chili and cheese stew) and momo (dumplings), reflecting its distinct culinary heritage. The Land of the Thunder Dragon continues to enchant travelers with its pristine beauty, unique identity, and its steadfast preservation of tradition in a rapidly changing world.",
  "Nestled in the Eastern Himalayas, Bhutan, known as the 'Land of the Thunder Dragon,' is a place of awe-inspiring beauty and cultural richness. The kingdom's commitment to Gross National Happiness (GNH) sets it apart with its focus on the well-being of its people over economic measures.",
  "The dramatic landscapes of Bhutan are adorned with monasteries and dzongs, where faith and tradition intersect with the natural world. The iconic Paro Taktsang, or 'Tiger's Nest,' monastery clings to the cliffs, offering breathtaking vistas.",
  "Thimphu, Bhutan's capital, is a blend of tradition and modernity, where the vibrant culture thrives. The Bhutanese people warmly welcome visitors, sharing their rich heritage and participating in colorful festivals.",
  "The heart of Bhutan's culture lies in Buddhism, and it plays a central role in daily life. Dzongkha, the official language, is a testament to the nation's unique identity.",
  "Environmental conservation is paramount in Bhutan, with lush forests and diverse wildlife protected through stringent measures. The country is a sanctuary for rare species like the snow leopard and red panda.",
  "Bhutanese cuisine boasts dishes like ema datshi, a spicy chili and cheese stew, and momo, delectable dumplings that tantalize the taste buds. Culinary traditions mirror Bhutan's distinct cultural identity.",
  "The tranquil Bhutanese landscapes are ideal for outdoor enthusiasts, offering trekking, mountain biking, and bird-watching opportunities. The serene ambiance fosters inner reflection and spiritual growth.",
  "The kingdom's rich heritage is evident in its textiles, intricate paintings, and masterful woodwork. Traditional Bhutanese architecture, seen in dzongs and homes, adds to the country's unique charm.",
  "Bhutan's festivals are vibrant and captivating, featuring masked dances, colorful costumes, and religious rituals. The Tshechu festivals, celebrated annually, are a highlight of Bhutan's cultural calendar.",
  "The government of Bhutan carefully regulates tourism to preserve the nation's environment and culture. Visitors to Bhutan are required to follow sustainable travel practices.",
  "Bhutan's royal family is deeply respected, and the monarchy plays an integral role in the country's governance. The Fourth King, Jigme Singye Wangchuck, initiated many modern reforms.",
  "The Wangdue Phodrang Dzong, a magnificent fortress in central Bhutan, reflects the country's architectural splendor. Dzongs serve as religious and administrative centers in Bhutan.",
  "The Bhutanese calendar is based on the lunar system, with important religious and cultural events following these lunar dates. The New Year, known as Losar, is a significant celebration.",
  "The Dochula Pass, with its stunning views of the Himalayas, is a must-visit for travelers in Bhutan. The 108 chortens or stupas at this location are a sight to behold.",
  "In Bhutan, the protection of nature and wildlife is not just a priority but a way of life, with the nation aiming to remain carbon neutral. This commitment is seen in the pristine environment and abundant greenery."
];

const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.querySelector(".content button"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);