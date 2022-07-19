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

export const VERIFY_INVITATION = gql`
    query verifyInvitation($verificationToken: String!) {
        verifyInvitation(verificationToken: $verificationToken) {
            institute {
                instituteName
                instituteLogoUrl
                instituteTagline
            }
            user {
                firstname
                phone
                email
                role
            }
        }
    }
`;
