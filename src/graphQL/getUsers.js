// src/graphQL/getUsers.js
import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query Query($orgId: ID) {
    user(orgID: $orgId) {
      data {
        id
        email
        name
        mobile
        college
        idCard
        receipt
        transactionID
        hasPaid
      }
    }
  }
`;
