import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const cardsElements = cards.map((card) => {
    return <Card card={card} key={card._id} onCardClick={onCardClick} />;
  });

  //совершаем запрос в API за пользовательскими данными и карточками
  //после получения ответа задаем полученные данные в соответствующие переменные состояния
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([serverCards, userData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(serverCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__user">
          <button
            onClick={onEditAvatar}
            className="profile__change-button"
            type="button"
            aria-label="Редактировать аватар профиля"
          >
            <img src={`${userAvatar}`} alt="Фотография профиля." className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать информацию профиля"
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить фото места"
        ></button>
      </section>

      <section className="elements" aria-label="Галерея">
        {cardsElements}
      </section>
    </main>
  );
}

export default Main;
