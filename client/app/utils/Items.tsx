import { ItemCreated, ListType } from "../types";

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

export async function getUserWishlist() {
  const res = await fetch('http://localhost:3001/wishlist', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'GET',
  });

  return res;
};

export async function addToCart(item_id: string, amount: number) {

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
    next: {
      revalidate: 10,
    }
  });

  console.log(res);

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
    body: JSON.stringify({ item_id, fileName }),
  });

  return res;
};

export async function getAllItemsInfo(data: ListType) {
  const dataInfo: ItemCreated[] = [];

  for (let index = 0; index < data.list.length; index++) {

    const item = data.list[index];
    const itemInfoRes = await getItemInfo(item.item_id);
    if (itemInfoRes.status !== 404 && itemInfoRes.status !== 500) {
      const info = await itemInfoRes.json();
      dataInfo.push(info);
    };
  };

  return dataInfo;
};

export async function createProduct(formData: FormData) {
  const res = await fetch(`http://localhost:3001/create_item`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  });

  return res;
};

export async function updateProduct(formData:FormData) {
  const res = await fetch(`http://localhost:3001/update_item`, {
    method: 'PUT',
    credentials: 'include',
    body: formData
  });

  return res;
};

export async function deleteProduct(item_id: string) {
  const res = await fetch(`http://localhost:3001/delete_item/${item_id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  return res;
};