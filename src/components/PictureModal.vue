<template>
    <div class="modal" style="display: block; background-color: rgba(0,0,0,0.7)" @click="close">
        <div class="modal-dialog" style="max-width: 700px">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">{{ currentPicture.author }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="close">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <span class="badge badge-secondary">{{ currentPicture.camera }}</span>
                <br>
                <code>{{ currentPicture.tags }}</code>
                <br>
                  
                <img :src="currentPicture.full_picture" class="img-fluid">
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'PictureModal',
  computed: {
    ...mapState([
      'currentPicture',
    ])
  },
  methods: {
    close() {
      this.$store.state.currentPicture = null
    }
  }
}
</script>
