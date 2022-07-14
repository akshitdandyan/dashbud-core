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

export const GET_INSTITUTE_DETAILS = gql`
    query getInstituteDetails {
        getInstituteDetails {
            institute {
                instituteName
                instituteAddress {
                    state
                    city
                    zipcode
                    details
                    town
                    village
                }
                institutePhone
                instituteType
                instituteLogoUrl
                instituteTagline
            }
        }
    }
`;
