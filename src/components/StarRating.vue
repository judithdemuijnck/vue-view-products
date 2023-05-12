<template>
  <div class="ratings">
    <div class="empty-stars" />
    <div
      class="full-stars"
      :style="{
        width: ratingPercentage,
      }"
    />
  </div>
</template>

<script>
export default {
  name: "StarRating",

  props: ["rating"],

  computed: {
    ratingPercentage() {
      return Math.floor((this.rating / 5) * 100) + "%";
    },
  },
};
</script>

<style scoped>
.ratings {
  position: relative;
  vertical-align: middle;
  display: inline-block;
  color: #b1b1b1;
  overflow: hidden;
}

.full-stars {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  overflow: hidden;
  color: #fde16d;
}

.empty-stars:before,
.full-stars:before {
  content: "\2605\2605\2605\2605\2605";
  font-size: 14pt;
}

.empty-stars:before {
  -webkit-text-stroke: 1px #848484;
}

.full-stars:before {
  -webkit-text-stroke: 1px #ecbe24;
}
</style>
