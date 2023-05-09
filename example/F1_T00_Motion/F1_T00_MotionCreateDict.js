



let localDictionary = {
    "name": "F1_T00_Motion",
    "key": "pl",
    "measurements": []
}


function F1_T00_MotionCreateDict() {
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    
    const channels = [
        ["World Position X",     "worldPositionX",     "float"],
        ["World Position Y",     "worldPositionY",     "float"],
        ["World Position Z",     "worldPositionZ",     "float"],
        ["World Velocity X",     "worldVelocityX",     "float"],
        ["World Velocity Y",     "worldVelocityY",     "float"],
        ["World Velocity Z",     "worldVelocityZ",     "float"],
        ["World Forward Dir X",  "worldForwardDirX",   "float"],
        ["World Forward Dir Y",  "worldForwardDirY",   "float"],
        ["World Forward Dir Z",  "worldForwardDirZ",   "float"],
        ["World Right Dir X",    "worldRightDirX",     "float"],
        ["World Right Dir Y",    "worldRightDirY",     "float"],
        ["World Right Dir Z",    "worldRightDirZ",     "float"],
        ["G Force Lateral",      "gForceLateral",      "float"],
        ["G Force Longitudinal", "gForceLongitudinal", "float"],
        ["G Force Vertical",     "gForceCertical",     "float"],
        ["Yaw",                  "yaw",                "float"],
        ["Pitch",                "pitch",              "float"],
        ["Roll",                 "roll",               "float"]
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

    const channelsExtra = [
        ["Suspension Position RL",     "suspensionPositionRL",     "float"],
        ["Suspension Position RR",     "suspensionPositionRR",     "float"],
        ["Suspension Position FL",     "suspensionPositionFL",     "float"],
        ["Suspension Position FR",     "suspensionPositionFR",     "float"],
        ["Suspension Velocity RL",     "suspensionVelocityRL",     "float"],
        ["Suspension Velocity RR",     "suspensionVelocityRR",     "float"],
        ["Suspension Velocity FL",     "suspensionVelocityFL",     "float"],
        ["Suspension Velocity FR",     "suspensionVelocityFR",     "float"],
        ["Suspension Acceleration RL", "suspensionAccelerationRL", "float"],
        ["Suspension Acceleration RR", "suspensionAccelerationRR", "float"],
        ["Suspension Acceleration FL", "suspensionAccelerationFL", "float"],
        ["Suspension Acceleration FR", "suspensionAccelerationFR", "float"],
        ["Wheel Speed RL",             "wheelSpeedRL",             "float"],
        ["Wheel Speed RR",             "wheelSpeedRR",             "float"],
        ["Wheel Speed FL",             "wheelSpeedFL",             "float"],
        ["Wheel Speed FR",             "wheelSpeedFR",             "float"],
        ["Wheel Slip RL",              "wheelSlipRL",              "float"],
        ["Wheel Slip RR",              "wheelSlipRR",              "float"],
        ["Wheel Slip FL",              "wheelSlipFL",              "float"],
        ["Wheel Slip FR",              "wheelSlipFR",              "float"],
        ["Local Velocity X",           "localVelocityX",           "float"],
        ["Local Velocity Y",           "localVelocityY",           "float"],
        ["Local Velocity Z",           "localVelocityZ",           "float"],
        ["Angular Velocity X",         "angularVelocityX",         "float"],
        ["Angular Velocity Y",         "angularVelocityY",         "float"],
        ["Angular Velocity Z",         "angularVelocityZ",         "float"],
        ["Angular Acceleration X",     "angularAccelerationX",     "float"],
        ["Angular Acceleration Y",     "angularAccelerationY",     "float"],
        ["Angular Acceleration Z",     "angularAccelerationZ",     "float"],
        ["Front Wheels Angle",         "frontWheelsAngle",         "float"],
        ];

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
    
}


module.exports = function () {
    return new F1_T00_MotionCreateDict()
};