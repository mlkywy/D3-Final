// width and height
let w = 600;
let h = 250;

let dataset = [
  5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
];

let xScale = d3.scale
  .ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, w], 0.05);

let yScale = d3.scale
  .linear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

// create SVG element
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// create bars
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
  })
  .on("click", (d) => {
    // this will run whenever *any* bar is clicked
    sortBars();
  })
  .on("mouseover", function (d) {
    // get this bar's x/y values, then augment for the tooltip
    let xPosition =
      parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
    let yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

    // update the tooltip position and value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#value")
      .text(d);

    // show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function () {
    // hide the tooltip
    d3.select("#tooltip").classed("hidden", true);
  });

// function for sorting bars
let sortOrder = false;

function sortBars() {
  // flip value of sortOrder
  sortOrder = !sortOrder;

  svg
    .selectAll("rect")
    .sort((a, b) => {
      if (sortOrder) {
        return d3.ascending(a, b);
      } else {
        return d3.descending(a, b);
      }
    })
    .transition()
    .delay((d, i) => {
      return i * 50;
    })
    .duration(1000)
    .attr("x", (d, i) => {
      return xScale(i);
    });
}
