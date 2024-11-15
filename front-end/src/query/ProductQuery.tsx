import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($input: String) {
    getProducts(input: $input) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        id
        name
      }
      tag {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GET_PRODUCT_BY_ID($productId: String!) {
    getProductById(productId: $productId) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        id
        name
      }
      tag {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GET_PRODUCTS_BY_CATEGORY($categoryId: String!) {
    getProductsByCategory(categoryId: $categoryId) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      tag {
        id
        name
      }
    }
  }
`;
