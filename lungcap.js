/*
let dataset; // global variable

d3.csv("lungcap.csv").get((error, data) => {
  error ? console.log(error) : console.log(data); // if there's an error, display it, else display the data in the console
  dataset = data; // assign data to global variable so that it's accessible
});

const parseAllData = async () => {
  const allDataSets = await d3.csv("./lungcap.csv", (d) => {
    if (d.smoke === "yes") {
      const dataHeightLC = [d.height, d.lungcap];
      const dataAgeLC = [d.age, d.lungcap];
      return { dataHeightLC, dataAgeLC };
    } else return null;
  });

  const allDataHeightLC = allDataSets.map((entry) => [...entry.dataHeightLC]); // only return dataHeightLC entries
  const allDataAgeLC = allDataSets.map((entry) => [...entry.dataAgeLC]); // only retrun all dataAgeLC entries

  console.table(allDataHeightLC);
  return { allDataHeightLC, allDataAgeLC };
};

parseAllData();
*/

const parseAllData = async () => {
  const allDataSets = await d3.csv("./lungcap.csv", (d) => {
    if (d.smoke === "yes") {
      const dataHeightLC = [d.height, d.lungcap];
      const dataAgeLC = [d.age, d.lungcap];
      return { dataHeightLC, dataAgeLC };
    } else return null;
  });

  const dataset = allDataSets.map((entry) => [...entry.dataHeightLC]); // only return dataHeightLC entries

  console.table(dataset);

  // width and height
  const w = 1000;
  const h = 800;
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
  const yAxis = d3.axisLeft(yScale).ticks(10);

  // create SVG element
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

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

  // on click, update with new data
  d3.select("button").on("click", () => {
    const dataset = allDataSets.map((entry) => [...entry.dataAgeLC]); // only return dataAgeLC entries

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
    const yAxis = d3.axisLeft(yScale).ticks(10);

    // update all circles
    svg
      .selectAll("circle")
      .data(dataset)
      .transition() // <-- transition #1
      .duration(1000)
      .on("start", function () {
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
};

parseAllData();
