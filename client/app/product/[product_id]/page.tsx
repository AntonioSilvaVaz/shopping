"use client";
import { useParams, useRouter } from "next/navigation";

export default function Product() {

  const { product_id } = useParams();

  return (
    <section>
      <h2>This would be the item title</h2>

      <div>

        <div>
          <p>This is the product description</p>
          <div>
            This is the product map
          </div>
        </div>

        <div>
          <div>
            <img src="/login_images/3.jpg" alt="" />
          </div>
          <div>
            <button></button>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>

    </section>
  )
}