import { gql } from "@apollo/client";

export const UPDATE_DETAILS_PRODUCT = gql`
  mutation UPDATE_DETAILS_PRODUCT(
    $data: UpdateProductInput!
    $productId: String!
  ) {
    updateDetailsProduct(data: $data, productId: $productId) {
      id
      title
      description
      owner
      price
      picture
      location
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

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT($data: ProductInput!) {
    createProduct(data: $data) {
      title
      description
      owner
      price
      picture
      location
      category {
        id
      }
      tag {
        id
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($productId: String!) {
    deleteProduct(productId: $productId)
  }
`;
