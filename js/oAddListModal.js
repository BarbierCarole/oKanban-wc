class OAddListModal extends OModal {

  constructor() {
    super();

    this.innerHTML = `
    <div class="modal" id="addListModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <form action="" method="POST">
                <header class="modal-card-head">
                    <p class="modal-card-title">Ajouter une liste</p>
                    <button class="delete close" type="button" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Nom</label>
                        <div class="control">
                            <input type="text" class="input" name="title" value="" placeholder="Nom de la liste">
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

};

customElements.define('o-addlist-modal', OAddListModal);