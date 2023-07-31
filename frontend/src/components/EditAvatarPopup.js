import React, { useRef, useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { AppContext } from '../contexts/AppContext';


export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {

  const avatarRef = useRef();
  const [isValid, checkValidity] = useState(false);
  const [isErrorActive, setErrorActivity] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading } = useContext(AppContext);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */
    });
  }

  function handleValue() {
    checkValidity(avatarRef.current.validity.valid);
    setErrorMessage(avatarRef.current.validationMessage);
    (isValid ? setErrorActivity(false) : setErrorActivity(true))
  };

  useEffect(() => {
    setErrorMessage('');
    avatarRef.current.value = '';
  }, [isOpen])


  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
      onSubmit={handleSubmit}
      isValid={isValid}>
      {<fieldset className="form__field form__field_profile-avatar">
        <input className="form__input form__input_type_popup form__input_el_avatar"
          onChange={handleValue}
          ref={avatarRef}
          id="avatar-input"
          name="avatar"
          aria-label="Аватар"
          placeholder="Ссылка на изображение"
          autoComplete="on"
          type="url"
          minLength="2"
          maxLength="200"
          required />
        <span className={`avatar-input-error form__input-error ${isErrorActive ? 'form__input-error_active' : ''}`}>{errorMessage}</span>
      </fieldset>}
    </PopupWithForm>
  )
}