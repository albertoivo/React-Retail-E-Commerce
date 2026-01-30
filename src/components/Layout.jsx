import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Layout = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">React Retail</Link>
                    <div className="space-x-4 flex items-center">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <Link to="/cart" className="hover:text-gray-300 relative">
                            Cart
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <span>Hello, {user.name}</span>
                                <button onClick={logout} className="hover:text-gray-300 text-sm border border-white px-2 py-1 rounded">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                        )}
                    </div>
                </div>
            </nav>
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-200 p-4 text-center text-gray-600">
                &copy; 2026 React Retail. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
