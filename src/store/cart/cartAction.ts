import { CategoryItem } from "../categories/categoryTypes";
import { CART_ACTION_TYPES, CartItem } from "./cartTypes";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/ReducerUtils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem );
    }
      
    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if(existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem );
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItem);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItem = removeCartItem(cartItems, cartItemToRemove); 
    return setCartItems(newCartItem);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItem = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItem);
};


