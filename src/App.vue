<template>
  <div id="app">
    <Header />
    <router-view /> <!--//Her vises Eventlisten via Eventfeed-view -->
     <Registration />
    </div>

</template>



<script setup>
    import Header from './components/Header.vue'
    import Registration from "./components/Registration.vue";
</script>