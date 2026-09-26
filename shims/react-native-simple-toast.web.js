const toast = {
  SHORT: 0,
  LONG: 1,
  TOP: 49,
  BOTTOM: 81,
  CENTER: 17,

  show(message, duration, options) {
    console.log("Toast:", message);
  },

  showWithGravity(message, duration, gravity, options) {
    console.log("Toast:", message);
  },

  showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset, options) {
    console.log("Toast:", message);
  },
};

export default toast;