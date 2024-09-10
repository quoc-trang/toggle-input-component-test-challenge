<script setup lang="ts">
const [modelValue, modifiers] = defineModel({
  set(value) {
    if (modifiers.binary) return value ? 1 : 0;
    return Boolean(value);
  },
});

defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <label class="switch">
    <input
      type="checkbox"
      checked
      v-bind="$attrs"
      v-model="modelValue"
      :true-value="modifiers.binary ? 1 : true"
      :false-value="modifiers.binary ? 0 : false"
    />
    <span class="slider round"></span>
  </label>
</template>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
