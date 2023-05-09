



let localDictionary = {
    "name": "F1_T07_Car_Status",
    "key": "pl",
    "measurements": []
}


function F1_T07_Car_StatusCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    const channels = [
        ["Traction Control",            "tractionControl",         "integer"],
        ["Anti Lock Brakes",            "antiLockBrakes",          "integer"],
        ["Fuel Mix",                    "fuelMix",                 "integer"],
        ["Front Brake Bias",            "frontBrakeBias",          "integer"],
        ["Pit Limiter Status",          "pitLimiterStatus",        "integer"],
        ["Fuel In Tank",                "fuelInTank",              "float"],
        ["Fuel Capacity",               "fuelCapacity",            "float"],
        ["Fuel Remaining Laps",         "fuelRemainingLaps",       "float"],
        ["Max RPM",                     "maxRPM",                  "integer"],
        ["Idle RPM",                    "idleRPM",                 "integer"],
        ["Max Gears",                   "maxGears",                "integer"],
        ["DRS Allowed",                 "drsAllowed",              "integer"],
        ["DRS Activation Distance",     "drsActivationDistance",   "integer"],
        ["Actual Tyre Compound",        "actualTyreCompound",      "integer"],
        ["Visual Tyre Compound",        "visualTyreCompound",      "integer"],
        ["Tyre Age Laps",               "tyreAgeLaps",             "integer"],
        ["Vehicle FIA Flags",           "vehicleFiaFlags",         "integer"],
        ["ERS Store Energy",            "ersStoreEnergy",          "float"],
        ["ERS Deploy Mode",             "ersDeployMode",           "integer"],
        ["ERS Harvested This Lap MGUK", "ersHarvestedThisLapMGUK", "float"],
        ["ERS Harvested This Lap MGUH", "ersHarvestedThisLapMGUH", "float"],
        ["ERS Deployed This Lap",       "ersDeployedThisLap",      "float"],
        ["Network Paused",              "networkPaused",           "integer"]
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

    //console.log(localDictionary);
    return localDictionary;
    
}


module.exports = function () {
    return new F1_T07_Car_StatusCreateDict()
};