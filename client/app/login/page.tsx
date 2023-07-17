'use client';
import './login.css';
import { FormEvent, useRef } from 'react';
import Image from 'next/image'


export default function LoginPage() {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);

  const imgWidth = Math.floor(windowWidth.current / 5) - 1;
  const imgHeight = Math.floor(windowHeight.current / 5) - 1;
  console.log(imgWidth);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="login">
      <div className='form-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">email</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className='background'>

        <Image src={"/1.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 1' />
        <Image src={"/2.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 2' />
        <Image src={"/3.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 3' />
        <Image src={"/4.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 4' />
        <Image src={"/5.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 5' />
        <Image src={"/6.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 6' />

        <Image src={"/7.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 1' />
        <Image src={"/8.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 2' />
        <Image src={"/9.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 3' />
        <Image src={"/10.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 4' />
        <Image src={"/11.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 5' />
        <Image src={"/12.jpg"} width={imgWidth} height={imgHeight} style={{ objectFit: "cover", objectPosition: 'center' }} alt='Image 6' />



      </div>
    </section>
  );
}