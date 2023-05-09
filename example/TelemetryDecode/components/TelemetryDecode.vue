/*****************************************************************************
* Open MCT, Copyright (c) 2014-2022, United States Government
* as represented by the Administrator of the National Aeronautics and Space
* Administration. All rights reserved.
*
* Open MCT is licensed under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* http://www.apache.org/licenses/LICENSE-2.0.
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*
* Open MCT includes source code licensed under additional open source
* licenses. See the Open Source Licenses file (LICENSES.md) included with
* this source code distribution or the Licensing information page available
* at runtime from the About dialog for additional information.
*****************************************************************************/
<template>
<div
    class="c-telemetryDecode__wrapper js-telemetryDecode-wrapper"
    :class="`c-telemetryDecode--${telemetryDecodeType}`"
    :title="telemetryDecodeTitle"
>
    <template v-if="typeText">
        <div class="c-telemetryDecode u-style-receiver js-style-receiver">
            <div class="c-telemetryDecode__value">
                {{ curVal }}
            </div>
        </div>
    </template>

</div>
</template>

<script>




// codesGameMode
import {CODES_GAMEMODE} from '../codesGameMode'; 
import {CODES_NETWORKGAME} from '../codesGameMode';     
import {CODES_ASSISTSTEER} from '../codesGameMode';          
import {CODES_ASSISTBRAKE} from '../codesGameMode';            
import {CODES_ASSISTGEARBOX} from '../codesGameMode';                
import {CODES_ASSISTPIT} from '../codesGameMode';                   
import {CODES_ASSISTPITRELEASE} from '../codesGameMode';                        
import {CODES_ASSISTERS} from '../codesGameMode';                             
import {CODES_ASSISTDRS} from '../codesGameMode';                                 
import {CODES_ASSISTDYNAMICRACINGLINE} from '../codesGameMode';                                  
import {CODES_ASSISTDYNAMICRACINGLINETYPE} from '../codesGameMode';
// codesTrack
import {CODES_TRACK} from '../codesTrack';
// codesDriver
import {CODES_DRIVER} from '../codesDriver';
// codesNationality
import {CODES_NATIONALITY} from '../codesNationality';
// codesMarshal
import {CODES_MARSHALFLAG} from '../codesMarshal';
import {CODES_SAFETYCARSTATUS} from '../codesMarshal';
import {CODES_EVENTSTRING} from '../codesMarshal';
// codesPenalty
import {CODES_PENALTY} from '../codesPenalty';
import {CODES_INFRINGEMENT} from '../codesPenalty';
// codesRuleset
import {CODES_RULESET} from '../codesRuleset';
// codesSession
import {CODES_SESSIONTYPE} from '../codesSession';
import {CODES_SESSIONLENGTH} from '../codesSession';
import {CODES_FORMULA} from '../codesSession';
// codesStatus
import {CODES_PITSTATUS} from '../codesStatus';
import {CODES_SECTOR} from '../codesStatus';
import {CODES_CURRENTLAPINVALID} from '../codesStatus';
import {CODES_DRIVERSTATUS} from '../codesStatus';
import {CODES_RESULTSTATUS} from '../codesStatus';
import {CODES_PITLANETIMER} from '../codesStatus';
import {CODES_PITSHOULDSERVE} from '../codesStatus';
import {CODES_AI} from '../codesStatus';
import {CODES_UDPSETTING} from '../codesStatus';
import {CODES_DRS} from '../codesStatus';
import {CODES_MDFPANEL} from '../codesStatus';
import {CODES_TRACTIONCONTROL} from '../codesStatus';
import {CODES_ANTILOCKBRAKES} from '../codesStatus';
import {CODES_FUELMIX} from '../codesStatus';
import {CODES_PITLIMITER} from '../codesStatus';
import {CODES_DRSALLOWED} from '../codesStatus';
import {CODES_TYREACTUAL_F1} from '../codesStatus';
import {CODES_TYREVISUAL_F1} from '../codesStatus';
import {CODES_FIAFLAG} from '../codesStatus';
import {CODES_ERSDEPLOYMODE} from '../codesStatus';
import {CODES_READYSTATUS} from '../codesStatus';
import {CODES_DRSFAULT} from '../codesStatus';
import {CODES_ERSFAULT} from '../codesStatus';
import {CODES_ENGINEFAULT} from '../codesStatus';
import {CODES_ENGINESEIZED} from '../codesStatus';
import {CODES_LAPVALID} from '../codesStatus';
// codesSurfaceType
import {CODES_SURFACETYPE} from '../codesSurfaceType';
// codesTeam
import {CODES_TEAM} from '../codesTeam';
// codesWeather
import {CODES_WEATHER} from '../codesWeather';
import {CODES_TRACKTEMPCHANGE} from '../codesWeather';
import {CODES_AIRTEMPCHANGE} from '../codesWeather';
import {CODES_FORECASTACCURACY} from '../codesWeather';
// codesButton
import {CODES_BUTTON} from '../codesButton';


export const TYPES_TO_CHANNEL = {
    //'value-text': //Defaults to just the value itself
    'track-text':               ['F1_T01_Session.taxonomy', 'trackID', CODES_TRACK],
    'session-type-text':        ['F1_T01_Session.taxonomy', 'sessionType', CODES_SESSIONTYPE],
    'session-length-text':      ['F1_T01_Session.taxonomy', 'sessionLength', CODES_SESSIONLENGTH],
    'formula-text':             ['F1_T01_Session.taxonomy', 'formula', CODES_FORMULA],
    'driver-text':              ['F1_T04_Participants.taxonomy', 'driverID', CODES_DRIVER],
    'team-text':                ['F1_T04_Participants.taxonomy', 'teamID', CODES_TEAM],
    'nationality-text':         ['F1_T04_Participants.taxonomy', 'nationality', CODES_NATIONALITY],
    'weather-text':             ['F1_T01_Session.taxonomy', 'weather', CODES_WEATHER],
    'track-temp-change-text':   ['F1_T01_Session.taxonomy', 'trackTemperatureChange', CODES_TRACKTEMPCHANGE], //need to add which forecast
    'air-temp-change-text':     ['F1_T01_Session.taxonomy', 'airTemperatureChange', CODES_AIRTEMPCHANGE], //need to add which forecast
    'forecast-accuracy-text':   ['F1_T01_Session.taxonomy', 'forecastAccuracy', CODES_FORECASTACCURACY],
    'penalty-text':             ['F1_T03_Event.taxonomy', 'penaltyType', CODES_PENALTY],
    'infringement-text':        ['F1_T03_Event.taxonomy', 'infringementType', CODES_INFRINGEMENT],
    'marshalzoneflag-text':     ['F1_T01_Session.taxonomy', 'zoneFlag', CODES_MARSHALFLAG], //need to add which marshal zone
    'safetycar-status-text':    ['F1_T01_Session.taxonomy', 'safetyCarStatus', CODES_SAFETYCARSTATUS],
    'event-text':               ['F1_T03_Event.taxonomy', 'eventStringCode', CODES_EVENTSTRING],
    'pit-status-text':          ['F1_T02_Lap_Data.taxonomy', 'pitStatus', CODES_PITSTATUS],
    'sector-text':              ['F1_T02_Lap_Data.taxonomy', 'sector', CODES_SECTOR], 
    'current-lap-invalid-text': ['F1_T02_Lap_Data.taxonomy', 'currentLapInvalid', CODES_CURRENTLAPINVALID], 
    'driver-status-text':       ['F1_T02_Lap_Data.taxonomy', 'driverStatus', CODES_DRIVERSTATUS],
    'result-status-text':       ['F1_T02_Lap_Data.taxonomy', 'resultStatus', CODES_RESULTSTATUS],
    'pitlane-timer-text':       ['F1_T02_Lap_Data.taxonomy', 'pitLaneTimerActive', CODES_PITLANETIMER],
    'pit-should-serve-text':    ['F1_T02_Lap_Data.taxonomy', 'pitStopShouldServePenalty', CODES_PITSHOULDSERVE],
    'ai-text':                  ['F1_T04_Participants.taxonomy', 'aiControlled', CODES_AI],
    'udp-setting-text':         ['F1_T04_Participants.taxonomy', 'yourTelemetry', CODES_UDPSETTING],
    'drs-text':                 ['F1_T06_Car_Telemetry.taxonomy', 'drs', CODES_DRS],
    'mdf-panel-text':           ['F1_T06_Car_Telemetry.taxonomy', 'mfdPanelIndex', CODES_MDFPANEL],
    'traction-control-text':    ['F1_T07_Car_Status.taxonomy', 'tractionControl', CODES_TRACTIONCONTROL],
    'anti-lock-brakes-text':    ['F1_T07_Car_Status.taxonomy', 'antiLockBrakes', CODES_ANTILOCKBRAKES],
    'fuel-mix-text':            ['F1_T07_Car_Status.taxonomy', 'fuelMix', CODES_FUELMIX],
    'pit-limiter-text':         ['F1_T07_Car_Status.taxonomy', 'pitLimiterStatus', CODES_PITLIMITER],
    'drs-allowed-text':         ['F1_T07_Car_Status.taxonomy', 'drsAllowed', CODES_DRSALLOWED],
    'tyres-actual-text':        ['F1_T07_Car_Status.taxonomy', 'actualTyreCompound', CODES_TYREACTUAL_F1],
    'tyres-visual-text':        ['F1_T07_Car_Status.taxonomy', 'visualTyreCompound', CODES_TYREVISUAL_F1],
    'fia-flag-text':            ['F1_T07_Car_Status.taxonomy', 'vehicleFiaFlags', CODES_FIAFLAG],
    'ers-deploy-mode-text':     ['F1_T07_Car_Status.taxonomy', 'ersDeployMode', CODES_ERSDEPLOYMODE],
    'ready-status-text':        ['F1_T09_Lobby_Info.taxonomy', 'readyStatus', CODES_READYSTATUS],
    'drs-fault-text':           ['F1_T10_Car_Damage.taxonomy', 'drsFault', CODES_DRSFAULT],
    'ers-fault-text':           ['F1_T10_Car_Damage.taxonomy', 'ersFault', CODES_ERSFAULT],
    'engine-fault-text':        ['F1_T10_Car_Damage.taxonomy', 'engineDamage', CODES_ENGINEFAULT],
    'engine-seized-text':       ['F1_T10_Car_Damage.taxonomy', 'engineSeized', CODES_ENGINESEIZED],
    'lap-valid-text':           ['F1_T11_Session_History.taxonomy', 'lapValidBitFlags', CODES_LAPVALID],
    'game-mode-text':           ['F1_T01_Session.taxonomy', 'gameMode', CODES_GAMEMODE],
    'network-game-text':        ['F1_T01_Session.taxonomy', 'networkGame', CODES_NETWORKGAME],
    'steer-assist-text':        ['F1_T01_Session.taxonomy', 'steeringAssist', CODES_ASSISTSTEER],
    'brake-assist-text':        ['F1_T01_Session.taxonomy', 'brakingAssist', CODES_ASSISTBRAKE],
    'gearbox-assist-text':      ['F1_T01_Session.taxonomy', 'gearboxAssist', CODES_ASSISTGEARBOX],
    'pit-assist-text':          ['F1_T01_Session.taxonomy', 'pitAssist', CODES_ASSISTPIT],
    'pit-release-assist-text':  ['F1_T01_Session.taxonomy', 'pitReleaseAssist', CODES_ASSISTPITRELEASE],
    'ers-assist-text':          ['F1_T01_Session.taxonomy', 'ERSAssist', CODES_ASSISTERS],
    'drs-assist-text':          ['F1_T01_Session.taxonomy', 'DRSAssist', CODES_ASSISTDRS],
    'drl-text':                 ['F1_T01_Session.taxonomy', 'dynamicRacingLine', CODES_ASSISTDYNAMICRACINGLINE],
    'drl-type-text':            ['F1_T01_Session.taxonomy', 'dynamicRacingLineType', CODES_ASSISTDYNAMICRACINGLINETYPE],
    'surface-type-text':        ['F1_T06_Car_Telemetry.taxonomy', 'surface_type_RL', CODES_SURFACETYPE],
    'ruleset-text':             ['F1_T01_Session.taxonomy', 'ruleSet', CODES_RULESET],
    //'game-paused-text':         ['F1_T01_Session.taxonomy', 'gamePaused', ],
    //'spectating-text':          ['F1_T01_Session.taxonomy', 'isSpectating', ],
    //'slipro-text':              ['F1_T01_Session.taxonomy', 'sliProNativeSupport', ],
    'button-text':              ['F1_T03_Event.taxonomy', 'buttonStatusButtons', CODES_BUTTON]
};











const LIMIT_PADDING_IN_PERCENT = 10;
const DEFAULT_CURRENT_VALUE = '--';

export default {
    //This name must be one word
    name: 'TelemetryDecode',
    inject: ['openmct', 'domainObject', 'composition'],
    data() {
        let telemetryDecodeController = this.domainObject.configuration.telemetryDecodeController;

        return {
            curVal: DEFAULT_CURRENT_VALUE,
            digits: 3,
            minRefreshRate: telemetryDecodeController.minRefreshRate,
            precision: telemetryDecodeController.precision,
            telemetryDecodeType: telemetryDecodeController.telemetryDecodeType,
            showUnits: telemetryDecodeController.showUnits,
            activeTimeSystem: this.openmct.time.timeSystem(),
            units: ''
        };
    },
    computed: {
        //Computed things for the vue templating stuff above.


        // Title of widget shown on bar above, shows error if value is out of bound
        telemetryDecodeTitle() {
            //console.log(this.openmct.objects.get({namespace: 'F1_T06_Car_Telemetry.taxonomy',key: 'speed'}));
            return this.valueInBounds ? 'Telemetry Decode' : 'Value is currently out of range and cannot be graphically displayed';
        },

        // This grabs the correct template above.
        typeText() {
            return this.matchTelemetryDecodeType('text');
        },



        // Addtional methods for template creation
        valueInBounds() {
            return (this.curVal >= this.rangeLow && this.curVal <= this.rangeHigh);
        },
        timeFormatter() {
            const timeSystem = this.activeTimeSystem;
            const metadataValue = this.metadata.value(timeSystem.key) || { format: timeSystem.key };

            return this.openmct.telemetry.getValueFormatter(metadataValue);
        }
    },

    // Think this watches for any change to the curVal and does stuff.
    // FIFTH
    watch: {
        
        curVal(newCurValue) {
            //console.log("watch", newCurValue);
            if (this.digits < newCurValue.toString().length) {
                this.digits = newCurValue.toString().length;
            }
        }
    },
    // FIRST - Called first, i think, when the widget is loaded.
    mounted() {
        
        this.composition.on('add', this.addedToComposition);
        this.composition.on('remove', this.removeTelemetryObject);

        this.composition.load();

        this.openmct.time.on('bounds', this.refreshData);
        this.openmct.time.on('timeSystem', this.setTimeSystem);

        this.addCodeMatchedTelemetry();

    },
    //Called when the widget is unloaded.
    destroyed() {
        //console.log("destroyed");
        this.composition.off('add', this.addedToComposition);
        this.composition.off('remove', this.removeTelemetryObject);

        if (this.unsubscribe) {
            this.unsubscribe();
        }

        this.openmct.time.off('bounds', this.refreshData);
        this.openmct.time.off('timeSystem', this.setTimeSystem);
    },
    methods: {
        // Add methods here:

        // - THIRD
        addTelemetryObjectAndSubscribe(domainObject) {
            //console.log("addTelemetryObjectAndSubscribe", domainObject);
            this.telemetryObject = domainObject;
            this.request();
            this.subscribe();
        },

        // - SECOND
        addedToComposition(domainObject) {
            if (this.telemetryObject) {
                this.confirmRemoval(domainObject);
            } else {
                this.addTelemetryObjectAndSubscribe(domainObject);
            }
        },

        confirmRemoval(domainObject) {
            const dialog = this.openmct.overlays.dialog({
                iconClass: 'alert',
                message: 'This action will replace the current telemetry source. Do you want to continue?',
                buttons: [
                    {
                        label: 'Ok',
                        emphasis: true,
                        callback: () => {
                            this.removeFromComposition();
                            this.removeTelemetryObject();
                            this.addTelemetryObjectAndSubscribe(domainObject);
                            dialog.dismiss();
                        }
                    },
                    {
                        label: 'Cancel',
                        callback: () => {
                            this.removeFromComposition(domainObject);
                            dialog.dismiss();
                        }
                    }
                ]
            });
        },
        fontSizeFromChars(charNum, charThreshold, startPerc, reducePerc) {
            const fs = (charNum <= charThreshold) ? startPerc : (startPerc - ((charNum - charThreshold) * reducePerc));

            return fs.toString() + "%";
        },
        matchTelemetryDecodeType(str) {
            return this.telemetryDecodeType.indexOf(str) !== -1;
        },

        removeFromComposition(telemetryObject = this.telemetryObject) {
            let composition = this.domainObject.composition.filter(id =>
                !this.openmct.objects.areIdsEqual(id, telemetryObject.identifier)
            );

            this.openmct.objects.mutate(this.domainObject, 'composition', composition);
        },
        refreshData(bounds, isTick) {
            if (!isTick) {
                this.request();
            }
        },
        // Remove telemetry object
        removeTelemetryObject() {
            //console.log("removeTelemetryObject");
            if (this.unsubscribe) {
                this.unsubscribe();
                this.unsubscribe = null;
            }
            // Set everything back to defaults
            this.curVal = DEFAULT_CURRENT_VALUE;
            this.formats = null;
            this.metadata = null;
            this.rangeHigh = null;
            this.rangeLow = null;
            this.valueKey = null;
        },

        // Grab required telemetry channels per coded type
        addCodeMatchedTelemetry(decodeType = this.telemetryDecodeType, domainObject = this.telemetryObject){
            //console.log("addCodeMatchedTelemetry");
            var telNS;
            var telKey;

            if (this.telemetryDecodeType == "value-text"){
                return;
            }
            else {
                telNS = TYPES_TO_CHANNEL[this.telemetryDecodeType][0];
                telKey = TYPES_TO_CHANNEL[this.telemetryDecodeType][1];
            }
            


            if (typeof telNS !== 'undefined' && typeof telKey !== 'undefined'){
                this.openmct
                    .objects
                    .get({
                        namespace: telNS,
                        key: telKey
                    })
                    .then(result => {
                        //console.log("Promise returned", result);
                    
                        this.composition.add(result);

                        //this.addedToComposition(result);
                
                    });
            }

        },


        request(domainObject = this.telemetryObject) {
            this.metadata = this.openmct.telemetry.getMetadata(domainObject);
            this.formats = this.openmct.telemetry.getFormatMap(this.metadata);
            const LimitEvaluator = this.openmct.telemetry.getLimits(domainObject);
            //LimitEvaluator.limits().then(this.updateLimits);

            this.valueKey = this
                .metadata
                .valuesForHints(['range'])[0].source;

            this.openmct
                .telemetry
                .request(domainObject, { strategy: 'latest' })
                .then(values => {
                    const length = values.length;
                    this.updateValue(values[length - 1]);
                });

            this.units = this.metadata.value(this.valueKey).unit || '';
        },
        round(val, decimals = this.precision) {
            let precision = Math.pow(10, decimals);

            return Math.round(val * precision) / precision;
        },
        setTimeSystem(timeSystem) {
            this.activeTimeSystem = timeSystem;
        },

        // FOURTH
        subscribe(domainObject = this.telemetryObject) {
            console.log("Subscribing to:",this.telemetryObject);

            this.unsubscribe = this.openmct
                .telemetry
                .subscribe(domainObject, this.updateValue.bind(this));
        },
        updateLimits(telemetryLimit) {
            
            return;
            

            let limits = {
                high: 0,
                low: 0
            };
            if (telemetryLimit.CRITICAL) {
                limits = telemetryLimit.CRITICAL;
            } else if (telemetryLimit.DISTRESS) {
                limits = telemetryLimit.DISTRESS;
            } else if (telemetryLimit.SEVERE) {
                limits = telemetryLimit.SEVERE;
            } else if (telemetryLimit.WARNING) {
                limits = telemetryLimit.WARNING;
            } else if (telemetryLimit.WATCH) {
                limits = telemetryLimit.WATCH;
            } else {
                this.openmct.notifications.error('No limits definition for given telemetry, hiding low and high limits');

                return;
            }

            this.rangeHigh = this.round(1.0 + 1.0 * LIMIT_PADDING_IN_PERCENT / 100);
            this.rangeLow = this.round(1.0 - Math.abs(1.0 * LIMIT_PADDING_IN_PERCENT / 100));
        },
        updateValue(datum) {
            this.datum = datum;
            //console.log("Datum",this.datum);

            if (this.isRendering) {
                return;
            }

            const { start, end } = this.openmct.time.bounds();
            const parsedValue = this.timeFormatter.parse(this.datum);

            const beforeStartOfBounds = parsedValue < start;
            const afterEndOfBounds = parsedValue > end;
            if (afterEndOfBounds || beforeStartOfBounds) {
                return;
            }

            this.isRendering = true;
            requestAnimationFrame(() => {
                this.isRendering = false;

                //this.curVal = this.round(this.formats[this.valueKey].format(this.datum), this.precision);
                if (this.telemetryDecodeType !== 'undefined'){
                    this.curVal = TYPES_TO_CHANNEL[this.telemetryDecodeType][2][Number(this.datum.value)];
                }

                
                else{
                    this.curVal = this.round(this.formats[this.valueKey].format(this.datum), this.precision);
                }
                console.log(this.datum, this.curVal);
            });
        }
    }
};
</script>



*{
*    "identifier": {
*        "namespace": "F1_T07_Car_Status.taxonomy",
*        "key": "tractionControl"
*    },
*    "name": "Traction Control",
*    "type": "F1_T07_Car_Status.telemetry",
*    "telemetry": {
*        "values": [
*            {
*                "key": "value",
*                "name": "Value",
*                "units": "unit",
*                "format": "integer",
*                "hints": {
*                    "range": 1,
*                    "priority": 0
*                },
*                "source": "value"
*            },
*            {
*                "key": "utc",
*                "source": "timestamp",
*                "name": "Timestamp",
*                "format": "utc",
8                "hints": {
*                    "domain": 1,
*                    "priority": 1
*                }
8            }
*        ]
*    },
*    "location": "F1_T07_Car_Status.taxonomy:F1_T07_Car_Status"
*}