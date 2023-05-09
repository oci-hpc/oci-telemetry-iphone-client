
let localDictionary = {
    "name": "F1_T11_Session_History",
    "key": "pl",
    "measurements": []
};


function F1_T11_Session_HistoryCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    

    const channels = [
        ["Car Index",                "carIndex",              "integer"],
        ["Number Of Laps",           "numLaps",               "integer"],
        ["Number Of Tyre Stints",    "numTyreStints",         "integer"],  
        ["Best Lap Time Lap Number", "bestLapTimeLapNumbers", "integer"],
        ["Best Sector 1 Lap Number", "bestSector1LapNumber",  "integer"],
        ["Best Sector 2 Lap Number", "bestSector2LapNumber",  "integer"],
        ["Best Sector 3 Lap Number", "bestSector3LapNumber",  "integer"]
    ];
    
    const channelsLapData = [
        ["Lap Time in MS",      "lapTimeInMS",      "integer"],
        ["Sector 1 Time in MS", "sector1TimeInMS",  "integer"],
        ["Sector 2 Time in MS", "sector2TimeInMS",  "integer"],
        ["Sector 3 Time in MS", "sector3TimeInMS",  "integer"],
        ["lapValidBitFlags",    "lapValidBitFlags", "integer"]
    ];

    const channelsStintData = [
        ["End Lap",      "endLap",      "integer"],
        ["Tyre Actual Compound", "tyreActualCompound",  "integer"],
        ["Tyre Visual Compound", "tyreVisualCompound",  "integer"]  
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

        for (let j = 1; j < 101; j++){
            channelsLapData.forEach(function (item, index){
                var dataItem = {
                    "name": 'Car ' + i.toString() + ' Lap ' + j.toString() + " " + item[0],
                    "key": 'car_' + i.toString() + '_lap_' + j.toString() + "_" + item[1],
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

        for (let k = 1; k < 9; k++){
            channelsStintData.forEach(function (item, index){
                var dataItem = {
                    "name": 'Car ' + i.toString() + ' Stint ' + k.toString() + " " + item[0],
                    "key": 'car_' + i.toString() + '_stint_' + k.toString() + "_" + item[1],
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

    };

    //console.log(localDictionary);
    return localDictionary;
    
};


module.exports = function () {
    return new F1_T11_Session_HistoryCreateDict();
};