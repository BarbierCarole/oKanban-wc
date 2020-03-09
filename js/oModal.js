/**
 * 
 * Une classe pour gérer les modales, dans laquelle on définit quelques méthodes bien utiles.
 * On pourra passer un callback à ces modales, qui sera lancé quand on submit le formulaire inclus.
 */

class OModal extends HTMLElement {

  constructor() {
    super();
  };

  show() {
    this.querySelector('.modal').classList.add('is-active');
  };

  hide() {
    this.querySelector('.modal').classList.remove('is-active');
  };

  setSubmitCallback(callback) {
    this.submitCallback = callback;
  };
  
  handleSubmit(event) {
    event.preventDefault();

    if (this.handledForm && this.submitCallback) {
      const formData = new FormData(this.handledForm);
      this.submitCallback(formData);
    }
    this.hide();
  };

  connectedCallback() {
    /** Close Buttons */
    const closeButtons = this.querySelectorAll('.close');
    for (let btn of closeButtons) {
      btn.addEventListener('click', this.hide.bind(this) );
    }

    /** form submit */
    this.handledForm = this.querySelector('form');
    this.handledForm.addEventListener('submit', this.handleSubmit.bind(this) );
  };
};