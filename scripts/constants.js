var USA_ROOM_LIST = [
  new Room({
    name: "Press Corps office",
    level: 0,
    x: 82.4,
    y: 30.1
  }),
  new Room({
    name: "Product Mgmt: 3",
    level: 1,
    x: 73.4,
    y: 37.4
  }),
  new Room({
    name: "Reception: 1",
    level: 1,
    x: 30.9,
    y: 59.8
  })
]

var PARIS_ROOM_LIST = [
  new Room({
    name: "Royal Opera",
    level: 0,
    x: 94.3,
    y: 47.6
  })
  ]

var ENGLAND_ROOM_LIST = [
  new Room({
    name: "Middle Tower",
    level: 0,
    x: 11.9,
    y: 55.1
  }),
  new Room({
    name: "Byward Tower",
    level: 0,
    x: 17.1,
    y: 60
  })
]

var MAP_LIST = [
  new Map("usa", USA_ROOM_LIST),
  new Map("paris", PARIS_ROOM_LIST),
  new Map("england", ENGLAND_ROOM_LIST),
];
