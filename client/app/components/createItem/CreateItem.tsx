import { ChangeEvent, useState } from 'react';
import styles from './createItem.module.css';

export default function CreateItem({ setShowCreateItem }: { setShowCreateItem: any }) {

  const [imgSelected, setImageSelected] = useState<string[]>([]);

  console.log(imgSelected);

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


  function submitForm(e: any) {

  };

  return (
    <div className={styles.holder}>
      <div className={styles.create_item}>
        <button onClick={closeShowCreateItem} className={`${styles.close} pointer`}>
          <h3>X</h3>
        </button>
        <h2>Your new product</h2>
        <form className={styles.form} onSubmit={submitForm}>

          <div>
            <label htmlFor="text"><h6>Title:</h6></label>
            <input required type="text" name="product_name" />
          </div>

          <div>
            <label htmlFor="description"><h6>Description:</h6></label>
            <textarea required className={styles.description} name="product_description"></textarea>
          </div>

          <div className={styles.price}>
            <label htmlFor="price"><h6>Price:</h6></label>
            <input required type="number" name="product_price" />
          </div>

          <div>
            <label htmlFor="region"><h6>Region:</h6></label>
            <input required type="text" name="product_region" />
          </div>


          <div className={styles.button_create_image}>
            <label htmlFor="image"><h6>Add image</h6></label>
            <input type="file" name="image" accept=".jpg, .jpeg, .png, .gif" multiple id='image' onChange={changePicture} />
          </div>

          <div className={styles.all_images_container}>
            {imgSelected.map((item, index) => {
              return (
                <div key={index} className={styles.img_container}>
                  <img src={item} alt="Image selected" />
                </div>
              )
            })}
          </div>

          <button type='submit' className={styles.publish}>
            <h4>Publish Item</h4>
          </button>
        </form>
      </div>
    </div>
  )
};