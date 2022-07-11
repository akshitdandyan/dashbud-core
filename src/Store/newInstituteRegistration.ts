import create from "zustand";
import { ZustandNewInstituteRegistration } from "../types/Zustand/newInstitutionRegistration";

export const useZustandNewInstituteRegistration =
    create<ZustandNewInstituteRegistration>((set, get) => ({
        institute: null,
        instituteAddress: null,
        instituteRegistrant: null,
        setInstitute: (data) => set((state) => ({ ...state, institute: data })),
        setInstituteAddress: (data) =>
            set((state) => ({ ...state, instituteAddress: data })),
        setInstituteRegistrant: (data) =>
            set((state) => ({ ...state, instituteRegistrant: data })),
        setInstituteAndRegistrantIds: (instituteId, registrandId) => {
            const institute = get().institute;
            const registrant = get().instituteRegistrant;
            if (!institute || !registrant) {
                console.log("Unable to set institute and registrant ids");
                return;
            }
            set((state) => ({
                ...state,
                institute: { ...institute, id: instituteId },
                instituteRegistrant: { ...registrant, id: registrandId },
            }));
            return;
        },
    }));
