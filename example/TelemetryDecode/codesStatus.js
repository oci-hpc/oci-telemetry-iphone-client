export const CODES_PITSTATUS = {
    0: "None", 
    1: "Pitting", 
    2: "In Pit Area"
};


export const CODES_SECTOR = {
    0: "Sector 1", 
    1: "Sector 2", 
    2: "Sector 3"
};

export const CODES_CURRENTLAPINVALID = {
    0: "Valid", 
    1: "Invalid"
};

export const CODES_DRIVERSTATUS = {
    0:  "In Garage", 
    1:  "Flying Lap",
    2:  "In Lap", 
    3:  "Out Lap", 
    4:  "On Track"
};

export const CODES_RESULTSTATUS = {
    0:  "Invalid", 
    1:  "Inactive",
    2:  "Active", 
    3:  "Finished", 
    4:  "DNF",
    5:  "DSQ",
    5:  "NC",
    6:  "RTRD",
};

export const CODES_PITLANETIMER = {
    0:  "Inactive", 
    1:  "Active"
};

export const CODES_PITSHOULDSERVE = {
    // Don't know which code these are
    0:  "No", 
    1:  "Yes"
};

export const CODES_AI = {
    0:  "AI Controlled", 
    1:  "Human"
};

export const CODES_UDPSETTING = {
    0:  "Restricted", 
    1:  "Public"
};

export const CODES_DRS = {
    0:  "Off", 
    1:  "On"
};

export const CODES_MDFPANEL = {
    0:  "Car Setup", 
    1:  "Pits",
    2: "Damage",
    3: "Engine",
    4: "Temperatures",
    255: "Closed"
};

export const CODES_TRACTIONCONTROL = {
    0:  "Off", 
    1:  "Medium",
    2: "Full"
};

export const CODES_ANTILOCKBRAKES = {
    0:  "Off", 
    1:  "On"
};

export const CODES_FUELMIX = {
    0:  "Lean", 
    1:  "Standard",
    2:  "Rich",
    3:  "Max"
};

export const CODES_PITLIMITER = {
    0:  "Off", 
    1:  "On"
};

export const CODES_DRSALLOWED = {
    0:  "Not Allowed", 
    1:  "Allowed"
};

export const CODES_TYREACTUAL_F1 = {
    16:  "C5", 
    17:  "C4", 
    18:  "C3", 
    19:  "C2", 
    20:  "C1", 
    7:  "Inter", 
    8:  "Wet", 
    9:  "Dry",
    10:  "Wet", 
    11:  "Super Soft", 
    12:  "Soft", 
    13:  "Medium", 
    14:  "Hard", 
    15:  "Wet",  
};

export const CODES_TYREVISUAL_F1 = {
    16:  "Soft", 
    17:  "Medium", 
    18:  "Hard", 
    7:  "Inter", 
    8:  "Wet", 
    9:  "Dry",
    10:  "Wet", 
    15:  "Wet",  
    19:  "Super Soft", 
    20:  "Soft", 
    21:  "Medium", 
    22:  "Hard", 
};

export const CODES_FIAFLAG = {
    '-1':  "Invalid/Unknown", 
    0:  "None", 
    1:  "Green", 
    2:  "Blue", 
    3:  "Yellow", 
    4:  "Red" 
};

export const CODES_ERSDEPLOYMODE = { 
    0:  "None", 
    1:  "Medium", 
    2:  "HotLap", 
    3:  "Overtake"
};

export const CODES_READYSTATUS = { 
    0:  "Not Ready", 
    1:  "Ready", 
    2:  "Spectating"
};

export const CODES_DRSFAULT = { 
    0:  "OK", 
    1:  "Fault"
};

export const CODES_ERSFAULT = { 
    0:  "OK", 
    1:  "Fault"
};

export const CODES_ENGINEFAULT = { 
    0:  "OK", 
    1:  "Fault"
};

export const CODES_ENGINESEIZED = { 
    0:  "OK", 
    1:  "Fault"
};

export const CODES_LAPVALID = { 
    '0x01': "Set-Lap Valid",      
    '0x02': "Set-Sector 1 Valid",
    '0x04': "Set-Sector 2 Valid", 
    '0x08': "Set-Sector 3 Valid"
};