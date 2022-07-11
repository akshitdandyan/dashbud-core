import { gql } from "@apollo/client";

export const REGISTER_NEW_INSTITUTE_AND_REGISTRANT = gql`
    mutation addNewInstituteAndRegistrant(
        $instituteName: String!
        $state: String!
        $city: String!
        $zipcode: String!
        $details: String!
        $institutePhone: String!
        $instituteType: String!
        $instituteLogoUrl: String!
        $instituteTagline: String!
        $features: [String]!
        $firstname: String!
        $lastname: String!
        $phone: String!
        $email: String!
        $password: String
    ) {
        addNewInstituteAndRegistrant(
            institute: {
                instituteName: $instituteName
                instituteAddress: {
                    state: $state
                    city: $city
                    zipcode: $zipcode
                    details: $details
                }
                institutePhone: $institutePhone
                instituteType: $instituteType
                instituteLogoUrl: $instituteLogoUrl
                instituteTagline: $instituteTagline
                features: $features
            }
            instituteRegistrant: {
                firstname: $firstname
                lastname: $lastname
                phone: $phone
                email: $email
                password: $password
            }
        ) {
            registrant {
                _id
            }
            institute {
                _id
            }
            jwtToken
        }
    }
`;

export const SEND_OTP_TO_REGISTRANT_PHONE = gql`
    mutation verifyPhone(
        $instituteId: String!
        $registrantId: String!
        $phone: String!
        $type: String!
        $otp: String!
    ) {
        verifyPhone(
            instituteId: $instituteId
            registrantId: $registrantId
            phone: $phone
            type: $type
            otp: $otp
        ) {
            message
        }
    }
`;
