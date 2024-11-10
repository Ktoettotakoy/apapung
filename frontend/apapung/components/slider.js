import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Slider.module.css";
import Card from "./Card";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Product data
  const products = [
    { id: 1, name: "product 1", image: "/Picacku.gif", parameter1: "test" },
    { id: 2, name: "product 2", image: "/Picacku.gif", parameter1: "test" },
    { id: 3, name: "product 3", image: "/Picacku.gif", parameter1: "test" },
    { id: 4, name: "product 4", image: "/Picacku.gif", parameter1: "test" },
    { id: 5, name: "product 5", image: "/Picacku.gif", parameter1: "test" },
    { id: 6, name: "product 6", image: "/Picacku.gif", parameter1: "test" },
  ];

  // Calculate indices for the 3 visible products
  const getVisibleProducts = () => {
    const total = products.length;
    const middleIndex = currentIndex % total;
    const leftIndex = (middleIndex - 1 + total) % total;
    const rightIndex = (middleIndex + 1) % total;

    return [products[leftIndex], products[middleIndex], products[rightIndex]];
  };

  const visibleProducts = getVisibleProducts();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <>
      <Head>
        <title>Pixel Carousel</title>
      </Head>
      <div className={styles.carouselContainer}>
        <button className={styles.navButton} onClick={handlePrev}>
          &#9664;
        </button>
        <div className={styles.carousel}>
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${index === 1 ? styles.activeProduct : ""}`}
            >
              <Card {...product} className={styles.cardAdditionalStyles} />
            </div>
          ))}
        </div>
        <button className={styles.navButton} onClick={handleNext}>
          &#9654;
        </button>
      </div>
    </>
  );
}