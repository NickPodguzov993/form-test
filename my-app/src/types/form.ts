export type Gender = "male" | "female" | "";

export interface LoanFormData {
    phone: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    workplace: string;
    address: string;
    amount: number;
    term: number;
}

export const initialFormData: LoanFormData = {
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
    workplace: "",
    address: "",
    amount: 200,
    term: 10,
};

export interface AddProductResponse {
    id: number;
    title: string;
}