<template>
  <div class="home py-5">
    <b-container>
      <div class="mb-1 p-2">
          <b-input-group>
            <b-button
              size="sm"
              text="Button"
              variant="success"
              ><i class="fas fa-arrow-left"></i>Geri</b-button
            >
          </b-input-group>
        <span>disk:/</span>
      </div>
      <b-table
        :items="getDataFromState"
        stacked="md"
        :fields="getFields"
        show-empty
        small
        class="files-table shadow"
        id="filesTable"
        :per-page="perPage"
        :current-page="currentPage"
        empty-text="Burayı yapan çok tembel, hiçbir şey yüklememiş!"
      >
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="getDataFromState.length"
        :per-page="perPage"
        align="center"
        class="shadow"
      ></b-pagination>
    </b-container>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        perPage: 8,
        currentPage: 1,
      }
    },
    computed: {
      ...mapGetters([
        "getDataFromState",
        "getFields",
        "getPrevious",
        "getCurrent",
        "getDefaultPage",
      ]),
    },
  }
</script>