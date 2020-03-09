class OAddListButton extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = `<div class="column" id="buttonsColumn">
                    <button class="button is-success" id="addListButton">
                        <span class="icon is-small">
                            <i class="fa fa-plus"></i>
                        </span>
                        &nbsp; Ajouter une liste
                    </button>
                </div>`;
  };

  connectedCallback() {
    this.querySelector('button').addEventListener('click', this.handleClick.bind(this) );
  };

  setModal(modalElement) {
    this.modal = modalElement;
  };

  handleClick() {
    if (this.modal) {
      this.modal.show();
    } else {
      alert('No Modal Plugged !');
    }
  };

};

customElements.define('o-addlist-btn', OAddListButton);