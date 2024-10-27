import { gql } from "@apollo/client";

export const GET_COLLEGE_QUERY = gql`
  query Query($orgId: ID!) {
    org(id: $orgId) {
      name
    }
  }
`;
