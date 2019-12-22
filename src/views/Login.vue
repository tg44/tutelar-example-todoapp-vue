<template>
  <div class="login">
    <LoginSelector/>
  </div>
</template>

<script>
  import LoginSelector from '@/components/Login.vue'

  export default {
    name: 'login',
    components: {
      LoginSelector
    }
  }
</script>
