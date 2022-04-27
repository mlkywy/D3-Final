let dataset = [5, 10, 20, 45, 6, 25];
let pie = d3.layout.pie();

let w = 300;
let h = 300;

let outerRadius = w / 2;
let innerRadius = 0;

let arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

// create SVG element
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

let color = d3.scale.category10();

// set up groups
let arcs = svg
  .selectAll("g.arc")
  .data(pie(dataset))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

// draw arc paths
arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", arc);

arcs
  .append("text")
  .attr("transform", function (d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
  .text(function (d) {
    return d.value;
  });
