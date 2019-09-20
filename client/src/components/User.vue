<template>
  <form class="user-form">
    <div class="form-group">
      <label for="user-name">Name</label>
      <input type="text" class="form-control" id="user-name" placeholder="Enter Your Name">
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text"></span>Picture</span>
      </div>
      <div class="custom-file">
        <input type="file" class="custom-file-input" id="file-place-hoder">
        <label class="custom-file-label" for="file-place-hoder">Choose file</label>
      </div>
    </div>

    <div class="form-group">
      <label for="color-picker">Color</label>
      <input type="color" id="color-picker" onchange="pickColor($event)" value="#ff0000" style="width:85%;">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>


<script>
  export default {
    name: 'user',
    props: {
      user: { type: Object }
    },
    components: {},
    data() {
      return {

      }
    },
    computed: {},
    methods: {
      pickColor(event) {
      }
    }
  }

</script>