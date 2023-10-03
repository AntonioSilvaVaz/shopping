import styles from "./itemBox.module.css";
import { MouseEvent } from "react";
import { ItemProps, ListType } from "@/app/types";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart, addToWishlist, getAllItemsInfo } from "@/app/utils/Items";
import { updateWishlist } from "@/app/redux/wishlist-reducer";
import { updateCart } from "@/app/redux/cart-reducer";

export default function ItemBox({
  title,
  item_id,
  price,
  productPicture,
}: ItemProps) {

  const router = useRouter();

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    router.push(`/product/${item_id}`);
  };

  async function addWishlist() {
    const res = await addToWishlist(item_id, 1);
    if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500');
    } else {
      const data: ListType = await res.json();
      const dataInfo = await getAllItemsInfo(data);
      updateWishlist({ wishlist: data.list, wishlistInfo: dataInfo, updated: true });
    }
  };

  async function addCart() {
    const res = await addToCart(item_id, 1);
    if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500');
    } else {
      const data: ListType = await res.json();
      const dataInfo = await getAllItemsInfo(data);
      updateCart({ cart: data.list, cartInfo: dataInfo, cartUpdated: true });
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
        </div>
        <div className={styles.price_container}>
          <h4>{price}€</h4>
          <div className={styles.button_container}>
            <button className="pointer" onClick={addWishlist}>
              <AiOutlineHeart />
            </button>
            <hr className={styles.hr} />
            <button className="pointer" onClick={addCart}>
              <BsCartPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
