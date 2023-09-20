import { UUID } from "crypto";
import { ItemCreated, ListType } from "../types";

export async function addToCart(item_id: UUID, amount: number) {

  console.log('RUNNING');

  const res = await fetch('http://localhost:3001/add_cart', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify({ item_id, amount }),
  });

  if (res.ok) {
    const data: ListType = await res.json();
    return data;
  } else {
    return 500;
  }
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

  if (res.ok) {
    const data: ListType = await res.json();
    return data;
  } else {
    return 500;
  }
};

export async function getAllItems() {

  const res = await fetch('http://localhost:3001/load_all_items', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  if (res.ok) {
    const data: ItemCreated[] = await res.json();
    return data;
  } else {
    return 500;
  }
};

export async function getItemInfo(item_id: string) {
  const res = await fetch(`http://localhost:3001/item/${item_id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  if (res.ok) {
    const data: ItemCreated = await res.json();
    return data;
  } else if (res.status === 404) {
    return 404;
  } else {
    return 500;
  }
};