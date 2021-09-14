function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};
//Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
};

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {

  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array.
    var sampleArray=data.samples;
    var metadata=data.metadata;
    
    

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleObject= sampleArray.filter(sampleObj => sampleObj.id == sample);

    var metaObject=metadata.filter(sampleObj=>sampleObj.id==sample);



    //  5. Create a variable that holds the first sample in the array.
    var result=sampleObject[0];
    var metResult=metaObject[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otuLabel = result.otu_labels;
    var sample_values = result.sample_values;
    var metFreq= parseFloat(metResult.wfreq);
   //checking so the value is correct with a console.log
    console.log(metFreq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10).map(otu_ids=>`OTU ${otu_ids}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
      y: yticks,
      marker:{
        color:'pink',
        //backgroundColor='lavender'
            },
      x:sample_values.slice(0,10).reverse(), //in reverse order//
      type: "bar",
      orientation:"h",
      }
    ];
    
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis:{title: "Sample Values"},
      //backgroundColor:"red",
      yaxis:{title: "OTU id's"}
    };
     
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);


//--------deliverable 2 challenge------------------///

// 1. Create the trace for the bubble chart.
// 2. Create the layout for the bubble chart.
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text:otuLabel,
        type:'scatter',
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Picnic"
          }
      }
    ];

    var bubbleLayout={
      title: 'Bacteria Cultures Per Sample',
      hovermode: 'closest'
      
    }

    Plotly.newPlot("bubble",bubbleData, bubbleLayout);

//---- deliverable3--- create a gauge chart--------//
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     {
      domain:{x:[0,1], y:[0,1]},
      value: metFreq,
      type: 'indicator',
      title:{ 
        text: '<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week',  
      },
        mode:"gauge+number",
        gauge:{
          axis: { range:[null,10]},
          //marker:{size:28, color:'blue'},
          bar:{color:'indigo'},
          steps: [
            {range:[0,2], color:"lavender"},
            {range:[2,4], color:"pink"},
            {range:[4,6], color: "violet"},
            {range:[6,8], color:'hotpink'},
            //{range:[6,8], color:'#92b73a'},
            {range:[8,10], color:'purple'}
          ],
           
          
            }
      }

    ];
     
// 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width:485, //is the width of the gauge plot
      height:425,//is the height of the gauge plot
      //paper_bgcolor: 'lavender',
     
    };
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)




  });
  

};

    