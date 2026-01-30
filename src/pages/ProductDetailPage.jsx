import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../api/products';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useQuery({ queryKey: ['products', id], queryFn: () => fetchProduct(id) });
    const { addItem } = useCart();

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error loading product</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-500 mb-4">{product.category}</p>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <button
                            onClick={() => addItem(product)}
                            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
