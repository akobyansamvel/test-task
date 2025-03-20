import React from "react";
import "./Cart.css";

const Cart = ({ cart, onRemoveFromCart }) => {
    return (
        <div className="cart">
            <h2>Корзина</h2>
            <ul className="cart-items">
                {cart.map((item, index) => (
                    <li key={index} onClick={() => onRemoveFromCart(index)}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;