const books = [
    {
        title: "Война и мир",
        author: "Лев Толстой",
        description: "Роман, описывающий жизнь русского общества во времена наполеоновских войн.",
        price: 1000,
        cover: "1book.jpg",
    },
    {
        title: "Гамлет",
        author: "Уильям Шекспир",
        description: "Трагедия о датском принце Гамлете, который стремится отомстить за убийство своего отца.",
        price: 2000,
        cover: "2book.jpg",
    },
    {
        title: "Одиссея",
        author: "Гомер",
        description: "Поэма, рассказывающая о долгом и полном опасностей путешествии Одиссея.",
        price: 3000,
        cover: "3book.jpg",
    },
];

let cart = {};

function renderBooks(booksArray) {
    const catalog = document.getElementById("book-catalog");
    catalog.innerHTML = "";

    booksArray.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML =
            `<div class="book-card__img">
                <img src="${book.cover}" alt="Обложка книги" class="book-cover">
            </div>
            <div class="book-card__info">
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">Автор: ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <p class="book-price">Цена: ${book.price}₽</p>
            </div>
            <button class="add-to-cart-btn">Добавить в корзину</button>`;

        bookCard.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            addToCart(book.title);
        });

        catalog.appendChild(bookCard);
    });
}

//фильтрация
function filterBooksByPrice(maxPrice) {
    return books.filter((book) => book.price < maxPrice);
}

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        if (button.id === "filter-all") {
            renderBooks(books);
        } else if (button.id === "filter-less-than-2500") {
            renderBooks(filterBooksByPrice(2500));
        } else if (button.id === "filter-more-than-1500") {
            renderBooks(books.filter((book) => book.price > 1500));
        }
    });
});

//добавление книги
function addToCart(bookTitle) {
    if (cart[bookTitle]) {
        cart[bookTitle]++;
    } else {
        cart[bookTitle] = 1;
    }
    updateCart();
}

//удаление книги
function removeFromCart(bookTitle) {
    if (cart[bookTitle]) {
        cart[bookTitle]--;
        if (cart[bookTitle] === 0) {
            delete cart[bookTitle]; 
        }
        updateCart();
    }
}

//обновление корзины
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    for (const [title, quantity] of Object.entries(cart)) {
        const li = document.createElement("li");
        li.textContent = `${title} (${quantity} шт.)`;
        li.addEventListener("click", () => {
            removeFromCart(title);
        });
        cartItems.appendChild(li);
    }
}

//таймер
let timeLeft = 10; 
const countdownElement = document.getElementById("countdown");

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        countdownElement.textContent = "Акция завершена!";
        console.log("Акция завершена!"); 
    } else {
        timeLeft--;
    }
}

const timerInterval = setInterval(updateTimer, 1000);

document.getElementById("filter-all").classList.add("active"); 
renderBooks(books);