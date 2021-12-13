<template>
  <div class="text-center" data-app>
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Regeln
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Spielregeln
        </v-card-title>

        <v-card-text>
          In Carcassonne spielen wir im Uhrzeigersinn und der jüngste Spieler beginnt. Dabei führt der Spieler, der
          gerade an der
          Reihe ist, immer die nachfolgenden Aktionen in der angegebenen Reihenfolge aus. Dann ist der nächste Spieler
          an der

          Reihe usw. Als Erstes listen wir die Aktionen auf und erklären sie dann der Reihe nach. Dies machen wir anhand
          der
          auf den Plättchen abgebildeten Straßen, Städte und Klöster.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            Verstanden!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TheRules',
  data() {
    return {
      dialog: false,
    }
  }
}
</script>