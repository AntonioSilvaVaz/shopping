import styles from './createItem.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ItemCreated } from '@/app/types';
import { addImageItem, createProduct, updateProduct } from '@/app/utils/Items';
import { addProduct, updateStoreProduct } from '@/app/redux/products-reducer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Notification from '../notification/notification';

export default function CreateItem(
  { functionCloseMenu,
    itemInfo,
    createMenu
  }: {
    functionCloseMenu: () => void,
    itemInfo: ItemCreated,
    createMenu: boolean,
  }) {


  const router = useRouter();
  const dispatch = useDispatch();

  const [imagesRemove, setImagesRemove] = useState<string[]>([]);
  const [imagesSelected, setImageSelected] = useState<string[]>([]);
  const [title, setTitle] = useState(itemInfo.product_name);
  const [description, setDescription] = useState(itemInfo.product_description);
  const [price, setPrice] = useState(itemInfo.product_price);
  const [region, setRegion] = useState(itemInfo.product_region);

  async function createProductFunction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createProduct(formData);

    if (res.ok) {
      const data: any = await res.json();
      data.product_pictures = JSON.parse(data.product_pictures);
      router.push(`/product/${data.item_id}`);
      dispatch(addProduct({ newProduct: data }));
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500')
    } else if (res.status === 400) {
      toast('Missing information');
    }
  };

  async function editProductFunction(e: FormEvent<HTMLFormElement>) {

    const formData = new FormData(e.currentTarget);
    const imagesAdd = new FormData(e.currentTarget);

    formData.set('item_id', itemInfo.item_id);
    imagesAdd.set('item_id', itemInfo.item_id);

    await updateProduct(formData);
    const res = await addImageItem(imagesAdd);
    const data = await res.json();

    if (res.ok) {
      // const data: any = await res.json();
      data.product_pictures = JSON.parse(data.product_pictures);
      router.push(`/product/${data.item_id}`);
      dispatch(updateStoreProduct({ updatedProduct: data }));
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500')
    } else if (res.status === 400) {
      toast('Missing information');
    } else if (res.status === 404) {
      toast("Item doesn't exist");
    }
  };

  function deleteImage(imgPath: string) {
    setImagesRemove((prev) => {
      return [
        ...prev,
        imgPath
      ]
    })
  };

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createMenu ? createProductFunction(e) : editProductFunction(e);
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

  return (
    <div className={styles.holder}>
      <Notification />

      <div className={styles.create_item}>

        <button onClick={functionCloseMenu} className={`${styles.close} pointer`}>
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
            <input type="file" name="product_pictures"
              id='product_pictures' accept=".jpg, .jpeg, .png, .gif" multiple onChange={changePicture}
            />
          </div>

          <div className={styles.all_images_container}>

            {itemInfo.product_pictures.map((item, index) => {
              return (
                <div key={index} className={styles.img_container}>
                  <img src={item} alt="Image Existed" />
                  <button className={`${styles.remove_btn} pointer`} onClick={() => deleteImage(item)}>
                    <h6>X</h6>
                  </button>
                </div>
              )
            })}

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