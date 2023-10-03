import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './createItem.module.css';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/app/utils/Items';
import { ItemCreated } from '@/app/types';
import { toast } from "react-toastify";
import Notification from '../notification/notification';

export default function CreateItem({ setShowCreateItem }: { setShowCreateItem: any }) {

  const [imagesSelected, setImageSelected] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const router = useRouter();

  function closeShowCreateItem() {
    setShowCreateItem(false);
  };

  const changePicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const imagesPromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagesPromises).then((imageResults) => {
        setImageSelected((curr) => {
          return [...curr, ...imageResults];
        });
      });
    }
  };


  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createProduct(formData);
    if (res.ok) {
      const data: ItemCreated = await res.json();
      router.push(`/product/${data.item_id}`);
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500')
    } else if (res.status === 400) {
      const data = await res.json();
      console.log(data);

      toast('Missing information');
    }
  };

  return (
    <div className={styles.holder}>
      <Notification />

      <div className={styles.create_item}>

        <button onClick={closeShowCreateItem} className={`${styles.close} pointer`}>
          <h3>X</h3>
        </button>

        <h2>Your new product</h2>

        <form className={styles.form} onSubmit={submitForm}>

          <div>
            <label htmlFor="product_name"><h6>Title:</h6></label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)}
              type="text" name="product_name" id='product_name' />
          </div>

          <div>
            <label htmlFor="product_description"><h6>Description:</h6></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              required className={styles.description} name="product_description" id='product_description'>
            </textarea>
          </div>

          <div className={styles.price}>
            <label htmlFor="product_price"><h6>Price:</h6></label>
            <input required value={price} onChange={(e) => setPrice(e.target.value)}
              type="number" name="product_price" id='product_price' />
          </div>

          <div>
            <label htmlFor="product_region"><h6>Region:</h6></label>
            <input required value={region} onChange={(e) => setRegion(e.target.value)}
              type="text" name="product_region" id='product_region' />
          </div>


          <div className={styles.button_create_image}>
            <label htmlFor="product_pictures"><h6>Add image</h6></label>
            <input required type="file" name="product_pictures"
              id='product_pictures' accept=".jpg, .jpeg, .png, .gif" multiple onChange={changePicture}
            />
          </div>

          <div className={styles.all_images_container}>
            {imagesSelected.map((item, index) => {
              return (
                <div key={index} className={styles.img_container}>
                  <img src={item} alt="Image selected" />
                </div>
              )
            })}
          </div>

          <button type='submit' className={`${styles.publish} pointer`}>
            <h4>Publish Item</h4>
          </button>

        </form>

      </div>

    </div>
  )
};