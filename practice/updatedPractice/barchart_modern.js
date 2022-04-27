// global letiables
let w = 600;
let h = 250;
let barPadding = 1;

let dataset = [
  5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
];

// text and popup
d3.select("body")
  .append("p")
  .text(
    "Click on this text to update the chart with new data values as many times as you like!"
  );

d3.select("p").on("click", () => {
  // new values for dataset
  let numValues = dataset.length; // count original length of dataset
  dataset = []; // initialize empty array
  for (let i = 0; i < numValues; i++) {
    //Loop numValues times
    let newNumber = Math.floor(Math.random() * 100); // new random integer (0-24)
    dataset.push(newNumber); //Add new number to array
  }

  // update scale domain
  yScale.domain([0, d3.max(dataset)]);

  // update all rects
  svg
    .selectAll("rect")
    .data(dataset)
    .transition()
    .duration(2000)
    .ease("elastic")
    .attr("y", (d) => {
      return h - yScale(d);
    })
    .attr("height", (d) => {
      return yScale(d);
    })
    .attr("fill", (d) => {
      return "rgb(0, 0, " + d * 10 + ")";
    });

  // update text
  svg
    .selectAll("text")
    .data(dataset)
    .transition()
    .duration(2000)
    .ease("elastic")
    .text(function (d) {
      return d;
    })
    .attr("x", (d, i) => {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", (d) => {
      return h - yScale(d) + 14;
    });
});

// scales (ordinal)
let xScale = d3.scale
  .ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, w], 0.05);

let yScale = d3.scale
  .linear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

// svg
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => {
    return xScale(i);
  })
  .attr("y", (d) => {
    return h - yScale(d);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", (d) => {
    return yScale(d);
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
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", (d) => {
    return h - yScale(d) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");
