import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation Mutation($user: UserUpdateInputType!, $updateUserId: ID!) {
    updateUser(user: $user, id: $updateUserId) {
      hasPaid
    }
  }
`;
