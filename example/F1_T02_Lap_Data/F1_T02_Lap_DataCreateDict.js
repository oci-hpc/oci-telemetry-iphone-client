

let localDictionary = {
    "name": "F1_T02_Lap_Data",
    "key": "pl",
    "measurements": []
};


function F1_T02_Lap_DataCreateDict() {
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    
    const channels = [
        ["Last Lap Time MS",                           "lastLapTimeMS",                         "integer"],
        ["Current Lap Time MS",                        "currentLapTimeMS",                      "integer"],
        ["Sector 1 Time MS",                           "sector1TimeMS",                         "integer"],
        ["Sector 2 Time MS",                           "sector2TimeMS",                         "integer"],
        ["Lap Distance",                               "lapDistance",                           "float"],
        ["Total Distance",                             "totalDistance",                         "float"],
        ["Safety Car Delta",                           "safetyCarDelta",                        "float"],
        ["Car Position",                               "carPosition",                           "integer"],
        ["Current Lap Number",                         "currentLapNumber",                      "integer"],
        ["Pit Status",                                 "pitStatus",                             "integer"],
        ["Number of Pitstops",                         "numPitStops",                           "integer"],
        ["Sector",                                     "sector",                                "integer"],
        ["Current Lap Invalid",                        "currentLapInvalid",                     "integer"],
        ["Penalties",                                  "penalties",                             "integer"],
        ["Warnings",                                   "warnings",                              "integer"],
        ["Number of Unserved Drive Through Penalties", "numberOfUnservedDriveThroughPenalties", "integer"],
        ["Number of Unserved Stop-Go Penalties",       "numberOfUnservedStopGoPenalties",       "integer"],
        ["Grid Position",                              "gridPosition",                          "integer"],
        ["Driver Status",                              "driverStatus",                          "integer"],
        ["Result Status",                              "resultStatus",                          "integer"],
        ["Pit Lane Timer Active",                      "pitLaneTimerActive",                    "integer"],
        ["Pit Lane Time Lane MS",                      "pitLaneTimeLaneMS",                     "integer"],
        ["Pit Stop Timer in MS",                       "pitStopTimerInMS",                      "integer"],
        ["Pit Stop Should Serve Penalty",              "pitStopShouldServePenalty",             "integer"]   
    ];

    const channels1 = [
        ["Gap", "gap", "float"]
    ];

    const channelsExtra = [
        ["Time Trial PB Car Index",    "timeTrialPBCarIndex",    "integer"],
        ["Time Trial Rival Car Index", "timeTrialRivalCarIndex", "integer"]
    ];
    
    channels.forEach(function (item, index){
        var dataItem = {
            "name": item[0],
            "key": item[1],
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

    channels1.forEach(function (item, index){
        var dataItem = {
            "name": item[0],
            "key": item[1],
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

        //localDictionary.measurements.push(dataItem);

    });

    // Now for all the cars

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

    for (let i = 0; i < 22; i++){
        channels1.forEach(function (item, index){
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
    

            //localDictionary.measurements.push(dataItem);

        });
    }

    //console.log(channels);
        
    channelsExtra.forEach(function (item, index){
        var dataItem = {
            "name": item[0],
            "key": item[1],
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



    //console.log(localDictionary);
    return localDictionary;
    
};


module.exports = function () {
    return new F1_T02_Lap_DataCreateDict()
};