<script setup lang="ts">
import { ref } from "vue";
import ToggleInput from "./components/ToggleInput.vue";
const toggled = ref(false);
const toggledBinary = ref(0);
</script>

<template>
  <div class="page">
    <div class="inner">
      <section class="mb-5 inner">
        <div>
          <ToggleInput v-model="toggled" />
        </div>

        <p>Toggle value is: {{ toggled }}</p>
      </section>

      <section class="inner">
        <div>
          <ToggleInput v-model.binary="toggledBinary" />
        </div>

        <p>Toggle Binary value is: {{ toggledBinary }}</p>
      </section>
    </div>
  </div>
</template>
