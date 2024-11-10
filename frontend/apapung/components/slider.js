import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Slider.module.css";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Product data
  const products = [
    { id: 1, name: "Product 1", image: "/Picacku.gif", parameters: "Test" },
    { id: 2, name: "Product 2", image: "/Picacku.gif", parameters: "Test" },
    { id: 3, name: "Product 3", image: "/Picacku.gif", parameters: "Test" },
    { id: 4, name: "Product 4", image: "/Picacku.gif", parameters: "Test" },
    { id: 5, name: "Product 5", image: "/Picacku.gif", parameters: "Test" },
    { id: 6, name: "Product 6", image: "/Picacku.gif", parameters: "Test" },
  ];

  // Calculate indices for the 3 visible products
  const getVisibleProducts = () => {
    const total = products.length;
    const middleIndex = currentIndex % total;
    const leftIndex = (middleIndex - 1 + total) % total;
    const rightIndex = (middleIndex + 1) % total;

    // Assign positions to products
    return [
      { ...products[leftIndex], position: 'left' },
      { ...products[middleIndex], position: 'center' },
      { ...products[rightIndex], position: 'right' },
    ];
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
        <div className={styles.carousel}>
          <TransitionGroup component={null}>
            {visibleProducts.map((product) => (
              <CSSTransition
                key={product.id}
                timeout={500}
                classNames={{
                  enter: styles.productEnter,
                  enterActive: styles.productEnterActive,
                  exit: styles.productExit,
                  exitActive: styles.productExitActive,
                }}
              >
                <div
                  className={`${styles.productCard} ${styles[product.position]}`}
                >
                  <div className={styles.imageContainer}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                  </div>
                  <h3 className={styles.productName}>{product.name}</h3>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrev}>
          &#9664;
        </button>
        <button className={`${styles.navButton} ${styles.next}`} onClick={handleNext}>
          &#9654;
        </button>
      </div>
    </>
  );
}
