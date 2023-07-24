'use client';
import './login.css';
import { FormEvent } from 'react';
import Image from 'next/image';

export default function LoginPage() {

  const allImagePaths: string[] = [];
  for (let index = 1; index < 11; index++) {
    const imagePath = `/login_images/${index}.jpg`;
    allImagePaths.push(imagePath);
  }


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="login">
      <div className='form-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <h6>
                email
              </h6>
            </label>
            <input type="text" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">
              <h6>
                password
              </h6>
            </label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">
            <h5>
              Login
            </h5>
          </button>
        </form>
      </div>
      <div className='background'>

        {allImagePaths.map((imagePath: string, index: number) => {
          return (
            <div key={imagePath} className='image-container'>
              <Image src={imagePath} fill={true} objectFit='cover' alt={`Image ${index}`} />
            </div>
          )
        })}



      </div>
    </section>
  );
}