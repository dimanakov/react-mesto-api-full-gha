import React, { useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from '../hooks/useFormAndValidation';
import { AppContext } from '../contexts/AppContext';

export default function AddPlacePopup({ isOpen, onAddPlace }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({});
  const { isLoading } = useContext(AppContext);

  // действия при сабмите
  function handleSubmit(e) {
    // предотвращаем действие сабмита по учолчанию
    e.preventDefault();
    // передаём данные новой карточки наверх
    onAddPlace(
      values
    );
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name='elements'
      title='Новое место'
      isOpen={isOpen}
      buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
      onSubmit={handleSubmit}
      isValid={isValid}>
      {<fieldset className="form__field form__field_profile-info">
        <input className="form__input form__input_type_popup form__input_el_heading"
          value={values.name || ''}
          onChange={handleChange}
          id="heading-input"
          type="text"
          name="name"
          aria-label="Название"
          placeholder="Название"
          autoComplete="off"
          minLength="2"
          maxLength="30"
          required />
        <span className={`heading-input-error form__input-error ${errors.name ? 'form__input-error_active' : ''}`}>{errors.name}</span>
        <input className="form__input form__input_type_popup form__input_el_image"
          value={values.link || ''}
          onChange={handleChange}
          id="image-input"
          type="url"
          name="link"
          aria-label="Ссылка на картинку"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required />
        <span className={`image-input-error form__input-error ${errors.link ? 'form__input-error_active' : ''}`}>{errors.link}</span>
      </fieldset>}
    </PopupWithForm>
  )
}