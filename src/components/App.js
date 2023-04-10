import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  // Стейт текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Перенесли переменную карточек
  const [cards, setCards] = useState([]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  // Функция лайка карточки
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API(передаем айди нужной крточки и фалс-значение проверки нашего лайка)
    // Получаем обновлённые данные карточки
    // Далее обновляем стейт карточек, проверку в скобках не совсем поняла
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  // Функция удаления карточки
  const handleCardDelete = (card) => {
    // Отправляем запрос в API(передаем айди карточки)
    // Оновляем стейт(метод фильтр создает копию массива и исключает из него карточку)
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((i) => i._id !== card._id))
    })
  }

  // Функция-обработчик, в которой мы
  // Делаем делаем запрос к API на обновление пользовательской информации
  // Обновляем стейт контекста из полученных с сервера данных
  // Закрываем попап
  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  // Функция-обработчик, в которой мы
  // Делаем делаем запрос к API на обновление аватара
  // Обновляем стейт контекста из полученных с сервера данных (обновляем аватар локально)
  // Закрываем попап
  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  // Функция-обработчик, в которой мы
  // Делаем запрос к API на добавление карточки
  // Обновляем стейт карточек используя расширенную копию исходного массива (обновляем карточки локально)
  // Закрываем попап
  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  // Эффект при монтировании делающий запрос за пользовательской информацией и карточками
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, serverCards]) => {
      // Обновляем стейт-переменные из полученных значений
      setCurrentUser(userData);
      setCards(serverCards);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  // Импортировали контекст и обернули весь корневой компонент в его провайдер,
  // Контекст - состояние текущего пользователя
  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="fields">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
