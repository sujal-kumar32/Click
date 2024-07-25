window.onload = function () {
  let startButton = document.getElementById("startButton");
  let sound = document.getElementById("sound");
  let clickableImage = document.getElementById("clickableImage");
  let duck = [
    document.getElementById("duck"),
    document.getElementById("duck1"),
  ];
  let clickCountDisplay = document.getElementById("clickCount");
  let timerDisplay = document.getElementById("timer");
  let clickCount = 0;
  let duration = 1 * 60; // 2 minutes in seconds
  let interval;

  startButton.addEventListener("click", function () {
    sound.currentTime = 0; // Reset the sound to the beginning
    sound.play();
    startTimer(duration, timerDisplay);
    startButton.disabled = true;
    clickableImage.style.display = "block";
    clickCount = 0;
    clickCountDisplay.textContent = "Clicks: " + clickCount;
  });

  clickableImage.addEventListener("click", function () {
    let randomIndex = Math.floor(Math.random() * duck.length);
    duck[randomIndex].currentTime = 0; // Reset the sound to the beginning
    duck[randomIndex].play();

    document.body.style.backgroundColor = getRandomColor();

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    clickCount++;
    clickCountDisplay.textContent = "Clicks: " + clickCount;

    moveImageRandomly();
  });

  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;
    interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(interval);
        display.textContent = "Time's up!";
        clickableImage.style.display = "none";
        startButton.disabled = false;
      }
    }, 1000);
  }

  function moveImageRandomly() {
    let gameArea = document.getElementById("gameArea");
    let maxX = gameArea.clientWidth - clickableImage.clientWidth;
    let maxY = gameArea.clientHeight - clickableImage.clientHeight;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    clickableImage.style.left = randomX + "px";
    clickableImage.style.top = randomY + "px";
  }
};
