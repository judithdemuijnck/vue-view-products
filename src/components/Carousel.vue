<template>
  <div class="container">
    <img :src="displayImage" :alt="title + '-' + currentSlideIdx" />
    <span class="slide-count">{{
      currentSlideIdx + 1 + "/" + images.length
    }}</span>
    <button class="arrow prev" @click="prevSlide">&#10094;</button>
    <button class="arrow next" @click="nextSlide">&#10095;</button>
    <div class="navigation">
      <button
        v-for="idx in images.length"
        :key="idx"
        class="dot"
        :class="idx === currentSlideIdx ? ' active' : ''"
        @click="() => (currentSlideIdx = idx - 1)"
      />
      <!-- this click event doesn't update the state correctly right now, will find fix myself -->
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselItem",

  data() {
    return {
      currentSlideIdx: 0,
    };
  },

  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
  },

  computed: {
    displayImage() {
      return this.images[this.currentSlideIdx];
    },
  },

  methods: {
    prevSlide() {
      if (this.currentSlideIdx === 0) {
        this.currentSlideIdx = this.images.length - 1;
      } else {
        this.currentSlideIdx -= 1;
      }
    },
    nextSlide() {
      if (this.currentSlideIdx === this.images.length - 1) {
        this.currentSlideIdx = 0;
      } else {
        this.currentSlideIdx += 1;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 80vh;
  height: 45vh;
  position: relative;
  margin: auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-count {
  color: #717171;
  font-size: 0.9rem;
  text-shadow: 0.5px 0.5px #f2f2f2;
  padding: 8px 12px;
  position: absolute;
  top: 0;
  left: 0;
}

.arrow {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 16px;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border: none;
  margin-top: -22px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev {
  left: 0;
  border-radius: 0 3px 3px 0;
}

.prev:hover,
.next:hover {
  background-color: black;
  text-decoration: none;
}

.navigation {
  position: absolute;
  bottom: 0;
  left: 50%;
}

.dot {
  display: inline-block;
  border: none;
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 2px;
  background-color: #bbb;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.dot:hover,
.active {
  background-color: #717171;
}
</style>
