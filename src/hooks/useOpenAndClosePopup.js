import { useState, useCallback } from "react";

export const useOpenAndClosePopup = () => {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState("");
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState("");
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState("");
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState("");
  const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [buttonText, setButtonText] = useState("");
  const [deletedCard, setDeletedCard] = useState({});

  const handleEditAvatarClick = () => {
    setButtonText("Сохранить");
    setisEditAvatarPopupOpen("popup_opened");
  }

  const handleEditProfileClick = () =>  {
    setButtonText("Сохранить");
    setisEditProfilePopupOpen("popup_opened");
  }

  const handleAddPlaceClick = () => {
    setButtonText("Создать");
    setisAddPlacePopupOpen("popup_opened");
  }

  const handleCardDeleteClick = (card) => {
    setDeletedCard(card);
    setButtonText("Да");
    setisConfirmPopupOpen("popup_opened");
  }

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleInfoTooltip = () => {
    setisInfoTooltipPopupOpen("popup_opened");
  }

  const closeAllPopups = () => {
    setisEditAvatarPopupOpen("");
    setisEditProfilePopupOpen("");
    setisAddPlacePopupOpen("");
    setisConfirmPopupOpen("");
    setisInfoTooltipPopupOpen("");
    setSelectedCard({});
  }

  return {
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    isInfoTooltipPopupOpen,
    buttonText,
    selectedCard,
    deletedCard,
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    handleCardDeleteClick,
    handleCardClick,
    handleInfoTooltip,
    closeAllPopups,
    setButtonText,
  };
}
