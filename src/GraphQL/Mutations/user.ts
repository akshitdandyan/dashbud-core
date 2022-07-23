import { gql } from "@apollo/client";

export const SEND_OTP_TO_USER_PHONE = gql`
    mutation verifyPhone(
        $instituteId: String!
        $userId: String!
        $phone: String!
        $type: String!
        $otp: String!
    ) {
        verifyPhone(
            instituteId: $instituteId
            userId: $userId
            phone: $phone
            type: $type
            otp: $otp
        ) {
            message
        }
    }
`;
