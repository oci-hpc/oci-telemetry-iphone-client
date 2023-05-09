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
<span class="form-control">
    <span
        class="field control"
        :class="model.cssClass"
    >
        
    </span>
</span>
</template>

<script>
import ToggleSwitch from '@/ui/components/ToggleSwitch.vue';

export default {
    components: {
        ToggleSwitch
    },
    props: {
        model: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        };
    },
    methods: {
        onChange(event) {
            const data = {
                model: this.model,
                value: {
                    revLightsType: this.model.value.revLightsType,
                    precision: this.model.value.precision
                }
            };

            if (event) {
                const target = event.target;
                const targetIndicator = target.parentElement.querySelector('.req-indicator');
                if (targetIndicator.classList.contains('req')) {
                    targetIndicator.classList.add('visited');
                }

                this.model.validate(data, (valid) => {
                    Object.entries(valid).forEach(([key, isValid]) => {
                        const element = this.$refs[key];
                        const reqIndicatorElement = element.parentElement.querySelector('.req-indicator');
                        reqIndicatorElement.classList.toggle('invalid', !isValid);

                        if (reqIndicatorElement.classList.contains('req') && (!isValid || reqIndicatorElement.classList.contains('visited'))) {
                            reqIndicatorElement.classList.toggle('valid', isValid);
                        }
                    });
                });
            }

            this.$emit('onChange', data);
        },
        toggleUseTelemetryLimits() {

            this.onChange();
        }
    }
};
</script>
