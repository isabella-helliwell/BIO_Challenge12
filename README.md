# 1.0 Project
  The aim of this project is to continue developing the dashboard provided to include bar chart, scatter plot and a gauge chart for 
  data visualization of the bacterial data provided in samples.json data file. 

# 2.0 Resources
    -data file: samples.jason
    -software: JavaScript
    -markup language: html
    -background Image taken from google search


# 3.0 Analysis
## 3.1 Description
    The dashboard consists of participants ID number(test subjects), a demographic panel with the corresponding information regarding age, sex, and location.
    Present are also 3 charts, a bar chart, a gauge chart, and a scatter plot (bubble plot).
    The user can select an ID number on the dropdown menu which is the test subject ID. After the selection is made, the demographic data for that particular 
    ID is shown in the demographic panel under the dropdown menu.
    The bar chart will show the top ten bacteria cultures found in the bellybutton of that person, 
    The scatter plot will show the otu_ids vs sample values.
    The gauge chart will show how many times per week the person waches their bellybutton.


## 3.2 Coding summary
    For this project, a function was created to build charts. 
    d3.json is used to load and retrieve the samples.json file.
    The data retrived is of type array and is held in named variable.
    Next step is to filter the samples for the sample number and create variable to hold the first sample in the array, and obtain the otu_ids, otu_labels,
    sample_values, and wfreq(washing frequency).
    The data is then used to create the various charts shown in the dashboard.Some layout and formatting is also used.
    
# 4. Results
## 4.1 Without formatting
![screen_1](https://user-images.githubusercontent.com/85843030/133278270-57592f7c-953f-4a85-b440-bc25051194e1.png)
![newplot](https://user-images.githubusercontent.com/85843030/133278312-e2592c3d-11a3-48fb-9517-4030de15a188.png)

## 4.2 With formatting
![image](https://user-images.githubusercontent.com/85843030/133326357-ca2fdc55-7d15-4139-b730-ff53a19ff4a2.png)
![image](https://user-images.githubusercontent.com/85843030/133326429-880a2b21-d1a7-4864-95bf-ed433ec147dd.png)


