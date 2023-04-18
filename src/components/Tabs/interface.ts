export interface Tab {
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

export interface TabsProps {
  tabs: Tab[];
  activeIndex?: number;
  setActiveIndex: (idx: number) => void;
}
