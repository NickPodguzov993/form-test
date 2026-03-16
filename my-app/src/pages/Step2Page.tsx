import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useLoanStore } from "../app/store";
import { fetchWorkplaces } from "../api/loanApi";
import { formatCategory } from "../utils/formatCategory";

type Step2Values = {
    workplace: string;
    address: string;
};

export function Step2Page() {
    const navigate = useNavigate();
    const { formData, setFormData, workplaces, setWorkplaces } = useLoanStore();
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (
            !formData.phone ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.gender
        ) {
            navigate("/step-1");
        }
    }, [
        formData.phone,
        formData.firstName,
        formData.lastName,
        formData.gender,
        navigate,
    ]);

    useEffect(() => {
        if (workplaces.length > 0) return;

        setLoading(true);
        setLoadError("");

        fetchWorkplaces()
            .then((items) => {
                setWorkplaces(items);
            })
            .catch(() => {
                setLoadError("Не удалось загрузить список мест работы");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setWorkplaces, workplaces.length]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Step2Values>({
        defaultValues: {
            workplace: formData.workplace,
            address: formData.address,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: Step2Values) => {
        setFormData(values);
        navigate("/step-3");
    };

    return (
        <Layout title="Форма 2" subtitle="Адрес и место работы">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                    <label className="form-label">Место работы</label>

                    <select
                        className={`form-select ${errors.workplace ? "is-invalid" : ""}`}
                        {...register("workplace", {
                            required: "Выберите место работы",
                        })}
                        disabled={loading || !!loadError}
                    >
                        <option value="">
                            {loading ? "Загрузка..." : "Выберите место работы"}
                        </option>

                        {workplaces.map((item) => (
                            <option key={item} value={item}>
                                {formatCategory(item)}
                            </option>
                        ))}
                    </select>

                    {errors.workplace && (
                        <div className="invalid-feedback">{errors.workplace.message}</div>
                    )}

                    {loadError ? (
                        <div className="text-danger small mt-2">{loadError}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="form-label">Адрес проживания</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        {...register("address", {
                            required: "Адрес обязателен",
                        })}
                    />
                    {errors.address && (
                        <div className="invalid-feedback">{errors.address.message}</div>
                    )}
                </div>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-50"
                        onClick={() => navigate("/step-1")}
                    >
                        Назад
                    </button>

                    <button type="submit" className="btn btn-primary w-50">
                        Далее
                    </button>
                </div>
            </form>
        </Layout>
    );
}