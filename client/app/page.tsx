import ItemBox from "./components/itemBox/itemBox";
import TopBar from "./components/TopBar/TopBar";
import "./home.css";

export default function Home() {
  return (
    <section id="home">
      <TopBar />
      <div style={{ opacity: 1, backgroundColor: "red" }}></div>
      <div className="items">
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
        <ItemBox
          price={30.0}
          productPicture="/login_images/5.jpg"
          sellerPicture="/login_images/16.jpg"
          creator_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
          title="Super Cool Painting"
          item_id="dsbaud8a-dnasy8yda-dbas8-bd6sa-vd76asdsa"
        />
      </div>
    </section>
  );
}
