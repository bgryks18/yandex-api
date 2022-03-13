<template>
  <div class="home py-5">
    <image-modal :selectedImg="selectedImg"></image-modal>
    <b-container>
      <div class="mb-1 p-2">
          <b-input-group>
            <b-button
              size="sm"
              text="Button"
              variant="success"
              @click="goToNewFolder(getPrevious)"
              v-if="getCurrent!==getDefaultPage"
              ><i class="fas fa-arrow-left"></i>Geri</b-button
            >
          </b-input-group>
        <span>{{getCurrent}}</span>
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
        <template #cell(name)="data">
          <b-link
            @dblclick="goToNewFolder(data.item.path)"
            v-if="data.item.type === 'dir'"
            ><i class="fas fa-folder-open file-icon"></i>&nbsp;{{
              data.item.name
            }}</b-link
          >
          <b-link
            v-b-modal.modalbox
            @click="
              selectImg({
                url: data.item.preview,
                name: data.item.name,
                selectedImg,
              })"
            v-else
            ><i class="fas fa-file"></i>&nbsp;{{ data.item.name }}</b-link
          >
        </template>

        <template #cell(path)="data">
          <span v-html="folderData(data.item.path)" class="folders"></span>
        </template>
        <template #cell(file)="data">
          <span v-if="data.item.type !== 'dir'"
            ><b-link :href="data.item.file"
              ><i class="fas fa-download"></i>&nbsp;İndir:{{
                data.item.name
              }}</b-link
            ></span
          >
          <span v-else>
            <b-link href="#" @click="goFolderDownload(data.item.path)"
              ><i class="fas fa-download"></i>&nbsp;Zip olarak indir:{{
                data.item.name
              }}</b-link
            >
          </span>
        </template>
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
  import {mapGetters,mapActions} from 'vuex'
  import imageModal from '../components/imageModal.vue'
  export default {
    data() {
      return {
        perPage: 8,
        currentPage: 1,
        selectedImg:{
          url: null,
          name: null
        }
      }
    },
    components:{imageModal},
    computed: {
      ...mapGetters([
        "getDataFromState",
        "getFields",
        "getPrevious",
        "getCurrent",
        "getDefaultPage",
      ]),
    },
    methods:{
      ...mapActions(["selectImg"]),
      folderData(value) {
      const arr = value.split("/");
      let content = "";
      arr.forEach((item, index) => {
        if (index === value.split("/").length - 1) {
          content +=
            `<span>` +
            "&nbsp;".repeat(index) +
            `<i class="far fa-file"></i>${item}<br/></span>`;
        } else {
          content +=
            `<span>` +
            "&nbsp;".repeat(index) +
            `<i class="fas fa-folder-open"></i>${item}<br/></span>`;
          }
          });
      return content;
      },
      goToNewFolder(path) {
        const count = this.folderNumber;
        this.$store.dispatch("getData", path);
      },
      goFolderDownload(path) {
        this.$store.dispatch("folderDownload", path);
      },
      }
  }
</script>