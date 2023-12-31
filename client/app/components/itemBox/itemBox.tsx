import styles from "./itemBox.module.css";
import { MouseEvent } from "react";
import { ItemProps, ListType } from "@/app/types";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart, addToWishlist, getAllItemsInfo } from "@/app/utils/Items";
import { updateWishlist } from "@/app/redux/wishlist-reducer";
import { updateCart } from "@/app/redux/cart-reducer";
import { useDispatch } from "react-redux";
import { Montserrat } from 'next/font/google'
const inter = Montserrat({ subsets: ['latin'] })

export default function ItemBox({ title, item_id, price, productPicture }: ItemProps) {

  const router = useRouter();
  const dispatch = useDispatch();

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    if(e.target instanceof HTMLButtonElement || e.target instanceof SVGElement){
      return;
    }
    
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
      dispatch(updateWishlist({ wishlist: data.list, wishlistInfo: dataInfo, updated: true }));
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
      dispatch(updateCart({ cart: data.list, cartInfo: dataInfo, cartUpdated: true }));
    }
  };

  return (
    <div className={styles.item_container} onClick={goToProduct}>
      <div className={`${styles.image_container} pointer`}>
        <img src={productPicture} alt="" />
      </div>
      <div className={styles.items_container}>
        <div className={styles.text_container}>
          <h4>{title}</h4>
        </div>
        <div className={styles.price_container}>
          <h4 className={inter.className}>{price}€</h4>
          <div className={styles.button_container}>
            <button className={`pointer ${styles.heart}`} onClick={addWishlist}>
              <AiOutlineHeart />
            </button>
            <hr className={styles.hr} />
            <button className={`pointer ${styles.cart}`} onClick={addCart}>
              <BsCartPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
