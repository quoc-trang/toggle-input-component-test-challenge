import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ToggleInput from "../src/components/ToggleInput.vue";
import { ref } from "vue";

describe("the toggle input component", () => {
  it("(vue-test-utils approach) toggles the v-model value between true and false when clicked", async () => {
    const toggleInputComponent = mount(ToggleInput, {
      attachTo: document.body,
      props: {
        modelValue: false,
      },
    });

    // Click the component twice
    toggleInputComponent.trigger("click");
    toggleInputComponent.trigger("click");

    // Get the values that were emitted
    const emmittedValues = toggleInputComponent.emitted("update:modelValue");
    const valueOnFirstClick = emmittedValues ? emmittedValues[0][0] : null;
    const valueOnSecondClick = emmittedValues ? emmittedValues[1][0] : null;

    // On the first click the value should be true since we passed false for the initial prop value
    expect(valueOnFirstClick).toBe(true);
    // On the second click the value should be false since we clicked it again
    expect(valueOnSecondClick).toBe(false);
  });

  it("(vue-test-utils alternative approach) toggles the v-model value between true and false when clicked", async () => {
    // Mount the component in a wrapper component so we can use v-model
    // and use the data bound in the parent to check the value
    const wrapper = mount(
      {
        template: `<ToggleInput v-model="isChecked" />`,
        components: { ToggleInput },
        setup: () => ({ isChecked: ref(false) }),
      },
      { attachTo: document.body },
    );

    // Get the toggle input component
    const toggle = wrapper.findComponent({ name: "ToggleInput" });

    // Click the component
    // it defaults to false so after first click it should be true
    toggle.trigger("click");
    expect(wrapper.vm.isChecked).toBe(true);

    // Click the component again
    // and it should toggle back to false
    toggle.trigger("click");
    expect(wrapper.vm.isChecked).toBe(false);
  });

  it("(vue-test-utils approach) supports a binary v-model modifier", async () => {
    const toggleInputComponent = mount(ToggleInput, {
      attachTo: document.body,
      props: {
        modelValue: 0,
        modelModifiers: { binary: true },
      },
    });

    // Click the component twice
    toggleInputComponent.trigger("click");
    toggleInputComponent.trigger("click");

    // Get the values that were emitted
    const emmittedValues = toggleInputComponent.emitted("update:modelValue");
    const valueOnFirstClick = emmittedValues ? emmittedValues[0][0] : null;
    const valueOnSecondClick = emmittedValues ? emmittedValues[1][0] : null;

    // On the first click the value should be true since we passed false for the initial prop value
    expect(valueOnFirstClick).toBe(1);
    // On the second click the value should be false since we clicked it again
    expect(valueOnSecondClick).toBe(0);
  });

  it("(vue-test-utils alternative approach) supports a binary v-model modifier", async () => {
    const wrapper = mount(
      {
        template: `<ToggleInput v-model.binary="isChecked" />`,
        components: { ToggleInput },
        setup: () => ({ isChecked: ref(0) }),
      },
      { attachTo: document.body },
    );

    // Get the toggle input component
    const toggle = wrapper.findComponent({ name: "ToggleInput" });

    // Click the component
    // it defaults to 0 so after first click it should be 1
    toggle.trigger("click");
    expect(wrapper.vm.isChecked).toBe(1);

    // Click the component again
    // and it should toggle back to 0
    toggle.trigger("click");
    expect(wrapper.vm.isChecked).toBe(0);
  });
});
