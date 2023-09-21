'use client';
import { useParams, useRouter } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '@/app/redux/store';
import './Edit.css';
import { deleteItemImage } from '@/app/utils/Items';
import { toast } from 'react-toastify';

export default function Edit() {

  const { product_id }: any = useParams();
  const router = useRouter();

  const product = useAppSelector((state) => state.products.value.products.filter(item => {
    if (item.item_id === product_id) {
      return item
    }
  }))[0];

  async function deleteImage(fileName: string) {
    const res = await deleteItemImage(product_id, fileName);

    const data = await res.json();

    if(res.status === 201){
      toast('IMAGE DELETED');
    } else if(res.status === 400){
      toast('Image already deleted');
    } else if(res.status === 403){
      toast('404')
      // router.push('/403');
    } else if(res.status === 500){
      toast('500')
      // router.push('/500');
    }

  }

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
                <AiFillDelete className='icon pointer' onClick={(e) => deleteImage(imgPath)} />
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