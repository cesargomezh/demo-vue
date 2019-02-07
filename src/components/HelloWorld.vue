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
                    type="number"
                    required
                    @input="$v.telefono.$touch()"
                    @blur="$v.telefono.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Ver Catalogo</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data: () => ({
    telefono: '',
    drawer: null,
    loader: null,
    loading: false
  }),
  props: {
    source: String
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  validations: {
    telefono: {
      required
    }
  },
  compute: {
    nameErrors() {
      const errors = []
      if (!this.$v.telefono.$dirty) return errors
      !this.$v.telefono.required && errors.push('Telefono es requerido.')
      return errors
    }
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
