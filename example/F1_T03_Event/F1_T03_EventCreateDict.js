



let localDictionary = {
    "name": "F1_T03_Event",
    "key": "pl",
    "measurements": []
}


function F1_T03_EventCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    const channels = [
        ["Event String Code", "eventStringCode", "string"],
        
        // Fastest Lap
        ["Vehicle Index Fastest Lap", "vehicleIndexFastestLap", "integer"],
        ["Lap Time Fastest Lap",      "lapTimeFastestLap",      "float"],
        
        // Retirement
        ["Vehicle Index Retirement", "vehicleIndexRetirement", "integer"],
        
        // Team Mate In Pits
        ["Vehicle Index Team Mate In Pits", "vehicleIndexTeamMateInPits", "integer"],

        // Race Winner
        ["Vehicle Index Race Winner", "vehicleIndexRaceWinner", "integer"],

        // Penalty
        ["Penalty Type", "penaltyType", "integer"],
        ["Infringement Type", "infringementType", "integer"],
        ["Vehicle Index Penalty", "vehicleIndexPenalty", "integer"],
        ["Other Vehicle Index Penalty", "otherVehicleIndexPenalty", "integer"],
        ["Time Penalty", "timePenalty", "integer"],
        ["Lap Number Penalty", "lapNumberPenalty", "integer"],
        ["Places Gained", "placesGained", "integer"],

        // Speed Trap
        ["Vehicle Index Speed Trap", "vehicleIndexSpeedTrap", "integer"],
        ["Speed in Speed Trap", "speedInSpeedTrap", "float"],
        ["Is Overall Fastest in Session Speed Trap", "isOverallFastesInSessionSpeedTrap", "integer"],
        ["Is Driver Fastest in Session Speed Trap", "isDriverFastesInSessionSpeedTrap", "integer"],
        ["Fastest Vehicle Index in Session Speed Trap", "fastestVehicleIndexInSessionSpeedTrap", "integer"],
        ["Fastest Speed in Session Speed Trap", "fastestSpeedInSessionSpeedTrap", "float"],

        // Start Lights
        ["Number of Lights Start Lights", "numberOfLightsStartLights", "integer"],

        // Drive Through Penalty Served
        ["Vehicle Index Drive Through Penalty Served", "vehicleIndexDriveThroughPenaltyServed", "integer"],

        // Stop Go Penalty Served
        ["Vehicle Index Stop Go Penalty Served", "vehicleIndexStopGoPenaltyServed", "integer"],

        // Flashback
        ["Flashback Frame ID Flashback", "flashbackFrameIDFlashback", "integer"],
        ["Flashback Session Time Flashback", "flashbackSessionTimeFlashback", "integer"],

        // Buttons
        ["Button Status Buttons", "buttonStatusButtons", "integer"]

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


    //console.log(localDictionary);
    return localDictionary;
    
}


module.exports = function () {
    return new F1_T03_EventCreateDict()
};