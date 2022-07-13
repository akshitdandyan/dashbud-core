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
