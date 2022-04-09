<template>
  <div class="d-flex flex-column justify-center align-center mt-10">
    <v-img
      :src="require('../../assets/google-translate-icon.png')"
      class="my-3"
      contain
      height="200"
    />
    <h1 class="d-block">What the translate?!</h1>

    <div class="caption mt-5">Enter the text you want to translate</div>
    <div class="d-flex align-baseline">
      <v-text-field
        v-model="inputText"
        class="mt-2"
        outlined
        hide-details
        label="Original text"
        @keyup.enter="translateInputText"
      />
      <v-btn
        class="ml-2"
        color="primary"
        x-large
        @click="translateInputText"
      >
        Do it!
      </v-btn>
    </div>
    <div class="d-flex align-baseline">
    <v-select
      v-model="targetLanguages"
      outlined
    />
      <v-btn
        class="ml-2"
        color="primary"
        x-large
        @click="translateInputText"
      >
        Randomize!
      </v-btn>
    </div>
  </div>
</template>

<script>
import Translator from '@/components/translator/Translator';
import ChefkochRecipeProvider
  from '@/components/translator/service/recipe-provider/ChefkochRecipeProvider';

export default {
  name: 'Translator',
  data() {
    return {
      inputText: null,
      targetLanguages: [],
      translator: new Translator(new ChefkochRecipeProvider()),
    };
  },
  async created() {
    const translatedRecipe = await this.translator.translate('https://www.chefkoch.de/rezepte/1773481287406950/Putenoberkeule-mit-Schalotten-Honig-und-Rosmarin.html');
    console.log(translatedRecipe);
  },
  methods: {
    translateInputText() {
      console.log('translate!');
    },
  },
  // computed: {
  //   languages() {
  //     return languages;
  //   },
  // },
};
</script>

<style scoped>

</style>
