import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/products';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { items, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });

    const mutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        },
        onError: (error) => {
            console.error('Order submission failed:', error);
            alert('Failed to place order.');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            items,
            customer: formData,
            total
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (items.length === 0) {
        return <div className="p-4">Your cart is empty.</div>;
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <ul className="mb-2">
                    {items.map(item => (
                        <li key={item.id} className="flex justify-between">
                            <span>{item.title} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="font-bold text-xl border-t pt-2">Total: ${total.toFixed(2)}</div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    {mutation.isPending ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
