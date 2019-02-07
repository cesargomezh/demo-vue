<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>
                <p>
                  Ingresa el número de teléfono de tu asesora independiente
                  Tissini.
                </p>
                <v-form>
                  <v-text-field
                    v-model="telefono"
                    :error-messages="nameErrors"
                    prepend-icon="phone"
                    name="telefono"
                    label="Telefono"
                    type="text"
                    required
                    @input="$v.telefono.$touch()"
                    @blur="$v.telefono.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="loading || !telefono"
                  :loading="loading"
                  @click="clic()"
                  value="submit"
                  >Ver Catalogo</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="showToast"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :top="showToast === true"
      :vertical="mode === 'vertical'"
      >No existe este usuario.
      <v-btn color="pink" flat @click="showToast = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="showToastSuccess"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :top="showToastSuccess === true"
      :vertical="mode === 'vertical'"
      >Bienvenido
      <v-btn color="pink" flat @click="showToastSuccess = false">Cerrar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  mixins: [validationMixin],
  data: () => ({
    telefono: '',
    drawer: null,
    loader: null,
    loading: false,
    mode: '',
    showToast: false,
    showToastSuccess: false,
    timeout: 4000
  }),
  props: {
    source: String
  },
  validations: {
    telefono: {
      required
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.telefono.$dirty) return errors
      !this.$v.telefono.required && errors.push('Telefono es requerido.')
      return errors
    }
  },
  methods: {
    clic() {
      this.loading = !this.loading
      axios({
        method: 'POST',
        url: 'https://octoplus.app/api/v1/customer',
        data: {
          mobilephone: this.telefono,
          octoplus_token: 'f550a68b-21ff-4b33-aa04-bff68023acca'
        },
        headers: { 'content-type': 'application/json' }
      }).then(
        result => {
          // this.response = result.data
          console.log(result)
          this.loader
          this.showToastSuccess = true
          this.loading = !this.loading
        },
        error => {
          console.log(error)
          this.showToast = true
          this.loading = !this.loading
        }
      )
    }
    //   this.axios
    //     .post({
    //       mobilephone: this.$v.telefono,
    //       octoplus_token: 'f550a68b-21ff-4b33-aa04-bff68023acca'
    //     })
    //     .then(response => console.log(response))
    //     .catch(e => {
    //       console.error(e)
    //     })
    // }
    // postNow() {
    //   axios
    //     .post('https://octoplus.app/api/v1/customer', {
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body: {
    //         mobilephone: this.$v.telefono,
    //         octoplus_token: 'f550a68b-21ff-4b33-aa04-bff68023acca'
    //       }
    //     })
    //     .then(response => console.log(response))
    // }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
