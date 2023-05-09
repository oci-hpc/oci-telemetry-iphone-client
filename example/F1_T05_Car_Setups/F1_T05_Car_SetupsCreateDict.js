



let localDictionary = {
    "name": "F1_T05_Car_Setups",
    "key": "pl",
    "measurements": []
}


function F1_T05_Car_SetupsCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    const channels = [
        ["Front Wing",                "frontWing",              "integer"],
        ["Rear Wing",                 "rearWing",               "integer"],
        ["On Throttle Differential",  "onThrottle",             "integer"],
        ["Off Throttle Differential", "offThrottle",            "integer"],
        ["Front Camber",              "frontCamber",            "float"],
        ["Rear Camber",               "rearCamber",             "float"],
        ["Front Toe",                 "frontToe",               "float"],
        ["Rear Toe",                  "rearToe",                "float"],
        ["Front Suspension",          "frontSuspensio",         "integer"],
        ["Rear Suspension",           "rearSuspension",         "integer"],
        ["Front Anti Roll Bar",       "frontAntiRollBar",       "integer"],
        ["Rear Anti Roll Bar",        "rearAntiRollBar",        "integer"],
        ["Front Ride Height",         "frontSuspensionHeight",  "integer"],
        ["Rear Ride Height",          "rearSuspsensionHeight",  "integer"],
        ["Brake Pressure",            "brakePressure",          "integer"],
        ["Brake Bias",                "brakeBias",              "integer"],
        ["Rear Left Tyre Pressure",   "rearLeftTyrePressure",   "float"],
        ["Rear Right Tyre Pressure",  "rearRightTyrePressure",  "float"],
        ["Front Left Tyre Pressure",  "frontLeftTyrePressure",  "float"],
        ["Front Right Tyre Pressure", "frontRightTyrePressure", "float"],
        ["Ballast",                   "ballast",                "integer"],
        ["Fuel Load",                 "fuelLoad",               "integer"]
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
    return new F1_T05_Car_SetupsCreateDict()
};