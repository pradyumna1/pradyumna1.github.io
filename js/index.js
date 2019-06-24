import dataPoints from './infoPoints.js'

console.log(dataPoints);
var svg = d3.select("main")
    .append("svg")
    .attr('text-align', 'center')
    .attr("width", '100vw')
    .attr("height", '100vh');

var mainArea = svg
    .append("g")
    .attr("id", "plot-area")
    .attr("transform", "translate(0, 0)");

var circles = mainArea.selectAll("circle").data(dataPoints);

circles.enter()
    .append("circle")
    .attr("r", function(d) {return d.radius})
    .attr("cx", function (d) { return d.center.x; })
    .attr("cy", function (d) { return d.center.y; })
    .attr("stroke-width", 2);

mainArea.selectAll("circle")
    .on("click", function (d) {
        d.pulse = !d.pulse;
        if (d.pulse) {
            var selected_circles = d3.select(this);
            pulsate(selected_circles);

        }
    });

function pulsate(selection) {
    recursive_transitions();

    function recursive_transitions() {
        if (selection.data()[0].pulse) {
            selection.transition()
                .duration(400)
                .attr("stroke-width", 2)
                .attr("radius", 8)
                .ease('sin-in')
                .transition()
                .duration(800)
                .attr('stroke-width', 3)
                .attr("radius", 12)
                .ease('bounce-in')
                .each("end", recursive_transitions);
        } else {
            // transition back to normal
            selection.transition()
                .duration(200)
                .attr("radius", 8)
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "1, 0");
        }
    }
}

