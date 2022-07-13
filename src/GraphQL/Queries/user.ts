import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    query loginUser($identifier: String!, $password: String!) {
        loginUser(identifier: $identifier, password: $password) {
            user {
                _id
                firstname
                lastname
            }
            jwtToken
        }
    }
`;
