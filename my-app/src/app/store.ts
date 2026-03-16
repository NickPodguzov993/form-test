import { create } from "zustand";
import { initialFormData, type LoanFormData } from "../types/form";

interface LoanStore {
    formData: LoanFormData;
    workplaces: string[];
    isModalOpen: boolean;
    isSubmitted: boolean;

    setFormData: (data: Partial<LoanFormData>) => void;
    setWorkplaces: (items: string[]) => void;
    setModalOpen: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    resetAll: () => void;
}

export const useLoanStore = create<LoanStore>((set) => ({
    formData: initialFormData,
    workplaces: [],
    isModalOpen: false,
    isSubmitted: false,

    setFormData: (data) =>
        set((state) => ({
            formData: {
                ...state.formData,
                ...data,
            },
        })),

    setWorkplaces: (items) => set({ workplaces: items }),
    setModalOpen: (value) => set({ isModalOpen: value }),
    setSubmitted: (value) => set({ isSubmitted: value }),

    resetAll: () =>
        set({
            formData: initialFormData,
            workplaces: [],
            isModalOpen: false,
            isSubmitted: false,
        }),
}));