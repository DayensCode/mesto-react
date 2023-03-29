import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      type="add"
      title="Новое место"
      name="add-mesto"
      buttonText="Создать"
    >
      <input
        type="text"
        id="name-card"
        className="popup__input popup__input_type_mesto-title"
        name="name"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
      />
      <span id="name-card-error" className="popup__error popup__error_visible"></span>
      <input
        type="url"
        id="link"
        className="popup__input popup__input_type_mesto-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="link-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
