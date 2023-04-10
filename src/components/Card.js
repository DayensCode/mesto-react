import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick () {
    onCardLike(card);
  }

  function handDeleteClick () {
    onCardDelete(card);
  }

  //импортировали контекст и подписываемся на него
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки используя поле контекста
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // Используем поле контекста в коллбеке метода
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  // Активный класс задастся только если изЛайкд вернет тру
  const cardLikeButtonClassName = ( 
  `element__like ${isLiked && 'element__like_active'}` 
  );; 

  //в разметке используем условный рендеринг:
  //иконка удаления покажется только если значение изОвн равно тру
  return (
    <article className="element">
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Поставить лайк"
          onClick={handleLikeClick}>
        </button>
        {isOwn && <button
          className="element__trash"
          type="button"
          aria-label="Удалить место"
          onClick={handDeleteClick}>
        </button>}
      </div>
      <p className="element__counter">{card.likes.length}</p>
    </article>
  );
}

export default Card;
