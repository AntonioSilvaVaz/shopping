import { UserRegisteredType, UserLoginInformation, ItemCreated, UserInfo } from "../types";

export async function registerUser(userInformation: FormData) {

  const res = await fetch('http://localhost:3001/create_user', {
    method: 'POST',
    body: userInformation,
    credentials: 'include',
  });

  return res;
};

export async function loginUser(userInformation: UserLoginInformation) {

  const res = await fetch('http://localhost:3001/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(userInformation),
  });

  return res;
};

export async function validateUser() {
  const res = await fetch('http://localhost:3001/validate_user', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include',
  });

  return res;
};

export async function getAnUserItems(user_id: string) {

  const res = await fetch('http://localhost:3001/user_items', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ user_id }),
  });

  return res;
};

export async function getAnUserInfo(user_id:string) {
  const res = await fetch('http://localhost:3001/user_info', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ user_id }),
  });

  return res;
};