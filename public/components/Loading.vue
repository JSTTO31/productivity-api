<template>
    <div class="h-screen w-screen d-flex flex-column align-center justify-center">
        <h2 class="mt-5">Loading...</h2>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: flex;
  filter: drop-shadow(0px 0px 1px #8d847f);
  animation: l3 1s infinite alternate linear;
}
.loader:before {
  content: "";
  flex: 1;
  background: #8d847f;
  border-radius: 50%;
  -webkit-mask: radial-gradient(circle closest-side at 66% 40%,#0000 115%,#000 118%);
}
@keyframes l3 {
  100% {filter:drop-shadow(0px 0px 20px #8d847f)}
}
</style>