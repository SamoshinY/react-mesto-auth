import { useState } from "react";

export function useOpenAndClosePopup() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState("");
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState("");
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState("");
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [buttonText, setButtonText] = useState("");
  const [deletedCard, setDeletedCard] = useState({});

  function handleEditAvatarClick() {
    setButtonText("Сохранить");
    setisEditAvatarPopupOpen("popup_opened");
  }

  function handleEditProfileClick() {
    setButtonText("Сохранить");
    setisEditProfilePopupOpen("popup_opened");
  }

  function handleAddPlaceClick() {
    setButtonText("Создать");
    setisAddPlacePopupOpen("popup_opened");
  }

  function handleCardDeleteClick(card) {
    setDeletedCard(card);
    setButtonText("Да");
    setisConfirmPopupOpen("popup_opened");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen("");
    setisEditProfilePopupOpen("");
    setisAddPlacePopupOpen("");
    setisConfirmPopupOpen("");
    setSelectedCard({});
  }

  return {
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    buttonText,
    selectedCard,
    deletedCard,
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    handleCardDeleteClick,
    handleCardClick,
    closeAllPopups,
    setButtonText,
  };
}
