import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Masala Chai",
      category: "tea",
      price: 12.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    },
    {
      id: 2,
      name: "Green Tea",
      category: "tea",
      price: 15.5,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    },
  ]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-gray-500">
          Your Cart is Empty
        </h2>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.category}
                    </p>
                    <p className="font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="p-2 border rounded"
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="p-2 border rounded"
                  >
                    <Plus size={14} />
                  </button>

                  <p className="font-bold w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4 flex justify-between">
            <h2 className="text-xl font-bold">Subtotal</h2>
            <h2 className="text-xl font-bold">
              ${subtotal.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;