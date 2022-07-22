import { gql } from "@apollo/client";

export const SEND_OTP_TO_USER_PHONE = gql`
    mutation verifyPhone(
        $instituteId: String!
        $registrantId: String!
        $phone: String!
        $type: String!
        $otp: String!
    ) {
        verifyPhone(
            instituteId: $instituteId
            userId: $registrantId
            phone: $phone
            type: $type
            otp: $otp
        ) {
            message
        }
    }
`;
