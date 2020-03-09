class OList extends HTMLElement {

  constructor() {
    super();

    const template = document.getElementById('listTemplate').content;
    const clone = document.importNode(template, true);

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(clone);
  };

  get listId () {
    return this.getAttribute('list-id');
  };

  set listId (value) {
    this.setAttribute('list-id', value);
  }

  setModal(modal) {
    this.modal = modal;
  };

  showModal() {
    if (this.modal) {
      this.modal.setListId(this.listId);
      this.modal.show();
    }
  };

  connectedCallback() {
    this.titleElement = this.shadowRoot.querySelector('h2');
    this.titleElement.textContent = this.title;
    this.titleElement.addEventListener('dblclick', this.showForm.bind(this) );

    this.formElement = this.shadowRoot.querySelector('form.edit-list-form');
    this.formElement.addEventListener('submit', this.handleEdit.bind(this) );

    this.shadowRoot.querySelector('.add-card-btn').addEventListener('click', this.showModal.bind(this) );
    this.shadowRoot.querySelector('.delete-list-btn').addEventListener('click', this.handleRemove.bind(this) );
  };

  addCard(cardElement) {
    this.shadowRoot.querySelector('.panel-block').appendChild(cardElement);
  };

  showForm() {
    this.formElement.querySelector('input[name="title"]').value = this.titleElement.textContent;
    this.titleElement.classList.add('is-hidden');
    this.formElement.classList.remove('is-hidden');
  };

  hideForm() {
    this.titleElement.classList.remove('is-hidden');
    this.formElement.classList.add('is-hidden');
  };

  async handleRemove() {
    try {
      // empty list ?
      if (this.shadowRoot.querySelectorAll('o-card').length ) {
        return alert('Impossible de supprimer une liste non vide');
      }
      if( confirm('Supprimer cette liste ?')) {
        let response = await fetch(Application.base_url+'/list/'+this.listId, {method: 'DELETE'});
        if (!response.ok) {
          let error = await response.json();
          throw error;
        }
        this.remove();
      }
    } catch (error) {
      console.error(error);
      alert('Impossible de supprimer la liste');
    }
  };
  
  async handleEdit(event) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const response = await fetch(Application.base_url+'/list/'+this.listId, {
        method: "PATCH",
        body: formData
      });

      if(!response.ok) {
        let error = await response.json();
        throw error;
      }

      const updatedList = await response.json();
      this.titleElement.textContent = updatedList.title;
    } catch (error) {
      console.error(error);
      alert('Impossible de modifier la liste');
    } finally {
      this.hideForm();
    }
  };

};

customElements.define('o-list', OList);