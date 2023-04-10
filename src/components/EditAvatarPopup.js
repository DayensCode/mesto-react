import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // Используем референс
  const avatar = useRef();

  // Обработчик сабмита в котором мы
  function handleSubmit (evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Записываем значение инпута полученое с помощью рефа
    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  // В разметке указала элементу атрибут реф
  // => получила прямой доступ к DOM-элементу
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        ref={avatar}
      />
      <span id="url-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
