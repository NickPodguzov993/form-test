
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useLoanStore } from "../app/store";

/*
  React Hook Form выбран для удобной валидации и уменьшения количества
  ручного кода вокруг форм.

  Zustand выбран для хранения общих данных всех шагов без prop drilling.

*/

type Step1Values = {
    phone: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "";
};

export function Step1Page() {
    const navigate = useNavigate();
    const { formData, setFormData } = useLoanStore();

    const {
        register,

        handleSubmit,
        formState: { errors },
    } = useForm<Step1Values>({
        defaultValues: {
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: Step1Values) => {
        setFormData(values);
        navigate("/step-2");
    };

    return (
        <Layout title="Форма 1" subtitle="Личные данные">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                    <label className="form-label">Телефон</label>

                    <input
                        type="tel"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        placeholder="0XXX XXX XXX"
                        {...register("phone", {
                            required: "Телефон обязателен",
                            pattern: {
                                value: /^0\d{3}\s\d{3}\s\d{3}$/,
                                message: "Введите телефон в формате 0XXX XXX XXX"
                            }
                        })}
                    />

                    {errors.phone && (
                        <div className="invalid-feedback">{errors.phone.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Имя</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        {...register("firstName", {
                            required: "Имя обязательно",
                        })}
                    />
                    {errors.firstName && (
                        <div className="invalid-feedback">
                            {errors.firstName.message}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Фамилия</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        {...register("lastName", {
                            required: "Фамилия обязательна",
                        })}
                    />
                    {errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName.message}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="form-label">Пол</label>
                    <select
                        className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                        {...register("gender", {
                            required: "Выберите пол",
                        })}
                    >
                        <option value="">Выберите пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                    {errors.gender && (
                        <div className="invalid-feedback">{errors.gender.message}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Далее
                </button>
            </form>
        </Layout>
    );
}