"use client";
import './User.css';
import ItemBox from '@/app/components/itemBox/itemBox';
import Link from "next/link";
import { useParams } from 'next/navigation';

export default function UserProfile() {
  const { user_id } = useParams();

  return (
    <section id="user">
      <div className="seller-picture">
        <Link href={`/user/${user_id}`}>
          <img src="/login_images/16.jpg" />
        </Link>
      </div>
      <h5 className='name'>My profile :__</h5>
      <h5 className='products-sold'>Products sold by this user</h5>
      <div className='products-container'>
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          showProfilePicture={false}
        />
      </div>
    </section>
  )
}