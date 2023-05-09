
let localDictionary = {
    "name": "F1_T10_Car_Damage",
    "key": "pl",
    "measurements": []
};


function F1_T10_Car_DamageCreateDict() {
   
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    

    const channels = [
        ["Tyre Wear RL", "tyreWearRL", "float"],
        ["Tyre Wear RR", "tyreWearRR", "float"],
        ["Tyre Wear FL", "tyreWearFL", "float"],
        ["Tyre Wear FR", "tyreWearFR", "float"],
        ["Tyre Damage RL", "tyreDamageRL", "integer"],
        ["Tyre Damage RR", "tyreDamageRR", "integer"],
        ["Tyre Damage FL", "tyreDamageFL", "integer"],
        ["Tyre Damage FR", "tyreDamageFR", "integer"],
        ["Brakes Damage RL", "brakesDamageRL", "integer"],
        ["Brakes Damage RR", "brakesDamageRR", "integer"],
        ["Brakes Damage FL", "brakesDamageFL", "integer"],
        ["Brakes Damage FR", "brakesDamageFR", "integer"],
        ["Front Left Wing Damage", "frontLeftWingDamage", "integer"],
        ["Front Right Wing Damage", "frontRightWingDamage", "integer"],
        ["Rear Wing Damage", "rearWingDamage", "integer"],
        ["Floor Damage", "floorDamage", "integer"],
        ["Diffuser Damage", "diffuserDamage", "integer"],
        ["Sidepod Damage", "sidepodDamage", "integer"],
        ["DRS Fault", "drsFault", "integer"],
        ["ERS Fault", "ersFault", "integer"],
        ["Gearbox Damage", "gearboxDamage", "integer"],
        ["Engine Damage", "engineDamage", "integer"],
        ["Engine MGUH Wear", "engineMGUHWear", "integer"],
        ["Engine ES Wear", "engineESWear", "integer"],
        ["Engine CE Wear", "engineCEWear", "integer"],
        ["Engine ICE Wear", "engineICEWear", "integer"],
        ["Engine MGUK Wear", "engineMGUKWear", "integer"],
        ["Engine TC Wear", "engineTCWear", "integer"],
        ["Engine Blown", "engineBlown", "integer"],
        ["Engine Seized", "engineSeized", "integer"]        
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
    return new F1_T10_Car_DamageCreateDict();
};