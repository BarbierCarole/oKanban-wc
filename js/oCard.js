function rgb2hex (rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

class OCard extends HTMLElement {

  constructor() {
    super();

    const template = document.getElementById('cardTemplate').content;
    const clone = document.importNode(template, true);

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(clone);
  };

  get cardId() {
    return this.getAttribute('card-id');
  };

  set cardId(value) {
    this.setAttribute('card-id', value);
  };

  connectedCallback() {
    this.titleElement = this.shadowRoot.querySelector('.card-title');
    this.titleElement.textContent = this.title;
    this.boxElement = this.shadowRoot.querySelector('.box');
    this.boxElement.style.backgroundColor = this.color;
    
    this.formElement = this.shadowRoot.querySelector('form');
    this.formElement.addEventListener('submit', this.handleEdit.bind(this) );
    
    this.shadowRoot.querySelector('.delete-card-btn').addEventListener('click', this.handleRemove.bind(this) );
    this.shadowRoot.querySelector('.edit-card-btn').addEventListener('click', this.showForm.bind(this) );
  };

  async handleRemove() {
    try {
      if(confirm('Supprimer cette carte ?')) {
        let response = await fetch(Application.base_url+'/card/'+this.cardId, {method: "DELETE"});
        if (!response.ok) {
          let error = await response.json();
          throw error;
        }
        this.remove();
      }
    } catch (error) {
      console.error(error);
      alert('Impossible de supprimer la carte');
    }
  };

  showForm() {
    this.formElement.querySelector('input[name="title"]').value = this.titleElement.textContent;
    this.formElement.querySelector('input[name="color"]').value = rgb2hex(this.boxElement.style.backgroundColor);
    this.formElement.classList.remove('is-hidden');
    this.titleElement.classList.add('is-hidden');
  };

  hideForm() {
    this.formElement.classList.add('is-hidden');
    this.titleElement.classList.remove('is-hidden');
  };

  async handleEdit(event) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const response = await fetch(Application.base_url+'/card/'+this.cardId, {
        method: 'PATCH',
        body: formData
      });
      if (!response.ok) {
        let error = await response.json();
        throw error;
      }
      
      let updatedCard = await response.json();
      this.titleElement.textContent = updatedCard.title;
      this.boxElement.style.backgroundColor = updatedCard.color;

    } catch (error) {
      console.error(error);
      alert('Impossible de modifier la carte');
    } finally {
      this.hideForm();
    }
  }

};

customElements.define('o-card', OCard);