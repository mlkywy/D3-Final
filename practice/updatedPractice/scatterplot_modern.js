// width and height
let w = 500;
let h = 300;
let padding = 30;

// dynamic, random dataset
let dataset = []; // initialize empty array
let numDataPoints = 50; // number of dummy data points to create
let maxRange = Math.random() * 1000; // max range of new values
for (let i = 0; i < numDataPoints; i++) {
  // loop numDataPoints times
  let newNumber1 = Math.floor(Math.random() * maxRange); // new random integer
  let newNumber2 = Math.floor(Math.random() * maxRange); // new random integer
  dataset.push([newNumber1, newNumber2]); // add new number to array
}

// create scale functions
let xScale = d3.scale
  .linear()
  .domain([
    0,
    d3.max(dataset, (d) => {
      return d[0];
    }),
  ])
  .range([padding, w - padding * 2]);

let yScale = d3.scale
  .linear()
  .domain([
    0,
    d3.max(dataset, (d) => {
      return d[1];
    }),
  ])
  .range([h - padding, padding]);

// define X axis
let xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);

// define Y axis
let yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

// create SVG element
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// define clipping path
svg
  .append("clipPath") // make a new clipPath
  .attr("id", "chart-area") // assign an ID
  .append("rect") // within the clipPath, create a new rect
  .attr("x", padding) // set rect's position and size...
  .attr("y", padding)
  .attr("width", w - padding * 3)
  .attr("height", h - padding * 2);

// create circles
svg
  .append("g") // create new g
  .attr("id", "circles") // assign ID of 'circles'
  .attr("clip-path", "url(#chart-area)") // add reference to clipPath
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => {
    return xScale(d[0]);
  })
  .attr("cy", (d) => {
    return yScale(d[1]);
  })
  .attr("r", 2);

// create X axis
svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

// create Y axis
svg
  .append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

// text and popup
d3.select("body")
  .append("p")
  .text(
    "Click on this text to update the chart with new data values as many times as you like!"
  );

// on click, update with new data
d3.select("p").on("click", () => {
  // new values for dataset
  let numValues = dataset.length; // count original length of dataset
  let maxRange = Math.random() * 1000; // max range of new values
  dataset = []; // initialize empty array
  for (let i = 0; i < numValues; i++) {
    // loop numValues times
    let newNumber1 = Math.floor(Math.random() * maxRange); // new random integer
    let newNumber2 = Math.floor(Math.random() * maxRange); // new random integer
    dataset.push([newNumber1, newNumber2]); // add new number to array
  }

  // update scale domains
  xScale.domain([
    0,
    d3.max(dataset, (d) => {
      return d[0];
    }),
  ]);
  yScale.domain([
    0,
    d3.max(dataset, (d) => {
      return d[1];
    }),
  ]);

  // update all circles
  svg
    .selectAll("circle")
    .data(dataset)
    .transition() // <-- transition #1
    .duration(1000)
    .each("start", function () {
      // <-- executes at start of transition
      d3.select(this).attr("fill", "magenta").attr("r", 3);
    })
    .attr("cx", (d) => {
      return xScale(d[0]);
    })
    .attr("cy", (d) => {
      return yScale(d[1]);
    })
    .transition() // <-- transition #2
    .duration(1000)
    .attr("fill", "black")
    .attr("r", 2);

  // update x-axis
  svg.select(".x.axis").transition().duration(1000).call(xAxis);

  // update y-axis
  svg.select(".y.axis").transition().duration(1000).call(yAxis);
});
