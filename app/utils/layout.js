const layout = {
  windowWidth: () => {
    let w = window.innerWidth;
    let e = document.documentElement.clientWidth;
    let g = document.getElementsByTagName("body")[0].clientWidth;
    return w || e || g;
  },
  windowHeight: () => {
    let w = window.innerHeight;
    let e = document.documentElement.clientHeight;
    let g = document.getElementsByTagName("body")[0].clientHeight;
    return w || e || g;
  }
};