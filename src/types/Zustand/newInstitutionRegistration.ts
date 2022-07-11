import { Address } from "../common";
import { Institute, InstituteRegistrant } from "../institution";

export interface ZustandNewInstituteRegistration {
    institute: Institute<null> | null;
    instituteAddress: Address | null;
    instituteRegistrant: InstituteRegistrant | null;
    setInstitute: (data: Institute<null>) => void;
    setInstituteAddress: (data: Address) => void;
    setInstituteRegistrant: (data: InstituteRegistrant) => void;
    setInstituteAndRegistrantIds: (
        instituteId: string,
        registrandId: string
    ) => void;
}
