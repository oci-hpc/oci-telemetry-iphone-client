



let localDictionary = {
    "name": "F1_T08_Final_Classification",
    "key": "pl",
    "measurements": []
}


function F1_T08_Final_ClassificationCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    var numCarsDataItem = {
        "name": "Number of Cars",
        "key": "numCars",
        "values": [
            {
                "key": "value",
                "name": "Value",
                "units": "unit",
                "format": "integer",
                "hints": {
                    "range": 1
                }
            },
            {
                "key": "utc",
                "source": "timestamp",
                "name": "Timestamp",
                "format": "utc",
                "hints": {
                    "domain": 1
                }
            }
        ]
    }

    localDictionary.measurements.push(numCarsDataItem);

    const channels = [
        ["Position", "position", "integer"],
        ["Number of Laps",      "numberOfLaps",      "integer"],
        ["Grid Position",      "gridPosition",      "integer"],
        ["Points",      "points",      "integer"],
        ["Number of Pitstops",      "numberOfPitstops",      "integer"],
        ["Results Status",      "resultsStatus",      "integer"],
        ["Best Lap Time MS",      "bestLapTimeMS",      "integer"],
        ["Total Race Time",      "totalRaceTime",      "integer"],
        ["Penalties Time",      "penaltiesTime",      "integer"],
        ["Number of Penalties",      "numberOfPenalties",      "integer"],
        ["Number of Tyre Stints",      "numberOfTyreStints",      "integer"],
        ["Tyre Stint Actual 1",      "tyreStintActual1",      "integer"],
        ["Tyre Stint Actual 2",      "tyreStintActual2",      "integer"],
        ["Tyre Stint Actual 3",      "tyreStintActual3",      "integer"],
        ["Tyre Stint Actual 4",      "tyreStintActual4",      "integer"],
        ["Tyre Stint Actual 5",      "tyreStintActual5",      "integer"],
        ["Tyre Stint Actual 6",      "tyreStintActual6",      "integer"],
        ["Tyre Stint Actual 7",      "tyreStintActual7",      "integer"],
        ["Tyre Stint Actual 8",      "tyreStintActual8",      "integer"],
        ["Tyre Stint Visual 1",      "tyreStintVisual1",      "integer"],
        ["Tyre Stint Visual 2",      "tyreStintVisual2",      "integer"],
        ["Tyre Stint Visual 3",      "tyreStintVisual3",      "integer"],
        ["Tyre Stint Visual 4",      "tyreStintVisual4",      "integer"],
        ["Tyre Stint Visual 5",      "tyreStintVisual5",      "integer"],
        ["Tyre Stint Visual 6",      "tyreStintVisual6",      "integer"],
        ["Tyre Stint Visual 7",      "tyreStintVisual7",      "integer"],
        ["Tyre Stint Visual 8",      "tyreStintVisual8",      "integer"],
        ["Tyre Stint End Lap 1",     "tyreStintEndLap1",      "integer"],
        ["Tyre Stint End Lap 2",     "tyreStintEndLap2",      "integer"],
        ["Tyre Stint End Lap 3",     "tyreStintEndLap3",      "integer"],
        ["Tyre Stint End Lap 4",     "tyreStintEndLap4",      "integer"],
        ["Tyre Stint End Lap 5",     "tyreStintEndLap5",      "integer"],
        ["Tyre Stint End Lap 6",     "tyreStintEndLap6",      "integer"],
        ["Tyre Stint End Lap 7",     "tyreStintEndLap7",      "integer"],
        ["Tyre Stint End Lap 8",     "tyreStintEndLap8",      "integer"],
    ];
    
    //console.log(channels);
        
    for (let i = 0; i < 22; i++){
        channels.forEach(function (item, index){
            var dataItem = {
                "name": 'Car ' + i.toString() + ' ' + item[0],
                "key": 'car_' + i.toString() + '_' + item[1],
                "values": [
                    {
                        "key": "value",
                        "name": "Value",
                        "units": "unit",
                        "format": item[2],
                        "hints": {
                            "range": 1
                        }
                    },
                    {
                        "key": "utc",
                        "source": "timestamp",
                        "name": "Timestamp",
                        "format": "utc",
                        "hints": {
                            "domain": 1
                        }
                    }
                ]
            }
    

            localDictionary.measurements.push(dataItem);

        });
    }


    //console.log(localDictionary);
    return localDictionary;
    
}


module.exports = function () {
    return new F1_T08_Final_ClassificationCreateDict()
};