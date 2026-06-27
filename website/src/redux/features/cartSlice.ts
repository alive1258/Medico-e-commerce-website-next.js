import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ১. কার্ট আইটেমের জন্য টাইপ ডিফাইন করা
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// ২. কার্ট স্টেটের জন্য টাইপ বা ইন্টারফেস ডিফাইন করা
interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const calculateTotals = (state: CartState) => {
  state.totalQuantity = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  state.totalAmount = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id,
      );

      if (!existingItem) {
        state.cartItems.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
      calculateTotals(state);
    },

    REMOVE_FROM_CART: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
      calculateTotals(state);
    },

    DELETE_ITEM: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      calculateTotals(state);
    },

    CLEAR_CART: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { ADD_TO_CART, REMOVE_FROM_CART, DELETE_ITEM, CLEAR_CART } =
  cartSlice.actions;
export default cartSlice.reducer;
