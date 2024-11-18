import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
};

export type CategoryInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createProduct: Product;
  createTag: Tags;
  deleteCategory: Category;
  deleteProduct: Scalars['Boolean']['output'];
  updateDetailsProduct: Product;
  updateProduct: Product;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
};


export type MutationCreateTagArgs = {
  data: TagInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationUpdateDetailsProductArgs = {
  data: UpdateProductInput;
  productId: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  data: ProductInput;
  productId: Scalars['String']['input'];
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  tag: Array<Tags>;
  title: Scalars['String']['output'];
};

export type ProductInput = {
  categoryId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  price: Scalars['String']['input'];
  tagsId: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategoryById: Category;
  getProductById: Product;
  getProducts: Array<Product>;
  getProductsByCategory: Array<Product>;
  getTagById: Tags;
  getTags: Array<Tags>;
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetProductsArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProductsByCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetTagByIdArgs = {
  tagId: Scalars['String']['input'];
};

export type TagInput = {
  name: Scalars['String']['input'];
};

export type Tags = {
  __typename?: 'Tags';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
};

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  tagsId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Details_ProductMutationVariables = Exact<{
  data: UpdateProductInput;
  productId: Scalars['String']['input'];
}>;


export type Update_Details_ProductMutation = { __typename?: 'Mutation', updateDetailsProduct: { __typename?: 'Product', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, category?: { __typename?: 'Category', id: string, name: string } | null, tag: Array<{ __typename?: 'Tags', id: string, name: string }> } };

export type Create_ProductMutationVariables = Exact<{
  data: ProductInput;
}>;


export type Create_ProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', title: string, description: string, owner: string, price: number, picture: string, location: string, category?: { __typename?: 'Category', id: string } | null, tag: Array<{ __typename?: 'Tags', id: string }> } };

export type Delete_ProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type Delete_ProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetCategoryByIdQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById: { __typename?: 'Category', id: string, name: string } };

export type Get_ProductsQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_ProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'Product', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, tag: Array<{ __typename?: 'Tags', id: string, name: string }> }> };

export type Get_Product_By_IdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type Get_Product_By_IdQuery = { __typename?: 'Query', getProductById: { __typename?: 'Product', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, tag: Array<{ __typename?: 'Tags', id: string, name: string }> } };

export type Get_Products_By_CategoryQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type Get_Products_By_CategoryQuery = { __typename?: 'Query', getProductsByCategory: Array<{ __typename?: 'Product', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, tag: Array<{ __typename?: 'Tags', id: string, name: string }> }> };

export type Get_TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_TagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tags', id: string, name: string }> };


export const Update_Details_ProductDocument = gql`
    mutation UPDATE_DETAILS_PRODUCT($data: UpdateProductInput!, $productId: String!) {
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
export type Update_Details_ProductMutationFn = Apollo.MutationFunction<Update_Details_ProductMutation, Update_Details_ProductMutationVariables>;

/**
 * __useUpdate_Details_ProductMutation__
 *
 * To run a mutation, you first call `useUpdate_Details_ProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_Details_ProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDetailsProductMutation, { data, loading, error }] = useUpdate_Details_ProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useUpdate_Details_ProductMutation(baseOptions?: Apollo.MutationHookOptions<Update_Details_ProductMutation, Update_Details_ProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Update_Details_ProductMutation, Update_Details_ProductMutationVariables>(Update_Details_ProductDocument, options);
      }
export type Update_Details_ProductMutationHookResult = ReturnType<typeof useUpdate_Details_ProductMutation>;
export type Update_Details_ProductMutationResult = Apollo.MutationResult<Update_Details_ProductMutation>;
export type Update_Details_ProductMutationOptions = Apollo.BaseMutationOptions<Update_Details_ProductMutation, Update_Details_ProductMutationVariables>;
export const Create_ProductDocument = gql`
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
export type Create_ProductMutationFn = Apollo.MutationFunction<Create_ProductMutation, Create_ProductMutationVariables>;

/**
 * __useCreate_ProductMutation__
 *
 * To run a mutation, you first call `useCreate_ProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_ProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreate_ProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreate_ProductMutation(baseOptions?: Apollo.MutationHookOptions<Create_ProductMutation, Create_ProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_ProductMutation, Create_ProductMutationVariables>(Create_ProductDocument, options);
      }
export type Create_ProductMutationHookResult = ReturnType<typeof useCreate_ProductMutation>;
export type Create_ProductMutationResult = Apollo.MutationResult<Create_ProductMutation>;
export type Create_ProductMutationOptions = Apollo.BaseMutationOptions<Create_ProductMutation, Create_ProductMutationVariables>;
export const Delete_ProductDocument = gql`
    mutation DELETE_PRODUCT($productId: String!) {
  deleteProduct(productId: $productId)
}
    `;
export type Delete_ProductMutationFn = Apollo.MutationFunction<Delete_ProductMutation, Delete_ProductMutationVariables>;

/**
 * __useDelete_ProductMutation__
 *
 * To run a mutation, you first call `useDelete_ProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_ProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDelete_ProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDelete_ProductMutation(baseOptions?: Apollo.MutationHookOptions<Delete_ProductMutation, Delete_ProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Delete_ProductMutation, Delete_ProductMutationVariables>(Delete_ProductDocument, options);
      }
export type Delete_ProductMutationHookResult = ReturnType<typeof useDelete_ProductMutation>;
export type Delete_ProductMutationResult = Apollo.MutationResult<Delete_ProductMutation>;
export type Delete_ProductMutationOptions = Apollo.BaseMutationOptions<Delete_ProductMutation, Delete_ProductMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query getCategoryById($categoryId: String!) {
  getCategoryById(categoryId: $categoryId) {
    id
    name
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables> & ({ variables: GetCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export function useGetCategoryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetCategoryByIdSuspenseQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const Get_ProductsDocument = gql`
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

/**
 * __useGet_ProductsQuery__
 *
 * To run a query within a React component, call `useGet_ProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_ProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_ProductsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGet_ProductsQuery(baseOptions?: Apollo.QueryHookOptions<Get_ProductsQuery, Get_ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_ProductsQuery, Get_ProductsQueryVariables>(Get_ProductsDocument, options);
      }
export function useGet_ProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_ProductsQuery, Get_ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_ProductsQuery, Get_ProductsQueryVariables>(Get_ProductsDocument, options);
        }
export function useGet_ProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Get_ProductsQuery, Get_ProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Get_ProductsQuery, Get_ProductsQueryVariables>(Get_ProductsDocument, options);
        }
export type Get_ProductsQueryHookResult = ReturnType<typeof useGet_ProductsQuery>;
export type Get_ProductsLazyQueryHookResult = ReturnType<typeof useGet_ProductsLazyQuery>;
export type Get_ProductsSuspenseQueryHookResult = ReturnType<typeof useGet_ProductsSuspenseQuery>;
export type Get_ProductsQueryResult = Apollo.QueryResult<Get_ProductsQuery, Get_ProductsQueryVariables>;
export const Get_Product_By_IdDocument = gql`
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

/**
 * __useGet_Product_By_IdQuery__
 *
 * To run a query within a React component, call `useGet_Product_By_IdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Product_By_IdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Product_By_IdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGet_Product_By_IdQuery(baseOptions: Apollo.QueryHookOptions<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables> & ({ variables: Get_Product_By_IdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables>(Get_Product_By_IdDocument, options);
      }
export function useGet_Product_By_IdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables>(Get_Product_By_IdDocument, options);
        }
export function useGet_Product_By_IdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables>(Get_Product_By_IdDocument, options);
        }
export type Get_Product_By_IdQueryHookResult = ReturnType<typeof useGet_Product_By_IdQuery>;
export type Get_Product_By_IdLazyQueryHookResult = ReturnType<typeof useGet_Product_By_IdLazyQuery>;
export type Get_Product_By_IdSuspenseQueryHookResult = ReturnType<typeof useGet_Product_By_IdSuspenseQuery>;
export type Get_Product_By_IdQueryResult = Apollo.QueryResult<Get_Product_By_IdQuery, Get_Product_By_IdQueryVariables>;
export const Get_Products_By_CategoryDocument = gql`
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

/**
 * __useGet_Products_By_CategoryQuery__
 *
 * To run a query within a React component, call `useGet_Products_By_CategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Products_By_CategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Products_By_CategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGet_Products_By_CategoryQuery(baseOptions: Apollo.QueryHookOptions<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables> & ({ variables: Get_Products_By_CategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables>(Get_Products_By_CategoryDocument, options);
      }
export function useGet_Products_By_CategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables>(Get_Products_By_CategoryDocument, options);
        }
export function useGet_Products_By_CategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables>(Get_Products_By_CategoryDocument, options);
        }
export type Get_Products_By_CategoryQueryHookResult = ReturnType<typeof useGet_Products_By_CategoryQuery>;
export type Get_Products_By_CategoryLazyQueryHookResult = ReturnType<typeof useGet_Products_By_CategoryLazyQuery>;
export type Get_Products_By_CategorySuspenseQueryHookResult = ReturnType<typeof useGet_Products_By_CategorySuspenseQuery>;
export type Get_Products_By_CategoryQueryResult = Apollo.QueryResult<Get_Products_By_CategoryQuery, Get_Products_By_CategoryQueryVariables>;
export const Get_TagsDocument = gql`
    query GET_TAGS {
  getTags {
    id
    name
  }
}
    `;

/**
 * __useGet_TagsQuery__
 *
 * To run a query within a React component, call `useGet_TagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_TagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_TagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_TagsQuery(baseOptions?: Apollo.QueryHookOptions<Get_TagsQuery, Get_TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_TagsQuery, Get_TagsQueryVariables>(Get_TagsDocument, options);
      }
export function useGet_TagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_TagsQuery, Get_TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_TagsQuery, Get_TagsQueryVariables>(Get_TagsDocument, options);
        }
export function useGet_TagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Get_TagsQuery, Get_TagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Get_TagsQuery, Get_TagsQueryVariables>(Get_TagsDocument, options);
        }
export type Get_TagsQueryHookResult = ReturnType<typeof useGet_TagsQuery>;
export type Get_TagsLazyQueryHookResult = ReturnType<typeof useGet_TagsLazyQuery>;
export type Get_TagsSuspenseQueryHookResult = ReturnType<typeof useGet_TagsSuspenseQuery>;
export type Get_TagsQueryResult = Apollo.QueryResult<Get_TagsQuery, Get_TagsQueryVariables>;