//Ищем в HTML-разметке и записываем в переменные контейнер слайдера, кнопки и изображения
const sliderEl = document.querySelector(".slider");
const prevBtnEl = document.querySelector(".prev-button");
const nextBtnEl = document.querySelector(".next-button");
const paginationEl = document.querySelector(".pagination");

//Находим общее количество слайдов
const slides = Array.from(sliderEl.querySelectorAll("img"));
const slideCount = slides.length;
//0 - индекс активного слайда
let slideIndex = 0;

//Обработчик события клина на кнопку "Предыдущее изображение"
prevBtnEl.addEventListener("click", showPreviousSlide);

//Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

//Обработчик события клина на кнопку "Следующее изображение"
nextBtnEl.addEventListener("click", showNextSlide);

//Функция для показа предыдущего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера и пагинации
function updateSlider() {
    slides.forEach((slide, index) => {
      if (index === slideIndex) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });
  
    // Обновляем пагинацию
    paginationEl.innerHTML = "";
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("span");
      dot.textContent = "\u2022";
      dot.classList.add("dot");
      if (i === slideIndex) {
        dot.classList.add("active");
      }
      paginationEl.appendChild(dot);
  
      // Добавляем обработчик события клика на точку
      dot.addEventListener("click", () => {
        slideIndex = i;
        updateSlider();
      });
    }
  }

// Инициализация слайдера
updateSlider();
