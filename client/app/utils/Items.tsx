import { UUID } from "crypto";
import { ItemCreated } from "../types";

export async function getUserCart() {
  const res = await fetch('http://localhost:3001/cart', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'GET',
  });

  return res;
};

export async function addToCart(item_id: UUID, amount: number) {

  const res = await fetch('http://localhost:3001/add_cart', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify({ item_id, amount }),
  });

  return res;
};

export async function addToWishlist(item_id: string, amount: number) {

  const res = await fetch('http://localhost:3001/add_wishlist', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({ item_id, amount }),
  });

  return res;
};

export async function getAllItems() {

  const res = await fetch('http://localhost:3001/load_all_items', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return res;
};

export async function getItemInfo(item_id: string) {
  const res = await fetch(`http://localhost:3001/item/${item_id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return res;
};

export async function deleteItemImage(item_id: string, fileName: string) {
  const res = await fetch(`http://localhost:3001/remove_image_item`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({item_id, fileName}),
  });

  return res;
};