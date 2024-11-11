import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Slider.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Slider({ products, dogsNeeded }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(products);
  // Calculate indices for the 3 visible products
  const getVisibleProducts = () => {
    const total = products.length;
    const middleIndex = currentIndex % total;
    const leftIndex = (middleIndex - 1 + total) % total;
    const rightIndex = (middleIndex + 1) % total;

    // Assign positions to products
    return [
      { ...products[leftIndex], position: "left" },
      { ...products[middleIndex], position: "center" },
      { ...products[rightIndex], position: "right" },
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
            {visibleProducts.map((product, index) => (
              <CSSTransition
                key={index}
                timeout={500}
                classNames={{
                  enter: styles.productEnter,
                  enterActive: styles.productEnterActive,
                  exit: styles.productExit,
                  exitActive: styles.productExitActive,
                }}
              >
                <div className={`${styles.productCard} ${styles[product.position]}`}>
                  <div className={styles.productContent}>
                    <div className={styles.imageContainer}>
                      <img
                        src={product.product_photo}
                        alt={product.product_title}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.textContainer}>
                      <h3 className={styles.productName}>{product.product_title}</h3>
                      <p className={styles.productPrice}>Price: {product.product_price_eur}</p>
                      <p className={styles.parameters}>
                        Quantity you can buy: {product.quantity_can_buy * dogsNeeded}
                      </p>
                      <a href={product.product_url} className={styles.productLink}>
                        Link to the product
                      </a>
                    </div>
                  </div>
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
