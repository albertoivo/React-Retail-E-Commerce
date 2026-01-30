import { describe, it, expect } from 'vitest';
import { cartReducer } from './CartContext';

describe('cartReducer', () => {
    it('adds a new item to the cart', () => {
        const initialState = { items: [] };
        const item = { id: 1, title: 'Test Product', price: 10 };
        const action = { type: 'ADD_ITEM', payload: item };
        const newState = cartReducer(initialState, action);

        expect(newState.items).toHaveLength(1);
        expect(newState.items[0]).toEqual({ ...item, quantity: 1 });
    });

    it('increments quantity of existing item', () => {
        const item = { id: 1, title: 'Test Product', price: 10 };
        const initialState = { items: [{ ...item, quantity: 1 }] };
        const action = { type: 'ADD_ITEM', payload: item };
        const newState = cartReducer(initialState, action);

        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].quantity).toBe(2);
    });

    it('removes an item from the cart', () => {
        const item = { id: 1, title: 'Test Product', price: 10 };
        const initialState = { items: [{ ...item, quantity: 1 }] };
        const action = { type: 'REMOVE_ITEM', payload: 1 };
        const newState = cartReducer(initialState, action);

        expect(newState.items).toHaveLength(0);
    });

    it('updates quantity of an item', () => {
        const item = { id: 1, title: 'Test Product', price: 10 };
        const initialState = { items: [{ ...item, quantity: 1 }] };
        const action = { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 5 } };
        const newState = cartReducer(initialState, action);

        expect(newState.items[0].quantity).toBe(5);
    });

    it('clears the cart', () => {
        const initialState = { items: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }] };
        const action = { type: 'CLEAR_CART' };
        const newState = cartReducer(initialState, action);

        expect(newState.items).toHaveLength(0);
    });
});
