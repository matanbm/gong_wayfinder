/* Shared building geometry for every Gong Icon floor.

   Floor files describe their layout in pixels of their own booking-app screenshot. Each floor has a
   `frame` that maps those pixels to meters:  meters = (px - cx) / ppm.
   The facade, terraces and corner lounges are the same structure on every floor, so they are defined
   once here (measured on the floor-22 screenshot, where cx=1396, cy=877, ppm=30). */
(() => {
  function circle3([x1, y1], [x2, y2], [x3, y3]) {
    const d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    const s1 = x1 * x1 + y1 * y1, s2 = x2 * x2 + y2 * y2, s3 = x3 * x3 + y3 * y3;
    const x = (s1 * (y2 - y3) + s2 * (y3 - y1) + s3 * (y1 - y2)) / d;
    const y = (s1 * (x3 - x2) + s2 * (x1 - x3) + s3 * (x2 - x1)) / d;
    return { x, y, r: Math.hypot(x1 - x, y1 - y) };
  }
  // Points on the circular arc from a to b passing through m.
  function arcPts(a, m, b, n = 14) {
    const c = circle3(a, m, b), TAU = Math.PI * 2;
    const ang = p => Math.atan2(p[1] - c.y, p[0] - c.x);
    const wrap = t => ((t % TAU) + TAU) % TAU;
    const a0 = ang(a);
    let sweep = wrap(ang(b) - a0);
    if (wrap(ang(m) - a0) > sweep) sweep -= TAU;
    return Array.from({ length: n + 1 }, (_, i) => {
      const t = a0 + sweep * i / n;
      return [c.x + c.r * Math.cos(t), c.y + c.r * Math.sin(t)];
    });
  }
  const along = (f, a, b, n = 12) => Array.from({ length: n + 1 }, (_, i) => { const x = a + (b - a) * i / n; return [x, f(x)]; });
  const alongY = (f, a, b, n = 12) => Array.from({ length: n + 1 }, (_, i) => { const y = a + (b - a) * i / n; return [f(y), y]; });
  const rect = (x1, y1, x2, y2) => [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];

  // Facade arcs in meters.
  const F22 = { cx: 1396, cy: 877, ppm: 30 };
  const m22 = ([x, y]) => [(x - F22.cx) / F22.ppm, (y - F22.cy) / F22.ppm];
  const FAC = {
    top: circle3(m22([868, 331]), m22([1396, 246]), m22([1920, 328])),
    bot: circle3(m22([870, 1425]), m22([1396, 1507]), m22([1920, 1425])),
    left: circle3(m22([840, 375]), m22([757, 877]), m22([840, 1380])),
    right: circle3(m22([1952, 375]), m22([2035, 877]), m22([1950, 1380])),
  };

  window.FLOORS = [];
  window.registerFloor = def => window.FLOORS.push(def);

  // Helpers for one floor, all working in that floor's screenshot pixels.
  window.floorHelpers = ({ cx, cy, ppm }) => {
    const xm = x => (x - cx) / ppm, ym = y => (y - cy) / ppm;
    const topY = x => cy + (FAC.top.y - Math.sqrt(FAC.top.r ** 2 - (xm(x) - FAC.top.x) ** 2)) * ppm;
    const botY = x => cy + (FAC.bot.y + Math.sqrt(FAC.bot.r ** 2 - (xm(x) - FAC.bot.x) ** 2)) * ppm;
    const leftX = y => cx + (FAC.left.x - Math.sqrt(FAC.left.r ** 2 - (ym(y) - FAC.left.y) ** 2)) * ppm;
    const rightX = y => cx + (FAC.right.x + Math.sqrt(FAC.right.r ** 2 - (ym(y) - FAC.right.y) ** 2)) * ppm;
    // Convert a floor-22 pixel point (where the standard geometry was measured) into this floor's pixels.
    const P = ([x, y]) => [cx + (x - F22.cx) / F22.ppm * ppm, cy + (y - F22.cy) / F22.ppm * ppm];
    const Px = x => P([x, F22.cy])[0], Py = y => P([F22.cx, y])[1];
    const pl = points => points.map(P);

    const facade = [
      along(topY, Px(868), Px(1920), 40), alongY(rightX, Py(375), Py(1380), 40),
      along(botY, Px(1920), Px(870), 40), alongY(leftX, Py(1380), Py(375), 40),
    ];
    const curves = {
      tl: pl(arcPts([977, 334], [875, 385], [845, 468])),
      tr: pl(arcPts([1812, 333], [1917, 388], [1942, 468])),
      bl: pl(arcPts([847, 1286], [877, 1370], [981, 1420])),
      br: pl(arcPts([1810, 1420], [1915, 1370], [1942, 1283])),
    };
    const std = {
      facade,
      slab: facade.flat(),
      curves,
      // Corner lounge floors (between the curved glass and the diagonal wall).
      lounges: [
        [...curves.tl, P([927, 489]), P([1004, 420])],
        [...curves.tr, P([1861, 487]), P([1785, 420])],
        [...curves.bl, P([1000, 1342]), P([930, 1266])],
        [...curves.br, P([1862, 1265]), P([1787, 1347])],
      ],
      // Outdoor terraces outside the curved glass.
      terraces: [
        [...along(topY, Px(868), Px(967), 6), ...curves.tl, ...alongY(leftX, Py(460), Py(375), 6)],
        [...along(topY, Px(1822), Px(1920), 6), ...alongY(rightX, Py(375), Py(460), 6), ...[...curves.tr].reverse()],
        [...alongY(leftX, Py(1295), Py(1380), 6), ...along(botY, Px(870), Px(972), 6), ...[...curves.bl].reverse()],
        [...along(botY, Px(1820), Px(1920), 6), ...alongY(rightX, Py(1380), Py(1292), 6), ...[...curves.br].reverse()],
      ],
      // Diagonal lounge walls with their doors, and the slanted walls of the rooms next to each corner.
      loungeWalls: [[[1004, 420], [927, 489]], [[1785, 420], [1861, 487]], [[930, 1266], [1000, 1342]], [[1787, 1347], [1862, 1265]]].map(pl),
      loungeDoors: [[965, 455], [1823, 454], [965, 1304], [1824, 1306]].map(p => [...P(p), 1]),
      cornerWalls: [
        [[967, 302], [1004, 420]], [[812, 460], [927, 489]], [[1822, 302], [1785, 420]], [[1977, 460], [1861, 487]],
        [[810, 1295], [930, 1266]], [[972, 1455], [1000, 1342]], [[1820, 1452], [1787, 1347]], [[1980, 1292], [1862, 1265]],
      ].map(pl),
    };
    return { topY, botY, leftX, rightX, along, alongY, rect, arcPts: (a, m, b, n) => arcPts(a, m, b, n), P, std };
  };
})();
