<template>
  <div>
    <h3>Chat</h3>
  </div>
  <div>
    <textarea type="text" v-model="chat" rows="6" cols="70" />
    <input v-model="role" />
    <br />
    <br />
    <button @click="getChat">Submit</button>
    <br />
    <hr />
    <p class="mt-3">AI</p>
    <!-- <div v-html="content"></div> -->
    <div>
      <div v-for="item in content" :key="item.content">
        <p :class="item.role">{{ item.role }}: {{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetch } from "ofetch";

const config = useRuntimeConfig()
interface Message {
  role: string
  content: string
}

const content = ref<Message[]>([])
const chat = ref('')
const role = ref('')

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
  content.value.push({
    role: role.value,
    content: chat.value
  })
  // console.log('content.value 1', content.value)
  // console.log([...content.value])
  // console.log('content.value 2', content.value)
  // await fetchChat()
  // .then((data) => {
  //   console.log('data', data)
  //   content.value.push({
  //     role: 'ai',
  //     content: data?.choices[0]?.message?.content || ''
  //   })
  // })
  // console.log('response', response)
  // content.value = response?.choices[0]?.message?.content || ''
  // content.value.push({
  //   role: 'ai',
  //   content: response?.choices[0]?.message?.content || ''
  // })
}

</script>

<style>

p.a {
  color: blue;
  text-align: left;
}

p.b {
  color: green;
  text-align: right;
}
</style>