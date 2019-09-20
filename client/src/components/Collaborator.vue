<template>
  <li class="collaborator">
    <span>{{ collaborator.user.name }}</span>
    <span>
      <div v-if="isAllowed(collaborator.user)" class="close-button">X</div>
    </span>
  </li>
</template>


<script>
  export default {
    name: 'collaborator',
    props: {
      collaborator: { type: Object }
    },
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>


<style scoped>
  .close-button {
    color: red;
    font-weight: bold;
    vertical-align: middle;
    text-align: center;
  }
</style>