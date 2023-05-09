/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2022, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * 'License'); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';
import { debounce } from 'lodash';

import Vue from 'vue';

let gpsTrackMapDomainObject = {
    identifier: {
        key: 'gpsTrackMap',
        namespace: 'test-namespace'
    },
    type: 'gpsTrackMap',
    composition: []
};

describe('Telemetry Decode plugin', () => {
    let openmct;
    let child;
    let gpsTrackMapHolder;

    beforeEach((done) => {
        gpsTrackMapHolder = document.createElement('div');
        gpsTrackMapHolder.style.display = 'block';
        gpsTrackMapHolder.style.width = '1920px';
        gpsTrackMapHolder.style.height = '1080px';

        child = document.createElement('div');
        gpsTrackMapHolder.appendChild(child);

        openmct = createOpenMct();
        openmct.on('start', done);

        openmct.install(openmct.plugins.GPSTrackMap());

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('Plugin installed by default', () => {
        const GPSTrackMapType = openmct.types.get('gpsTrackMap');

        expect(GPSTrackMapType).not.toBeNull();
        expect(GPSTrackMapType.definition.name).toEqual('GPSTrackMap');
    });

    it('Telemetry Decode plugin is creatable', () => {
        const GPSTrackMapType = openmct.types.get('gpsTrackMap');

        expect(GPSTrackMapType.definition.creatable).toBeTrue();
    });

    it('Telemetry Decode plugin is creatable', () => {
        const GPSTrackMapType = openmct.types.get('gpsTrackMap');

        expect(GPSTrackMapType.definition.creatable).toBeTrue();
    });

    it('Telemetry Decode form controller', () => {
        const GPSTrackMapController = openmct.forms.getFormControl('gpsTrackMap-controller');
        expect(gpsTrackMapController).toBeDefined();
    });

    describe('Telemetry Decode with Value Text', () => {
        let gpsTrackMapViewProvider;
        let gpsTrackMapView;
        let gpsTrackMapViewObject;
        let mutablegpsTrackMapObject;
        let randomValue;

        beforeEach(() => {
            randomValue = Math.random();

            gpsTrackMapViewObject = {
                ...gpsTrackMapDomainObject,
                configuration: {
                    gpsTrackMapController: {
                        gpsTrackMapType: 'value-text',
                        precision: 2,
                        minRefreshRate: 300
                    }
                },
                composition: [
                    {
                        namespace: 'test-namespace',
                        key: 'test-object'
                    }
                ],
                id: 'test-object',
                name: 'gpsTrackMap'
            };

            const testObjectProvider = jasmine.createSpyObj('testObjectProvider', [
                'get',
                'create',
                'update',
                'observe'
            ]);

            openmct.editor = {};
            openmct.editor.isEditing = () => false;

            const applicableViews = openmct.objectViews.get(gpsTrackMapViewObject, [gpsTrackMapViewObject]);
            gpsTrackMapViewProvider = applicableViews.find(viewProvider => viewProvider.key === 'gpsTrackMap');

            testObjectProvider.get.and.returnValue(Promise.resolve(gpsTrackMapViewObject));
            testObjectProvider.create.and.returnValue(Promise.resolve(gpsTrackMapViewObject));
            openmct.objects.addProvider('test-namespace', testObjectProvider);
            testObjectProvider.observe.and.returnValue(() => {});
            testObjectProvider.create.and.returnValue(Promise.resolve(true));
            testObjectProvider.update.and.returnValue(Promise.resolve(true));

            spyOn(openmct.telemetry, 'getMetadata').and.returnValue({
                valuesForHints: () => {
                    return [
                        {
                            source: 'sin'
                        }
                    ];
                },
                value: () => 1
            });
            spyOn(openmct.telemetry, 'getValueFormatter').and.returnValue({
                parse: () => {
                    return 2000;
                }
            });
            spyOn(openmct.telemetry, 'getFormatMap').and.returnValue({
                sin: {
                    format: (datum) => {
                        return randomValue;
                    }
                }
            });
            spyOn(openmct.telemetry, 'getLimits').and.returnValue(
                {
                    limits: () => Promise.resolve({
                        CRITICAL: {
                            high: 0.99,
                            low: -0.99
                        }
                    })
                }
            );
            spyOn(openmct.telemetry, 'request').and.returnValue(Promise.resolve([randomValue]));
            spyOn(openmct.time, 'bounds').and.returnValue({
                start: 1000,
                end: 5000
            });

            return openmct.objects.getMutable(gpsTrackMapViewObject.identifier).then((mutableObject) => {
                mutablegpsTrackMapObject = mutableObject;
                gpsTrackMapView = gpsTrackMapViewProvider.view(mutablegpsTrackMapObject);
                gpsTrackMapView.show(child);

                return Vue.nextTick();
            });
        });

        afterEach(() => {
            gpsTrackMapView.destroy();

            return resetApplicationState(openmct);
        });

        it('provides gpsTrackMap view', () => {
            expect(gpsTrackMapViewProvider).toBeDefined();
        });

        it('renders gpsTrackMap element', () => {
            const gpsTrackMapElement = gpsTrackMapHolder.querySelectorAll('.js-gpsTrackMap-wrapper');
            expect(gpsTrackMapElement.length).toBe(1);
        });

        it('renders major elements', () => {
            const wrapperElement = gpsTrackMapHolder.querySelector('.js-gpsTrackMap-wrapper');

            const hasMajorElements = Boolean(wrapperElement && rangeElement && valueElement);

            expect(hasMajorElements).toBe(true);
        });

        it('renders correct current value', (done) => {
            function WatchUpdateValue() {
                done();
            }

            const debouncedWatchUpdate = debounce(WatchUpdateValue, 200);
            Vue.nextTick(debouncedWatchUpdate);
        });
    });
});
