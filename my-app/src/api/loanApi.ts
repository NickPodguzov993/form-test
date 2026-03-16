import type { AddProductResponse } from "../types/form";

/*
  React Hook Form выбран для удобной валидации и уменьшения количества
  ручного кода вокруг форм.

  Zustand выбран для хранения общих данных всех шагов без prop drilling.

  react-input-mask выбран для маски телефона по ТЗ.
*/

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