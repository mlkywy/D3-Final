// dynamic, random dataset
let dataset = [];
let numDataPoints = 50;
let xRange = Math.random() * 1000;
let yRange = Math.random() * 1000;
for (let i = 0; i < numDataPoints; i++) {
  let newNumber1 = Math.floor(Math.random() * xRange);
  let newNumber2 = Math.floor(Math.random() * yRange);
  dataset.push([newNumber1, newNumber2]);
}

// global letiables
let w = 500;
let h = 300;
let padding = 30;

// scales
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

let rScale = d3.scale
  .linear()
  .domain([
    0,
    d3.max(dataset, (d) => {
      return d[1];
    }),
  ])
  .range([2, 5]);

// axes
let xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
let yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

// svg
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// points svg
svg
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
  .attr("r", (d) => {
    return rScale(d[1]);
  })
  .attr("fill", (d) => {
    return "rgb(0, 0, " + d * 10 + ")";
  });

// // labels svg
// svg
//   .selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text((d) => {
//     return d[0] + "," + d[1];
//   })
//   .attr("x", (d) => {
//     return xScale(d[0]);
//   })
//   .attr("y", (d) => {
//     return yScale(d[1]);
//   })
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "red");

// axes svg
svg
  .append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

svg
  .append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
