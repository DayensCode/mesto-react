import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose }) {
	return(
		<PopupWithForm 
			isOpen={isOpen}
			onClose={onClose}
			type="edit"
			title="Редактировать профиль"
			name="edit-info"
			buttonText="Сохранить"
		>
			<input 
				type="text"
				id="name"
				className="popup__input popup__input_type_name"
				name="name"
				placeholder="Имя"
				required
				minLength={2}
				maxLength={40}
			/>
			<span id="name-error" className="popup__error popup__error_visible"></span>
			<input
				type="text"
				id="info"
				className="popup__input popup__input_type_info"
				name="about"
				placeholder="О себе"
				required
				minLength={2}
				maxLength={200}
			/>
			<span id="info-error" className="popup__error popup__error_visible"></span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;