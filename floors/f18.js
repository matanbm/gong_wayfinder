/* Floor 18 (half floor: only the east half and the core are Gong's).
   Pixel coordinates on "Semi floor 18.png" (2022x1612). */
registerFloor({
  id: 18,
  image: 'Semi floor 18.png',
  frame: { cx: 1128.6, cy: 957, ppm: 28.44 },
  layout: ({ topY, botY, rightX, along, alongY, rect, std }) => ({
    walls: [
      // Room 01 and the two phone booths below it
      [[1128, topY(1128)], [1128, 645]],
      [[1128, 533], [1492, 533], [1533, 408]],
      [[1128, 578], [1219, 578]], [[1219, 533], [1219, 645]],
      // main-entrance band, room above the elevators, Abbey Road / Nevermind / restrooms column
      [[954, 645], [1304, 645]], [[954, 645], [954, 720]],
      [[1303, 598], [1303, 785]],
      [[1303, 598], [1513, 598]],
      [[1303, 721], [1334, 721], [1334, 773], [1412, 773]],
      [[1412, 598], [1412, 1142]],
      [[1513, 598], [1513, 966]], [[1513, 1007], [1513, 1142]],
      [[1412, 773], [1513, 773]], [[1412, 848], [1513, 848]], [[1412, 966], [1513, 966]], [[1412, 1007], [1513, 1007]],
      // core
      [[938, 720], [1304, 720]], [[938, 720], [938, 1192]], [[938, 1192], [1332, 1192]],
      [[938, 776], [841, 776], [841, 1141], [938, 1141]],
      [[1052, 720], [1052, 1192]], [[938, 786], [1052, 786]], [[938, 956], [1052, 956]], [[938, 1129], [1052, 1129]],
      [[1209, 720], [1209, 1192]], [[1052, 841], [1209, 841]], [[1052, 1071], [1209, 1071]],
      [[1209, 785], [1303, 785]], [[1209, 1129], [1310, 1129], [1310, 1192]],
      // bottom band, kitchen, Thriller, Rumours
      [[954, 1192], [954, 1264], [1304, 1264], [1304, 1192]],
      [[1332, 1192], [1332, 1142], [1513, 1142]],
      [[1128, 1264], [1128, botY(1128)]], [[1220, 1264], [1220, 1363]],
      [[1128, 1363], [1470, 1363], [1505, 1400], [1532, botY(1532)]],
      // Rooms 02-05
      [[rightX(557), 557], [1567, 583], [1570, 1325], [rightX(1352), 1352]],
      [[1570, 778], [rightX(778), 778]], [[1570, 943], [rightX(943), 943]], [[1570, 1135], [rightX(1135), 1135]],
      // east corner lounges
      [[1499, 512], [1567, 584]], [[1570, 1325], [1508, 1398]],
    ],
    doors: [
      [1472, 532, 1], [1570, 620, 1], [1570, 923, 1], [1570, 1117, 1], [1570, 1295, 1],   // Room 01-05
      [1219, 564, .9], [1219, 597, .9],                                                 // phone booths
      [1260, 645, 1.6],                                                                // main entrance -> office
      [1286, 720, 1], [1286, 785, 1],                                                  // entrance -> elevator lobby (assumed)
      [1321, 598, 1], [1430, 598, 1], [1513, 797, .9],                                 // room above elevators, Abbey Road, Nevermind
      [1495, 966, .9], [1495, 1007, .9],                                               // restrooms (assumed)
      [1557, 571, 1], [1525, 1378, 1],                                                 // corner lounges
      [1488, 1382, 1], [1220, 1346, .9],                                               // Rumours, Thriller
      [1258, 1264, 1.6], [1185, 1192, 1],                                              // back lobby -> kitchen, core room
    ],
    rooms: [
      { name: 'Abbey Road', type: 'meeting', poly: rect(1412, 598, 1513, 773), spot: [1425, 625] },
      { name: 'Nevermind', type: 'meeting', poly: rect(1412, 773, 1513, 848), spot: [1495, 797] },
      { name: 'Thriller', type: 'meeting', poly: rect(1128, 1264, 1220, 1363), spot: [1200, 1346] },
      { name: 'Rumours - Class Room', type: 'meeting', spot: [1470, 1400],
        poly: [[1128, 1363], [1470, 1363], [1505, 1400], [1532, botY(1532)], ...along(botY, 1532, 1128, 10)] },
      { name: 'Room 01', type: 'team', poly: [...along(topY, 1128, 1533, 10), [1492, 533], [1128, 533]], spot: [1350, 510] },
      { name: 'Room 02', type: 'team', poly: [[1567, 583], ...alongY(rightX, 557, 778, 6), [1570, 778]], spot: [1640, 722] },
      { name: 'Room 03', type: 'team', poly: [[1570, 778], ...alongY(rightX, 778, 943, 6), [1570, 943]], spot: [1650, 832] },
      { name: 'Room 04', type: 'team', poly: [[1570, 943], ...alongY(rightX, 943, 1135, 6), [1570, 1135]], spot: [1650, 1084] },
      { name: 'Room 05', type: 'team', poly: [[1570, 1135], ...alongY(rightX, 1135, 1352, 6), [1570, 1325]], spot: [1640, 1186] },
    ],
    // The west half isn't Gong's: gray and not walkable.
    voids: [[
      [1128, botY(1128)], ...std.facade[2].filter(p => p[0] < 1128), ...std.facade[3],
      ...std.facade[0].filter(p => p[0] < 1128), [1128, topY(1128)],
      [1128, 645], [954, 645], [954, 720], [938, 720], [938, 776], [841, 776], [841, 1141], [938, 1141],
      [938, 1192], [954, 1192], [954, 1264], [1128, 1264],
    ]],
    areas: [
      [[[1332, 1142], [1513, 1142], [1513, 1325], [1470, 1363], [1220, 1363], [1220, 1264], [1304, 1264], [1304, 1192], [1332, 1192]], 'kitchen'],
      [rect(1412, 848, 1513, 966), 'wc'], [rect(1412, 1007, 1513, 1142), 'wc'],
      [rect(1128, 533, 1219, 578), 'booth'], [rect(1128, 578, 1219, 645), 'booth'],
      [rect(938, 720, 1052, 1192), 'core'], [rect(841, 776, 938, 1141), 'core'], [rect(1052, 720, 1209, 1192), 'core'],
      [rect(1209, 720, 1303, 785), 'core'], [rect(1209, 1129, 1310, 1192), 'core'],
    ],
    deskClusters: [
      [1163, 365, 1186, 503, 1, 3, 'l'], [1187, 411, 1209, 503, 1, 2, 'r'],
      [1271, 390, 1318, 482, 2, 2, 'lr'], [1378, 391, 1424, 483, 2, 2, 'lr'],                    // Room 01
      [1604, 649, 1696, 695, 2, 2, 'tb'], [1588, 752, 1680, 774, 2, 1, 't'],                      // Room 02
      [1577, 781, 1716, 803, 3, 1, 'b'], [1611, 860, 1633, 905, 1, 1, 'l'], [1637, 858, 1728, 905, 2, 2, 'tb'], // Room 03
      [1607, 946, 1697, 968, 2, 1, 'b'], [1608, 1014, 1632, 1059, 1, 1, 'l'], [1633, 1013, 1724, 1059, 2, 2, 'tb'],
      [1627, 1108, 1718, 1131, 2, 1, 't'],                                                        // Room 04
      [1591, 1137, 1683, 1159, 2, 1, 'b'], [1603, 1214, 1695, 1262, 2, 2, 'tb'],                  // Room 05
    ],
    rotDesks: [
      { c: [1500, 461], u: [41, -125], chair: [1477, 454] },
      { c: [1625, 588], u: [115, -26], chair: [1628, 608] },
      { c: [1626, 1322], u: [112, 27], chair: [1628, 1302] },
    ],
    tables: [
      [[1443, 639, 1479, 749], [1, 0, 5, 5]],                                         // 0 Abbey Road
      // 1-10: Rumours classroom, two rows of five tables
      ...[[1407, 1430], [1477, 1498]].flatMap(([y1, y2]) =>
        [[1175, 1216], [1235, 1276], [1296, 1337], [1357, 1398], [1412, 1452]].map(([x1, x2]) => [[x1, y1, x2, y2], [2, 2, 0, 0]])),
      [[1148, 1440, 1166, 1468], [0, 0, 1, 0]],                                       // 11 trainer's desk, facing the class
    ],
    columns: [[1230, 380], [1513, 420], [1707, 765], [1716, 957], [1706, 1148], [1672, 1329], [1230, 1534], [1511, 1490]],
    labels: [
      ['WC · Women', 1462, 910], ['WC · Men', 1462, 1080], ['Elevators', 1361, 955],
      ['Stairs', 1240, 752], ['Stairs', 1258, 1160], ['Kitchen', 1400, 1180], ['Main entrance', 1130, 683],
    ],
    stairs: [[1211, 722, 1268, 783], [1211, 1131, 1308, 1190]],
    elevator: { cars: [[1311, 789, 1412, 864], [1311, 878, 1412, 953], [1311, 960, 1412, 1034], [1311, 1048, 1412, 1123]], side: 'w' },
    furnish: f => {
      f.deskAt(1140, 556, 1.2, 0.55, Math.PI / 2, 1);                     // phone booths
      f.deskAt(1140, 610, 1.4, 0.55, Math.PI / 2, 1);
      f.block('locker', 1340, 601, 1410, 619, 1.2);                       // cabinet in the room above the elevators
      f.block('locker', 1451, 602, 1510, 616, 0.75);                      // Abbey Road credenza
      f.armchair(1448, 791, 0.4, 1); f.armchair(1432, 823, 1, 0); f.armchair(1488, 823, -1, 0);   // Nevermind
      f.roundTable(1461, 823, 0.2, 0.45);
      f.armchair(1155, 1303, 1, 1); f.armchair(1187, 1303, -1, 1); f.armchair(1171, 1336, 0, -1); // Thriller
      f.roundTable(1171, 1316, 0.22, 0.42);
      // kitchen
      f.counter(1334, 1143, 1512, 1162); f.counter(1493, 1162, 1512, 1280);
      f.sink(1430, 1152);
      f.coffeeMachine(1470, 1150, [0, 1]);
      f.cafeTable(1345, 1228, 4); f.cafeTable(1422, 1208, 4); f.cafeTable(1395, 1272, 4);   // 12-14
      f.sofaRun(1445, 1292, 1487, 1310, [0, -1]);
      for (const y of [1215, 1240, 1265]) f.stool(1481, y);
      f.block('locker', 1318, 1347, 1458, 1361, 0.85);
      f.plant(1352, 1335, 0.8); f.plant(1424, 1335, 0.8);
      f.printer(1283, 1347);
      // east corner lounges
      f.cafeTable(1565, 507, 3);                                          // 15
      f.cafeTable(1590, 1382, 2);                                         // 16
    },
    crew: {
      busy: [0.6, 0.7, 0.4, 0.6, 0.5],
      tables: [
        { table: 0, seats: [0, 1, 3, 6, 9], presenter: 0 },              // meeting in Abbey Road
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(table => ({ table, seats: 0.7 })),   // class in Rumours
        { table: 11, seats: [0], presenter: 0 },                         // the trainer
        { table: 12, seats: [0, 2], activity: 'eat' },                   // breakfast in the kitchen
      ],
      groups: [{
        people: [
          { x: 1305, y: 1300, face: [1, 0], pose: 'stand', cup: true },
          { x: 1338, y: 1300, face: [-1, 0], pose: 'stand', cup: true },
          { x: 1481, y: 1215, face: [1, 0], pose: 'stool', cup: true },
          { x: 1481, y: 1240, face: [1, 0], pose: 'stool', cup: true },
          { x: 1462, y: 1180, face: [0, -1], pose: 'machine' },
        ],
        talk: [
          [4, 'Flat white? ☕'], [0, 'Yes please!'], [1, 'Class starts in 5 min'], [0, 'Save me a seat 🙏'],
          [2, 'This croissant 😍'], [3, 'Best kitchen in the building'], [4, 'Next one is on me 😉'], [1, 'Deal!'],
        ],
      }],
    },
  }),
});
