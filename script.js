

  window.addEventListener("DOMContentLoaded", () => {
      const title = document.querySelector("#titleText");
      title.style.opacity = 0;
      setTimeout(() => { title.style.transition = "opacity 2s"; title.style.opacity = 1; }, 100);
      setTimeout(() => { title.style.transition = "opacity 1s"; title.style.opacity = 0; }, 3000);
      setTimeout(() => { title.innerText = "Let's get started!"; title.style.transition = "opacity 2s"; title.style.opacity = 1; }, 4500);

      const startBtn = document.getElementById("startBtn");
      const timeInput = document.getElementById("timeInput");
      const root = document.documentElement;
      const clock = document.querySelector(".clock");
      let animationFrame;
      let startTime, totalTime;

      function updateProgress() {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        let percent = (elapsed / totalTime) * 100;
        if (percent >= 100) {
          percent = 100;
          cancelAnimationFrame(animationFrame);
          clock.classList.remove('animate');
          setTimeout(() => root.style.setProperty('--progress', 0), 500);
        } else {
          animationFrame = requestAnimationFrame(updateProgress);
        }
        root.style.setProperty('--progress', percent);
      }

      startBtn.addEventListener("click", () => {
        // Convert minutes input to seconds
        const minutes = parseFloat(timeInput.value);
        if (isNaN(minutes) || minutes <= 0) return;
        totalTime = minutes * 60;

        cancelAnimationFrame(animationFrame);
        root.style.setProperty('--progress', 0);
        clock.classList.remove('animate');

        setTimeout(() => {
          clock.classList.add('animate');
          startTime = Date.now();
          animationFrame = requestAnimationFrame(updateProgress);
        }, 0);
      });
    });