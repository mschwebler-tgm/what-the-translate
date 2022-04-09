<template>
  <div class="home">
    <Translator></Translator>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Translator from '@/components/translator/Translator.vue';

export default Vue.extend({
  name: 'HomeView',
  components: {
    Translator,
  },
});
</script>
