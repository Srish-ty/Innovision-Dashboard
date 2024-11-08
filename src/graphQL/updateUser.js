import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation Mutation($user: UserUpdateInputType!, $updateUserId: ID!) {
    updateUser(user: $user, id: $updateUserId) {
      hasPaid
    }
  }
`;

export const ADD_USER_HALL = gql`
  mutation Mutation($updateUserId: ID!, $user: UserUpdateInputType!) {
    updateUser(id: $updateUserId, user: $user) {
      city
    }
  }
`;
