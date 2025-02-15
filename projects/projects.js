import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const projects = await fetchJSON("../lib/projects.json");

const projectsContainer = document.querySelector(".projects");

renderProjects(projects, projectsContainer, "h2");

const updateProjectCount = () => {
  const projectsCount = projectsContainer.children.length;
  const projectsTitle = document.querySelector(".projects-title");
  projectsTitle.textContent = `${projectsCount} Projects`;
};

document.addEventListener("DOMContentLoaded", updateProjectCount);
updateProjectCount();

function renderPieChart(projectsGiven) {
  // re-calculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  // re-calculate data
  let newData = newRolledData.map(([year, count]) => {
    return { label: year, value: count };
  });
  // re-calculate slice generator, arc data, arc, etc.
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(100);
  let colors = d3.scaleOrdinal([
    "#ba9afe",
    "#919cfe",
    "#91dbfe",
    "#91feed",
    "#ea91fe",
  ]);

  let selectedIndex = -1;

  let svg = d3.select("svg");
  svg.selectAll("path").remove();
  let legend = d3.select(".legend");
  legend.selectAll("li").remove();

  let arcs = newSliceGenerator(newArcData).map((d) => arcGenerator(d));

  arcs.forEach((arc, i) => {
    svg
      .append("path")
      .attr("d", arc)
      .attr("fill", colors(i))
      .on("click", () => {
        selectedIndex = selectedIndex === i ? -1 : i;
        console.log("Selected Index:", selectedIndex);

        svg
          .selectAll("path")
          .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

        legend
          .selectAll("li")
          .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

        if (selectedIndex === -1) {
          renderProjects(projects, projectsContainer, "h2");
        } else {
          let selectedYear = newData[selectedIndex].label;
          let filteredProjects = projects.filter(
            (project) => project.year === selectedYear,
          );
          renderProjects(filteredProjects, projectsContainer, "h2");
        }
      });
  });

  newData.forEach((d, idx) => {
    legend
      .append("li")
      .attr("style", `--color:${colors(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

renderPieChart(projects);

let query = "";
let searchInput = document.querySelector(".searchBar");
searchInput.addEventListener("input", (event) => {
  query = event.target.value;
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });
  renderProjects(filteredProjects, projectsContainer, "h2");
  renderPieChart(filteredProjects);
});
