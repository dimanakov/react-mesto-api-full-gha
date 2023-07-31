//      popup увеличенная фотография
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';

export default function ImagePopup({ card }) {

  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(card?.link, closeAllPopups);
  
  return (
    <div className={`popup popup_scale-image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="scale-image">
          <img className="scale-image__image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="scale-image__figcaption">{card.name}</figcaption>
        </figure>
        <button type="button"
          className="button button_focus popup__close-button"
          aria-label="закрыть"
          onClick={closeAllPopups}
        ></button>
      </div>
    </div>
  )
}