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

import LapDistanceClock from './LapDistanceClock.js';
import LapDistanceTimeSystem from './LapDistanceTimeSystem';
import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';
import LapDistanceTimeFormat from './LapDistanceTimeFormat.js';

describe("The Lap Distance Time System", () => {
    const LAPDISTANCE_SYSTEM_AND_FORMAT_KEY = 'distanceAroundLap';
    const DURATION_FORMAT_KEY = 'durationAroundLap';
    let openmct;
    let lapDistanceTimeSystem;
    let mockTimeout;

    beforeEach(() => {
        openmct = createOpenMct();
        openmct.install(openmct.plugins.LapDistanceTimeSystem());
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe("plugin", function () {

        beforeEach(function () {
            mockTimeout = jasmine.createSpy("timeout");
            lapDistanceTimeSystem = new LapDistanceTimeSystem(mockTimeout);
        });

        it("is installed", () => {
            let timeSystems = openmct.time.getAllTimeSystems();
            let distance = timeSystems.find(ts => ts.key === LAPDISTANCE_SYSTEM_AND_FORMAT_KEY);

            expect(distance).not.toEqual(-1);
        });

        it("can be set to be the main time system", () => {
            openmct.time.timeSystem(LAPDISTANCE_SYSTEM_AND_FORMAT_KEY, {
                start: 0,
                end: 1
            });

            expect(openmct.time.timeSystem().key).toBe(LAPDISTANCE_SYSTEM_AND_FORMAT_KEY);
        });

        it("uses the distance around lap time format", () => {
            expect(lapDistanceTimeSystem.timeFormat).toBe(LAPDISTANCE_SYSTEM_AND_FORMAT_KEY);
        });

        // Need to find out what this means.
        it("is UTC based", () => {
            expect(lapDistanceTimeSystem.isUTCBased).toBe(true);
        });

        it("defines expected metadata", () => {
            expect(lapDistanceTimeSystem.key).toBe(LAPDISTANCE_SYSTEM_AND_FORMAT_KEY);
            expect(lapDistanceTimeSystem.name).toBeDefined();
            expect(lapDistanceTimeSystem.cssClass).toBeDefined();
            expect(lapDistanceTimeSystem.durationFormat).toBeDefined();
        });
    });

    describe("LapDistanceClock class", function () {
        let clock;
        const timeoutHandle = {};

        beforeEach(function () {
            mockTimeout = jasmine.createSpy("timeout");
            mockTimeout.and.returnValue(timeoutHandle);

            clock = new LapDistanceClock(0);
            clock.start();
        });

        it("calls listeners on tick with current time", function () {
            const mockListener = jasmine.createSpy("listener");
            clock.on('tick', mockListener);
            clock.tick();
            expect(mockListener).toHaveBeenCalledWith(jasmine.any(Number));
        });
    });

    describe("Distance Around Lap Time Format", () => {
        let distanceAroundLapTimeFormatter;

        beforeEach(() => {
            distanceAroundLapTimeFormatter = openmct.telemetry.getFormatter(LAPDISTANCE_SYSTEM_AND_FORMAT_KEY);
        });

        it("is installed by the plugin", () => {
            expect(distanceAroundLapTimeFormatter).toBeDefined();
        });

        it("formats from meters since distance around lap time format", () => {
            const TIME_IN_MS = 1638574560945;
            const TIME_AS_STRING = "2021-12-03 23:36:00.945Z";

            const formattedTime = distanceAroundLapTimeFormatter.format(TIME_IN_MS);
            expect(formattedTime).toEqual(TIME_AS_STRING);

        });

        // Don't know what terse means
        it("formats from meters since distance around lap terse formats", () => {
            const distanceAroundLapTimeFormatterInstance = new LapDistanceTimeSystem();

            const TIME_IN_MS = 1638574560945;
            const EXPECTED_FORMATS = {
                PRECISION_DEFAULT: "2021-12-03 23:36:00.945",
                PRECISION_SECONDS: "2021-12-03 23:36:00",
                PRECISION_MINUTES: "2021-12-03 23:36",
                PRECISION_DAYS: "2021-12-03"
            };

            Object.keys(EXPECTED_FORMATS).forEach((formatKey) => {
                const formattedTime = distanceAroundLapTimeFormatterInstance.format(TIME_IN_MS, distanceAroundLapTimeFormatterInstance.DATE_FORMATS[formatKey]);
                expect(formattedTime).toEqual(EXPECTED_FORMATS[formatKey]);
            });
        });

        // Need to figure out these parses
        it("parses from something time format to meters around lap.", () => {
            const TIME_IN_MS = 1638574560945;
            const TIME_AS_STRING = "2021-12-03 23:36:00.945Z";

            const parsedTime = distanceAroundLapTimeFormatter.parse(TIME_AS_STRING);
            expect(parsedTime).toEqual(TIME_IN_MS);
        });

        it("validates correctly formatted distance around lap.", () => {
            const TIME_AS_STRING = "2021-12-03 23:36:00.945Z";

            const isValid = distanceAroundLapTimeFormatter.validate(TIME_AS_STRING);
            expect(isValid).toBeTrue();
        });
    });

    describe("Duration Format", () => {
        let durationTimeFormatter;

        beforeEach(() => {
            durationTimeFormatter = openmct.telemetry.getFormatter(DURATION_FORMAT_KEY);
        });

        it("is installed by the plugin", () => {
            expect(durationTimeFormatter).toBeDefined();
        });

        it("formats from ms into Open MCT duration format", () => {
            const TIME_IN_MS = 2000;
            const TIME_AS_STRING = "00:00:02";

            const formattedTime = durationTimeFormatter.format(TIME_IN_MS);
            expect(formattedTime).toEqual(TIME_AS_STRING);

        });

        it("parses from Open MCT duration format to ms", () => {
            const TIME_IN_MS = 2000;
            const TIME_AS_STRING = "00:00:02";

            const parsedTime = durationTimeFormatter.parse(TIME_AS_STRING);
            expect(parsedTime).toEqual(TIME_IN_MS);
        });

        it("validates correctly formatted Open MCT duration strings.", () => {
            const TIME_AS_STRING = "00:00:02";

            const isValid = durationTimeFormatter.validate(TIME_AS_STRING);
            expect(isValid).toBeTrue();
        });
    });
});
