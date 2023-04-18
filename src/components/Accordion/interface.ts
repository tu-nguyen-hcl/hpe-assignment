
export interface AccordionProps {
  label: string;
  content: Content;
  isExpanded: boolean;
  handleExpanded: (offsetTop?: number) => void;
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
