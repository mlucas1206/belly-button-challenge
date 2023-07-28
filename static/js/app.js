// Get endpoint
const samples = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch JSON data
d3.json(samples).then(function(bellyData){
    console.log(bellyData);
    let sampleArr = bellyData.samples
    // Extract data using D3

    // Fill up dropdown
    let select = document.getElementById("selDataset"); 
    let options = bellyData.names; 

    for(let i = 0; i < options.length; i++) {
        let opt = options[i];
        let sampleName = document.createElement("option");
        sampleName.text = opt;
        sampleName.value = opt;

        select.add(sampleName);
    }


    // On dropdown change
    d3.selectAll("#selDataset").on("change", getData);
    
    // Create getData function
    function getData() {
        let dataset = d3.select('#selDataset').property('value');

        // Loop to find id match
        let sampleData = sampleArr.find(x => x.id === dataset);
        let metaData = bellyData.metadata.find(x => x.id === parseInt(dataset));

        // Get variables
        let sample_values = sampleData.sample_values;
        //console.log(sample_values);
        let otu_ids = sampleData.otu_ids;
        let otu_labels = sampleData.otu_labels;
        //console.log(otu_labels);

        // Plot graph
        let barData = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(x => 'OTU ' + x).slice(0,10).reverse(),
            type: 'bar',
            // Assign hover text
            hovertext: otu_labels.slice(0,10).reverse(),
            // Make bar horizontal
            orientation: 'h'
        }];

        let barLayout = {
            width: 400,
            height: 600
        };

        Plotly.newPlot('bar', barData, barLayout);

        // Bubble chart data and layout
        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
            },
            text: otu_labels
        }];

        let bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            height: 550
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Put metadata into the info box
        let metadataDiv = document.getElementById("sample-metadata");
        metadataDiv.innerHTML = ""; // Clear previous content

        // Loop through the selected metadata item and create lines for each key-value pair
        for (let [key, value] of Object.entries(metaData)) {
            let line = document.createElement("p");
            line.textContent = `${key}: ${value}`;
            metadataDiv.appendChild(line);
        }

    }
    getData();
})

