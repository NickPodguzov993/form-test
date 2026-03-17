import type { AddProductResponse } from "../types/form";



export async function fetchWorkplaces(): Promise<string[]> {
    const response = await fetch("https://dummyjson.com/products/category-list");

    if (!response.ok) {
        throw new Error("Не удалось загрузить список мест работы");
    }

    return response.json();
}

export async function submitLoanApplication(
    fullName: string,
): Promise<AddProductResponse> {
    const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: fullName,
        }),
    });

    if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
    }

    return response.json();
}