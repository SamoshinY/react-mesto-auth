import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  const handleCardLike = () => {
    onCardLike(card);
  };

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  const cardLikeButtonClassName = `cards__like ${
    isLiked && "cards__like_active"
  }`;

  return (
    <article className="cards__card">
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="cards__wrap">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes-wrap">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="cards__likes-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="cards__delete"
          onClick={handleDeleteClick}
        />
      )}
    </article>
  );
}

export default Card;
