export interface User {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    instituteId?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    password?: string;
    role?: "registrant" | "admin" | "staff" | "student";
    studentClassId?: string;
    teacherClassId?: string;
}
