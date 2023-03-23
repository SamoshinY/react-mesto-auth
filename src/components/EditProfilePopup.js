import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);  
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation()

  useEffect(() => {
    resetForm();
    setValues({
    name: currentUser.name,
    job: currentUser.about
    })    
  }, [resetForm, currentUser, props.isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.job,
    });
    resetForm();
    setIsValid(false)
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      textButton={props.textButton}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="form__input">
        <input
          id="name-item"
          type="text"
          name="name"
          placeholder="Введите имя"
          className={`form__item form__item_text_name" ${errors.name && "form__item_type_error"}`}
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="name-item-error form__item-error">{errors.name || ''}</span>
        <input
          id="job-item"
          type="text"
          name="job"
          placeholder="Введите информацию о себе"
          className={`form__item form__item_text_job" ${errors.job && "form__item_type_error"}`}
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values.job || ''}
        />
        <span className="job-item-error form__item-error">{errors.job || ''}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
