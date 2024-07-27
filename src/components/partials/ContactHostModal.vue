<script>
import axios from "axios";
import ToastNotification from '../ToastNotification.vue';

export default {
  components: { ToastNotification },
  props: {
    flatId: Number,
  },
  data() {
    return {
      showModal: false,
      formData: {
        flatId: this.flatId,
        name: "",
        email: "",
        text: "",
      },
      dateRange: {
        start: "",
        end: "",
      },
    };
  },
  watch: {
    flatId(newFlatId) {
      this.formData.flatId = newFlatId;
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    // Chiamata API
    submitForm() {
      // Aggiungere date al text
      if (this.dateRange.start && this.dateRange.end) {
        const startDate = new Date(this.dateRange.start).toLocaleDateString();
        const endDate = new Date(this.dateRange.end).toLocaleDateString();
        this.formData.text += `\n\n <br>Richiesta prenotazione dal ${startDate} al ${endDate}`;
      }

      axios
        .post(`http://127.0.0.1:8000/api/messages`, this.formData)
        .then((response) => {
          // console.log("Dati inviati:", response.data);
          this.closeModal();
          
          this.mostraToast();
          
        })
        .catch((error) => {
          console.error("Errore durante l'invio:", error);
        });
    },
    mostraToast() {
    const lineElem = document.querySelector('.ms_line');
    const toastElem = document.querySelector('.ms_toast');
    const messageElem = document.getElementById('message');
    messageElem.innerHTML = "Messaggio inviato corrattamente";
    toastElem.classList.toggle('ms_hidden');
    lineElem.classList.toggle('ms_hidden');
    lineElem.classList.toggle('w-100');

    setTimeout(this.nascondiToast, 4700);
},
nascondiToast() {
    const lineElem = document.querySelector('.ms_line');
    const toastElem = document.querySelector('.ms_toast');
    toastElem.classList.toggle('ms_hidden');
    lineElem.classList.toggle('ms_hidden');
    lineElem.classList.toggle('w-100');
}
  },
};
</script>

<template>
  <div class="d-inline-block">
    <!-- Bottone per aprire il Modale -->
    <button type="button" class="btn ms_brown_btn" @click="showModal = true">
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
              <div class="form-group">
                <label class="my-1" for="name">Nome e Cognome *</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="formData.name"
                  placeholder="Es. Mario Rossi"
                  required
                />
              </div>
              <!-- /Nome-Cognome -->

              <!-- Email -->
              <div class="form-group">
                <label class="my-1" for="email">Email *</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="formData.email"
                  placeholder="Es. mario.rossi@email.it"
                  required
                />
              </div>
              <!-- /Email -->

              <!-- Messaggio -->
              <div class="form-group">
                <label class="my-1" for="text">Messaggio *</label>
                <textarea
                  class="form-control"
                  id="text"
                  v-model="formData.text"
                  rows="5"
                  placeholder="Scrivi il tuo messaggio qui"
                  required
                ></textarea>
              </div>
              <!-- /Messaggio -->

              <!-- Data Info -->
              <div class="form-group">
                <label class="my-1" for="startDate">Check-in</label>
                <input
                  type="date"
                  id="startDate"
                  class="form-control"
                  v-model="dateRange.start"
                />
              </div>
              <div class="form-group">
                <label class="my-1" for="endDate">Check-out</label>
                <input
                  type="date"
                  id="endDate"
                  class="form-control"
                  v-model="dateRange.end"
                />
              </div>

              <!-- /Date Info -->

              <div class="mt-1 text-muted">
                <small>* Campi obbligatori</small>
              </div>

              <!-- Submit -->
              <div class="d-flex gap-2 mt-2">
                <button type="submit" class="btn ms_brown_btn" id="send-btn">Invia</button>
                <button
                  type="button"
                  class="btn ms_brown_btn2"
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

  <ToastNotification/>
</template>

<style lang="scss" scoped>
.ms_brown_btn {
  background-color: #705d3f;
  border: 1px solid #705d3f;
  color: white;
  &:hover {
    background-color: #f8f2eb;
    transition: all 0.7s;
    color: var(--primary-color);
    border: 1px solid #705d3f;
  }
}

.ms_brown_btn2 {
    background-color: white;
    border: 1px solid #705D3F;
    &:hover {
        background-color: #705D3F;
        color: white;
        .fa-pencil, .fa-trash {
            color: white;
        }
    }
}
</style>
