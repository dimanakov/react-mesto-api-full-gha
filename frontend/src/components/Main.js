import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onRemoveCard }) {

  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile page__content page__content_narrow"
        aria-label="профиль пользователя">
        <div className="profile__cover">
          <img className="profile__avatar"
            src={`${currentUser.avatar}`}
            alt="фотография пользователя" />
          <button className="button profile__avatar-button"
            type="button"
            aria-label="редактировать аватар"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__group">
            <h1 className="heading profile__name">{currentUser.name}</h1>
            <button className="button button_focus profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}></button>
          </div>
          <p className="text profile__profession">{currentUser.about}</p>
        </div>
        <button className="button button_focus profile__add-button"
          type="button"
          aria-label="добавить место в галерею"
          onClick={onAddPlace}></button>
      </section>
      <section className="elements page__content page__content_narrow"
        aria-label="галерея посещённых мест]">
        <ul className="elements__gallery">
          {/* место для карточек */}
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onRemoveCard={onRemoveCard}
              />)
          })}
        </ul>
      </section>
    </main>
  )
}