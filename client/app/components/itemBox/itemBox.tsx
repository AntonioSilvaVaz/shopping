import { MouseEvent } from "react";
import { ItemProps } from "@/app/types";
import { useRouter } from "next/navigation";
import "./itemBox.css";

export default function ItemBox({
  title,
  item_id,
  creator_id,
  price,
  sellerPicture,
  productPicture,
  showProfilePicture
}: ItemProps) {
  const router = useRouter();

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    router.push(`/product/${item_id}`);
  }

  function goToSeller(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    router.push(`/user/${creator_id}`);
  }

  return (
    <div className="item-box">
      <div className="pointer" onClick={goToProduct}>
        <div className="item-picture">
          <img
            src={productPicture}
            alt="product picture"
            className="picture"
          />
        </div>
        {
          showProfilePicture &&
          <div className="profile-picture pointer" onClick={goToSeller}>
            <img
              alt="seller picture"
              className="picture"
              src={sellerPicture}
            />
          </div>
        }

      </div>
      <div className="item-title">
        <div>
          <h6>{title}</h6>
        </div>
        <div className="item-add">
          <div>
            <h6>{price}€</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
