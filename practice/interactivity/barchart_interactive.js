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
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return h - yScale(d);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", function (d) {
    return yScale(d);
  })
  .attr("fill", function (d) {
    return "rgb(0, 0, " + d * 10 + ")";
  })
  .on("click", function (d) {
    // this will run whenever *any* bar is clicked
    sortBars();
  });
//   .on("mouseover", function () {
//     d3.select(this).attr("fill", "orange");
//   })
//   .on("mouseout", function (d) {
//     d3.select(this)
//       .transition()
//       .duration(250)
//       .attr("fill", "rgb(0, 0, " + d * 10 + ")");
//   });

// (USE CSS for mouseover events)

// create labels
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
  .style("pointer-events", "none"); // ignores the mouseover for the labels

// function for sorting bars
let sortOrder = false;

function sortBars() {
  // flip value of sortOrder
  sortOrder = !sortOrder;

  svg
    .selectAll("rect")
    .sort(function (a, b) {
      if (sortOrder) {
        return d3.ascending(a, b);
      } else {
        return d3.descending(a, b);
      }
    })
    .transition()
    .delay(function (d, i) {
      return i * 50;
    })
    .duration(1000)
    .attr("x", function (d, i) {
      return xScale(i);
    });
}
