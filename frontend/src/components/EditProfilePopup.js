import React, { useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

export default function EditProfilePopup({ isOpen, onUpdateUser }) {

  const { values, handleChange, errors, isValid, setValues, setErrors } = useFormAndValidation({});

  // валидация формы

  const currentUser = useContext(CurrentUserContext);
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  // Подписка на контекст

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about })
    setErrors({ name: '', about: '' })
  }, [currentUser, setValues, setErrors, isOpen]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
      isValid={isValid}
      onSubmit={handleSubmit}>
      <fieldset className="form__field form__field_profile-info">
        <input className="form__input form__input_type_popup form__input_el_name"
          value={values.name || ''}
          onChange={handleChange}
          id="name-input"
          type="text"
          name="name"
          aria-label="Имя"
          placeholder="Иван Иванов"
          autoComplete="off"
          minLength="2"
          maxLength="40"
          required />
        <span className={`name-input-error form__input-error ${errors.name ? 'form__input-error_active' : ''}`}>{errors.name}</span>
        <input className="form__input form__input_type_popup form__input_el_profession"
          value={values.about || ''}
          onChange={handleChange}
          id="profession-input"
          type="text"
          name="about"
          aria-label="Профессия"
          placeholder="Строитель кораблей"
          autoComplete="off"
          minLength="2"
          maxLength="200"
          required />
        <span className={`profession-input-error form__input-error ${errors.about ? 'form__input-error_active' : ''}`}>{errors.about}</span>
      </fieldset>
    </PopupWithForm>
  )
}