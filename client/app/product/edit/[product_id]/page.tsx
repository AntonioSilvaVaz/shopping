'use client';
import { useParams } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '@/app/redux/store';
import './Edit.css';

export default function Edit() {

  const { product_id }: any = useParams();

  const product = useAppSelector((state) => state.products.value.products.filter(item => {
    if (item.item_id === product_id) {
      return item
    }
  }))[0];

  return (
    <section id='edit'>
      <div className='name'>
        <input type="text" />
        <h3>{product?.product_name}</h3>
      </div>
      <div className='image-container'>
        {
          product?.product_pictures.map((imgPath, index) => {
            return (
              <div className='image-holder'>
                <AiFillDelete className='icon pointer' />
                <img key={index} src={`http://localhost:3001/images/item_pictures/${imgPath}`} alt="" />
              </div>
            )
          }
          )
        }
      </div>
      <div className='description'>
        <p>{product?.product_description}</p>
      </div>
      <div className='price'>
        <h5>{product?.product_price}</h5>
      </div>
    </section>
  )
};