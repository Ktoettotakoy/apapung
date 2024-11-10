import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Slider.module.css';

export default function SliderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Product data
  const products = [
    { id: 1, name: 'Pixel Sword', image: '/Picacku.gif' },
    { id: 2, name: '8-Bit Shield', image: '/Picacku.gif' },
    { id: 3, name: 'Retro Potion', image: '/Picacku.gif' },
    { id: 4, name: 'Vintage Helmet', image: '/Picacku.gif' },
    { id: 5, name: 'Arcade Boots', image: '/Picacku.gif' },
    { id: 6, name: 'Classic Armor', image: '/Picacku.gif' },
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
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <>
      <Head>
        <title>Pixel Carousel</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.carouselContainer}>
        <button className={styles.navButton} onClick={handlePrev}>
          &#9664;
        </button>
        <div className={styles.carousel}>
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${
                index === 1 ? styles.activeProduct : ''
              }`}
            >
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
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
