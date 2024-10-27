// src/graphQL/getUsers.js
import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query Query($orgId: ID) {
    user(orgID: $orgId) {
      data {
        email
        name
        mobile
        idCard
        receipt
        transactionID
        hasPaid
      }
    }
  }
`;
