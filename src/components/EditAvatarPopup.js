import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const {    
    handleChange,
    errors,
    isValid,
    resetForm,    
    setIsValid,
  } = useFormAndValidation();
  const avatarRef = useRef();

  useEffect(() => {    
    avatarRef.current.value = "";
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
    avatarRef.current.value = "";
    setIsValid(false)  
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      title={"Обновить аватар"}
      name={"change-avatar"}
      textButton={props.textButton}
    >
      <fieldset className="form__input">
        <input
          id="link-avatar-item"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          className={`form__item form__item_type_link ${errors.avatar && "form__item_type_error"}`}
          required
          ref={avatarRef}
          onChange={handleChange}
        />
        <span className="link-avatar-item-error form__item-error">{errors.avatar || ''}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
