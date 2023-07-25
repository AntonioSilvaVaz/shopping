'use client';
import './login.css';
import { FormEvent, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';

import { toast } from 'react-toastify';
import Notification from '../components/notification';

export default function LoginPage() {

  const [message, setMessage] = useState<string>('');
  const notify = () => toast(message);

  const allImagePaths: string[] = [];
  for (let index = 1; index < 21; index++) {
    const imagePath = `/login_images/${index}.jpg`;
    allImagePaths.push(imagePath);
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('Failed Login');
    notify();
  }

  return (
    <section id="login">
      <Notification />
      <div className='form-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <h6>
                email
              </h6>
            </label>
            <input type="email" id="email" name="email" required />
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
        <div>
          <h5>Don't have an account?
            <br />
            <Link style={{ color: 'white' }} href={'/register'}>
              <u>
                Register Now
              </u>
            </Link>
          </h5>
        </div>
      </div>

      <div className='background'>

        {allImagePaths.map((imagePath: string, index: number) => {
          return (
            <div key={imagePath} className='image-container'>
              <Image src={imagePath} fill={true} objectFit='cover' objectPosition='100% 30%' alt={`Image ${index}`} />
            </div>
          )
        })}

      </div>
    </section>
  );
}