import { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from '../contexts/AppContext';


export default function ConfirmPopup({ isOpen, onConfirm }) {

  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      isValid={true}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name='remove-card'
      title='Вы уверены?'
      buttonText={`${isLoading ? 'Удаление...' : 'Удалить'}`}
    />
  )
}