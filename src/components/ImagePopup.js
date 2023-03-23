import { useEffect } from "react";

function ImagePopup({ card, onClose }) {
  useEffect(() => {
    const handleEscDown = (evt) => {
      if (evt.key === 'Escape') {        
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscDown);
    return () => {
      document.removeEventListener("keydown", handleEscDown);
    };
  }, [onClose]);

  return (
    <div
      className={`popup popup_type_image popup_dark ${
        card.name && "popup_opened"
      }`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
