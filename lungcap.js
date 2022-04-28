const parseAllData = async () => {
  const allDataSets = await d3.csv("./lungcap.csv", (d) => {
    if (d.smoke === "no") {
      const dataHeightLC = [d.height, d.lungcap];
      const dataAgeLC = [d.age, d.lungcap];
      return { dataHeightLC, dataAgeLC };
    } else return null;
  });

  d3.select("#height").classed("current", true);

  let dataset = allDataSets.map((entry) => [...entry.dataHeightLC]); // only return dataHeightLC entries

  // labels
  const xAxisLabelHeight = "height (inches)";
  const xAxisLabelAge = "age (years)";
  const yAxisLabel = "lung capacity (cc)";

  // width and height
  const w = 1200;
  const h = 700;
  const padding = 100;

  // create scale functions
  const xExtent = d3.extent(dataset.map((d) => Math.ceil(d[0])));
  const yExtent = d3.extent(dataset.map((d) => Math.ceil(d[1])));

  const xScale = d3
    .scaleLinear()
    .domain(xExtent)
    .range([padding, w - padding])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(yExtent)
    .range([h - padding, padding])
    .nice();

  // define X axis
  const xAxis = d3.axisBottom(xScale).ticks(10);

  // define Y axis
  const yAxis = d3.axisLeft(yScale).ticks(5);

  // create SVG element
  const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // define clipping path
  svg
    .append("clipPath") // make a new clipPath
    .attr("id", "chart-area") // assign an ID
    .append("rect") // within the clipPath, create a new rect
    .attr("x", padding) // set rect's position and size...
    .attr("y", padding)
    .attr("width", w - padding * 2)
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
    .attr("r", 5)
    .attr("stroke-width", 2) // set the stroke width
    .attr("stroke", (d) => {
      return "rgb(200, 20, " + d[1] * 15 + ")";
    })
    .attr("fill", "transparent") // set the fill color
    .on("mouseover", function (d) {
      d3.select("#tooltip")
        .style("left", d3.event.pageX + 15 + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .select("#value1")
        .text(`${d[0]}, \r\n ${d[1]}`);

      // show the tooltip
      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function () {
      // hide the tooltip
      d3.select("#tooltip").classed("hidden", true);
    });

  // create X axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis)
    .append("text")
    .attr("class", "x text")
    .attr("fill", "black")
    .attr("x", w / 2)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text(xAxisLabelHeight);

  // create Y axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)
    .append("text")
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .attr("x", -(h / 2))
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  // on click, update with new data
  d3.select("#age").on("click", () => {
    d3.select("#height").classed("current", false);
    d3.select("#age").classed("current", true);

    dataset = allDataSets.map((entry) => [...entry.dataAgeLC]); // only return dataHeightLC entries

    /// create scale functions
    const xExtent = d3.extent(dataset.map((d) => Math.ceil(d[0])));
    const yExtent = d3.extent(dataset.map((d) => Math.ceil(d[1])));

    const xScale = d3
      .scaleLinear()
      .domain(xExtent)
      .range([padding, w - padding])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([h - padding, padding])
      .nice();

    // define X axis
    const xAxis = d3.axisBottom(xScale).ticks(10);

    // define Y axis
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // update all circles
    svg
      .selectAll("circle")
      .data(dataset)
      .transition() // <-- transition #1
      .duration(1000)
      .on("start", function () {
        // <-- executes at start of transition
        d3.select(this).attr("stroke", "brown").attr("r", 4);
      })
      .attr("cx", (d) => {
        return xScale(d[0]);
      })
      .attr("cy", (d) => {
        return yScale(d[1]);
      })
      .transition() // <-- transition #2
      .duration(1000)
      .attr("stroke", (d) => {
        return "rgb(200, 20, " + d[1] * 15 + ")";
      })
      .attr("r", 5);

    // update x-axis
    svg.select(".x.axis").transition().duration(1000).call(xAxis);

    // update x-axis text
    svg.select(".x.text").transition().duration(1000).text(xAxisLabelAge);

    // update y-axis
    svg.select(".y.axis").transition().duration(1000).call(yAxis);
  });

  // on click, update with new data
  d3.select("#height").on("click", () => {
    d3.select("#height").classed("current", true);
    d3.select("#age").classed("current", false);

    dataset = allDataSets.map((entry) => [...entry.dataHeightLC]); // only return dataHeightLC entries

    /// create scale functions
    const xExtent = d3.extent(dataset.map((d) => Math.ceil(d[0])));
    const yExtent = d3.extent(dataset.map((d) => Math.ceil(d[1])));

    const xScale = d3
      .scaleLinear()
      .domain(xExtent)
      .range([padding, w - padding])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([h - padding, padding])
      .nice();

    // define X axis
    const xAxis = d3.axisBottom(xScale).ticks(10);

    // define Y axis
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // update all circles
    svg
      .selectAll("circle")
      .data(dataset)
      .transition() // <-- transition #1
      .duration(1000)
      .on("start", function () {
        // <-- executes at start of transition
        d3.select(this).attr("stroke", "brown").attr("r", 4);
      })
      .attr("cx", (d) => {
        return xScale(d[0]);
      })
      .attr("cy", (d) => {
        return yScale(d[1]);
      })
      .transition() // <-- transition #2
      .duration(1000)
      .attr("stroke", (d) => {
        return "rgb(200, 20, " + d[1] * 15 + ")";
      })
      .attr("r", 5);

    // update x-axis
    svg.select(".x.axis").transition().duration(1000).call(xAxis);

    // update x-axis text
    svg.select(".x.text").transition().duration(1000).text(xAxisLabelHeight);

    // update y-axis
    svg.select(".y.axis").transition().duration(1000).call(yAxis);
  });
};

parseAllData();
