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

let circleMapDomainObject = {
    identifier: {
        key: 'circleMap',
        namespace: 'test-namespace'
    },
    type: 'circleMap',
    composition: []
};

describe('Circle Map plugin', () => {
    let openmct;
    let child;
    let circleMapHolder;

    beforeEach((done) => {
        circleMapHolder = document.createElement('div');
        circleMapHolder.style.display = 'block';
        circleMapHolder.style.width = '1920px';
        circleMapHolder.style.height = '1080px';

        child = document.createElement('div');
        circleMapHolder.appendChild(child);

        openmct = createOpenMct();
        openmct.on('start', done);

        openmct.install(openmct.plugins.CircleMap());

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('Plugin installed by default', () => {
        const CircleMapType = openmct.types.get('circleMap');

        expect(CircleMapType).not.toBeNull();
        expect(CircleMapType.definition.name).toEqual('CircleMap');
    });

    it('CircleMap plugin is creatable', () => {
        const CircleMapType = openmct.types.get('circleMap');

        expect(CircleMapType.definition.creatable).toBeTrue();
    });

    it('CircleMap plugin is creatable', () => {
        const CircleMapType = openmct.types.get('circleMap');

        expect(CircleMapType.definition.creatable).toBeTrue();
    });

    it('CircleMap form controller', () => {
        const CircleMapController = openmct.forms.getFormControl('circleMap-controller');
        expect(circleMapController).toBeDefined();
    });

    describe('CircleMap with Value Text', () => {
        let circleMapViewProvider;
        let circleMapView;
        let circleMapViewObject;
        let mutablecircleMapObject;
        let randomValue;

        beforeEach(() => {
            randomValue = Math.random();

            circleMapViewObject = {
                ...circleMapDomainObject,
                configuration: {
                    circleMapController: {
                        circleMapType: 'value-text',
                        precision: 2,
                        minRefreshRate: 300,
                        semiFastRefreshRate: 300
                    }
                },
                composition: [
                    {
                        namespace: 'test-namespace',
                        key: 'test-object'
                    }
                ],
                id: 'test-object',
                name: 'circleMap'
            };

            const testObjectProvider = jasmine.createSpyObj('testObjectProvider', [
                'get',
                'create',
                'update',
                'observe'
            ]);

            openmct.editor = {};
            openmct.editor.isEditing = () => false;

            const applicableViews = openmct.objectViews.get(circleMapViewObject, [circleMapViewObject]);
            circleMapViewProvider = applicableViews.find(viewProvider => viewProvider.key === 'circleMap');

            testObjectProvider.get.and.returnValue(Promise.resolve(circleMapViewObject));
            testObjectProvider.create.and.returnValue(Promise.resolve(circleMapViewObject));
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

            return openmct.objects.getMutable(circleMapViewObject.identifier).then((mutableObject) => {
                mutablecircleMapObject = mutableObject;
                circleMapView = circleMapViewProvider.view(mutablecircleMapObject);
                circleMapView.show(child);

                return Vue.nextTick();
            });
        });

        afterEach(() => {
            circleMapView.destroy();

            return resetApplicationState(openmct);
        });

        it('provides circleMap view', () => {
            expect(circleMapViewProvider).toBeDefined();
        });

        it('renders circleMap element', () => {
            const circleMapElement = circleMapHolder.querySelectorAll('.js-circleMap-wrapper');
            expect(circleMapElement.length).toBe(1);
        });

        it('renders major elements', () => {
            const wrapperElement = circleMapHolder.querySelector('.js-circleMap-wrapper');

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
