<script>
export default {
  props: {
    flatId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      // Info del modale
      formData: {
        flatId: this.flatId,
        name: "",
        email: "",
        text: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    // Chiamata API
    submitForm() {
      console.log("Dati ricevuti:", this.formData);
      this.closeModal();
    },
  },
};
</script>

<template>
  <div>
    <!-- Bottone per aprire il Modale -->
    <button type="button" class="btn btn-primary" @click="showModal = true">
      Contatta l'host
    </button>

    <!-- Modale -->
    <div
      v-if="showModal"
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      aria-labelledby="contactHostModalLabel"
      style="display: block; background: rgba(0, 0, 0, 0.5)"

      @click.self="closeModal"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactHostModalLabel">
              Contatta l'host
            </h5>
          </div>

          <!-- Form del Modale -->
          <div class="modal-body">
            <form @submit.prevent="submitForm">

              <!-- FlatID -->
              <input type="hidden" v-model="formData.flatId" />

              <!-- Nome-Cognome -->
              <div class="form-group col-4">
                <label for="name">Nome e Cognome</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="formData.name"
                  required
                />
              </div>
              <!-- /Nome-Cognome -->

              <!-- Email -->
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="formData.email"
                  required
                />
              </div>
              <!-- /Email -->

              <!-- Messaggio -->
              <div class="form-group">
                <label for="text">Messaggio</label>
                <textarea
                  class="form-control"
                  id="text"
                  v-model="formData.text"
                  rows="5"
                  required
                ></textarea>
              </div>
              <!-- /Messaggio -->

              <!-- Submit -->
              <div class="d-flex gap-2 mt-2">
                <button type="submit" class="btn btn-primary">Invia</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="closeModal"
                  aria-label="Close"
                >
                  Annulla
                </button>
              </div>
              <!-- /Submit -->
            </form>
          </div>
          <!-- /Form del Modale -->
        </div>
      </div>
    </div>
    <!-- /Modale -->
  </div>
</template>

<style></style>
