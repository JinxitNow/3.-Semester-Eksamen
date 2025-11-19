<template>
  <div id="app">
    <Header />
    <router-view /> <!--//Her vises Eventlisten via Eventfeed-view -->
    
    </div>

</template>



<script setup>
    import Header from './components/Header.vue'
</script>