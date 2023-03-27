import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useOpenAndClosePopup } from "../hooks/useOpenAndClosePopup";
import * as Auth from "../utils/Auth";

const App = () => {
  const {
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
    setButtonText,
    closeAllPopups,
  } = useOpenAndClosePopup();

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authResult, setAuthResult] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [headerButtonText, setHeaderButtonText] = useState("Регистрация");

  const checkToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        throw new Error("Нет токена");
      }
      const user = await Auth.getContent(jwt);
      if (!user) {
        throw new Error("Нет данных");
      }
      setLoggedIn(true);
      navigate("/", { replace: true });
      setUserData(user.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = useCallback(async (values) => {
    try {
      const data = await Auth.authorize(values);
      if (!data) {
        throw new Error("Ошибка аутентификации");
      }
      if (data) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      }
      checkToken();
    } catch (err) {
      console.error(err);
      setAuthResult(false);
      handleInfoTooltip();
    } finally {
      setLoading(false);
    }
  }, [checkToken, handleInfoTooltip]);

  const handleRegister = useCallback(
    async ({ password, email }) => {
      try {
        await Auth.register({ password, email });
        setAuthResult(true);
        handleInfoTooltip();
      } catch (err) {
        console.error(err);
        setAuthResult(false);
        handleInfoTooltip();
      } finally {
        setLoading(false);
      }
    },
    [handleInfoTooltip]
  );

  const handleLogOut = useCallback(() => {
    setLoggedIn(false);
    setUserData({});
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
    setHeaderButtonText("Регистрация");
  }, [navigate]);

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      Promise.all([api.getInfoMe(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn, checkToken]);

  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((like) => like._id === currentUser._id);
      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.error(err));
    },
    [currentUser]
  );

  const handleCardDelete = useCallback(
    (card) => {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards(cards.filter((c) => c._id !== card._id));
          closeAllPopups();
        })
        .catch((err) => console.error(err));
    },
    [cards, closeAllPopups]
  );

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

  const handleNavAuth = () => {
    if (headerButtonText === "Регистрация") {
      navigate("/sign-up", { replace: true });
      setHeaderButtonText("Войти");
    } else if (headerButtonText === "Войти") {
      setHeaderButtonText("Регистрация");
      navigate("/sign-in", { replace: true });
    }
  };

  if (loading) {
    return "Загрузка...";
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          onlogOut={handleLogOut}
          onAuth={handleNavAuth}
          userData={userData}
          loggedIn={loggedIn}
          buttonText={headerButtonText}
        />
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
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          authResult={authResult}          
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
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
