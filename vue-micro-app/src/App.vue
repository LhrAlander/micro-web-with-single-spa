<template>
  <div id="app" @click="openParcelModal">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  props: ['name', 'singleSpa', 'globalParcels'],
  created() {
    console.log('in vue created', this);
  },
  methods: {
    openParcelModal() {
      this.globalParcels.get('parcel modal').mount()
          .catch(() =>{})
          .finally(() => {
            this.globalParcels.get('parcel modal').update()
          })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
