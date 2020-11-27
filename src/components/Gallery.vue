<template>
  <div class="gallery">

    <div v-if="loading" class="loading-status">
      Loading...
    </div>

    <pre class="badge badge-secondary">{{ apiKey }}</pre>
    <hr>

    <PictureModal v-if="currentPicture" />

    <div class="row">
      <div v-for="picture in currentPagePictures" 
        class="m-4 float-left picture"
        @click="loadPicture(picture.id)"
        :key="picture.id">
          <img :src="picture.cropped_picture" class="img-fluid">
      </div>
    </div>
    <hr>

    <button v-for="page in pageRange" :key="page" 
      @click="loadPage(page)"
      class="btn btn-sm btn-outline-secondary ml-1">
        {{ page }}
    </button>
    <hr>
  </div>

</template>

<script>
import PictureModal from './PictureModal.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Gallery',
  props: {
    apiKey: String
  },
  mounted() {
    this.initialize(this.apiKey)
  },
  computed: {
    pageRange() {
      let result = []
      for (let i=0; i < this.pageCount; i++) {
        result.push(i+1)
      }
      return result
    },
    ...mapState([
      'loading',
      'pageCount',
      'currentPagePictures',
      'currentPicture'
    ])
  },
  methods: {
    ...mapActions([
        'initialize',
        'loadPage',
        'loadPicture'
    ])
  },
  components: {
    PictureModal,
  }
}
</script>


<style scoped>
  .loading-status {
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    background-color: yellow;
    border: 1px solid orange;
  }
  .picture {
    width: 300px; 
    height: 300px;
    cursor: pointer;
  }
</style>
