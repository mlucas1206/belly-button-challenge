// Plot graph
let data = [{
    x: sample_values,
    y: otu_ids,
    type: 'bar',
    // Assign hover text
    hovertext: otulabels,
    // Make bar horizontal
    orientation: 'h'
}];

let layout = {
    title: ''
};

Plotly.newPlot('plot', data, layout);