import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../styles/Carousel.module.css';

export default function Carousel({ products, dogsNeeded }) {
  
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        dragFree: true,
        speed: 10,
    });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.embla}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {Array.isArray(products) && products.map((slide, index) => (
              <div className={styles.emblaSlide} key={index}>
                <div className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={slide.product_photo}
                      alt={slide.product_title}
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.textContainer}>
                    <h3 className={styles.productTitle}>{slide.product_title}</h3>
                    <p className={styles.productPrice}>Price: {slide.product_price_eur}</p>
                    <p className={styles.parameters}>
                      Quantity you can buy: {slide.quantity_can_buy * dogsNeeded}
                    </p>
                    <a className={styles.productLink} href={slide.product_url} target="_blank" rel="noopener noreferrer">
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className={`${styles.navButton} ${styles.prev}`} onClick={scrollPrev}>
          &#9664;
        </button>
        <button className={`${styles.navButton} ${styles.next}`} onClick={scrollNext}>
          &#9654;
        </button>
      </div>
    </div>
  );
}
