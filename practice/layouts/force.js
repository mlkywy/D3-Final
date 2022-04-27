// width and height
let w = 500;
let h = 300;

// original data
let dataset = {
  nodes: [
    { name: "Adam" },
    { name: "Bob" },
    { name: "Carrie" },
    { name: "Donovan" },
    { name: "Edward" },
    { name: "Felicity" },
    { name: "George" },
    { name: "Hannah" },
    { name: "Iris" },
    { name: "Jerry" },
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 },
  ],
};

// initialize a default force layout, using the nodes and edges in dataset
let force = d3.layout
  .force()
  .nodes(dataset.nodes)
  .links(dataset.edges)
  .size([w, h])
  .linkDistance([50])
  .charge([-100])
  .start();

let colors = d3.scale.category10();

// create SVG element
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// create edges as lines
let edges = svg
  .selectAll("line")
  .data(dataset.edges)
  .enter()
  .append("line")
  .style("stroke", "#ccc")
  .style("stroke-width", 1);

// create nodes as circles
let nodes = svg
  .selectAll("circle")
  .data(dataset.nodes)
  .enter()
  .append("circle")
  .attr("r", 10)
  .style("fill", (d, i) => {
    return colors(i);
  })
  .call(force.drag);

// every time the simulation "ticks", this will be called
force.on("tick", () => {
  edges
    .attr("x1", (d) => {
      return d.source.x;
    })
    .attr("y1", (d) => {
      return d.source.y;
    })
    .attr("x2", (d) => {
      return d.target.x;
    })
    .attr("y2", (d) => {
      return d.target.y;
    });

  nodes
    .attr("cx", (d) => {
      return d.x;
    })
    .attr("cy", (d) => {
      return d.y;
    });
});
