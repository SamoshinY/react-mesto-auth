export const useFormSubmitHandlers = (
  api,
  setButtonText,
  buttonText,
  cards,
  closeAllPopups,
  setCards,
  setCurrentUser
) => {
  const handleUpdateUser = (info) => {
    setButtonText("Сохранение...");
    api
      .editUserProfile(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText(buttonText));
  };

  const handleUpdateAvatar = (link) => {
    setButtonText("Сохранение...");
    api
      .changeUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText(buttonText));
  };

  const handleAddPlace = (place) => {
    setButtonText("Сохранение...");
    api
      .addNewCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText(buttonText));
  };

  return { handleUpdateUser, handleUpdateAvatar, handleAddPlace };
};
