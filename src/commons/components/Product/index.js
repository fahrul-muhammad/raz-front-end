import styles from "src/commons/styles/cardProduct.module.css";
import Image from "next/image";
import chair from "src/assets/img/chair-home.png";

import Link from "next/link";
import { useState } from "react";

function CardProduct({ name, price, id, image }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onImageError = () => {
    setError(true);
    console.log(error);
  };

  const onImageLoaded = () => {
    setLoaded(true);
    console.log(loaded);
  };

  const imgSrc = !error ? image : chair;

  return (
    <>
      <Link href={`/product/${id}`} passHref>
        <section className={`${styles["card-product"]}`}>
          <div className={styles.image}>
            <Image width={293} height={472} src={chair} alt="product" />
          </div>
          <figcaption className={styles["fill-product"]}>
            <p className={styles["name-product"]}>{name}</p>
          </figcaption>
          <figcaption className={styles["fill-product"]}>
            <p className={styles["price-product"]}>{price}</p>
          </figcaption>
        </section>
      </Link>
    </>
  );
}

export default CardProduct;
