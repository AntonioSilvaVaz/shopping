import { MouseEvent } from "react";
import { ItemProps, ListType, WishlistType } from "@/app/types";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import "./itemBox.css";
import { addToCart, addToWishlist } from "@/app/utils/Items";
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
    if (res.ok) {
      const data: WishlistType = await res.json();
      updateWishlist(data.list);
    } else {
      router.push('/500');
    }
  };

  async function addCart() {
    const res = await addToCart(item_id, 1);
    if (res.ok) {
      const data: ListType = await res.json();
      updateCart({ cart: data.list, cartUpdated: true });
    }
  };

  return (
    <div className="item-container">
      <div className="image-container pointer" onClick={goToProduct}>
        <img src={productPicture} alt="" />
      </div>
      <div className="items-container">
        <div className="text-container">
          <h4>{title}</h4>
        </div>
        <div className="price-container">
          <h4>{price}€</h4>
          <div className="button-container">
            <button className="pointer" onClick={addWishlist}>
              <AiOutlineHeart />
            </button>
            |
            <button className="pointer" onClick={addCart}>
              <BsCartPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
