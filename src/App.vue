<script setup>
import { computed, reactive, ref } from "vue";
import RuntimeTemplate from "vue3-runtime-template-next";
import { isEmpty } from "lodash";

const template = ref(`
  <div class="row">
    <div class="col">
      <mc-input name="firstname" placeholder="Firstname" :required="true" />
    </div>
    <div class="col">
      <mc-input name="lastname" placeholder="Lastname" :required="true" />
    </div>
    <div class="col">
      <mc-input name="city" placeholder="City" />
    </div>
  </div>
`);

const displayError = computed(() =>
  !isEmpty(formErrors.value) ? "Please fill the required fields" : ""
);

const form = reactive({
  firstname: "",
  lastname: "",
  city: "",
});

const formErrors = ref({});

const templateProps = { form, formErrors };
</script>

<template>
  <div class="container pt-5">
    <h1>👋 Hello, my dear developer friend!</h1>
    <p>
      This project serves as a test environment for visualizing the
      <code>vue3-runtime-template-next</code> package. The motivation behind
      this initiative lies in the fact that the original repository has not been
      updated since 2021. Consequently, using the previous version might pose
      challenges due to potential bugs that remain unfixed. Hence, I decided to
      create this new repository to address and contribute to these issues.
    </p>
    <p>
      The primary reason for establishing this repository stems from the
      limitations of the previous one. In the previous setup, we could directly
      utilize variables within the template. However, my requirement extended to
      utilizing these variables not only in the immediate component but also in
      its grandchildren components.
    </p>
    <p class="mb-2">The former approach functioned correctly:</p>
    <highlightjs language="vue" code="Hello my name is: {{ name }}" />
    <p>What about this one?</p>
    <p class="my-2">
      <highlightjs
        language="vue"
        code="Hello my name is: <MyPrettyComponent value='name' />"
      />
    </p>
    <p>
      As you can observe, we attempt to employ the variable within the
      grandchild component. However, this approach fails to yield the desired
      outcome. Consequently, I established this repository to rectify this
      issue.
    </p>
    <p>
      The main solution lies in utilizing <code>provide</code> to propagate data
      or variables to child components, and subsequently employing
      <code>inject</code>
      within these child components to retrieve the transferred data.
    </p>
    <p>
      Additionally, there's a significant advantage for us. You won't need to
      transfer the data back to the parent anymore, as both the form and
      formErrors are now reactive. Consequently, whenever you update a value in
      the child component, the corresponding values in the parent will be
      promptly updated as well.
    </p>
    <h2>The Real World Example</h2>
    <p>
      Consider a scenario where you're working on a Vue 3 project and you intend
      to integrate templates fetched from an API:
    </p>

    <div class="my-3"><highlightjs language="vue" :code="template" /></div>

    <div class="container">
      <RuntimeTemplate :template :templateProps />

      <Error :text="displayError" class="d-block mb-2" />

      <mc-button
        text="Submit"
        :disabled="!isEmpty(displayError)"
        :class="!isEmpty(displayError) ? 'btn-danger' : 'btn-primary'"
      />
    </div>

    <hr />
    <h3>Output</h3>
    form: {{ form }}
    <hr />
    formErrors: {{ formErrors }}
  </div>
</template>

<style scoped></style>
