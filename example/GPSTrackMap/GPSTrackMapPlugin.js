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

import GPSTrackMapViewProvider from './GPSTrackMapViewProvider';
import GPSTrackMapFormController from './components/GPSTrackMapFormController.vue';

import Vue from 'vue';

export const DECODE_TYPES = [
    ["Melbourne", "melbourne"],
    ["Paul Ricard", "paul-ricard"],
    ["Shanghai","shanghai"],
    ["Sakhir (Bahrain)", "sakhir"],
    ["Catalunya", "catalunya"],
    ["Monaco", "monaco"],
    ["Montreal", "montreal"],
    ["Silverstone", "silverstone"],
    //["Hockenheim", "hockenheim"],
    ["Hungaroring", "hungaroring"],
    ["Spa", "spa"],
    ["Monza", "monza"],
    ["Singapore", "singapore"],
    ["Suzuka", "suzuka"],
    ["Abu Dhabi", "abudhabi"],
    ["Texas", "texas"],
    ["Brazil", "brazil"],
    ["Austria", "austria"],
    ["Sochi", "sochi"],
    ["Mexico", "mexico"],
    ["Baku (Azerbaijan)", "baku"],
    //["Sakhir Short", "sakhirshort"],
    //["Silverstone Short", "silverstoneshort"],
    //["Texas Short", "texasshort"],
    //["Suzuka Short", "suzukashort"],
    ["Hanoi", "hanoi"],
    ["Zandvoort", "zandvoort"]
    //["Imola", "imola"],
    //["Portimão", "portimão"],
    //["Jeddah", "jeddah"],
    //["Miami", "miami"]
];

export default function () {
    return function install(openmct) {
        openmct.objectViews.addProvider(new GPSTrackMapViewProvider(openmct));

        openmct.forms.addNewFormControl('gpsTrackMap-controller', getGPSTrackMapFormController(openmct));
        openmct.types.addType('gpsTrackMap', {
            name: "GPS Track Map",
            creatable: true,
            description: "Convert F1 2022 game telemetry codes to text.",
            cssClass: 'icon-image-telemetry',
            initialize(domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    gpsTrackMapController: {
                        gpsTrackMapType: DECODE_TYPES[0][1],
                        precision: 2,
                        minRefreshRate: 5000
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
                    key: "gpsTrackMapController",
                    property: [
                        "configuration",
                        "gpsTrackMapController",
                        "gpsTrackMapType"
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
                        "gpsTrackMapController",
                        "minRefreshRate"
                    ]
                }
            ]
        });
    };

    function getGPSTrackMapFormController(openmct) {
        return {
            show(element, model, onChange) {
                const rowComponent = new Vue({
                    el: element,
                    components: {
                        GPSTrackMapFormController
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
                    template: `<GPSTrackMapFormController :model="model" @onChange="onChange"></GPSTrackMapFormController>`
                });

                return rowComponent;
            }
        };
    }
}
