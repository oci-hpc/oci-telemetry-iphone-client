// Create Channel Dictionary Programatically

let localDictionary = {
    "name": "iPhone_SensorLog",
    "key": "pl",
    "measurements": []
}


function iPhone_SensorLogCreateDict() {
   
    // Build Dictionary here so it doesn't ping the server repeatedly for this information.
    
    const channels = [
        ["Logging Time",                  "loggingTime",                 "float"],
        ["Logging Sample",                "loggingSample",               "integer"],

        ["Location Timestamp Since 1970",         "locationTimestamp_since1970",        "float"],
        ["Location Latitude",                     "locationLatitude",                   "float"],
        ["Location Longitude",                    "locationLongitude",                  "float"],
        ["Location Altitude",                     "locationAltitude",                   "float"],
        ["Location Speed",                        "locationSpeed",                      "float"],
        ["Location Speed Accuracy",               "locationSpeedAccuracy",              "float"],
        ["Location Course",                       "locationCourse",                     "float"],
        ["Location Course Accuracy",              "locationCourseAccuracy",             "float"],
        ["Location Vertical Accuracy",            "locationVerticalAccuracy",           "float"],
        ["Location Horizontal Accuracy",          "locationHorizontalAccuracy",         "float"],
        ["Location Floor",                        "locationFloor",                      "float"],
        ["Location Heading Timestamp Since 1970", "locationHeadingTimestamp_since1970", "float"],
        
        ["Location Heading X",                    "locationHeadingX",                   "float"],
        ["Location Heading Y",                    "locationHeadingY",                   "float"],
        ["Location Heading Z",                    "locationHeadingZ",                   "float"],
        
        ["Location True Heading",                 "locationTrueHeading",                "float"],
        ["Location Magnetic Heading",             "locationMagneticHeading",            "float"],
        ["Location Heading Accuracy",             "locationHeadingAccuracy",            "float"],

        ["Accelerometer Timestamp Since Reboot", "accelerometerTimestamp_sinceReboot", "float"],
        ["Accelerometer Acceleration X",         "accelerometerAccelerationX",         "float"],
        ["Accelerometer Acceleration Y",         "accelerometerAccelerationY",         "float"],
        ["Accelerometer Acceleration Z",         "accelerometerAccelerationZ",         "float"],

        ["Gyro Timestamp Since Reboot", "gyroTimestamp_sinceReboot", "float"],
        ["Gyro Rotation X",             "gyroRotationX",             "float"],
        ["Gyro Rotation Y",             "gyroRotationY",             "float"],
        ["Gyro Rotation Z",             "gyroRotationZ",             "float"],
 
        ["Magnetometer Timestamp Since Reboot", "magnetometerTimestamp_sinceReboot", "float"],
        ["Magnetometer X",                      "magnetometerX",                     "float"],
        ["Magnetometer Y",                      "magnetometerY",                     "float"],
        ["Magnetometer Z",                      "magnetometerZ",                     "float"],

        ["Motion Timestamp Since Reboot",              "motionTimestamp_sinceReboot",            "float"],
        ["Motion Yaw",                                 "motionYaw",                              "float"],
        ["Motion Roll",                                "motionRoll",                             "float"],
        ["Motion Pitch",                               "motionPitch",                            "float"],

        ["Motion Rotation Rate X",                     "motionRotationRateX",                    "float"],
        ["Motion Rotation Rate Y",                     "motionRotationRateY",                    "float"],
        ["Motion Rotation Rate Z",                     "motionRotationRateZ",                    "float"],
 
        ["Motion User Acceleration X",                 "motionUserAccelerationX",                "float"],
        ["Motion User Acceleration Y",                 "motionUserAccelerationY",                "float"],
        ["Motion User Acceleration Z",                 "motionUserAccelerationZ",                "float"],

        ["Motion Attitude Reference Frame",            "motionAttitudeReferenceFrame",           "float"],
        ["Motion Quaternion X",                        "motionQuaternionX",                      "float"],
        ["Motion Quaternion Y",                        "motionQuaternionY",                      "float"],
        ["Motion Quaternion Z",                        "motionQuaternionZ",                      "float"],
        ["Motion Quaternion W",                        "motionQuaternionW",                      "float"],
        
        ["Motion Gravity X",                           "motionGravityX",                         "float"],
        ["Motion Gravity Y",                           "motionGravityY",                         "float"],
        ["Motion Gravity Z",                           "motionGravityZ",                         "float"],

        ["Motion Magnetic Field X",                    "motionMagneticFieldX",                   "float"],
        ["Motion Magnetic Field Y",                    "motionMagneticFieldY",                   "float"],
        ["Motion Magnetic Field Z",                    "motionMagneticFieldZ",                   "float"],

        ["Motion Heading",                             "motionHeading",                          "float"],
        ["Motion Magnetic Field Calibration Accuracy", "motionMagneticFieldCalibrationAccuracy", "float"],

        ["Activity Timestamp Since Reboot", "activityTimestamp_sinceReboot", "float"],
        ["Activity",                        "activity",                      "float"],
        ["Activity Confidence",             "activityConfidence",            "float"],
        ["Activity Start Date",             "activityStartDate",             "float"],

        ["Pedometer Start Date",          "pedometerStartDate",         "float"],
        ["Pedometer Number of Steps",     "pedometerNumberofSteps",     "float"],
        ["Pedometer Average Active Pace", "pedometerAverageActivePace", "float"],
        ["Pedometer Current Pace",        "pedometerCurrentPace",       "float"],
        ["Pedometer Current Cadence",     "pedometerCurrentCadence",    "float"],
        ["Pedometer Distance",            "pedometerDistance",          "float"],
        ["Pedometer Floor Ascended",      "pedometerFloorAscended",     "float"],
        ["Pedometer Floor Descended",     "pedometerFloorDescended",    "float"],
        ["Pedometer End Date",            "pedometerEndDate",           "float"],

        ["Altimeter Timestamp Since Reboot", "altimeterTimestamp_sinceReboot", "float"],
        ["Altimeter Reset",                  "altimeterReset",                 "float"],
        ["Altimeter Relative Altitude",      "altimeterRelativeAltitude",      "float"],
        ["Altimeter Pressure",               "altimeterPressure",              "float"],

        ["IP Timestamp Since 1970", "IP_Timestamp_since1970", "float"],
        ["IP En 0",                 "IP_en0",                 "float"],
        ["IP Pdp IP0",              "IP_pdp_ip0",             "float"],

        ["Device ID",                               "deviceID",                             "float"],
        ["Device Orientation TimeStamp Since 1970", "deviceOrientationTimeStamp_since1970", "float"],
        ["Device Orientation",                      "deviceOrientation",                    "float"],
        
        ["Battery TimeStamp Since 1970", "batteryTimeStamp_since1970", "float"],
        ["Battery State",                "batteryState",               "float"],
        ["Battery Level",                "batteryLevel",               "float"],

        ["Label",                        "label",               "float"]
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
    return new iPhone_SensorLogCreateDict()
};