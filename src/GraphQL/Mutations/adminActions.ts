import { gql } from "@apollo/client";

export const ADD_NEW_STAFF_MEMBER = gql`
    mutation addNewStaffMember(
        $firstname: String!
        $lastname: String!
        $phone: String!
        $email: String!
        $teacherClassId: String
    ) {
        addNewStaffMember(
            staff: {
                firstname: $firstname
                lastname: $lastname
                phone: $phone
                email: $email
                teacherClassId: $teacherClassId
            }
        ) {
            message
            staff {
                _id
            }
        }
    }
`;

export const UPDATE_INSTITUTE_DETAILS = gql`
    mutation updateInstituteDetails(
        $instituteName: String!
        $state: String!
        $city: String!
        $zipcode: String!
        $details: String!
        $town: String
        $village: String
        $institutePhone: String!
        $instituteLogoUrl: String!
        $instituteTagline: String!
    ) {
        updateInstituteDetails(
            institute: {
                instituteName: $instituteName
                instituteAddress: {
                    state: $state
                    city: $city
                    zipcode: $zipcode
                    details: $details
                    town: $town
                    village: $village
                }
                institutePhone: $institutePhone
                instituteLogoUrl: $instituteLogoUrl
                instituteTagline: $instituteTagline
            }
        ) {
            message
        }
    }
`;
