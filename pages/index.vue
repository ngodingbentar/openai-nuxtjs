<template>
  <div>
    <h3>Name my pet</h3>
  </div>
  <div>
    <input type="text" v-model="animal" />
    <br />
    <button @click="fetchAnimal">Submit</button>
    <p>choices : {{ choices }}</p>
  </div>
</template>

<script lang="ts" setup>
import { Configuration, OpenAIApi } from "openai";

const config = useRuntimeConfig()
const configuration = new Configuration({
  apiKey: config.apiKey,
});
const openai = new OpenAIApi(configuration);

const choices = ref('')
const animal = ref('')

const fetchAnimal = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(),
    temperature: 0.6,
  });
  console.log('response', response.data)
  choices.value = response?.data?.choices[0]?.text || ''
};

function generatePrompt() {
  const capitalizedAnimal =
    animal.value[0].toUpperCase() + animal.value.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

</script>