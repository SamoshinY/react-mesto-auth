import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../pages/index.css";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register({onRegister}) {
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
  }, [setValues, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();    
    onRegister(values);
    resetForm();
    setIsValid(false);
  };

  return (
    <div className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form
        className={`auth-form auth-form_type_register`}
        onSubmit={handleSubmit}
      >
        <fieldset className="auth-form__input">
          <input
            id="email-item"
            type="email"
            name="email"
            placeholder="E-mail"
            className={`auth-form__item auth-form__item_text_email" ${
              errors.email && "auth-form__item_type_error"
            }`}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
          />
          <span className="email-item-error auth-form__item-error">
            {errors.email || ""}
          </span>
          <input
            id="password-item"
            type="password"
            name="password"
            placeholder="Пароль"
            className={`auth-form__item auth-form__item_text_password" ${
              errors.password && "auth-form__item_type_error"
            }`}
            required
            minLength="4"
            maxLength="200"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className="password-item-error auth-form__item-error">
            {errors.password || ""}
          </span>
        </fieldset>
        <button
          type="submit"
          className={`auth-form__button ${
            !isValid && "auth-form__button_disabled"
          }`}
          disabled={!isValid}          
        >
          Зарегистрироваться
        </button>
      </form>

      <NavLink to="/sign-in" className="auth__sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
}

export default Register;
