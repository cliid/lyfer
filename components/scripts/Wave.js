function Wave(config) {
  var svg, width, height, getd, id, dur, i$, to$, i, begin, ds, vs;
  svg = '';
  width = config.width;
  height = config.height;
  getd = function () {
    let pathd, count, range, delta, offset, dy, i$, i, x, delta2, ox, y;
    pathd = 'M0 0';
    count = config.peak;
    range = (5 + Math.random()) * config.scale * height * 0.3;
    delta = 10 + Math.random() * 20;
    offset = height * (0.5 + config.offset) - range;
    dy = -(4 + Math.random()) * config.dy * offset;
    for (i$ = 0; i$ <= count; ++i$) {
      i = i$;
      x = (width * i) / count;
      delta2 = delta * (Math.random() * 0.4 + 0.8);
      ox = i ? (width * (i - 1)) / 4 : x;
      y = Math.random() * range + offset + (i * dy) / count;
      if (!i) {
        pathd += 'L ' + x + ' ' + y;
      } else if (i === 1) {
        pathd +=
          'Q ' +
          (ox + x) / 2 +
          ' ' +
          (y + delta2 * (1 + (i % 2) - 0.5)) +
          '  ' +
          x +
          ' ' +
          y;
      } else {
        pathd += 'T ' + x + ' ' + y;
      }
    }
    pathd += 'L ' + width + ' 0 Z';
    return pathd;
  };
  id = 'lg-' + Math.random();
  dur = 1 / config.speed;
  svg =
    '<linearGradient id="' +
    id +
    '" x1="0" x2="1" y1="0" y2="0">\n  <stop stop-color="' +
    config.c1 +
    '" offset="0"/>\n  <stop stop-color="' +
    config.c2 +
    '" offset="1"/>\n</linearGradient>';
  for (i$ = 0, to$ = config.count; i$ < to$; ++i$) {
    i = i$;
    begin = (-i * dur) / config.count;
    ds = [0, 1, 2].map(fn$);
    vs = [ds[0], ds[1], ds[2], ds[0]].join(';');
    svg +=
      '<path d="" fill="url(#' +
      id +
      ')" opacity="' +
      config.opacity +
      '">\n  <animate attributeName="d" dur="' +
      dur +
      's" repeatCount="indefinite"\n  keyTimes="0;0.333;0.667;1" calcMod="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"\n  begin="' +
      begin +
      's" values="' +
      vs +
      '"/>\n</path>';
  }
  return svg;

  function fn$() {
    return getd();
  }
}

export default Wave;
