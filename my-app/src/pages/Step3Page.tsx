import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useLoanStore } from "../app/store";
import { submitLoanApplication } from "../api/loanApi";
import { ConfirmModal } from "../components/ConfirmModal";

type Step3Values = {
    amount: number;
    term: number;
};

export function Step3Page() {
    const navigate = useNavigate();
    const { formData, setFormData, setModalOpen, setSubmitted } = useLoanStore();
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (!formData.workplace || !formData.address) {
            navigate("/step-2");
        }
    }, [formData.workplace, formData.address, navigate]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm<Step3Values>({
        defaultValues: {
            amount: formData.amount,
            term: formData.term,
        },
        mode: "onSubmit",
    });

    const amount = watch("amount", formData.amount);
    const term = watch("term", formData.term);

    const onSubmit = async (values: Step3Values) => {
        try {
            setSubmitError("");
            setFormData(values);

            await submitLoanApplication(`${formData.firstName} ${formData.lastName}`);

            setSubmitted(true);
            setModalOpen(true);
        } catch {
            setSubmitError("Не удалось подать заявку. Попробуйте еще раз.");
        }
    };

    return (
        <>
            <Layout title="Форма 3" subtitle="Параметры займа">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className="form-label d-flex justify-content-between">
                            <span>Сумма займа</span>
                            <strong>${amount}</strong>
                        </label>
                        <input
                            type="range"
                            min={200}
                            max={1000}
                            step={100}
                            className="form-range"
                            {...register("amount", {
                                valueAsNumber: true,
                                required: true,
                            })}
                        />
                        <div className="d-flex justify-content-between small text-muted">
                            <span>$200</span>
                            <span>$1000</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label d-flex justify-content-between">
                            <span>Срок займа</span>
                            <strong>{term} дней</strong>
                        </label>
                        <input
                            type="range"
                            min={10}
                            max={30}
                            step={1}
                            className="form-range"
                            {...register("term", {
                                valueAsNumber: true,
                                required: true,
                            })}
                        />
                        <div className="d-flex justify-content-between small text-muted">
                            <span>10 дней</span>
                            <span>30 дней</span>
                        </div>
                    </div>

                    {submitError ? (
                        <div className="alert alert-danger py-2">{submitError}</div>
                    ) : null}

                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-secondary w-50"
                            onClick={() => navigate("/step-2")}
                            disabled={isSubmitting}
                        >
                            Назад
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success w-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Отправка..." : "Подать заявку"}
                        </button>
                    </div>
                </form>
            </Layout>

            <ConfirmModal />
        </>
    );
}