export interface InstituteRegistrant {
    id?: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    instituteName?: string;
    instituteType?: "school" | "college" | "university" | "tution";
    emailVerified?: boolean;
    phoneVerified?: boolean;
    password: string;
}

export interface Institute<Address> {
    id?: string;
    instituteName: string;
    instituteAddress?: Address;
    institutePhone: string;
    instituteType: "school" | "college" | "university" | "tution";
    instituteLogoUrl: string;
    instituteTagline: string;
    features: string[];
}
