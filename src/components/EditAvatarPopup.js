import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose }) {
	return(
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			type="change"
			title="Обновить аватар"
			name="change"
			buttonText="Сохранить"
		>
			<input
				type="url"
				id="url"
				className="popup__input popup__input_type_avatar-link"
				name="link"
				placeholder="Ссылка на картинку"
				required
			/>
			<span id="url-error" className="popup__error popup__error_visible"></span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;