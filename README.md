# vue3-runtime-template-next

Test: https://vue3-runtime-template-test.web.app/

Github Repo: https://github.com/mustafacagri/vue3-runtime-template-next

This project serves as a test environment for visualizing the `vue3-runtime-template-next` package. The motivation behind this initiative lies in the fact that the original repository has not been updated since 2021. Consequently, using the previous version might pose challenges due to potential bugs that remain unfixed. Hence, I decided to create this new repository to address and contribute to these issues.

The primary reason for establishing this repository stems from the limitations of the previous one. In the previous setup, we could directly utilize variables within the template. However, my requirement extended to utilizing these variables not only in the immediate component but also in its grandchildren components.

The former approach functioned correctly:

`Hello my name is: {{ name }}`

What about this one?

`Hello my name is: <MyPrettyComponent value='name' />`

As you can observe, we attempt to employ the variable within the grandchild component. However, this approach fails to yield the desired outcome. Consequently, I established this repository to rectify this issue.

The main solution lies in utilizing `provide` to propagate data or variables to child components, and subsequently employing `inject` within these child components to retrieve the transferred data.

Additionally, there's a significant advantage for us. You won't need to transfer the data back to the parent anymore, as both the form and formErrors are now reactive. Consequently, whenever you update a value in the child component, the corresponding values in the parent will be promptly updated as well.

The Real World Example
Consider a scenario where you're working on a Vue 3 project and you intend to integrate templates fetched from an API:

```
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
```

---

[![npm](https://img.shields.io/npm/v/vue3-runtime-template-next.svg)](https://www.npmjs.com/package/vue3-runtime-template-next)

[![npm](https://img.shields.io/npm/dm/vue3-runtime-template-next.svg)](https://www.npmjs.com/package/vue3-runtime-template-next)

A Vue.js components that makes easy compiling and interpreting a Vue.js template at runtime by using a `v-html` like API.

vue3-runtime-template is based off v-runtime-template but tweaked to work with Vue 3.

## Motivation

This library solves the case where you get a vue-syntax template string on runtime, usually from a server. Think of a feature where you allow the user to create their own interfaces and structures. You save that as a vue template in your database, which your UI will request later. While components are pre-compiled at build time, this case isn't (since the template is received at runtime) and needs to be compiled at runtime.

vue3-runtime-template compiles that template and attaches it to the scope of the component that uses it, so it has access to its data, props, methods and computed properties.

Think of it as the `v-html` equivalent that also understands vue template syntax (while `v-html` is just for plain HTML).

## Getting Started

Install it:

```
npm install vue3-runtime-template
```

You must **use the with-compiler Vue.js version**. This is needed in order to compile on-the-fly Vue.js templates. For that, you can set a webpack alias for `vue` to the correct file.

For example, if you use the [Vue CLI](https://github.com/vuejs/vue-cli), create or modify the `vue.config.js` file adding the following alias:

```js
// vue.config.js
module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm-bundler.js',
      // ...
```

In [Nuxt v2](http://nuxtjs.org/), open the `nuxt.config.js` file and extend the webpack config by adding the following line to the `extend` key:

```js
// nuxt.config.js
{
  build: {
    extend(config, { isDev, isClient }) {
      config.resolve.alias["vue"] = "vue.esm-bundler.js";
      // ...
```

In [Nuxt v3](https://v3.nuxtjs.org/), open the `nuxt.config.js` file and extend the vite config by adding the following hook, just on client:

```js
// nuxt.config.js
{
 (...)

 hooks: {
      'vite:extendConfig': (config, { isClient, isServer }) => {
        if (isClient) {
          config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
        }
      },
    },

  (...)
```

You can read about different bundles of Vue in the official [help guides](https://v3.vuejs.org/guide/installation.html#with-a-bundler).

## Usage

You just need to import the `vue3-runtime-template` component, and pass the template you want:

```html
<template>
  <div>
    <v-runtime-template :template="template"></v-runtime-template>
  </div>
</template>

<script>
  import VRuntimeTemplate from "vue3-runtime-template";
  import AppMessage from "./AppMessage";

  export default {
    data: () => ({
      name: "Mellow",
      template: `
      <app-message>Hello {{ name }}!</app-message>
    `,
    }),
    components: {
      AppMessage,
      VRuntimeTemplate,
    },
  };
</script>
```

The template you pass **have access to the parent component instance**. For example, in the last example we're using the `AppMessage` component and accessing the `{{ name }}` state variable.

But you can access computed properties and methods as well from the template:

```js
export default {
  data: () => ({
    name: "Mellow",
    template: `
      <div>
        <app-message>Hello {{ name }}!</app-message>
        <button @click="sayHi">Say Hi!</button>
        <p>{{ someComputed }}</p>
      </div>
		`,
  }),
  computed: {
    someComputed() {
      return "Wow, I'm computed";
    },
  },
  methods: {
    sayHi() {
      console.log("Hi");
    },
  },
};
```

## Limitations

Keep in mind that the template can only access the instance properties of the component who is using it.

## Usage With <script setup>

If you encounter a situation where you need to pass additional properties to the template when using `<v-runtime-template>`, you can leverage the `templateProps` property. This workaround is not explicitly mentioned in the official documentation.

Here's an example of how you can use it:

```
<template>
  <div>
    <h1>Product</h1>
    <v-runtime-template
      :template="productContent"
      :template-props="templateProps"
    ></v-runtime-template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VRuntimeTemplate from 'vue3-runtime-template'

const thing = ref('pineapple pizza')
const templateProps = {
  thing,
}
const productContent = '<p>You can now buy a new <strong>{{ thing }}</strong> from us!</p>'
</script>
```

## Using Custom Components with vue3-runtime-template

If you have custom components, such as `YourComponent`, and you're using `vue3-runtime-template` in your Vue 3 application, follow these steps to seamlessly integrate them:

### Register YourComponent

In your main entry file, typically `main.js` or `main.ts`, ensure that your custom component, like `YourComponent`, is registered globally using `app.component`. For example:

```
import { createApp } from 'vue';
import { YourComponent } from '@/components/YourComponent.vue';
import App from './App.vue';

const app = createApp(App);

app.component('YourComponent', YourComponent);

app.mount('#app');
```

Replace `YourComponent` with the actual name of your component.

### Include YourComponent in vue3-runtime-template:

Utilize `vue3-runtime-template` to dynamically render templates, including your custom component. Here's an example:

```
<template>
  <div>
    <!-- VRuntimeTemplate with YourComponent -->
    <VRuntimeTemplate
      :template="yourTemplateString"
      :templateProps="{
        YourComponent
      }"
    />
  </div>
</template>

<script setup>
  // No need to import YourComponent here, as it's registered globally
  const yourTemplateString = '<YourComponent />';
</script>
```

## Comparison

### vue3-runtime-template VS v-html

_TL;DR: If you need to interpret only HTML, use `v-html`. Use this library otherwise._

They both have the same goal: to interpret and attach a piece of structure to a scope at runtime. The difference is, `[v-html](https://vuejs.org/v2/api/#v-html)` doesn't understand vue template syntax, but only HTML. So, while this code works:

```html
<template>
	<div v-html="template"></div>
</template>

<script>
export default {
  data: () => ({
    template: `
      <a href="/mike-page">Go to Mike page</a>
    `
```

the following wouldn't since it uses the custom `router-link` component:

```html
<router-link to="mike-page">Go to Mike page</router-link>
```

But you can use vue3-runtime-template, which uses basically the same API than v-html:

```html
<template>
	<vue3-runtime-template :template="template"></vue3-runtime-template>
</template>

<script>
export default {
  data: () => ({
    template: `
      <router-link to="mike-page">Go to Mike page</router-link>
    `
```

### vue3-runtime-template VS dynamic components (`<component>`)

Dynamic components have somewhat different goal: to render a component dynamically by binding it to the `is` prop. Although, these components are usually pre-compiled. However, the goal of vue3-runtime-template can be achieved just by using the component options object form of dynamic components.

In fact, vue3-runtime-template uses that under the hood (in the render function form) along with other common tasks to achieve its goal.
