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

  const handleEscDown = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  const openPopup = (popupOpenSetter, textButton) => {
    popupOpenSetter("popup_opened");
    if (textButton) {
      setButtonText(textButton);
    }
    document.addEventListener("keydown", handleEscDown);
  };

  const handleEditAvatarClick = () => {
    openPopup(setisEditAvatarPopupOpen, "Сохранить");
  };

  const handleEditProfileClick = () => {
    openPopup(setisEditProfilePopupOpen, "Сохранить");
  };

  const handleAddPlaceClick = () => {
    openPopup(setisAddPlacePopupOpen, "Создать");
  };

  const handleCardDeleteClick = (card) => {
    setDeletedCard(card);
    openPopup(setisConfirmPopupOpen, "Да");
  };

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleInfoTooltip = () => {
    openPopup(setisInfoTooltipPopupOpen);
  };

  const closeAllPopups = () => {
    setisEditAvatarPopupOpen("");
    setisEditProfilePopupOpen("");
    setisAddPlacePopupOpen("");
    setisConfirmPopupOpen("");
    setisInfoTooltipPopupOpen("");
    setSelectedCard({});
    document.removeEventListener("keydown", handleEscDown);
  };

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
};
