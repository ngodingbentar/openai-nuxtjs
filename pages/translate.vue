<template>
  <div class="bg-gray-200 text-center py-6">
    <h3 v-if="!loading">English to other languages</h3>
    <h3 v-else>LOADING...</h3>
  </div>
  <div class="flex">
    <div>
      <p>Option 1</p>
      <input v-model="lang1" />
    </div>
    <!-- <div>
      <p>Option 2</p>
      <input v-model="lang2" />
    </div>
    <div>
      <p>Option 3</p>
      <input v-model="lang3" />
    </div> -->
  </div>
  <div>
    <div class="mt-6 mb-20">
      <div v-for="item in content" :key="item.content">
        <div :class="item.role" class="item flex relative mb-4 mx-4">
          <div class="text relative bottom-2 py-1 px-4">
            <!-- <p class="w-fit text-left">{{ item.content }}</p> -->
            <div v-html="item.content" class="w-fit text-left"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <input v-model="chat" class="chat" />
    <button @click="fetchEdit" class="ml-4 bg-gray-500 text-white p-3 rounded-lg">Send</button>
  </div>
</template>

<script lang="ts" setup>
// reference: https://platform.openai.com/examples/default-translate

import { Configuration, OpenAIApi } from "openai";

interface Message {
  role: string
  content: string
}

const config = useRuntimeConfig()
const configuration = new Configuration({
  apiKey: config.apiKey,
});
const openai = new OpenAIApi(configuration);

const content = ref<Message[]>([])
const chat = ref('')
const role = ref('user')
const loading = ref(false)
const lang1 = ref('Indonesian')
const lang2 = ref('Spanish')
const lang3 = ref('Japanese')

const fetchEdit =async () => {
  if (loading.value) return

  loading.value = true
  content.value.push({
    role: role.value,
    content: chat.value
  })

  await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: `Translate this into 1. ${lang1.value}, 2. ${lang2.value} and 3. ${lang3.value}:\n\n${chat.value}\n\n1.`,
    prompt: `Translate this into 1. ${lang1.value}:\n\n${chat.value}\n\n1.`,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
  .then((data) => {
    console.log('data', data)
    content.value.push({
      role: 'ai',
      content: data?.data?.choices[0]?.text || ''
    })
    chat.value = ''
    loading.value = false
  })
}
</script>

<style lang="postcss">
.text {
  @apply text-white w-fit;
}

.footer {
  @apply px-4 justify-center flex p-4 fixed bottom-0 w-full bg-gray-50;
  .chat {
    @apply w-3/4 bg-gray-300 p-3 rounded-lg;
  }
}
.user {
  color: blue;
  text-align: left;

  .text {
    @apply bg-gray-800;
    border-radius: 12px 12px 12px 0;
  }
}

.ai {
  @apply flex-row-reverse ;

  color: green;
  text-align: right;

  .text {
    @apply bg-sky-900;
    border-radius: 12px 12px 0 12px;
  }
}

@media only screen and (min-width: 768px) {
  .text {
    max-width: 50%;
  }
}

@media only screen and (max-width: 768px) {
  .text {
    max-width: 90%;
  }
}
</style>