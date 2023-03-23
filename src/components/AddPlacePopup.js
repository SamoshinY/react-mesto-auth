import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  } = useFormAndValidation();

  useEffect(() => {
    setValues("");
    resetForm();
  }, [props.isOpen, setValues, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
    resetForm();
    setIsValid(false);
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      title={"Новое место"}
      name={"add"}
      textButton={props.textButton}
    >
      <fieldset className="form__input">
        <input
          id="place-item"
          type="text"
          name="name"
          placeholder="Название"
          className={`form__item form__item_type_name ${
            errors.name && "form__item_type_error"
          }`}
          required
          minLength="2"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="place-item-error form__item-error">
          {errors.name || ""}
        </span>
        <input
          id="link-item"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className={`form__item form__item_type_link ${
            errors.link && "form__item_type_error"
          }`}
          required
          onChange={handleChange}
          value={values.link || ""}
        />
        <span className="link-item-error form__item-error">
          {errors.link || ""}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
