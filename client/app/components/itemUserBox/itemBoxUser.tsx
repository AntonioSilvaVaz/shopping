import styles from "./itemBoxUser.module.css";
import { ItemProps } from "@/app/types";
import { useRouter } from "next/navigation";
import { MouseEvent } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';


export default function ItemBoxUser({
  title,
  item_id,
  price,
  productPicture,
}: ItemProps) {

  const router = useRouter();

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    router.push(`/product/${item_id}`);
  };

  function editItem(e: MouseEvent<HTMLElement>) {

  }

  function deleteItem(e: MouseEvent<HTMLElement>) {

  }

  return (
    <div className={styles.item_container}>

      <div className={`${styles.image_container} pointer`} onClick={goToProduct}>
        <img src={productPicture} alt="" />
      </div>

      <div className={styles.items_container}>
        <div className={styles.text_container}>
          <h4>{title}</h4>
          <h4>{price}€</h4>
        </div>

        <div className={styles.button_container}>
          <button className={`${styles.edit} pointer`} onClick={editItem}>
            <AiOutlineEdit />
          </button>
          <button className={`${styles.delete} pointer`} onClick={deleteItem}>
            <AiFillDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
