<template>
  <b-modal id="modalbox" size="sm" centered>
    <template #default>
      <b-img-lazy
        center
        :src="selectedImg.url"
        :alt="selectedImg.name"
        class="shadow"
        v-if="selectedImg.url"
      />
      <b-card-text class="text-center" v-else>Görüntülenemiyor.</b-card-text>
    </template>

    <template #modal-footer>
      <small
        ><i>{{ selectedImg.name }}</i></small
      >
    </template>
  </b-modal>
</template>
<script>
export default {
  name: "imageModal",
  props: {
    selectedImg: {
      type: Object,
      required: true,
    },
  },
};
</script>
