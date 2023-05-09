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
    class="c-revLights__wrapper js-revLights-wrapper"
    :class="`c-revLights--${revLightsType}`"
    :title="revLightsTitle"
>
    
    <template v-if="typeCircle">
        <!--Rev Light-->
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="64" 
            height="64"
        >
        <path 
            d="M20.2 52.2C8.93 52.2 0 43.056 0 32c0-11.27 9.143-20.2 20.2-20.2h23.6C55.07 11.8 64 20.944 64 32c0 11.27-9.143 20.2-20.2 20.2zm23.176-7.23c7.23 0 13.183-5.953 13.183-13.183s-5.953-13.183-13.183-13.183H20.837c-7.23 0-13.183 5.953-13.183 13.183S13.608 44.97 20.837 44.97z" 
            fill="#000000"
            :fill="light0Color"
        />
        </svg>
        
        <svg 
            class="c-revLights"
            version="1.1" 
            id="Layer_1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            x="0px" y="0px"
	        viewBox="0 0 450 450" 
            style="enable-background:new 0 0 450 450;" 
            xml:space="preserve"
        >
        <path style="opacity:0.25;fill:none;stroke:#939598;stroke-width:17;stroke-miterlimit:1.0;" 
            :d="`${getPitRearArc}`"/>
        <path style="opacity:0.25;fill:none;stroke:#00BF5D;stroke-width:17;stroke-miterlimit:1.0;" 
            :d="`${getPitForwArc}`"/>
        <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:3;stroke-miterlimit:2.16;"
            :x1="circleCentreX" 
            :y1="`${getVertLineY1}`" 
            :x2="circleCentreX" 
            :y2="`${getVertLineY2}`"/>
        
        <text 
            dominant-baseline="middle" text-anchor="middle"
            :x="circleCentreX"
            :y="`${getTrackNameTextY}`" 
            style="fill:#FFFFFF;font-family:'Helvetica'; font-size:15px;">{{ trackName_value }}</text>
        <text 
            dominant-baseline="middle" text-anchor="middle"
            :x="circleCentreX"
            :y="`${getPitLossCentreTextY}`"
            style="fill:#FFFFFF;font-family:'Helvetica'; font-size:10px;">PitLoss: {{ pitloss_value }} sec</text>

        <!--<path vector-effect="non-scaling-stroke" style="fill:none;stroke:#EF4444;stroke-width:6;stroke-miterlimit:2.16;" 
            d="M157.7,323.928
	        c-2.596-10.225-3.976-20.934-3.976-31.967c0-71.519,57.978-129.496,129.496-129.496c32.475,0,62.158,11.954,84.888,31.702"/>
        <path vector-effect="non-scaling-stroke" style="fill:none;stroke:#3B82F6;stroke-width:6;stroke-miterlimit:2.16;" 
            d="M388.138,367.884
	        c-23.531,32.461-61.758,53.574-104.917,53.574c-60.487,0-111.288-41.47-125.521-97.53"/>
        <path vector-effect="non-scaling-stroke" style="fill:none;stroke:#FBBF24;stroke-width:6;stroke-miterlimit:2.16;" 
            d="M368.109,194.167
	        c27.329,23.742,44.608,58.751,44.608,97.795c0,28.361-9.117,54.592-24.58,75.923"/>
            -->
        <circle vector-effect="non-scaling-stroke" style="fill:none;stroke:#FFFFFF;stroke-width:5;stroke-miterlimit:2.16;"
        :cx="circleCentreX" 
        :cy="circleCentreY" 
        :r="circleRadius" />

        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getPDeg}deg)`"
        >
        <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="circleCentreX"
                :y="`${getPitLossTextY}`"
                style="fill:#FFFFFF;font-family:'Helvetica'; font-size:15px;">P</text>
        </g>
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getUDeg}deg)`"
        >
        <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="circleCentreX"
                :y="`${getPitLossTextY}`"
                style="fill:#FFFFFF;font-family:'Helvetica'; font-size:15px;">U</text>
        </g>
        
            
        <!--Car 0-->
        <template v-if="(car_0_driverID_value != 255 || car_0_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar0FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_0_team_colour]" 
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car0FlagXPos"
                :y="car0FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar0FlagXTextPosition}`"
                :y="`${getCar0FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_0_name_XXX }}</text>
        </g>
        </template>
        <!--Car 1-->
        <template v-if="(car_1_driverID_value != 255 || car_1_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar1FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_1_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car1FlagXPos"
                :y="car1FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar1FlagXTextPosition}`"
                :y="`${getCar1FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_1_name_XXX }}</text>
        </g>
        </template>
        <!--Car 2-->
        <template v-if="(car_2_driverID_value != 255 || car_2_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar2FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_2_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car2FlagXPos"
                :y="car2FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar2FlagXTextPosition}`"
                :y="`${getCar2FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_2_name_XXX }}</text>
        </g>
        </template>
        <!--Car 3-->
        <template v-if="(car_3_driverID_value != 255 || car_3_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar3FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_3_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car3FlagXPos"
                :y="car3FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar3FlagXTextPosition}`"
                :y="`${getCar3FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_3_name_XXX }}</text>
        </g>
        </template>
        <!--Car 4-->
        <template v-if="(car_4_driverID_value != 255 || car_4_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar4FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_4_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car4FlagXPos"
                :y="car4FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar4FlagXTextPosition}`"
                :y="`${getCar4FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_4_name_XXX }}</text>
        </g>
        </template>
        <!--Car 5-->
        <template v-if="(car_5_driverID_value != 255 || car_5_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar5FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_5_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car5FlagXPos"
                :y="car5FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar5FlagXTextPosition}`"
                :y="`${getCar5FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_5_name_XXX }}</text>
        </g>
       </template>
        <!--Car 6-->
        <template v-if="(car_6_driverID_value != 255 || car_6_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar6FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_6_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car6FlagXPos"
                :y="car6FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar6FlagXTextPosition}`"
                :y="`${getCar6FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_6_name_XXX }}</text>
        </g>
        </template>
        <!--Car 7-->
        <template v-if="(car_7_driverID_value != 255 || car_7_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar7FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_7_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car7FlagXPos"
                :y="car7FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar7FlagXTextPosition}`"
                :y="`${getCar7FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_7_name_XXX }}</text>
        </g>
        </template>
        <!--Car 8-->
        <template v-if="(car_8_driverID_value != 255 || car_8_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar8FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_8_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car8FlagXPos"
                :y="car8FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar8FlagXTextPosition}`"
                :y="`${getCar8FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_8_name_XXX }}</text>
        </g>
        </template>
        <!--Car 9-->
        <template v-if="(car_9_driverID_value != 255 || car_9_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar9FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_9_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car9FlagXPos"
                :y="car9FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar9FlagXTextPosition}`"
                :y="`${getCar9FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_9_name_XXX }}</text>
        </g>
        </template>
        <!--Car 10-->
        <template v-if="(car_10_driverID_value != 255 || car_10_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar10FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_10_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car10FlagXPos"
                :y="car10FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar10FlagXTextPosition}`"
                :y="`${getCar10FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_10_name_XXX }}</text>
        </g>
        </template>
        <!--Car 11-->
        <template v-if="(car_11_driverID_value != 255 || car_11_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar11FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_11_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car11FlagXPos"
                :y="car11FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar11FlagXTextPosition}`"
                :y="`${getCar11FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_11_name_XXX }}</text>
        </g>
        </template>
        <!--Car 12-->
        <template v-if="(car_12_driverID_value != 255 || car_12_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar12FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle  
                :style="[dotBaseStyle, car_12_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car12FlagXPos"
                :y="car12FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar12FlagXTextPosition}`"
                :y="`${getCar12FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_12_name_XXX }}</text>
        </g>
        </template>
        <!--Car 13-->
        <template v-if="(car_13_driverID_value != 255 || car_13_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar13FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_13_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car13FlagXPos"
                :y="car13FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar13FlagXTextPosition}`"
                :y="`${getCar13FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_13_name_XXX }}</text>
        </g>
        </template>
        <!--Car 14-->
        <template v-if="(car_14_driverID_value != 255 || car_14_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar14FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_14_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car14FlagXPos"
                :y="car14FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar14FlagXTextPosition}`"
                :y="`${getCar14FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_14_name_XXX }}</text>
        </g>
        </template>
        <!--Car 15-->
        <template v-if="(car_15_driverID_value != 255 || car_15_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar15FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_15_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car15FlagXPos"
                :y="car15FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar15FlagXTextPosition}`"
                :y="`${getCar15FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_15_name_XXX }}</text>
        </g>
        </template>
        <!--Car 16-->
        <template v-if="(car_16_driverID_value != 255 || car_16_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar16FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_16_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car16FlagXPos"
                :y="car16FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar16FlagXTextPosition}`"
                :y="`${getCar16FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_16_name_XXX }}</text>
        </g>
        </template>
        <!--Car 17-->
        <template v-if="(car_17_driverID_value != 255 || car_17_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar17FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_17_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car17FlagXPos"
                :y="car17FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar17FlagXTextPosition}`"
                :y="`${getCar17FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_17_name_XXX }}</text>
        </g>
        </template>
        <!--Car 18-->
        <template v-if="(car_18_driverID_value != 255 || car_18_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar18FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_18_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car18FlagXPos"
                :y="car18FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar18FlagXTextPosition}`"
                :y="`${getCar18FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_18_name_XXX }}</text>
        </g>
        </template>
        <!--Car 19-->
        <template v-if="(car_19_driverID_value != 255 || car_19_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar19FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_19_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car19FlagXPos"
                :y="car19FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar19FlagXTextPosition}`"
                :y="`${getCar19FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_19_name_XXX }}</text>
        </g>
        </template>
        <!--Car 20-->
        <template v-if="(car_20_driverID_value != 255 || car_20_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar20FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_20_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car20FlagXPos"
                :y="car20FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar20FlagXTextPosition}`"
                :y="`${getCar20FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_20_name_XXX }}</text>
        </g>
        </template>
        <!--Car 21-->
        <template v-if="(car_21_driverID_value != 255 || car_21_networkID_value != 255)">
        <g
            :transform-origin="`${getTransformOrigin}`"
            :style="`transform: rotate(${getCar21FlagDeg}deg)`"
        >
            <line vector-effect="non-scaling-stroke" style="fill:#FFFFFF;stroke:#D1D3D4;stroke-width:1.5;stroke-miterlimit:2;" 
                :x1="circleCentreX" 
                :y1="`${getVertLineY1}`" 
                :x2="circleCentreX" 
                :y2="`${getVertLineY2}`"/>
            <circle 
                :style="[dotBaseStyle, car_21_team_colour]"
                :cx="circleCentreX" 
                :cy="`${getVertLineY1}`" 
                :r="dotRadius"/>
        </g>
        <g
        >
            <rect vector-effect="non-scaling-stroke" 
                :x="car21FlagXPos"
                :y="car21FlagYPos"
                style="fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;" 
                :width="flagWidth" 
                :height="flagHeight"
            />
            <text 
                dominant-baseline="middle" text-anchor="middle"
                :x="`${getCar21FlagXTextPosition}`"
                :y="`${getCar21FlagYTextPosition}`"
                style="font-family:'Helvetica'; font-size:17px;">{{ car_21_name_XXX }}</text>
        </g>
        </template>
        </svg>
    </template>
    <template v-if="typeHorizLine">
        <svg 
            class="c-revLights"
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 451.079 20"
            style="enable-background:new 0 0 451.079 20;"
            xml:space="preserve"
        >
        <path d="M0,18.393H150.36"
            vector-effect="non-scaling-stroke"
            style="fill:none;stroke:#EF4444;stroke-miterlimit:2.16;stroke-width:6px"/>
        <path d="M150.36,18.393H300.719" 
            vector-effect="non-scaling-stroke"
            style="fill:#fff;stroke:#3B82F6;stroke-miterlimit:2.16;stroke-width:6px"/>
        <path d="M300.719,18.393h150.36"
            vector-effect="non-scaling-stroke"
            style="fill:#fff;stroke:#FBBF24;stroke-miterlimit:2.16;stroke-width:6px"/>
        <circle cx="103.333" cy="16.687" r="3"
            vector-effect="non-scaling-stroke" 
            style="fill:#39b54a;stroke:#bcbec0;stroke-miterlimit:2.16"/>
        </svg>
    </template>

</div>
</template>

<script>

import {CODES_TRACK} from '../codesTrack';
import { last } from 'lodash';
import {CODES_DRIVER} from '../codesDriver';
import {CODES_TEAM} from '../codesTeam';

import {MAP_GAP} from '../mapGAP';
import {PITLOSS} from '../mapGAP';

export const REQ_CHANNELS = [
    ['F1_T06_Car_Telemetry.taxonomy', 'rev_lights_percent']
]



const LIMIT_PADDING_IN_PERCENT = 10;
const DEFAULT_CURRENT_VALUE = '--';

export default {
    //This name must be one word
    name: 'RevLights',
    inject: ['openmct', 'domainObject', 'composition'],
    data() {
        let revLightsController = this.domainObject.configuration.revLightsController;

        return {
            curVal: DEFAULT_CURRENT_VALUE,
            digits: 3,
            minRefreshRate: revLightsController.minRefreshRate,
            semiFastRefreshRate: revLightsController.semiFastRefreshRate,
            slowRefreshTimeStamp: 0,
            fastRefreshTimeStamp: 0,
            precision: revLightsController.precision,
            revLightsType: revLightsController.revLightsType,
            showUnits: revLightsController.showUnits,
            activeTimeSystem: this.openmct.time.timeSystem(),
            units: '',
            
            moveByGap: true,
            
            circleCentreX: 225.0,
            circleCentreY: 225.0,
            circleRadius: 130.0,
            circlePitLossRadius: 152.0,
            pDegree: 0.0,
            uDegree: 0.0,
            
            trackLength_value: 0.0,
            trackID_value: "NaN",
            trackName_value: "Track Name",
            mapGap: {},
            pitloss: {},
            pitloss_value: 0.0,
            
            player1Index: 0,

            dotRadius: 7,
            dotBaseStyle: {
                stroke: '#BCBEC0',
                'stroke-miterlimit': '10'
            },

            light0Color: '#FFFFFF',
            // Flag

            flagRadius: 185.0,
            flagWidth: 40.0,
            flagHeight: 20.0,

            car0FlagDeg: 0,
            car1FlagDeg: 0,
            car2FlagDeg: 0,
            car3FlagDeg: 0,
            car4FlagDeg: 0,
            car5FlagDeg: 0,
            car6FlagDeg: 0,
            car7FlagDeg: 0,
            car8FlagDeg: 0,
            car9FlagDeg: 0,
            car10FlagDeg: 0,
            car11FlagDeg: 0,
            car12FlagDeg: 0,
            car13FlagDeg: 0,
            car14FlagDeg: 0,
            car15FlagDeg: 0,
            car16FlagDeg: 0,
            car17FlagDeg: 0,
            car18FlagDeg: 0,
            car19FlagDeg: 0,
            car20FlagDeg: 0,
            car21FlagDeg: 0,

            car0FlagXPos: 263.465,
            car1FlagXPos: 263.465,
            car2FlagXPos: 263.465,
            car3FlagXPos: 263.465,
            car4FlagXPos: 263.465,
            car5FlagXPos: 263.465,
            car6FlagXPos: 263.465,
            car7FlagXPos: 263.465,
            car8FlagXPos: 263.465,
            car9FlagXPos: 263.465,
            car10FlagXPos: 263.465,
            car11FlagXPos: 263.465,
            car12FlagXPos: 263.465,
            car13FlagXPos: 263.465,
            car14FlagXPos: 263.465,
            car15FlagXPos: 263.465,
            car16FlagXPos: 263.465,
            car17FlagXPos: 263.465,
            car18FlagXPos: 263.465,
            car19FlagXPos: 263.465,
            car20FlagXPos: 263.465,
            car21FlagXPos: 263.465,

            car0FlagYPos: 97.25,
            car1FlagYPos: 97.25,
            car2FlagYPos: 97.25,
            car3FlagYPos: 97.25,
            car4FlagYPos: 97.25,
            car5FlagYPos: 97.25,
            car6FlagYPos: 97.25,
            car7FlagYPos: 97.25,
            car8FlagYPos: 97.25,
            car9FlagYPos: 97.25,
            car10FlagYPos: 97.25,
            car11FlagYPos: 97.25,
            car12FlagYPos: 97.25,
            car13FlagYPos: 97.25,
            car14FlagYPos: 97.25,
            car15FlagYPos: 97.25,
            car16FlagYPos: 97.25,
            car17FlagYPos: 97.25,
            car18FlagYPos: 97.25,
            car19FlagYPos: 97.25,
            car20FlagYPos: 97.25,
            car21FlagYPos: 97.25,

            car_0_driverID_value: 255,
            car_1_driverID_value: 255,
            car_2_driverID_value: 255,
            car_3_driverID_value: 255,
            car_4_driverID_value: 255,
            car_5_driverID_value: 255,
            car_6_driverID_value: 255,
            car_7_driverID_value: 255,
            car_8_driverID_value: 255,
            car_9_driverID_value: 255,
            car_10_driverID_value: 255,
            car_11_driverID_value: 255,
            car_12_driverID_value: 255,
            car_13_driverID_value: 255,
            car_14_driverID_value: 255,
            car_15_driverID_value: 255,
            car_16_driverID_value: 255,
            car_17_driverID_value: 255,
            car_18_driverID_value: 255,
            car_19_driverID_value: 255,
            car_20_driverID_value: 255,
            car_21_driverID_value: 255,

            car_0_networkID_value: 255,
            car_1_networkID_value: 255,
            car_2_networkID_value: 255,
            car_3_networkID_value: 255,
            car_4_networkID_value: 255,
            car_5_networkID_value: 255,
            car_6_networkID_value: 255,
            car_7_networkID_value: 255,
            car_8_networkID_value: 255,
            car_9_networkID_value: 255,
            car_10_networkID_value: 255,
            car_11_networkID_value: 255,
            car_12_networkID_value: 255,
            car_13_networkID_value: 255,
            car_14_networkID_value: 255,
            car_15_networkID_value: 255,
            car_16_networkID_value: 255,
            car_17_networkID_value: 255,
            car_18_networkID_value: 255,
            car_19_networkID_value: 255,
            car_20_networkID_value: 255,
            car_21_networkID_value: 255,

            car_0_name_value: "NaN",
            car_1_name_value: "NaN",
            car_2_name_value: "NaN",
            car_3_name_value: "NaN",
            car_4_name_value: "NaN",
            car_5_name_value: "NaN",
            car_6_name_value: "NaN",
            car_7_name_value: "NaN",
            car_8_name_value: "NaN",
            car_9_name_value: "NaN",
            car_10_name_value: "NaN",
            car_11_name_value: "NaN",
            car_12_name_value: "NaN",
            car_13_name_value: "NaN",
            car_14_name_value: "NaN",
            car_15_name_value: "NaN",
            car_16_name_value: "NaN",
            car_17_name_value: "NaN",
            car_18_name_value: "NaN",
            car_19_name_value: "NaN",
            car_20_name_value: "NaN",
            car_21_name_value: "NaN",

            car_0_name_XXX: "NaN",
            car_1_name_XXX: "NaN",
            car_2_name_XXX: "NaN",
            car_3_name_XXX: "NaN",
            car_4_name_XXX: "NaN",
            car_5_name_XXX: "NaN",
            car_6_name_XXX: "NaN",
            car_7_name_XXX: "NaN",
            car_8_name_XXX: "NaN",
            car_9_name_XXX: "NaN",
            car_10_name_XXX: "NaN",
            car_11_name_XXX: "NaN",
            car_12_name_XXX: "NaN",
            car_13_name_XXX: "NaN",
            car_14_name_XXX: "NaN",
            car_15_name_XXX: "NaN",
            car_16_name_XXX: "NaN",
            car_17_name_XXX: "NaN",
            car_18_name_XXX: "NaN",
            car_19_name_XXX: "NaN",
            car_20_name_XXX: "NaN",
            car_21_name_XXX: "NaN",



            car_0_lapDistance_value: 0,
            car_1_lapDistance_value: 0,
            car_2_lapDistance_value: 0,
            car_3_lapDistance_value: 0,
            car_4_lapDistance_value: 0,
            car_5_lapDistance_value: 0,
            car_6_lapDistance_value: 0,
            car_7_lapDistance_value: 0,
            car_8_lapDistance_value: 0,
            car_9_lapDistance_value: 0,
            car_10_lapDistance_value: 0,
            car_11_lapDistance_value: 0,
            car_12_lapDistance_value: 0,
            car_13_lapDistance_value: 0,
            car_14_lapDistance_value: 0,
            car_15_lapDistance_value: 0,
            car_16_lapDistance_value: 0,
            car_17_lapDistance_value: 0,
            car_18_lapDistance_value: 0,
            car_19_lapDistance_value: 0,
            car_20_lapDistance_value: 0,
            car_21_lapDistance_value: 0,
            
   
            

    
            car_0_team_colour: {
                fill: "#000000"
            },
            car_1_team_colour: {
                fill: "#000000"
            },
            car_2_team_colour: {
                fill: "#000000"
            },
            car_3_team_colour: {
                fill: "#000000"
            },
            car_4_team_colour: {
                fill: "#000000"
            },
            car_5_team_colour: {
                fill: "#000000"
            },
            car_6_team_colour: {
                fill: "#000000"
            },
            car_7_team_colour: {
                fill: "#000000"
            },
            car_8_team_colour: {
                fill: "#000000"
            },
            car_9_team_colour: {
                fill: "#000000"
            },
            car_10_team_colour: {
                fill: "#000000"
            },
            car_11_team_colour: {
                fill: "#000000"
            },
            car_12_team_colour: {
                fill: "#000000"
            },
            car_13_team_colour: {
                fill: "#000000"
            },
            car_14_team_colour: {
                fill: "#000000"
            },
            car_15_team_colour: {
                fill: "#000000"
            },
            car_16_team_colour: {
                fill: "#000000"
            },
            car_17_team_colour: {
                fill: "#000000"
            },
            car_18_team_colour: {
                fill: "#000000"
            },
            car_19_team_colour: {
                fill: "#000000"
            },
            car_20_team_colour: {
                fill: "#000000"
            },
            car_21_team_colour: {
                fill: "#000000"
            }
            

            
        };
    },
    computed: {
        // Title of widget shown on bar above, shows error if value is out of bounds
        revLightsTitle() {
            return this.valueInBounds ? 'Rev Lights' : 'Value is currently out of range and cannot be graphically displayed';
        },
        // This grabs the correct template above.
        typeText() {
            return this.matchRevLightsType('text');
        },
        typeCircle() {
            return this.matchRevLightsType('circle');
        },
        typeHorizLine() {
            return this.matchRevLightsType('line');
        },
        getTransformOrigin(){
            return this.circleCentreX.toString() + " " + this.circleCentreY.toString();
        },
        getPitLossTextY(){
            return (this.circleCentreY - 150.0);
        },
        getVertLineY1(){
            return this.circleCentreY - this.circleRadius;
        },
        getVertLineY2(){
            return this.getVertLineY1 - 50.0;
        },
        getTrackNameTextY(){
            return this.circleCentreY - 10.0;
        },
        getPitLossCentreTextY(){
            return this.circleCentreY + 10.0;
        },
        //Pit Loss Rearward
        getPitRearArc(){
            var nominalLapTime = 0.0;
            //console.log(this.mapGap);
            if (Object.keys(this.mapGap).length > 0){
                nominalLapTime = this.mapGap[Object.keys(this.mapGap).length];
                //console.log(nominalLapTime/PITLOSS_13['pitloss'] );
                var degOfCirle = 180.0  + (360.0 * (this.pitloss / nominalLapTime));
                //console.log(degOfCirle);
                this.pDegree =  -1.0 * (360.0 * (this.pitloss / nominalLapTime)) + 6;
                this.pitloss_value = this.pitloss / 1000.0;
                //console.log(this.peeDegree, degOfCirle);
                var xStart = this.xPosFromDegRadius(degOfCirle, this.circlePitLossRadius);
                var yStart = this.yPosFromDegRadius(degOfCirle, this.circlePitLossRadius);
                
                //var arcString = "M " + xStart.toString() + " " + yStart.toString() + " A " + this.circlePitLossRadius.toString() + " " + this.circlePitLossRadius.toString() + " 0 0 0 " + this.circleCentre[0].toString() + " " + (this.circleCentre[1]-this.circlePitLossRadius).toString();
                var arcString = "M " + this.circleCentreX.toString() + " " + (this.circleCentreY-this.circlePitLossRadius).toString() + " A " + this.circlePitLossRadius.toString() + " " + this.circlePitLossRadius.toString() + " 0 0 0 " + xStart.toString() + " " + yStart.toString();
                
                //console.log(arcString);
                return arcString;
            }
            
            
            
            //this.flagXPositionFromDeg(degOfCirle)
            //:d="M 200 175 A 25 25 0 0 0 182.322 217.678"/>
            // x start, y start, A, radius, radius, 0, large arc flag, 0, end x, end y
            

            return "";
        },
        getPitForwArc(){
            var nominalLapTime = 0.0;
            if (Object.keys(this.mapGap).length > 0){
                nominalLapTime = this.mapGap[Object.keys(this.mapGap).length];
                //console.log(nominalLapTime/PITLOSS_13['pitloss'] );
                var degOfCirle = 180 - (360.0 * (this.pitloss / nominalLapTime));
                //console.log(degOfCirle);
                this.uDegree =   (360.0 * (this.pitloss / nominalLapTime)) - 6;
                //console.log(this.peeDegree, degOfCirle);
                var xStart = this.xPosFromDegRadius(degOfCirle, this.circlePitLossRadius);
                var yStart = this.yPosFromDegRadius(degOfCirle, this.circlePitLossRadius);
                
                var arcString = "M " + xStart.toString() + " " + yStart.toString() + " A " + this.circlePitLossRadius.toString() + " " + this.circlePitLossRadius.toString() + " 0 0 0 " + this.circleCentreX.toString() + " " + (this.circleCentreY-this.circlePitLossRadius).toString();
                //var arcString = "M " + this.circleCentre[0].toString() + " " + (this.circleCentre[1]-this.circlePitLossRadius).toString() + " A " + this.circlePitLossRadius.toString() + " " + this.circlePitLossRadius.toString() + " 0 0 0 " + xStart.toString() + " " + yStart.toString();
                
                //console.log(arcString);
                return arcString;
            }
            
            
            
            //this.flagXPositionFromDeg(degOfCirle)
            //:d="M 200 175 A 25 25 0 0 0 182.322 217.678"/>
            // x start, y start, A, radius, radius, 0, large arc flag, 0, end x, end y
            

            return "";
        },
        getPDeg(){
            return this.pDegree;
        },
        getUDeg(){
            return this.uDegree;
        },
        // Car 0
        getCar0FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(0);
        },
        getCar0FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(0);
        },
        // Car 1
        getCar1FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(1);
        },
        getCar1FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(1);
        },
        // Car 2
        getCar2FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(2);
        },
        getCar2FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(2);
        },
        // Car 3
        getCar3FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(3);
        },
        getCar3FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(3);
        },
        // Car 4
        getCar4FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(4);
        },
        getCar4FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(4);
        },
        // Car 5
        getCar5FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(5);
        },
        getCar5FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(5);
        },
        // Car 6
        getCar6FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(6);
        },
        getCar6FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(6);
        },
        // Car 7
        getCar7FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(7);
        },
        getCar7FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(7);
        },
        // Car 8
        getCar8FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(8);
        },
        getCar8FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(8);
        },
        // Car 9
        getCar9FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(9);
        },
        getCar9FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(9);
        },
        // Car 10
        getCar10FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(10);
        },
        getCar10FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(10);
        },
        // Car 11
        getCar11FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(11);
        },
        getCar11FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(11);
        },
        // Car 12
        getCar12FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(12);
        },
        getCar12FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(12);
        },
        // Car 13
        getCar13FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(13);
        },
        getCar13FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(13);
        },
        // Car 14
        getCar14FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(14);
        },
        getCar14FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(14);
        },
        // Car 15
        getCar15FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(15);
        },
        getCar15FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(15);
        },
        // Car 16
        getCar16FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(16);
        },
        getCar16FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(16);
        },
        // Car 17
        getCar17FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(17);
        },
        getCar17FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(17);
        },
        // Car 18
        getCar18FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(18);
        },
        getCar18FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(18);
        },
        // Car 19
        getCar19FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(19);
        },
        getCar19FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(19);
        },
        // Car 20
        getCar20FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(20);
        },
        getCar20FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(20);
        },
        // Car 21
        getCar21FlagXTextPosition(){
            return this.flagXTextPositionFromDeg(21);
        },
        getCar21FlagYTextPosition(){
            return this.flagYTextPositionFromDeg(21);
        },
        

        getCar0FlagDeg() {
            return this.car0FlagDeg;
        },
        getCar1FlagDeg() {
            return this.car1FlagDeg;
        },
        getCar2FlagDeg() {
            return this.car2FlagDeg;
        },
        getCar3FlagDeg() {
            return this.car3FlagDeg;
        },
        getCar4FlagDeg() {
            return this.car4FlagDeg;
        },
        getCar5FlagDeg() {
            return this.car5FlagDeg;
        },
        getCar6FlagDeg() {
            return this.car6FlagDeg;
        },
        getCar7FlagDeg() {
            return this.car7FlagDeg;
        },
        getCar8FlagDeg() {
            return this.car8FlagDeg;
        },
        getCar9FlagDeg() {
            return this.car9FlagDeg;
        },
        getCar10FlagDeg() {
            return this.car10FlagDeg;
        },
        getCar11FlagDeg() {
            return this.car11FlagDeg;
        },
        getCar12FlagDeg() {
            return this.car12FlagDeg;
        },
        getCar13FlagDeg() {
            return this.car13FlagDeg;
        },
        getCar14FlagDeg() {
            return this.car14FlagDeg;
        },
        getCar15FlagDeg() {
            return this.car15FlagDeg;
        },
        getCar16FlagDeg() {
            return this.car16FlagDeg;
        },
        getCar17FlagDeg() {
            return this.car17FlagDeg;
        },
        getCar18FlagDeg() {
            return this.car18FlagDeg;
        },
        getCar19FlagDeg() {
            return this.car19FlagDeg;
        },
        getCar20FlagDeg() {
            return this.car20FlagDeg;
        },
        getCar21FlagDeg() {
            return this.car21FlagDeg;
        },
        
        valueInBounds() {
            return (this.curVal >= this.rangeLow && this.curVal <= this.rangeHigh);
        },
        timeFormatter() {
            const timeSystem = this.activeTimeSystem;
            const metadataValue = this.metadata.value(timeSystem.key) || { format: timeSystem.key };

            return this.openmct.telemetry.getValueFormatter(metadataValue);
        }
    },
    watch: {
        curVal(newCurValue) {
            if (this.digits < newCurValue.toString().length) {
                this.digits = newCurValue.toString().length;
            }
        }
    },
    mounted() {
        this.composition.on('add', this.addedToComposition);
        this.composition.on('remove', this.removeTelemetryObject);

        this.composition.load();

        this.openmct.time.on('bounds', this.refreshData);
        this.openmct.time.on('timeSystem', this.setTimeSystem);

        this.addRequiredTelemetry();
    },
    destroyed() {
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
        addTelemetryObjectAndSubscribe(domainObject) {
            this.telemetryObject = domainObject;
            this.request();
            this.subscribe();
        },
        addedToComposition(domainObject) {
            //This allows only one channel at a time, don't need it
            //if (this.telemetryObject) {
            //    this.confirmRemoval(domainObject);
            //} else {
            //    this.addTelemetryObjectAndSubscribe(domainObject);
            //}

            // This just adds the channels
            this.addTelemetryObjectAndSubscribe(domainObject);
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
        matchRevLightsType(str) {
            return this.revLightsType.indexOf(str) !== -1;
        },
        removeFromComposition(telemetryObject = this.telemetryObject) {
            let composition = this.domainObject.composition.filter(id =>
                !this.openmct.objects.areIdsEqual(id, telemetryObject.identifier)
            );

            this.openmct.objects.mutate(this.domainObject, 'composition', composition);
        },
        updateSlowRefreshTimeStamp(bounds){
            //console.log("updateSlowRefreshTimeStamp",this.slowRefreshTimeStamp, bounds.end, this.minRefreshRate, bounds.end - this.minRefreshRate);
            //console.log(this.slowRefreshTimeStamp < bounds.end - this.minRefreshRate);
            if (this.slowRefreshTimeStamp < bounds.end - this.minRefreshRate){
                this.slowRefreshTimeStamp = bounds.end;
            }
        },
        updateSemiFastRefreshTimeStamp(bounds){
            //console.log("updateSemiFastRefreshTimeStamp",this.fastRefreshTimeStamp, bounds.end, this.semiFastRefreshRate, bounds.end - this.semiFastRefreshRate);
            //console.log(this.fastRefreshTimeStamp < bounds.end - this.semiFastRefreshRate);
            if (this.fastRefreshTimeStamp < bounds.end - this.semiFastRefreshRate){
                this.fastRefreshTimeStamp = bounds.end;
            }
        },
        refreshData(bounds, isTick) {
            //This is called on refresh rate (100Hz default)
            // when the clock is set to LOCAL, and not FIXED
            //console.log("Refresh Data", isTick);
            //console.log(bounds);
            this.requestSlowRefreshData(bounds);
            this.updateSlowRefreshTimeStamp(bounds);

            this.requestSemiFastRefreshData(bounds);
            this.updateSemiFastRefreshTimeStamp(bounds);
            
            if (!isTick) {
                this.request();
            }
        },
        removeTelemetryObject() {
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

        addChannel(value){
            var telNS = value[0];
            var telKey = value[1];
            
            this.openmct
                .objects
                .get({
                    namespace: telNS,
                    key: telKey
                })
                .then(result => {
                    // adds channel object by key name
                    this[telKey] = result;
                    this.composition.add(result);
                });
        },
        // Grab required telemetry channels
        addRequiredTelemetry(revLightsType = this.revLightsType, domainObject = this.telemetryObject){
            //console.log("addCodeMatchedTelemetry");
            for (let i = 0; i < REQ_CHANNELS.length; i++) {
                //console.log(REQ_CHANNELS[i]);
                this.addChannel(REQ_CHANNELS[i]);
            }

        

        },

        requestSlowRefreshData(bounds) {
            if (this.slowRefreshTimeStamp < bounds.end - this.minRefreshRate){
                console.log("Slow Data Refresh", bounds.end);
                
                // Gets player car index, gap from this car
                var channelPlayerIndex = "playerCarIndex";
                this.openmct
                    .telemetry
                    .requestGroup(this[channelPlayerIndex], { strategy: 'latest', size: 1 })
                    .then(values => {
                        const length = values.length;
                        //console.log(length);
                        //console.log(values);
                        if(length > 0){
                            var valName = "player1Index";
                            this[valName]= values[length - 1].value;
                            //this.updateValue(values[length - 1]);
                        }
                    });

                // Gets Track length
                var channelName = "trackLength";
                this.openmct
                    .telemetry
                    .request(this[channelName], { strategy: 'latest', size: 1  })
                    .then(values => {
                        const length = values.length;
                        //console.log(length);
                        //console.log(values);
                        if(length > 0){
                            var valName = "trackLength_value";
                            this[valName]= values[length - 1].value;
                            //this.updateValue(values[length - 1]);
                        }
                    });
                
                // Gets Track ID
                var channelName = "trackID";
                this.openmct
                    .telemetry
                    .request(this[channelName], { strategy: 'latest', size: 1  })
                    .then(values => {
                        const length = values.length;
                        //console.log(length);
                        //console.log(values);
                        if(length > 0){
                            var valName = "trackID_value";
                            this[valName]= values[length - 1].value;
                            this['trackName_value'] = CODES_TRACK[this[valName]];
                            //console.log(this[valName], this[valName] in MAP_GAP);
                            if (this[valName] in MAP_GAP){
                                //console.log(MAP_GAP[this[valName]]);
                                this.mapGap = MAP_GAP[this[valName]];
                            }
                            if (this[valName] in PITLOSS){
                                this.pitloss = PITLOSS[this[valName]];
                            }
                            //this.updateValue(values[length - 1]);
                        }
                    });
                
            
                // Gets Driver ID and then Codes to 3-letter short name
                for (let i = 0; i < 22; i++){
                    var channelName = "car_" + i.toString() +"_driverID";
                    this.openmct
                        .telemetry
                        .request(this[channelName], { strategy: 'latest', size: 1  })
                        .then(values => {
                            const length = values.length;
                            //console.log(values);
                            //console.log(length);
                            if(length > 0){
                                //console.log(values[length - 1].value);
                                //Sets the driverID value
                                var idName = "car_" + i.toString() + "_driverID_value";
                                this[idName] = values[length - 1].value;
                                // If driverID not 255, set 3 letter coded driver name
                                if(this[idName] != 255){
                                    var valName = "car_" + i.toString() + "_name_XXX";
                                    this[valName]= CODES_DRIVER[this[idName]][1];
                                }
                            }
                        });
                }

                // Gets Network ID and then Codes to 3-letter short name taken from 3 letters of last name, if there
                for (let i = 0; i < 22; i++){
                    var channelName = "car_" + i.toString() +"_networkID";
                    this.openmct
                        .telemetry
                        .request(this[channelName], { strategy: 'latest', size: 1  })
                        .then(values => {
                            const length = values.length;
                            //console.log(values);
                            //console.log(length);
                            if(length > 0){
                                //console.log(values[length - 1].value);
                                var idName = "car_" + i.toString() + "_networkID_value";
                                this[idName] = values[length - 1].value;
                                // Update name if networkID is not 255, and name exists
                                if (this[idName] != 255){
                                    var valName = "car_" + i.toString() + "_name_value";
                                    if(this[valName].trim().length > 0){
                                        var xxxName = "car_" + i.toString() + "_name_XXX";
                                        // If first and last name
                                        if(this[valName].trim().split(" ").length > 1){
                                            var nameArray = this[valName].trim().split(" ");
                                            var lastName = nameArray[nameArray.length -1];
                                            if(lastName.length > 2){
                                                this[xxxName]= lastName.slice(0, 3).toUpperCase();
                                            }
                                            else{
                                                this[xxxName]= lastName.toUpperCase();
                                            }
                                        }
                                        else if (this[valName].trim().split(" ").length == 1){
                                            var lastName = this[valName].trim();
                                            if(lastName.length > 2){
                                                this[xxxName]= lastName.slice(0, 3).toUpperCase();
                                            }
                                            else{
                                                this[xxxName]= lastName.toUpperCase();
                                            }
                                        }
                                    }
                                }
                            }
                        });
                }
                // Gets TeamID and then Codes to team colour
                for (let i = 0; i < 22; i++){
                    var channelName = "car_" + i.toString() +"_teamID";
                    this.openmct
                        .telemetry
                        .request(this[channelName], { strategy: 'latest', size: 1  })
                        .then(values => {
                            const length = values.length;
                            //console.log(values);
                            //console.log(length);
                            if(length > 0){
                                var valName = "car_" + i.toString() + "_team_colour";
                                this[valName].fill= CODES_TEAM[values[length - 1].value][1];
                                //this.updateValue(values[length - 1]);
                            }
                        });
                }
            
                //console.log(formats);
            }

        },
        requestSemiFastRefreshData(bounds) {
            if (this.fastRefreshTimeStamp < bounds.end - this.semiFastRefreshRate){
                //console.log("Semi Fast Refresh");
                // Gets Gap and then recalulates 360 deg Circle position
                // Testing with distance around lap first
                for (let i = 0; i < 22; i++){
                    var channelName = "car_" + i.toString() +"_lapDistance";
                    this.openmct
                        .telemetry
                        .request(this[channelName], { strategy: 'latest', size: 1 })
                        .then(values => {
                            const length = values.length;
                            //console.log(values);
                            //console.log(length);
                            if(length > 0){
                                var valName = "car_" + i.toString() + "_lapDistance_value";
                                this[valName]= values[length - 1].value;
                                //console.log(this[valName]);
                                if(this.moveByGap){
                                    // First set the degree for the car
                                    this.setDegFromGap(i, values[length - 1].value);
                                    // Then we can set others based on it.
                                    //console.log(this.flagXPositionFromDeg(i), this.flagYPositionFromDeg(i));
                                    this["car" + i.toString() + "FlagXPos"] = this.flagXPositionFromDeg(i);
                                    this["car" + i.toString() + "FlagYPos"] = this.flagYPositionFromDeg(i);
                                }
                                else{
                                    this.setDegFromDistance(i, values[length - 1].value);
                                }
                                //this.updateValue(values[length - 1])
                            }
                        });
                }
            }
        },
        request(domainObject = this.telemetryObject) {
            //console.log("Tick False Refresh");
            


            //console.log(this.car_0_name);
            this.metadata = this.openmct.telemetry.getMetadata(domainObject);
            //console.log(domainObject);
            this.formats = this.openmct.telemetry.getFormatMap(this.metadata);
            //const LimitEvaluator = this.openmct.telemetry.getLimits(domainObject);
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

        //Rev Lights Calculate Color
        calcRevLightColor(lightNumber){
            var propName = "light" + lightNumber + 'Color';

            var colorCode = '#FFFFFF';

            if( this.curVal > 50.0){
                colorCode = '#FF0000';
            }
            this[propName] = colorCode;
            



            return colorCode;
        },


        // Car Flag Positioning
        flagXPositionFromDeg(car){
            var propName = "car" + car + 'FlagDeg';
            var radians = this[propName] * Math.PI / 180.0;
            var xCent = this.flagRadius * Math.sin(radians);
            var xPos = (xCent - this.flagWidth / 2.0) + this.circleCentreX;
            return xPos;
        },
        flagXTextPositionFromDeg(car){
            var xStart = this.flagXPositionFromDeg(car);
            return xStart + (this.flagWidth / 2.0);
        },
        flagYPositionFromDeg(car){
            var propName = "car" + car + 'FlagDeg';
            var radians = this[propName] * Math.PI / 180.0;
            var yCent = this.flagRadius * Math.cos(radians);
            var yPos = -1.0 * (yCent + this.flagHeight / 2.0) + this.circleCentreY;
            return yPos;
        },
        flagYTextPositionFromDeg(car){
            var yStart = this.flagYPositionFromDeg(car);
            return yStart + (this.flagHeight - 8);
        },

        // PitLoss X from deg
        xPosFromDegRadius(deg, radius){
            var radians = deg * Math.PI / 180.0;
            var xCent = radius * Math.sin(radians);
            var xPos = (xCent) + this.circleCentreX;
            return xPos;
        },
        yPosFromDegRadius(deg, radius){
            var radians = deg * Math.PI / 180.0;
            var yCent = radius * Math.cos(radians);
            var yPos = (yCent) + this.circleCentreY;
            return yPos;
        },
        



        setTimeSystem(timeSystem) {
            this.activeTimeSystem = timeSystem;
        },
        subscribe(domainObject = this.telemetryObject) {
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
        setDegFromDistance(car, distance){
            //console.log(car, distance);
            var deg = 0.0;
            if(this.trackLength_value > 0.0){
                deg = (distance / this.trackLength_value) * 360.0;
            }
            var propName = "car" + car.toString() + "FlagDeg";
            //console.log(propName);
            //console.log(deg);
            this[propName] = deg;
            
            return;
        },
        setDegFromGap(car, distance){
            //console.log(car, distance);
            var deg = 0.0;
            
            // Linear interpolate player 1 
            var p1MapIndexBefore = Math.floor((this["car_" + this.player1Index.toString() + "_lapDistance_value"])/10.0);
            var p1MapIndexAfter = p1MapIndexBefore + 1;
            var p1Percent = (this["car_" + this.player1Index.toString() + "_lapDistance_value"] - (p1MapIndexBefore * 10.0)) / 10.0;
            var p1Time = (p1Percent * (this.mapGap[p1MapIndexAfter] - this.mapGap[p1MapIndexBefore])) + this.mapGap[p1MapIndexBefore];
             // Linear interpolate car
            var carMapIndexBefore = Math.floor((this["car_" + car.toString() + "_lapDistance_value"])/10.0);
            var carMapIndexAfter = carMapIndexBefore + 1;
            var carPercent = (this["car_" + car.toString() + "_lapDistance_value"] - (carMapIndexBefore * 10.0)) / 10.0;
            var carTime = (carPercent * (this.mapGap[carMapIndexAfter] - this.mapGap[carMapIndexBefore])) + this.mapGap[carMapIndexBefore];
            // Get gap into percent of circle
            var gap = p1Time - carTime;
            var lapTime = this.mapGap[ Math.floor(this.trackLength_value/10.0)];
            var percent = gap / lapTime;
            // Convert to degrees
            deg = -1.0 * percent * 360.0;

            // Update the
            var propName = "car" + car.toString() + "FlagDeg";
            if (!isNaN(deg)){
                this[propName] = deg;
            }
            
            return;
        },
        updateValue(datum) {
            //console.log(datum);
            this.datum = datum;
            this.calcRevLightColor(0);

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

                this.curVal = this.round(this.formats[this.valueKey].format(this.datum), this.precision);
            });
        }
    }
};
</script>
