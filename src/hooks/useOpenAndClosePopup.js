 import { useState } from 'react';

export const useOpenAndClosePopup = () => {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState('');
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState('');
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState('');
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState('');
  const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState('');
  const [isImagePopupOpen, setIsImagePopupOpen] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [buttonText, setButtonText] = useState('');
  const [deletedCard, setDeletedCard] = useState({});

  const handleEscDown = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  };

  const openPopup = (popupOpenSetter, textButton) => {
    popupOpenSetter('popup_opened');
    if (textButton) {
      setButtonText(textButton);
    }
    document.addEventListener('keydown', handleEscDown);
  };

  const handleInfoTooltip = () => {
    openPopup(setisInfoTooltipPopupOpen);
  };

  const handleEditAvatarClick = () => {
    openPopup(setisEditAvatarPopupOpen, 'Сохранить');
  };

  const handleEditProfileClick = () => {
    openPopup(setisEditProfilePopupOpen, 'Сохранить');
  };

  const handleAddPlaceClick = () => {
    openPopup(setisAddPlacePopupOpen, 'Создать');
  };

  const handleCardDeleteClick = (card) => {
    setDeletedCard(card);
    openPopup(setisConfirmPopupOpen, 'Да');
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openPopup(setIsImagePopupOpen);
  };

  const closeAllPopups = () => {
    setisEditAvatarPopupOpen('');
    setisEditProfilePopupOpen('');
    setisAddPlacePopupOpen('');
    setisConfirmPopupOpen('');
    setisInfoTooltipPopupOpen('');
    setIsImagePopupOpen('');
    document.removeEventListener('keydown', handleEscDown);
  };

  return {
    isInfoTooltipPopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    isImagePopupOpen,
    buttonText,
    selectedCard,
    deletedCard,
    handleInfoTooltip,
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    handleCardDeleteClick,
    handleCardClick,
    closeAllPopups,
    setButtonText,
  };
};
