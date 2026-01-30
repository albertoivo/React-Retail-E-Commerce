import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <p className="mb-4">Your cart is empty.</p>
                <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {items.map(item => (
                        <li key={item.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-gray-500">${item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="w-16 border rounded p-1 text-center"
                                />
                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                    <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
                    <div className="space-x-4">
                        <button onClick={clearCart} className="text-gray-500 hover:text-gray-700">Clear Cart</button>
                        <Link to="/checkout" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
