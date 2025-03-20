import React, { useState } from "react";
import Books from "./Books.jsx";
import Cart from "./Cart";
import "./App.css";

const App = () => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (book) => {
        setCart([...cart, book]);
    };

    const handleRemoveFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    return (
        <div className="app">
            <h1>Добро пожаловать в наш книжный магазин!</h1>
            <div className="content">
                <div className="books-container">
                    <Books onAddToCart={handleAddToCart} />
                </div>
                <div className="cart-container">
                    <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
                </div>
            </div>
        </div>
    );
};

export default App;