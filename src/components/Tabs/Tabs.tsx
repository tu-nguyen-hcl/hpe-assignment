/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from 'react';
import styles from './Tabs.module.css';
import { TabsProps } from './interface';

const Tabs: React.FC<TabsProps> = ({ tabs, activeIndex = 0, setActiveIndex }) => {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    handleNavOverflow();
    window.addEventListener('resize', handleNavOverflow);
    return () => {
      window.removeEventListener('resize', handleNavOverflow);
    };
  }, []);

  const handleNavOverflow = () => {
    if (navRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const navWidth = navRef.current.scrollWidth;
      const navOverflowed = navWidth > containerWidth;
      console.log('containerWidth', containerWidth);
      console.log('navWidth', navWidth);
      setShowPrevButton(navOverflowed);
      setShowNextButton(navOverflowed);
    }
  };

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    if (navRef.current) {
      handleNavOverflow();
      setScrollLeft(Math.max(scrollLeft - 100, 0));
    }
  };

  const handleNextClick = () => {
    if (navRef.current && containerRef.current) {
      setScrollLeft(
        Math.min(
          scrollLeft + 100,
          -containerRef.current.offsetWidth + navRef.current.offsetWidth
        )
      ); 
    }
  };

  return (
    <div className={styles.tab_container}>
      <div className={styles.scroll_container}>
        {showPrevButton && (
          <button
            className={styles.tab_nav_button}
            onClick={handlePrevClick}
          >
            &#8249;
          </button>
        )}
        <div ref={containerRef} className={styles.tabs_nav_container}>
          <ul
            ref={navRef}
            className={styles.tabs_nav}
            style={{ transform: `translateX(${-scrollLeft}px)` }}
          >
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={tab.label} className={styles.tab_nav}>
                  <div
                    className={`${styles.tab_nav_label} ${
                      isActive ? styles.active : ''
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.label}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {showNextButton && (
          <button
            className={styles.tab_nav_button}
            onClick={handleNextClick}
          >
            &#8250;
          </button>
        )}
      </div>
      <div className={styles.tab_content}>
        <div>
          <img
            src={tabs[activeIndex].content.image.thumbnail}
            alt={tabs[activeIndex].content.image.thumbnail}
          />
          <div className={styles.content_div}>
            <a className={styles.content_title} href={tabs[activeIndex].content.url}>
              {tabs[activeIndex].content.title}
            </a>
            {tabs[activeIndex].content.descriptions.map((des) => (
              <p key={des}>{des}</p>
            ))}
            <a
              className={styles.content_link}
              href={tabs[activeIndex].content.redirect.url}
            >
              {tabs[activeIndex].content.redirect.text} <span>&#10230;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
