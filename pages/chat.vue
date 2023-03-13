<template>
  <div class="bg-gray-200 text-center py-6">
    <h3 v-if="!loading">Chat</h3>
    <h3 v-else>LOADING...</h3>
  </div>
  <div>
    <div class="mt-6 mb-20">
      <div v-for="item in content" :key="item.content">
        <div :class="item.role" class="item flex relative mb-4 mx-4">
          <div class="text relative bottom-2 py-1 px-4">
            <p class="w-fit text-left">{{ item.content }}</p>
            <!-- <div v-html="item.content" class="w-fit text-left"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="input">
    <input v-model="chat" class="chat" />
    <button @click="getChat" class="ml-4 bg-gray-500 text-white p-3 rounded-lg">Send</button>
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
const role = ref('user')
const loading = ref(false)

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
        "messages": [{"role": "user", "content": `${chat.value}`}],
        "user": `${config.userID}`,
      }),
    }
  )
  return response.json()
}

const getChat = async () => {
  if (loading.value) return

  content.value.push({
    role: role.value,
    content: chat.value
  })
  loading.value = true
  
  await fetchChat()
  .then((data) => {
    console.log('data', data)
    content.value.push({
      role: 'ai',
      content: data?.choices[0]?.message?.content || ''
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

.input {
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