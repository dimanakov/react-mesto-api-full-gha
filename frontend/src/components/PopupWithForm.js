import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';

export default function PopupWithForm({ name, title, buttonText, isOpen, onSubmit, isValid, children }) {

  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);
  
  return (
    <div className={`popup popup_form popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className={`form form_type_popup form_${name}`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <h2 className="heading form__heading form__heading_type_input">{title}</h2>
          {children}
          <button type="submit"
            className={`button form__submit form__submit_type_popup text ${isValid ? '' : 'form__submit_inactive'}`}
            disabled={!isValid}
          >{buttonText}</button>
        </form>
        <button type="button"
          className="button button_focus popup__close-button"
          aria-label="закрыть"
          onClick={closeAllPopups} />
      </div>
    </div>)
}