let dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88],
  [600, 150],
];

let w = 500;
let h = 300;
let padding = 20;

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

let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

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

svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => {
    return d[0] + "," + d[1];
  })
  .attr("x", (d) => {
    return xScale(d[0]);
  })
  .attr("y", (d) => {
    return yScale(d[1]);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");
