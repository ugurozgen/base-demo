/** grapql loader */
declare module "*.gql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export = value;
}

/** scss loader */
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

/** allow importing images */
declare module "*.jpg";
declare module "*.png";
declare module "*.gif";
