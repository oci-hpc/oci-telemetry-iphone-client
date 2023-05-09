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

import TelemetryDecodeViewProvider from './TelemetryDecodeViewProvider';
import TelemetryDecodeFormController from './components/TelemetryDecodeFormController.vue';

import Vue from 'vue';

export const DECODE_TYPES = [
    ['Value', 'value-text'],

    ['Track Name', 'track-text'],

    ['Session Type', 'session-type-text'],
    ['Session Length', 'session-length-text'],
    ['Formula', 'formula-text'],

    ['Driver Name', 'driver-text'],

    ['Team', 'team-text'],

    ['Nationality', 'nationality-text'],

    ['Weather', 'weather-text'],
    ['Track Temp Change', 'track-temp-change-text'],
    ['Air Temp Change', 'air-temp-change-text'],
    ['Forecast Accuracy', 'forecast-accuracy-text'],

    ['Penalty', 'penalty-text'],
    ['Infringement', 'infringement-text'],

    ['Marshal Zone Flag', 'marshalzoneflag-text'],
    ['Safety Car Status', 'safetycar-status-text'],
    ['Event', 'event-text'],

    ['Pit Status', 'pit-status-text'],
    ['Sector', 'sector-text'],
    ['Current Lap Invalid', 'current-lap-invalid-text'],
    ['Driver Status', 'driver-status-text'],
    ['Result Status', 'result-status-text'],
    ['Pitlane Timer', 'pitlane-timer-text'],
    ['Pit Should Serve', 'pit-should-serve-text'],
    ['AI', 'ai-text'],
    ['UDP Setting', 'udp-setting-text'],
    ['DRS', 'drs-text'],
    ['MDF Panel', 'mdf-panel-text'],
    ['Traction Control', 'traction-control-text'],
    ['Anti-Lock Brakes', 'anti-lock-brakes-text'],
    ['Fuel Mix', 'fuel-mix-text'],
    ['Pit Limiter', 'pit-limiter-text'],
    ['DRS Allowed', 'drs-allowed-text'],
    ['Tyres Actual', 'tyres-actual-text'],
    ['Tyres Visual', 'tyres-visual-text'],
    ['FIA Flag', 'fia-flag-text'],
    ['ERS Deploy Mode', 'ers-deploy-mode-text'],
    ['Ready Status', 'ready-status-text'],
    ['DRS Fault', 'drs-fault-text'],
    ['ERS Fault', 'ers-fault-text'],
    ['Engine Fault', 'engine-fault-text'],
    ['Engine Seized', 'engine-seized-text'],
    ['Lap Valid', 'lap-valid-text'],

    ['Game Mode', 'game-mode-text'],
    ['Network Game', 'network-game-text'],
    ['Steer Assist', 'steer-assist-text'],
    ['Brake Assist', 'brake-assist-text'],
    ['Gearbox Assist', 'gearbox-assist-text'],
    ['Pit Assist', 'pit-assist-text'],
    ['Pit Release Assist', 'pit-release-assist-text'],
    ['ERS Assist', 'ers-assist-text'],
    ['DRS Assist', 'drs-assist-text'],
    ['Dynamic Racing Line', 'drl-text'],
    ['Dynamic Racing Line Type', 'drl-type-text'],

    ['Surface Type', 'surface-type-text'],
    ['Rule Set', 'ruleset-text'],

    ['Game Paused', 'game-paused-text'],
    ['Spectating', 'spectating-text'],
    
    ['SLI Pro', 'slipro-text'],
    
    ['Button', 'button-text']
];


export default function () {
    return function install(openmct) {
        openmct.objectViews.addProvider(new TelemetryDecodeViewProvider(openmct));

        openmct.forms.addNewFormControl('telemetryDecode-controller', getTelemetryDecodeFormController(openmct));
        
        openmct.types.addType('telemetryDecode', {
            name: "Telemetry Decode",
            creatable: true,
            description: "Convert F1 2022 game telemetry codes to text.",
            cssClass: 'icon-spectra',
            initialize(domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    telemetryDecodeController: {
                        telemetryDecodeType: DECODE_TYPES[0][1],
                        precision: 2,
                        minRefreshRate: 5000,
                        parent: openmct
                    }
                };
            },
            form: [
                {
                    name: "Telemetry Decode type",
                    options: DECODE_TYPES.map(type => {
                        return {
                            name: type[0],
                            value: type[1]
                        };
                    }),
                    control: "select",
                    cssClass: "l-input-sm",
                    key: "telemetryDecodeController",
                    property: [
                        "configuration",
                        "telemetryDecodeController",
                        "telemetryDecodeType"
                    ]
                },
                // Could add precision here later
                {
                    name: "Minimum Refresh Rate (ms)",
                    control: "numberfield",
                    cssClass: "l-input-sm",
                    key: "minRefreshRate",
                    property: [
                        "configuration",
                        "telemetryDecodeController",
                        "minRefreshRate"
                    ]
                }
            ]
        });
    };

    function getTelemetryDecodeFormController(openmct) {
        return {
            show(element, model, onChange) {
                const rowComponent = new Vue({
                    el: element,
                    components: {
                        TelemetryDecodeFormController
                    },
                    provide: {
                        openmct
                    },
                    data() {
                        return {
                            model,
                            onChange
                        };
                    },
                    template: `<TelemetryDecodeFormController :model="model" @onChange="onChange"></TelemetryDecodeFormController>`
                });

                return rowComponent;
            }
        };
    }
}
