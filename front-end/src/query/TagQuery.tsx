import { gql } from "@apollo/client";

export const GET_TAGS = gql`
  query GET_TAGS {
    getTags {
      id
      name
    }
  }
`;
