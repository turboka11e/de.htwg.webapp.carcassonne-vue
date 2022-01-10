<template>
  <div class="text-center" data-app>
    <v-card 
    class="mx-auto" 
    max-width="500"
    elevation="15">
      <v-img
        src="../../public/images/Castle-Halls.jpg"
        height="200px"
      ></v-img>

      <v-card-title>
        Rules
      </v-card-title>

      <v-card-subtitle>   
        <p class="text-left">         
          In Carcassonne spielen wir im Uhrzeigersinn und der jüngste Spieler beginnt. 
          Dabei führt der Spieler, der gerade an der Reihe ist, immer die nachfolgenden Aktionen in der angegebenen Reihenfolge aus. 
          Dann ist der nächste Spieler an der Reihe usw. 
          
          Als Erstes listen wir die Aktionen auf und erklären sie dann der Reihe nach. 
          Dies machen wir anhand der auf den Plättchen abgebildeten Straßen, Städte und Klöster.
        </p>
      </v-card-subtitle>
    </v-card>
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