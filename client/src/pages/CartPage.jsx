import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-red-600 mb-3">
            ☕ Your cart is empty
          </h2>

          <p className="text-gray-500 mb-6">
            Explore our menu and add your favorite coffee or tea.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.imageUrl ||
                      item.image ||
                      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={item.coffeeTitle || item.title || item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {item.coffeeTitle || item.title || item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.category || "Coffee"}
                    </p>

                    <p className="font-bold">₹{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseQty(item._id))}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item._id))}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <Plus size={14} />
                  </button>

                  <p className="font-bold w-24 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 border-t pt-4 flex justify-between">
            <h2 className="text-xl font-bold">Subtotal</h2>

            <h2 className="text-xl font-bold">₹{totalPrice.toFixed(2)}</h2>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-right">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
