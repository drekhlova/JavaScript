const btnEl = document.querySelector(".btn");
let count = 0;

let initialData = [];

if (btnEl) {
  function sendReview() {
    const inputItem = document.querySelector(".product_name");
    const inputReview = document.querySelector(".reviews");
    initialData = JSON.parse(localStorage.getItem("initialData")) || [];
    try {
      if (!inputItem.value || !inputReview.value) {
        throw new Error(" Все поля должны быть заполнены!");
      }
      if (initialData.find((element) => element.product === inputItem.value)) {
        const elem = initialData.find(
          (element) => element.product === inputItem.value
        );
        elem.reviews.push({ id: ++count, review: inputReview.value });
      } else {
        initialData.push({
          product: inputItem.value,
          reviews: [{ id: ++count, review: inputReview.value }],
        });
      }
      const obj = initialData.find(
        (element) => element.product === inputItem.value
      );

      localStorage.setItem(`initialData`, JSON.stringify(initialData));
    } catch (error) {
      alert(`${error}`);
    }
    inputItem.value = "";
    inputReview.value = "";
  }

  btnEl.addEventListener("click", sendReview);
}

const container = document.querySelector(".container");

if (container) {
  const localData = JSON.parse(localStorage.getItem("initialData")) || [];

  if (localData.length === 0) {
    const pEl = document.createElement("p");
    pEl.classList.add("review");
    pEl.textContent = "Здесь еще никто не оставлял свой отзыв";
    container.appendChild(pEl);
  } else {
    const select = document.createElement("select");
    select.classList.add("vars");
    const option = document.createElement("option");
    option.textContent = "Выберите товар";
    select.appendChild(option);

    for (const item of localData) {
      const option = document.createElement("option");
      option.value = item.product;
      option.textContent = item.product;
      select.appendChild(option);
    }

    container.appendChild(select);

    const div = document.createElement("div");
    div.classList.add("block");
    container.appendChild(div);

    select.addEventListener("change", function () {
      div.textContent = "";

      let selectedIndex = select.selectedIndex;
      let type = select.options[selectedIndex].value;

      const obj = localData.find((item) => item.product === type);

      for (const review of obj.reviews) {
        const divReview = document.createElement("div");
        divReview.classList.add(`${review.id}`);

        const userName = document.createElement("p");
        userName.classList.add("review");
        const userReview = document.createElement("p");
        userReview.classList.add("review");

        userName.textContent = `User: ${review.id}`;
        userReview.textContent = `Review: ${review.review}`;

        const delEl = document.createElement("button");
        delEl.textContent = "Удалить отзыв";
        delEl.classList.add("delButton");
        delEl.id = `${review.id}`;

        divReview.appendChild(userName);
        divReview.appendChild(userReview);
        divReview.appendChild(delEl);
        div.appendChild(divReview);

        delEl.addEventListener("click", function () {
          for (const type of div.childNodes) {
            if (type.classList[0] === delEl.id) {
              div.removeChild(type);
            }
          }
          for (let i = 0; i < localData.length; i++) {
            for (let j = 0; j < localData[i].reviews.length; j++) {
              if (localData[i].reviews[j].id == delEl.id) {
                localData[i].reviews.splice(j, 1);
                if (localData[i].reviews.length === 0) {
                  localData.splice(i, 1);
                }
                localStorage.setItem("initialData", JSON.stringify(localData));
              }
            }
          }
        });
      }
    });
  }
}
