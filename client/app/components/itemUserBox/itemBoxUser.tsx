import { deleteStoreProduct } from "@/app/redux/products-reducer";
import styles from "./itemBoxUser.module.css";
import { ItemProps } from "@/app/types";
import { useRouter } from "next/navigation";
import { MouseEvent } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from "react-toastify";
import { deleteProduct } from "@/app/utils/Items";
import { useDispatch } from "react-redux";


export default function ItemBoxUser({
  title,
  item_id,
  price,
  productPicture,
  showEditItem,
}: ItemProps & { showEditItem: () => void }) {

  const router = useRouter();
  const dispatch = useDispatch();

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    router.push(`/product/${item_id}`);
  };

  async function deleteItem(e: MouseEvent<HTMLElement>) {
    e.preventDefault();

    const res = await deleteProduct(item_id);
    if (res.ok) {
      toast('Item deleted');
      dispatch(deleteStoreProduct({ item_id }));
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
          <button className={`${styles.edit} pointer`} onClick={showEditItem}>
            <h6>Edit</h6><AiOutlineEdit />
          </button>
          <button className={`${styles.delete} pointer`} onClick={deleteItem}>
            <h6>Delete</h6><AiFillDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
