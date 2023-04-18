import React, { useRef } from 'react';
import styles from './Accordion.module.css';
import { AccordionProps } from './interface';

const Accordion: React.FC<AccordionProps> = ({
  label,
  content,
  isExpanded,
  handleExpanded,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const toggleAccordion = () => handleExpanded(ref.current?.offsetTop);

  return (
    <div ref={ref} className={styles.accordion}>
      <div
        className={`${styles.label} ${isExpanded ? styles.is_expanded : ''}`}
        onClick={toggleAccordion}
      >
        <span>{label}</span>
        <span>{isExpanded ? '-' : '+'}</span>
      </div>
      <div
        className={`${styles.content} ${isExpanded ? styles.is_expanded : ''}`}
      >
        <div className={styles.content_div}>
          <img src={content.image.thumbnail} alt={content.image.thumbnail} />
          <a className={styles.content_title} href={content.url}>
            {content.title}
          </a>
          {content.descriptions.map((des) => (
            <p key={des} className={styles.content_description}>
              {des}
            </p>
          ))}
          <a className={styles.content_link} href={content.redirect.url}>
            {content.redirect.text} <span>&#10230;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
