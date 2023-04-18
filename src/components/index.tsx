import React, { useEffect, useRef, useState } from 'react';
import Accordion from './Accordion/Accordion';
import Tabs from './Tabs/Tabs';

const MOBILE_WIDTH_THRESSHOLD = 771;

interface CustomerCenterTabProps {
  tabs: Tab[];
  defaultActiveIndex?: number;
}

interface Tab {
  label: string;
  content: Content;
}

interface Content {
  image: {
    url: string;
    thumbnail: string;
  };
  title: string;
  url: string;
  descriptions: string[];
  redirect: {
    text: string;
    url: string;
  };
}

const CustomerCenterTab: React.FC<CustomerCenterTabProps> = ({
  tabs,
  defaultActiveIndex = 0,
}) => {
  const accordionsRef = useRef<HTMLDivElement>(null);
  const [isMobileSize, setIsMobileSize] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(
    defaultActiveIndex
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth < MOBILE_WIDTH_THRESSHOLD);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobileSize) {
    const handleExpanded = (idx: number) => (scrollTo?: number) => {
      setActiveIndex(idx === activeIndex ? undefined : idx);
      if (accordionsRef.current && scrollTo) {
        accordionsRef.current.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        });
      }
    };
    return (
      <div ref={accordionsRef}>
        {tabs.map(({ label, content }, idx) => (
          <Accordion
            isExpanded={idx === activeIndex}
            handleExpanded={handleExpanded(idx)}
            key={`accordion-${label}`}
            label={label}
            content={content}
          />
        ))}
      </div>
    );
  }
  return (
    <Tabs
      tabs={tabs}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
  );
};
export default CustomerCenterTab;
