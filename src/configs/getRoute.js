export const getRoute = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].to === target) {
      return i;
    }
  }
};
