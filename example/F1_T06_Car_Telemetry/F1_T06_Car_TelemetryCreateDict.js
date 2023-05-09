



let localDictionary = {
    "name": "F1_T06_Car_Telemetry",
    "key": "pl",
    "measurements": []
}


function F1_T06_Car_TelemetryCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    const channels = [
        ["Speed",                 "speed",                 "integer"],
        ["Throttle",              "throttle",              "float"],
        ["Steer",                 "steer",                 "float"],
        ["Brake",                 "brake",                 "float"],
        ["Clutch",                "clutch",                "integer"],
        ["Gear",                  "gear",                  "integer"],
        ["Engine RPM",            "engine_rpm",            "integer"],
        ["DRS",                   "drs",                   "integer"],
        ["Rev Lights Percent",    "rev_lights_percent",    "integer"],
        ["Rev Lights Bit",        "rev_lights_bit",        "integer"],
        ["Brakes Temp RL",        "brakes_temp_RL",        "integer"],
        ["Brakes Temp RR",        "brakes_temp_RR",        "integer"],
        ["Brakes Temp FL",        "brakes_temp_FL",        "integer"],
        ["Brakes Temp FR",        "brakes_temp_FR",        "integer"],
        ["Tyres Surface Temp RL", "tyres_surface_temp_RL", "integer"],
        ["Tyres Surface Temp RR", "tyres_surface_temp_RR", "integer"],
        ["Tyres Surface Temp FL", "tyres_surface_temp_FL", "integer"],
        ["Tyres Surface Temp FR", "tyres_surface_temp_FR", "integer"],
        ["Tyres Inner Temp RL",   "tyres_inner_temp_RL",   "integer"],
        ["Tyres Inner Temp RR",   "tyres_inner_temp_RR",   "integer"],
        ["Tyres Inner Temp FL",   "tyres_inner_temp_FL",   "integer"],
        ["Tyres Inner Temp FR",   "tyres_inner_temp_FR",   "integer"],
        ["Engine Temp",           "engine_temp",           "integer"],
        ["Tyres Pressure RL",     "tyres_pressure_RL",     "integer"],
        ["Tyres Pressure RR",     "tyres_pressure_RR",     "integer"],
        ["Tyres Pressure FL",     "tyres_pressure_FL",     "integer"],
        ["Tyres Pressure FR",     "tyres_pressure_FR",     "integer"],
        ["Surface Type RL",       "surface_type_RL",       "integer"],
        ["Surface Type RR",       "surface_type_RR",       "integer"],
        ["Surface Type FL",       "surface_type_FL",       "integer"],
        ["Surface Type FR",       "surface_type_FR",       "integer"]
    ];
    
    const channels1 = [
        ["MFD Panel Index", "mfdPanelIndex", "integer"],
        ["MFD Panel Index 2nd Player", "mfdPanelIndex2ndPlayer", "integer"],
        ["Suggested Gear", "suggestedGear", "integer"]
    ];

    //console.log(channels);
        
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

        localDictionary.measurements.push(dataItem);

    });

    
    //console.log(localDictionary);
    return localDictionary;
    
}


module.exports = function () {
    return new F1_T06_Car_TelemetryCreateDict()
};