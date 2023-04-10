import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //стейт-переменные управляемые тк привязаны к вэлью инпутов
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //обработчики изменений в инпутах, обновляющие стейт
  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }
  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  }

  // Обработчик сабмита в котором мы
  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // в аргумент внешней функции обработчика передаем управляемые стейт-переменные
    onUpdateUser({
    name: name,
    about: description,
    });
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах
  // Стейт-переменные будут обновляться при изменении контекста (второй аргумент)
  useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        value={name}
        onChange={handleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
      />
      <span id="info-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
