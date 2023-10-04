import styles from './createItem.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ItemType } from '@/app/types';

export default function CreateItem(
  { functionCloseMenu,
    itemInfo,
    functionSubmitForm,
    createMenu
  }:
    {
      functionCloseMenu: () => void,
      functionSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
      itemInfo: ItemType,
      createMenu: boolean,
    }) {

  const [imagesSelected, setImageSelected] = useState<string[]>([]);
  const [title, setTitle] = useState(itemInfo.product_name);
  const [description, setDescription] = useState(itemInfo.product_description);
  const [price, setPrice] = useState(itemInfo.product_price);
  const [region, setRegion] = useState(itemInfo.product_region);

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

  return (
    <div className={styles.holder}>

      <div className={styles.create_item}>

        <button onClick={functionCloseMenu} className={`${styles.close} pointer`}>
          <h3>X</h3>
        </button>

        <h2>Your new product</h2>

        <form className={styles.form} onSubmit={functionSubmitForm}>

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
            <h4>{createMenu ? 'Publish Item' : 'Update Item'}</h4>
          </button>

        </form>

      </div>

    </div>
  )
};