import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AuthForm from './AuthForm';
import api from '../utils/Api.js';
import Auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import { UserEmailContext } from '../contexts/UserEmailContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

export default function App() {

  const navigate = useNavigate();
  const { register, login, getUserAuth } = Auth({});

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);
  const [selectedCard, handleCardClick] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegisterSucces, setRegisterSucces] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCardsData] = useState([]);
  const [element, setElement] = useState({}); // стейт для карточки на удаление

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleAuthResult() {
    setAuthPopupOpen(true);
  }

  // изначально планировал сделать универсальный popup Confirm,
  // но не решил проблему с передачей функции удаления через атрибут.
  // Пришлось сделать попап только под удаление карточки
  function handleRemovePlaceConfirm() {
    handleCardDelete(element);
  }

  // Используется в <Card onRemoveCard={handleRemovePlaceClick}>
  function handleRemovePlaceClick(card) {
    setConfirmPopupOpen(true);
    setElement(card);
  }

  function closeAllPopups() {   //универсальная функция закрытия попапов через крестик
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setAuthPopupOpen(false);
    handleCardClick({});
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser({ ...currentUser, ...userInfo });
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.setUserAvatar(link)
      .then((userInfo) => {
        setCurrentUser({ ...currentUser, ...userInfo });
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((card) => {
        setCardsData([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCardsData((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.removeCard(card)
      .then(() => {
        setCardsData((cards) =>
          cards.filter((item) => { return item._id !== card._id })
        )
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleSubmitLogin(email, password) {
    setIsLoading(true);
    login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', { replace: true })
      })
      .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleSubmitRegister(email, password) {
    setIsLoading(true);
    register(email, password)
      .then((res) => {
        setRegisterSucces(true);
        navigate('/sign-in', { replace: true })
      })
      .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
        console.error(err);
        setRegisterSucces(false);
      })
      .finally(() => {
        handleAuthResult();
        setIsLoading(false);
      });
  }

  function getUserData() {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCardsData(initialCards);
      })
      .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
        console.error(err);
      });
  }

  function checkToken() {  //проверка токена
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getUserAuth(jwt)
        .then((res) => {
          setUserEmail(res?.data.email);
          res ? navigate('/', { replace: true }) : navigate('/sign-in', { replace: true });
          setLoggedIn(true);
        })
        .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
          console.error(err);
        })
    }
  }

  useEffect(() => {
    getUserData();
    checkToken();
    // eslint-disable-next-line
  }, []);

  return (    //визуальное содержимое компонента App вставляемое на главную страницу index
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <UserEmailContext.Provider value={userEmail}>
          <div className="page">
            <Header isLoggedIn={isLoggedIn}
              setLoggedIn={setLoggedIn} />
            <Routes>
              <Route
                path='/'
                element={<ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onRemoveCard={handleRemovePlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards} />} />
              <Route path='/sign-in'
                element={<AuthForm
                  name='login'
                  onSubmit={handleSubmitLogin}
                  title='Войти'
                  buttonText='Войти'
                  buttonTextAction='Вход...' />} />
              <Route path='/sign-up'
                element={<AuthForm
                  name='register'
                  onSubmit={handleSubmitRegister}
                  title='Регистрация'
                  buttonText='Зарегистрироваться'
                  buttonTextAction='Регистрация...' />} />
            </Routes>
            <Footer />
            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
            />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
            />
            <AddPlacePopup
              onAddPlace={handleAddPlaceSubmit}
              isOpen={isAddPlacePopupOpen}
            />
            <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              onConfirm={handleRemovePlaceConfirm} />
            <ImagePopup
              card={selectedCard}
            />
            <InfoTooltip
              isOpen={isAuthPopupOpen}
              resultRegister={isRegisterSucces}
            />
          </div >
        </UserEmailContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  )
}