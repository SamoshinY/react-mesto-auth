import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__wrap">
          <div className="profile__image-wrapper">
            <img
              src={currentUser.avatar}
              className="profile__image"
              alt="аватар"
              onClick={props.onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="Карточки">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}            
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
