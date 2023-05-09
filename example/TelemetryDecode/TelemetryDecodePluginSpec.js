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

let telemetryDecodeDomainObject = {
    identifier: {
        key: 'telemetryDecode',
        namespace: 'test-namespace'
    },
    type: 'telemetryDecode',
    composition: []
};

describe('Telemetry Decode plugin', () => {
    let openmct;
    let child;
    let telemetryDecodeHolder;

    beforeEach((done) => {
        telemetryDecodeHolder = document.createElement('div');
        telemetryDecodeHolder.style.display = 'block';
        telemetryDecodeHolder.style.width = '1920px';
        telemetryDecodeHolder.style.height = '1080px';

        child = document.createElement('div');
        telemetryDecodeHolder.appendChild(child);

        openmct = createOpenMct();
        openmct.on('start', done);

        openmct.install(openmct.plugins.TelemetryDecode());

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('Plugin installed by default', () => {
        const TelemetryDecodeType = openmct.types.get('telemetryDecode');

        expect(TelemetryDecodeType).not.toBeNull();
        expect(TelemetryDecodeType.definition.name).toEqual('TelemetryDecode');
    });

    it('Telemetry Decode plugin is creatable', () => {
        const TelemetryDecodeType = openmct.types.get('telemetryDecode');

        expect(TelemetryDecodeType.definition.creatable).toBeTrue();
    });

    it('Telemetry Decode plugin is creatable', () => {
        const TelemetryDecodeType = openmct.types.get('telemetryDecode');

        expect(TelemetryDecodeType.definition.creatable).toBeTrue();
    });

    it('Telemetry Decode form controller', () => {
        const TelemetryDecodeController = openmct.forms.getFormControl('telemetryDecode-controller');
        expect(telemetryDecodeController).toBeDefined();
    });

    describe('Telemetry Decode with Value Text', () => {
        let telemetryDecodeViewProvider;
        let telemetryDecodeView;
        let telemetryDecodeViewObject;
        let mutabletelemetryDecodeObject;
        let randomValue;

        beforeEach(() => {
            randomValue = Math.random();

            telemetryDecodeViewObject = {
                ...telemetryDecodeDomainObject,
                configuration: {
                    telemetryDecodeController: {
                        telemetryDecodeType: 'value-text',
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
                name: 'telemetryDecode'
            };

            const testObjectProvider = jasmine.createSpyObj('testObjectProvider', [
                'get',
                'create',
                'update',
                'observe'
            ]);

            openmct.editor = {};
            openmct.editor.isEditing = () => false;

            const applicableViews = openmct.objectViews.get(telemetryDecodeViewObject, [telemetryDecodeViewObject]);
            telemetryDecodeViewProvider = applicableViews.find(viewProvider => viewProvider.key === 'telemetryDecode');

            testObjectProvider.get.and.returnValue(Promise.resolve(telemetryDecodeViewObject));
            testObjectProvider.create.and.returnValue(Promise.resolve(telemetryDecodeViewObject));
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

            return openmct.objects.getMutable(telemetryDecodeViewObject.identifier).then((mutableObject) => {
                mutabletelemetryDecodeObject = mutableObject;
                telemetryDecodeView = telemetryDecodeViewProvider.view(mutabletelemetryDecodeObject);
                telemetryDecodeView.show(child);

                return Vue.nextTick();
            });
        });

        afterEach(() => {
            telemetryDecodeView.destroy();

            return resetApplicationState(openmct);
        });

        it('provides telemetryDecode view', () => {
            expect(telemetryDecodeViewProvider).toBeDefined();
        });

        it('renders telemetryDecode element', () => {
            const telemetryDecodeElement = telemetryDecodeHolder.querySelectorAll('.js-telemetryDecode-wrapper');
            expect(telemetryDecodeElement.length).toBe(1);
        });

        it('renders major elements', () => {
            const wrapperElement = telemetryDecodeHolder.querySelector('.js-telemetryDecode-wrapper');

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
