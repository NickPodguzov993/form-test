import { useNavigate } from "react-router-dom";
import { useLoanStore } from "../app/store";

export function ConfirmModal() {
    const navigate = useNavigate();
    const { formData, isModalOpen, setModalOpen, resetAll } = useLoanStore();

    if (!isModalOpen) return null;

    const handleClose = () => {
        setModalOpen(false);
        resetAll();
        navigate("/step-1");
    };

    return (
        <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content rounded-4 border-0 shadow">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">Заявка отправлена</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleClose}
                            />
                        </div>

                        <div className="modal-body">
                            <p className="mb-0 fs-5">
                                Поздравляем, {formData.lastName} {formData.firstName}. Вам
                                одобрена ${formData.amount} на {formData.term} дней.
                            </p>
                        </div>

                        <div className="modal-footer border-0">
                            <button className="btn btn-primary" onClick={handleClose}>
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show" />
        </>
    );
}