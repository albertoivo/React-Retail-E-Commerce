import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import ProductDetailPage from '../pages/ProductDetailPage';
import Layout from '../components/Layout';
import * as api from '../api/products';

// Mock the API
vi.mock('../api/products');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const renderWithProviders = (ui) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CartProvider>
                    <MemoryRouter initialEntries={['/products/1']}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route path="products/:id" element={ui} />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

describe('Add to Cart Flow', () => {
    it('updates cart count when adding an item', async () => {
        const mockProduct = {
            id: 1,
            title: 'Integration Test Product',
            price: 20,
            description: 'Test Description',
            image: 'test.jpg'
        };

        api.fetchProduct.mockResolvedValue(mockProduct);

        renderWithProviders(<ProductDetailPage />);

        // Wait for product to load
        await waitFor(() => expect(screen.getByText('Integration Test Product')).toBeInTheDocument());

        // Check initial cart count (in Layout)
        // Note: Layout might not show badge if count is 0.
        const cartLink = screen.getByRole('link', { name: /^Cart/ });
        expect(cartLink).toBeInTheDocument();

        // Find Add to Cart button
        const addButton = screen.getByText('Add to Cart');
        fireEvent.click(addButton);

        // Check if cart badge appears with 1
        // The previous implementation sends Cart (1) via text?
        // Let's check Layout.jsx:
        // <span ...>{itemCount}</span>
        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
        });
    });
});
