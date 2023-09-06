import { UserRegisteredType, UserLoginInformation } from "../types";

export async function registerUser(userInformation: FormData) {

  const res = await fetch('http://localhost:3001/create_user', {
    method: 'POST',
    body: userInformation,
  });

  if (res.ok) {
    return 'User registered';
  } else if (res.status === 409) {
    return 'User already exists';
  } else {
    return 'Server failed';
  }

};

export async function loginUser(userInformation: UserLoginInformation) {

  const res = await fetch('http://localhost:3001/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(userInformation),
  });

  if (res.ok) {
    const data: UserRegisteredType = await res.json();
    return { text: 'Logged in', data };
  } else if (res.status === 400) {
    return { text: 'Wrong credentials' };
  } else if (res.status === 404) {
    return { text: 'User not found' };
  } else {
    return { text: 'Server failed' };
  }
};