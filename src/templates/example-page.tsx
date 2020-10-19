import React from "react";
import { PageProps } from "gatsby"; // This part is important - it helps with instructing gatsby to inject the context passed in
import parse from 'react-html-parser';

interface ExamplePageProps {}; // Empty interface, generally speaking no regular props are passed


interface PromotionPageData {
    url: string;
    title: string;
    page_html: string;
}

interface ExamplePageContextData {
  pageData: PromotionPageData;// This is what gets passed into the page context from the createPage function from the gatsby-node.ts 
}
// Because this is a "Page" in gatsby, not a standard component, the props must extend the PageProps
interface PromoPageContentstackProps extends PageProps<ExamplePageProps, ExamplePageContextData> {}

const PromoPageContentstack: React.FC<PromoPageContentstackProps> = (props) => {
  // Gonna keep this in here for you as a reference for now
  // console.log(props.pageContext.pageData);
  return (
    <div>
      <h1>{props.pageContext.pageData.title}</h1>
      <div>
          {parse(props.pageContext.pageData.page_html)}
      </div>
      <p>Page brought to you by contentstack</p>
    </div>
  );
};
export default PromoPageContentstack;
