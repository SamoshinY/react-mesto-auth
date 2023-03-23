import { useEffect } from "react";

function PopupWithForm({
  isValid,
  onClose,
  isOpen,
  onSubmit,
  title,
  name,
  textButton,
  children,
}) {
  useEffect(() => {
    const handleEscDown = (evt) => {
      if (evt.key === "Escape") {
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
      className={`popup popup_type_${name} ${isOpen}`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form
          className={`form form_type_${name}`}
          onSubmit={onSubmit}
          name={`form-${name}`}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`form__save ${!isValid && "form__save_disabled"}`}
            disabled={!isValid}
          >
            {textButton}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
