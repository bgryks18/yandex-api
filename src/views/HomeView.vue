<template>
  <div class="home py-5">
    <b-container>
      <div class="mb-1 p-2">
        <b-input-group
          class="mb-3"
          type="number"
          min="1"
        >
          <b-input-group-prepend>
            <b-button
              size="sm"
              text="Button"
              variant="success"
              ><i class="fas fa-arrow-left"></i>Geri</b-button
            >
          </b-input-group-prepend>
        </b-input-group>
        <span>disk:/</span>
      </div>
      <b-table
        :items="items"
        stacked="md"
        :fields="[]"
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
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        class="shadow"
      ></b-pagination>
    </b-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        perPage: 3,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>