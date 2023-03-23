import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {


    function handleSubmit(evt) {
        evt.preventDefault();
        props.onConfirmDeleteCard(props.card);
      }

      
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={true}
      title={"Вы уверены?"}
      name={"confirm"}
      textButton={props.textButton}
    />
  );
}

export default ConfirmPopup;