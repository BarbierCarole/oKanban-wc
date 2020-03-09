class Application extends HTMLElement {
  static base_url = 'http://localhost:5050';

  constructor() {
    super();
  }

  connectedCallback() {
    // on préselectionne quelques sous-éléments, pour éviter de relancer trop de querySelector
    this.addListButton = this.querySelector('o-addlist-btn');
    this.addListModal = this.querySelector('o-addlist-modal');
    this.addCardModal = this.querySelector('o-addcard-modal');

    // une fonction pour brancher tous les boutons
    this.plugButtons();
    // et hop, on charge les data de l'API!
    this.getListsFromAPI();
  };

  plugButtons() {
    // on dit au bouton "ajouter une liste" d'agir avec la modale "ajouter une liste"
    this.addListButton.setModal(this.addListModal);

    // on définit les callbacks des modales
    this.addListModal.setSubmitCallback( this.handleCreateListSubmit.bind(this) );
    this.addCardModal.setSubmitCallback( this.handleCreateCardSubmit.bind(this) );
  };

  async handleCreateListSubmit(data) {
    try {
      // on rajoute "position" dans le formData
      let numberOfLists = this.querySelectorAll('o-list').length;
      data.set('position', numberOfLists);
      let response = await fetch(Application.base_url+'/list', {
        method: 'POST',
        body: data
      });
      if (! response.ok) {
        let error = await response.json();
        throw error;
      }

      let newList = await response.json();
      this.createList(newList.id, newList.title);
    } catch (error) {
      console.error(error);
      alert('Impossible de créer la liste');
    }
  };


  createList(listId, listTitle) {
    
    const newList = document.createElement('o-list');
    newList.title = listTitle;
    newList.listId = listId;
    
    // on attache la modale "créer une carte"
    newList.setModal(this.addCardModal);

    this.addListButton.before(newList);
  };

  async handleCreateCardSubmit(data) {
    try {
      let response = await fetch(Application.base_url+'/card', {
        method: 'POST',
        body: data
      });
      if (!response.ok) {
        let error = await response.json();
        throw error;
      }
      let newCard = await response.json();

      this.createCard(newCard.title, newCard.color, newCard.id, newCard.list_id);
    } catch (error) {
      console.error(error);
      alert('Impossible de créer la carte');
    }
  };

  createCard(title, color, cardId, listId) {
    const newCard = document.createElement('o-card');
    newCard.title = title;
    newCard.color = color;
    newCard.cardId = cardId;

    const targetList = this.querySelector(`o-list[list-id="${listId}"]`);
    targetList.addCard(newCard);
  };

  async getListsFromAPI() {
    try {
      let response = await fetch(Application.base_url+ '/list');
      if (!response.ok) {
        let error = await response.json();
        throw error;
      }
      const lists = await response.json();

      console.log(lists);
      for (let list of lists) {
        this.createList(list.id, list.title);
        for( let card of list.cards) {
          this.createCard(card.title, card.color, card.id, list.id);
        }
      }
    } catch (error) {
      console.error(error);
      alert('Impossible de charger les listes');
    }
  };

};

customElements.define('okanban-app', Application);