<template>
  <div>
    <h3>Chat</h3>
  </div>
  <div>
    <textarea type="text" v-model="chat" rows="6" cols="70" />
    <br />
    <br />
    <button @click="getChat">Submit</button>
    <br />
    <hr />
    <p>AI</p>
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { fetch } from "ofetch";

const config = useRuntimeConfig()

const content = ref('')
const chat = ref('')

const fetchChat= async () => {
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": `${chat.value}`}]
      }),
    }
  )
  return response.json()
}

const getChat = async () => {
  const response = await fetchChat()
  console.log('response', response)
  content.value = response?.choices[0]?.message?.content || ''
}

</script>