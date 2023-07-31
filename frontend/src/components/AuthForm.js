import React, { useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import useFormAndValidation from '../hooks/useFormAndValidation';
import { AppContext } from '../contexts/AppContext';

export default function AuthForm({ name, title, buttonText, buttonTextAction, onSubmit }) {

  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormAndValidation({});
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onSubmit(
      values.email,
      values.password,
    )
  }

  useEffect(() => {
    setIsValid(false);
    resetForm();
  }, [setIsValid, resetForm])

  return (
    <section className='authorization'>
      <form className={`form form_type_auth form_${name}`}
        name={`${name}-form`}
        onSubmit={handleSubmit}>
        <h2 className="heading form__heading form__heading_type_authorization">{title}</h2>
        <fieldset className="form__field form__field_register">
          <input className="form__input form__input_type_authorization form__input_el_email"
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            name="email"
            aria-label="email"
            placeholder="Email"
            autoComplete="on"
            minLength="2"
            maxLength="56"
            required />
          <span className={`name-input-error form__input-error ${errors.email ? 'form__input-error_active' : ''}`}>{errors.email}</span>
          <input className="form__input form__input_type_authorization form__input_el_password"
            value={values.password || ''}
            onChange={handleChange}
            id="password-input"
            type="password"
            name="password"
            aria-label="password"
            placeholder="Пароль"
            autoComplete="off"
            minLength="8"
            maxLength="30"
            required />
          <span className={`password-input-error form__input-error ${errors.password ? 'form__input-error_active' : ''}`}>{errors.password}</span>
        </fieldset>
        <button type="submit"
          className={`button form__submit form__submit_type_authorization text ${isValid ? '' : 'form__submit_inactive'}`}
          disabled={!isValid}
        >{isLoading ? buttonTextAction : buttonText}</button>
        <div className='authorization__menu'>
          {name === 'register' && <NavLink to="/sign-in" className="authorization__link-to-login">Уже зарегистрированы? Войти</NavLink>}
        </div>
        {/* <nav style={{ display: 'flex', 'column-gap': '15px' }} className="menu">
          <NavLink style={{ color: '#fff' }} to="/" className="menu__link">Карточки</NavLink>
          <NavLink style={{ color: '#fff' }} to="/sign-in" className="menu__link">Войти</NavLink>
          <NavLink style={{ color: '#fff' }} to="/sign-up" className="menu__link">Регистрация</NavLink>
        </nav> */}
      </form>
    </section>
  )
}