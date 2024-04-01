// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.
// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const userInput = document.querySelector(".user_input");
const button = document.querySelector(".btn");
const reviews = document.querySelector(".reviews");
const errorBlock = document.querySelector(".error_msg");

//Задаем заголовки и абзацы для отзывов в initialData
initialData.forEach((element) => {
  const productName = document.createElement("h3");
  productName.textContent = element.product;
  reviews.appendChild(productName);
  element.reviews.forEach((review) => {
    const defaultReview = document.createElement("p");
    defaultReview.textContent = review.text;
    reviews.appendChild(defaultReview);
  });
});

button.addEventListener("click", function () {
  try {
    if (
      userInput.value.trim().length < 50 ||
      userInput.value.trim().length > 500
    ) {
      throw new Error(
        alert(
          "Длина вашего отзыва должна быть не менее 50 и не более 500 символов."
        )
      );
    }
    const reviewElem = document.createElement("p");
    reviewElem.textContent = userInput.value;
    reviews.appendChild(reviewElem);
    errorBlock.textContent = "";
  } catch (error) {
    errorBlock.textContent = error.message;
  }
  //Очищаем поле ввода
  document.querySelector(".user_input").value = "";
});
