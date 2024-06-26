import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useOpenAndClosePopup } from '../hooks/useOpenAndClosePopup';
import { useFormSubmitHandlers } from '../hooks/useFormSubmitHandlers';
import { useAuthorize } from '../hooks/useAuthorize';
import { useCardHandlers } from '../hooks/useCardHandlers';
import Spinner from './Spinner';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const {
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
  } = useOpenAndClosePopup();

  const {
    checkToken,
    handleLogin,
    handleRegister,
    handleLogOut,
    loggedIn,
    loading,
    userData,
    authResult,
    errorText,
  } = useAuthorize(handleInfoTooltip);

  const { handleUpdateUser, handleUpdateAvatar, handleAddPlace } =
    useFormSubmitHandlers(
      api,
      setButtonText,
      buttonText,
      cards,
      closeAllPopups,
      setCards,
      setCurrentUser
    );

  const { handleCardLike, handleCardDelete } = useCardHandlers(
    api,
    currentUser,
    setCards,
    cards,
    closeAllPopups
  );

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfoMe(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData.reverse());
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  return loading ? (
    <Spinner />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header onLogOut={handleLogOut} email={loggedIn && userData.email} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} onLogOut={handleLogOut} />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          authResult={authResult}
          errorText={errorText}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textButton={buttonText}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textButton={buttonText}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          textButton={buttonText}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          card={deletedCard}
          onConfirmDeleteCard={handleCardDelete}
          textButton={buttonText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
