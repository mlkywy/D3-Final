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

  const allDataHeightLC = allDataSets.map((entry) => [...entry.dataHeightLC]); // only return dataHeightLC entries
  const allDataAgeLC = allDataSets.map((entry) => [...entry.dataAgeLC]); // only retrun all dataAgeLC entries

  console.table(allDataHeightLC);

  // width and height
  const w = 500;
  const h = 500;
  const padding = 30;

  // create scale functions
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(allDataHeightLC, (d) => {
        return d[0];
      }),
      d3.max(allDataHeightLC, (d) => {
        return d[0];
      }),
    ])
    .range([padding, w - padding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(allDataHeightLC, (d) => {
        return d[1];
      }),
    ])
    .range([h - padding, padding * 2]);

  console.log(maxY);
  // define X axis
  const xAxis = d3.axisBottom(xScale).ticks(5);

  // define Y axis
  const yAxis = d3.axisLeft(yScale).ticks(10);

  // create SVG element
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // // define clipping path
  // svg
  //   .append("clipPath") // make a new clipPath
  //   .attr("id", "chart-area") // assign an ID
  //   .append("rect") // within the clipPath, create a new rect
  //   .attr("x", padding) // set rect's position and size...
  //   .attr("y", padding)
  //   .attr("width", w - padding * 3)
  //   .attr("height", h - padding * 2);

  // create circles
  svg
    .append("g") // create new g
    .attr("id", "circles") // assign ID of 'circles'
    .attr("clip-path", "url(#chart-area)") // add reference to clipPath
    .selectAll("circle")
    .data(allDataHeightLC)
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
};

parseAllData();
