import successfulImg from "../images/successfulImg.svg";
import failedImg from "../images/failedImg.svg";

function InfoTooltip({ isOpen, onClose, authResult, errorText }) {
  return (
    <div
      className={`popup ${isOpen}`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container">
        {authResult ? (
          <img
            className="popup__infoTooltip-img"
            src={successfulImg}
            alt="Вы успешно зарегистрировались!"
          />
        ) : (
          <img
            className="popup__infoTooltip-img"
            src={failedImg}
            alt="Что-то пошло не так!"
          />
        )}
        <p className="popup__infoTooltip-text">
          {authResult
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}            
        </p>
        <p className="popup__infoTooltip-error-text">{errorText}</p>
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
