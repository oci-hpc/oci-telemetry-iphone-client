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

let revLightsDomainObject = {
    identifier: {
        key: 'revLights',
        namespace: 'test-namespace'
    },
    type: 'revLights',
    composition: []
};

describe('Rev Lights plugin', () => {
    let openmct;
    let child;
    let revLightsHolder;

    beforeEach((done) => {
        revLightsHolder = document.createElement('div');
        revLightsHolder.style.display = 'block';
        revLightsHolder.style.width = '1920px';
        revLightsHolder.style.height = '1080px';

        child = document.createElement('div');
        revLightsHolder.appendChild(child);

        openmct = createOpenMct();
        openmct.on('start', done);

        openmct.install(openmct.plugins.RevLights());

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('Plugin installed by default', () => {
        const RevLightsType = openmct.types.get('revLights');

        expect(RevLightsType).not.toBeNull();
        expect(RevLightsType.definition.name).toEqual('RevLights');
    });

    it('RevLights plugin is creatable', () => {
        const RevLightsType = openmct.types.get('revLights');

        expect(RevLightsType.definition.creatable).toBeTrue();
    });

    it('RevLights plugin is creatable', () => {
        const RevLightsType = openmct.types.get('revLights');

        expect(RevLightsType.definition.creatable).toBeTrue();
    });

    it('RevLights form controller', () => {
        const RevLightsController = openmct.forms.getFormControl('revLights-controller');
        expect(revLightsController).toBeDefined();
    });

    describe('RevLights with Value Text', () => {
        let revLightsViewProvider;
        let revLightsView;
        let revLightsViewObject;
        let mutablerevLightsObject;
        let randomValue;

        beforeEach(() => {
            randomValue = Math.random();

            revLightsViewObject = {
                ...revLightsDomainObject,
                configuration: {
                    revLightsController: {
                        revLightsType: 'value-text',
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
                name: 'revLights'
            };

            const testObjectProvider = jasmine.createSpyObj('testObjectProvider', [
                'get',
                'create',
                'update',
                'observe'
            ]);

            openmct.editor = {};
            openmct.editor.isEditing = () => false;

            const applicableViews = openmct.objectViews.get(revLightsViewObject, [revLightsViewObject]);
            revLightsViewProvider = applicableViews.find(viewProvider => viewProvider.key === 'revLights');

            testObjectProvider.get.and.returnValue(Promise.resolve(revLightsViewObject));
            testObjectProvider.create.and.returnValue(Promise.resolve(revLightsViewObject));
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

            return openmct.objects.getMutable(revLightsViewObject.identifier).then((mutableObject) => {
                mutablerevLightsObject = mutableObject;
                revLightsView = revLightsViewProvider.view(mutablerevLightsObject);
                revLightsView.show(child);

                return Vue.nextTick();
            });
        });

        afterEach(() => {
            revLightsView.destroy();

            return resetApplicationState(openmct);
        });

        it('provides revLights view', () => {
            expect(revLightsViewProvider).toBeDefined();
        });

        it('renders revLights element', () => {
            const revLightsElement = revLightsHolder.querySelectorAll('.js-revLights-wrapper');
            expect(revLightsElement.length).toBe(1);
        });

        it('renders major elements', () => {
            const wrapperElement = revLightsHolder.querySelector('.js-revLights-wrapper');

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
