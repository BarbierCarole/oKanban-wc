class OAddCardModal extends OModal {
  constructor () {
    super();

    this.innerHTML = `
    <div class="modal" id="addCardModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <form action="" method="POST">
                <header class="modal-card-head">
                    <p class="modal-card-title">Ajouter une Carte</p>
                    <button class="delete close" type="button" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Titre</label>
                        <div class="control">
                            <input type="text" class="input" name="title" value="" placeholder="Titre de la Carte">
                            <input type="hidden" name="list_id">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Couleur</label>
                        <div class="control">
                            <input type="color" name="color" >
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">Save changes</button>
                    <button class="button close" type="button">Cancel</button>
                </footer>
            </form>
        </div>
    </div>`;
  };

  setListId(value) {
    this.querySelector('input[name="list_id"]').value = value;
  };

};

customElements.define('o-addcard-modal', OAddCardModal);