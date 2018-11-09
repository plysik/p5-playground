let canvas;
let font;
let vehicles = [];
let lorem = `Cupcake ipsum dolor sit amet. Halvah pie toffee wafer. Jelly-o donut pudding gummies. I love powder marshmallow carrot cake I love. Fruitcake jelly-o tart tiramisu macaroon candy canes. Tiramisu I love cake chocolate bar bear claw marzipan. Biscuit gummi bears gingerbread. Cookie I love bear claw. Gummi bears sweet roll pudding. Pudding cookie sesame snaps. Icing cake apple pie donut danish. Brownie sesame snaps apple pie cupcake I love sugar plum. Candy canes fruitcake bonbon bonbon powder fruitcake halvah muffin.
Chocolate ice cream cupcake pudding brownie pie brownie cake. Chocolate bar caramels macaroon liquorice. Sweet roll danish jujubes cake chupa chups lollipop cookie chocolate cake. Tiramisu jelly I love cake pudding cotton candy cotton candy wafer. Biscuit cake tart caramels caramels I love jelly-o chocolate. Dragée I love tart bonbon I love caramels jelly beans chocolate bar chupa chups. Biscuit sweet cake dragée gummi bears caramels. Toffee dragée I love chocolate bar. Danish ice cream jelly cake icing gingerbread danish. Wafer tiramisu marshmallow bear claw I love gummies macaroon icing gingerbread. Croissant marshmallow caramels gingerbread ice cream danish I love lollipop. Apple pie soufflé powder soufflé caramels.
Tart chocolate biscuit chocolate cake pastry. Soufflé I love chocolate gummi bears croissant caramels gummies. Muffin marshmallow bear claw cake. Pudding tart brownie. I love ice cream chocolate. I love danish pastry croissant. Powder cotton candy cotton candy muffin. Lemon drops I love candy canes chupa chups caramels I love pie cake. Chupa chups tiramisu dessert lemon drops toffee dessert. Donut muffin jelly beans dessert. Pudding pastry sugar plum sweet roll. Toffee candy sweet roll pudding caramels candy canes muffin carrot cake candy canes. I love chocolate bar sweet roll topping lemon drops liquorice marzipan cheesecake.
Tootsie roll lollipop lollipop caramels dragée icing oat cake. Cookie wafer candy liquorice. Fruitcake apple pie danish oat cake tiramisu oat cake jelly beans. Bear claw ice cream I love I love oat cake tootsie roll toffee I love. Brownie candy canes jelly-o. Candy gummi bears croissant. Sugar plum macaroon carrot cake jelly-o ice cream donut. Pudding marzipan icing jelly-o danish. Pie sugar plum croissant chupa chups dragée wafer liquorice cupcake. Sugar plum cake cotton candy cotton candy croissant icing cake liquorice. Tiramisu biscuit sweet sweet tiramisu brownie powder muffin. Chocolate cake powder wafer soufflé marshmallow brownie. I love gummies biscuit jujubes.
Cake jujubes sweet roll topping fruitcake tiramisu marzipan apple pie. Gingerbread powder jelly. Cheesecake chocolate biscuit candy lemon drops. Cookie chocolate bar macaroon lollipop I love donut cheesecake bear claw chocolate bar. Jujubes cupcake I love caramels. Chocolate cake sesame snaps jelly beans dessert. Apple pie toffee apple pie chupa chups I love sweet halvah. Toffee jujubes jelly-o brownie. Sweet donut wafer muffin oat cake pudding icing icing. Tart chocolate caramels tart croissant. Bonbon tart soufflé gingerbread chocolate. Chupa chups cheesecake jelly I love jujubes I love.`;
let textArray = [];
let textFromQuery = null;
let hash = null;
let fontSize = 192;
let textIndex = 0;
let translateX = 0;
let margin = 20;
let points = [];
let bounds = {};
let textPos = {
  x: 0,
  y: 0
};
function preload() {
  font = loadFont("assets/Lato-Regular.ttf");
  let params = getURLParams();
  textFromQuery = decodeURI((params.text || "").replace(/\+/g, " ").trim());
  if (params.hash) hash = atob(params.hash);
  textArray = (textFromQuery || hash || lorem).split(" ");
}
function setup() {
  canvas = createCanvas(layout.windowWidth(), layout.windowHeight());
  textPos = {
    x: 0,
    y: 0
  };
  startDisplay();
  setInterval(startDisplay, 2000);
}
window.onresize = function() {
  canvas = createCanvas(layout.windowWidth(), layout.windowHeight());
};

function startDisplay() {
  changeText(textIndex);
  textIndex++;
  if (textIndex === textArray.length) textIndex = 0;
}

function changeText(index) {
  bounds = font.textBounds(textArray[index], textPos.x, textPos.y, fontSize);
  if (bounds.w > width) {
    fontSize *= (width - 2 * margin) / bounds.w;
    fontSize = Math.floor(fontSize);
  }
  points = font.textToPoints(textArray[index], textPos.x, textPos.y, fontSize);
  let diff = width - 2 * margin - bounds.w;
  translateX = diff > 0 ? Math.floor(diff / 2) : margin;
  points.map((p, index) => {
    let vehicle;
    if (vehicles[index]) {
      vehicle = vehicles[index];
      vehicle.setTarget(p.x, p.y);
    } else if (vehicles.length > 0) {
      let randomIndex = Math.floor(random(vehicles.length));
      let sourceV = vehicles[randomIndex];
      vehicle = new Vehicle(p.x, p.y, sourceV.pos.x, sourceV.pos.y);
      vehicles.push(vehicle);
    } else {
      vehicle = new Vehicle(p.x, p.y, width / 2, height / 2);
      vehicles.push(vehicle);
    }
  });

  if (points.length < vehicles.length) {
    vehicles.slice(points.length, vehicles.length).map((v, index) => {
      let sourceVIndex = Math.floor(random(points.length - 1));
      let targetV = vehicles[points.length + index];
      let sourceV = points[sourceVIndex];
      targetV.setTarget(sourceV.x, sourceV.y);
    });
  }
}

function draw() {
  background(255, 221, 0);
  // if (bounds.w > width) {
  //   fontSize *= (width - margin * 2) / bounds.w;
  //   fontSize = Math.floor(fontSize);
  //   points = font.textToPoints(
  //     textArray[textIndex],
  //     textPos.x,
  //     textPos.y,
  //     fontSize
  //   );
  //   startDisplay();
  // }
  translate(translateX, height / 2);

  vehicles.map(v => {
    v.behaviors();
    v.update();
    v.show();
  });
}
