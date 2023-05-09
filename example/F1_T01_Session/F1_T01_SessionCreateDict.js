



let localDictionary = {
    "name": "F1_T01_Session",
    "key": "pl",
    "measurements": []
};


function F1_T01_SessionCreateDict() {
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    
    const channelsHeader = [
        ["Packet Format",              "packetFormat",            "integer"],
        ["Game Major Version",         "gameMajorVersion",        "integer"],
        ["Game Minor Version",         "gameMinorVersion",        "integer"],
        ["Packet Version",             "packetVersion",           "integer"],
        ["Session UID",                "sessionUID",              "integer"],
        ["Session Time",               "sessionTime",             "integer"],
        ["Frame ID",                   "frameID",                 "integer"],
        ["Player Car Index",           "playerCarIndex",          "integer"],
        ["Secondary Player Car Index", "secondaryPlayerCarIndex", "integer"]
    ];

    const channels0 = [
        ["Weather",                    "weather",                 "integer"],
        ["Track Temp",                 "trackTemp",               "integer"],
        ["Air Temp",                   "airTemp",                 "integer"],
        ["Total Laps",                 "totalLaps",               "integer"],
        ["Track Length",               "trackLength",             "integer"],
        ["Session Type",               "sessionType",             "integer"],
        ["Track ID",                   "trackID",                 "integer"],
        ["Formula",                    "formula",                 "integer"],
        ["Session Time Left",          "sessionTimeLeft",         "integer"],
        ["Session Duration",           "sessionDuration",         "integer"],
        ["Pit Speed Limit",            "pitSpeedLimit",           "integer"],
        ["Game Paused",                "gamePaused",              "integer"],
        ["Is Spectating",              "isSpectating",            "integer"],
        ["Spectator Car Index",        "spectatorCarIndex",       "integer"],
        ["SLI Pro Native Support",     "sliProNativeSupport",     "integer"],
        ["Number of Marshal Zones",    "numMarshalZones",         "integer"]
    ];

    // 21 Marshal Zones
    const channelsMarshals = [
        ["Zone Start", "zoneStart", "float"],
        ["Zone Flag",  "zoneFlag",  "integer"],
    ];


    const channels1 = [
        ["Safety Car Status",          "safetyCarStatus",    "integer"],
        ["Network Game",               "networkGame",        "integer"],
        ["Number of Forecast Samples", "numForecastSamples", "integer"]
    ];

    // 56 Weather Forcasts
    const channelsWeather = [
        ["Session Type",             "sessionType",            "integer"],
        ["Time Offset",              "timeOffset",             "integer"],
        ["Weather",                  "weather",                "integer"],
        ["Track Temperature",        "trackTemperature",       "integer"],
        ["Track Temperature Change", "trackTemperatureChange", "integer"],
        ["Air Temperature",          "airTemperature",         "integer"],
        ["Air Temperature Change",   "airTemperatureChange",   "integer"],
        ["Rain Percentage",          "rainPercentage",         "integer"]
    ];


    const channels2 = [
        ["Forecast Accuracy",          "forecastAccuracy",        "integer"],
        ["AI Difficulty",              "aiDifficulty",            "integer"],
        ["Season Link ID",             "seasonLinkID",            "integer"],
        ["Weekend Link ID",            "weekendLinkID",           "integer"],
        ["Session Link ID",            "sessionLinkID",           "integer"],
        ["Pit Stop Window Ideal Lap",  "pitStopWindowIdealLap",   "integer"],
        ["Pit Stop Window Latest Lap", "pitStopWindowLatestLap",  "integer"],
        ["Pit Stop Rejoin Position",   "pitStopRejoinPosition",   "integer"],
        ["Steering Assist",            "steeringAssist",          "integer"],
        ["Braking Assist",             "brakingAssist",           "integer"],
        ["Gearbox Assist",             "gearboxAssist",           "integer"],
        ["Pit Assist",                 "pitAssist",               "integer"],
        ["Pit Release Assist",         "pitReleaseAssist",        "integer"],
        ["ERS Assist",                 "ERSAssist",               "integer"],
        ["DRS Assist",                 "DRSAssist",               "integer"],
        ["Dynamic Racing Line",        "dynamicRacingLine",       "integer"],
        ["Dynamic Racing Line Type",   "dynamicRacingLineType",   "integer"],
        ["Game Mode",                  "gameMode",                "integer"],
        ["Rule Set",                   "ruleSet",                 "integer"],
        ["Time Of Day",                "timeOfDay",               "integer"],
        ["Session Length",             "sessionLength",           "integer"]
    ];
    

    //console.log(channels);
        
    channelsHeader.forEach(function (item, index){
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
        };

        localDictionary.measurements.push(dataItem);

    });

    channels0.forEach(function (item, index){
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
        };

        localDictionary.measurements.push(dataItem);

    });

    for (let m = 0; m < 21; m++){
        channelsMarshals.forEach(function (item, index){
            var dataItem = {
                "name": 'Marshal ' + m.toString() + ' ' + item[0],
                "key": 'marshal_' + m.toString() + '_' + item[1],
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
            };
    

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
        };

        localDictionary.measurements.push(dataItem);

    });

    for (let w = 0; w < 56; w++){
        channelsWeather.forEach(function (item, index){
            var dataItem = {
                "name": 'Forcast ' + w.toString() + ' ' + item[0],
                "key": 'forcast_' + w.toString() + '_' + item[1],
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
            };
    
            localDictionary.measurements.push(dataItem);

        });
    }

    channels2.forEach(function (item, index){
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
        };

        localDictionary.measurements.push(dataItem);

    });

    //console.log(localDictionary);
    return localDictionary;
    
}


module.exports = function () {
    return new F1_T01_SessionCreateDict();
};