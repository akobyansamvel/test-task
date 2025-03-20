import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";

const BookCatalog = ({ onAddToCart }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/akobyansamvel/test-task/books")
            .then((response) => {
                const formattedBooks = response.data.slice(0, 10).map((post) => ({
                    id: post.id,
                    title: post.title,
                    author: post.author,
                    description: post.description,
                    price: post.price, 
                    cover: post.cover, 
                }));
                setBooks(formattedBooks);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="book-catalog">
            {books.map((book) => (
                <div key={book.id} className="book-card">
                    <div className="book-card__img">
                        <img src={require(`../assets/${book.cover}`)} alt={book.title} className="book-cover" />
                    </div>
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author">Автор: {book.author}</p>
                    <p className="book-description">{book.description}</p>
                    <p className="book-price">Цена: {book.price}₽</p>
                    <button className="add-to-cart-btn" onClick={() => onAddToCart(book)}>
                        Добавить в корзину
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BookCatalog;