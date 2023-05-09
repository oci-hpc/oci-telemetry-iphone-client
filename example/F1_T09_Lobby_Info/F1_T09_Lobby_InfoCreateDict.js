
let localDictionary = {
    "name": "F1_T09_Lobby_Info",
    "key": "pl",
    "measurements": []
};


function F1_T09_Lobby_InfoCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    var numPlayersDataItem = {
        "name": "Number of Players",
        "key": "numPlayers",
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
    };

    localDictionary.measurements.push(numPlayersDataItem);

    const channels = [
        ["AI Controlled", "aiControlled", "integer"],
        ["Team ID",       "teamID",       "integer"],
        ["Nationality",   "nationality",  "integer"],
        ["Name",          "name",         "string"],
        ["Car Number",    "carNumber",    "integer"],
        ["Ready Status",  "readyStatus",  "integer"],
        
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
    };


    //console.log(localDictionary);
    return localDictionary;
    
};


module.exports = function () {
    return new F1_T09_Lobby_InfoCreateDict();
};