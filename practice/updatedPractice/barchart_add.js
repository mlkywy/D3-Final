// width and height
let w = 600;
let h = 250;

let dataset = [
  { key: 0, value: 5 }, // dataset is now an array of objects.
  { key: 1, value: 10 }, // each object has a 'key' and a 'value'.
  { key: 2, value: 13 },
  { key: 3, value: 19 },
  { key: 4, value: 21 },
  { key: 5, value: 25 },
  { key: 6, value: 22 },
  { key: 7, value: 18 },
  { key: 8, value: 15 },
  { key: 9, value: 13 },
  { key: 10, value: 11 },
  { key: 11, value: 12 },
  { key: 12, value: 15 },
  { key: 13, value: 20 },
  { key: 14, value: 18 },
  { key: 15, value: 17 },
  { key: 16, value: 16 },
  { key: 17, value: 18 },
  { key: 18, value: 23 },
  { key: 19, value: 25 },
];

// text and popup
d3.select("body").append("p").attr("id", "add").text("Add a new data value!");

// text and popup
d3.select("body").append("p").attr("id", "remove").text("Remove a data value!");

let xScale = d3.scale
  .ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, w], 0.05);

let yScale = d3.scale
  .linear()
  .domain([
    0,
    d3.max(dataset, function (d) {
      return d.value;
    }),
  ])
  .range([0, h]);

// define key function, to be used when binding data
let key = function (d) {
  return d.key;
};

// create SVG element
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// create bars
svg
  .selectAll("rect")
  .data(dataset, key)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return h - yScale(d.value);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", function (d) {
    return yScale(d.value);
  })
  .attr("fill", function (d) {
    return "rgb(0, 0, " + d.value * 10 + ")";
  });

// create labels
svg
  .selectAll("text")
  .data(dataset, key)
  .enter()
  .append("text")
  .text(function (d) {
    return d.value;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d.value) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

// on click, update with new data
d3.selectAll("p").on("click", function () {
  // see which p was clicked
  let paragraphID = d3.select(this).attr("id");

  // decide what to do next
  if (paragraphID == "add") {
    // add a data value
    let maxValue = 25;
    let newNumber = Math.floor(Math.random() * maxValue);
    let lastKeyValue = dataset[dataset.length - 1].key;
    console.log(lastKeyValue);
    dataset.push({
      key: lastKeyValue + 1,
      value: newNumber,
    });
  } else {
    // remove a value
    dataset.shift(); // remove one value from dataset
  }

  // update scale domains
  xScale.domain(d3.range(dataset.length));
  yScale.domain([
    0,
    d3.max(dataset, function (d) {
      return d.value;
    }),
  ]);

  // select…
  let bars = svg.selectAll("rect").data(dataset, key);

  // enter…
  bars
    .enter()
    .append("rect")
    .attr("x", w)
    .attr("y", function (d) {
      return h - yScale(d.value);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function (d) {
      return yScale(d.value);
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + d.value * 10 + ")";
    });

  // update…
  bars
    .transition()
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return h - yScale(d.value);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function (d) {
      return yScale(d.value);
    });

  // exit…
  bars
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.rangeBand())
    .remove();

  // update all labels

  // select…
  let labels = svg.selectAll("text").data(dataset, key);

  // enter…
  labels
    .enter()
    .append("text")
    .text(function (d) {
      return d.value;
    })
    .attr("text-anchor", "middle")
    .attr("x", w)
    .attr("y", function (d) {
      return h - yScale(d.value) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

  // update…
  labels
    .transition()
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    });

  // exit…
  labels
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.rangeBand())
    .remove();
});
