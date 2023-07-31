import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onRemoveCard }) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked && 'elements__like-button_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

function handleRemoveCard(){
  onRemoveCard(card)
}

function handleLikeClick(){
  onCardLike(card);
}

  return (
    <li className="elements__item">
      <img className="elements__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name} />
      <div className="elements__group">
        <h2 className="heading elements__heading">{card.name}</h2>
        <div className="elements__like-group">
          <button className={`button elements__like-button ${cardLikeButtonClassName}`}
            type="button"
            aria-label="отметить: нравится"
            onClick={handleLikeClick}
            ></button>
          <span className="elements__like-count">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button
        className='button elements__remove-item'
        type="button"
        aria-label="удалить карточку"
        onClick={handleRemoveCard}
       />}
    </li>
  )
}