import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { data: products, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error loading products</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="font-semibold text-lg">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline mt-2 block">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
