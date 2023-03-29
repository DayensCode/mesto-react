import React from "react";

function Card({ card, onCardClick }) {
	function handleClick() {
		onCardClick(card);
		} 

	return(
		<article className="element">
			<img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>
			<div className="element__container">
				<h2 className="element__title">
				</h2>
				<button className="element__like" type="button" aria-label="Поставить лайк"></button>
				<button className="element__trash" type="button" aria-label="Удалить место"></button>
			</div>
			<p className="element__counter"></p>
		</article>
	);
}

export default Card;