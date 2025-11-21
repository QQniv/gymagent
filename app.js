(function () {
    const tg = window.Telegram && window.Telegram.WebApp;
  
    // Расширяемся на весь экран мини-аппа
    if (tg) {
      tg.expand();
    }
  
    // Адаптация под тему Telegram
    function applyTheme() {
      if (!tg) return;
  
      const theme = tg.colorScheme; // "light" или "dark"
      if (theme === "light") {
        document.body.classList.add("telegram-light");
      } else {
        document.body.classList.remove("telegram-light");
      }
    }
  
    applyTheme();
  
    // Подставляем имя пользователя
    const userChip = document.getElementById("user-chip");
    const userNameSpan = document.getElementById("user-name");
    const welcomeText = document.getElementById("welcome-text");
  
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const user = tg.initDataUnsafe.user;
      const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  
      if (userNameSpan) {
        userNameSpan.textContent = fullName || "Ты";
      }
      if (welcomeText) {
        welcomeText.textContent = "Привет, " + (fullName || "спортсмен") + " 👋";
      }
    } else {
      if (userNameSpan) {
        userNameSpan.textContent = "Гость";
      }
    }
  
    // Пока нет реальных данных профиля — оставим заглушку
    const summaryTitle = document.getElementById("summary-title");
    const summarySubtitle = document.getElementById("summary-subtitle");
    const summaryBadge = document.getElementById("summary-badge");
  
    // TODO: позже будем дергать бэкенд по user_id и подтягивать статус плана
    // сейчас просто отображаем базовый текст
  
    // Обработка кликов по карточкам
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const action = card.getAttribute("data-action");
  
        switch (action) {
          case "profile":
            // позже: открыть экран профиля
            tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred("light");
            console.log("Открыть профиль");
            break;
          case "plan":
            console.log("Открыть план тренировок");
            break;
          case "today":
            console.log("Открыть тренировку на сегодня");
            break;
          case "calendar":
            console.log("Открыть календарь");
            break;
          case "nutrition":
            console.log("Открыть питание");
            break;
          case "library":
            console.log("Открыть библиотеку упражнений");
            break;
          default:
            console.log("Неизвестное действие", action);
        }
      });
    });
  })();
