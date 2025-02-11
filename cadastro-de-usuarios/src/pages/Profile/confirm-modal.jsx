import React from 'react';
import './confirm-modal.css';

function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar Exclusão</h2>
                <p>Você tem certeza que deseja excluir sua conta?</p>
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                    <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
