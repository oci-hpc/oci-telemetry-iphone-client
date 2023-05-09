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

import CircleMapViewProvider from './CircleMapViewProvider';
import CircleMapFormController from './components/CircleMapFormController.vue';

import Vue from 'vue';

export const MAP_TYPES = [
    ['Cirle', 'gap-circle'],
    ['Horizontal Line', 'gap-horizontal-line'],
    ['Vertical Line', 'gap-vertical-line']
];

export default function () {
    return function install(openmct) {
        openmct.objectViews.addProvider(new CircleMapViewProvider(openmct));

        openmct.forms.addNewFormControl('circleMap-controller', getCircleMapFormController(openmct));
        openmct.types.addType('circleMap', {
            name: "Circle Map",
            creatable: true,
            description: "Circl Gap Map for F1.",
            cssClass: 'icon-circle',
            initialize(domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    circleMapController: {
                        circleMapType: MAP_TYPES[0][1],
                        precision: 2,
                        minRefreshRate: 5000,
                        semiFastRefreshRate: 100
                    }
                };
            },
            form: [
                {
                    name: "Circle Map type",
                    options: MAP_TYPES.map(type => {
                        return {
                            name: type[0],
                            value: type[1]
                        };
                    }),
                    control: "select",
                    cssClass: "l-input-sm",
                    key: "circleMapController",
                    property: [
                        "configuration",
                        "circleMapController",
                        "circleMapType"
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
                        "circleMapController",
                        "minRefreshRate"
                    ]
                },
                {
                    name: "Semi Fast Refresh Rate (ms)",
                    control: "numberfield",
                    cssClass: "l-input-sm",
                    key: "semiFastRefreshRate",
                    property: [
                        "configuration",
                        "circleMapController",
                        "semiFastRefreshRate"
                    ]
                }
            ]
        });
    };

    function getCircleMapFormController(openmct) {
        return {
            show(element, model, onChange) {
                const rowComponent = new Vue({
                    el: element,
                    components: {
                        CircleMapFormController
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
                    template: `<CircleMapFormController :model="model" @onChange="onChange"></CircleMapFormController>`
                });

                return rowComponent;
            }
        };
    }
}
