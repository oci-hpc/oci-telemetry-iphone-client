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


define([
    'lodash',
    './utcTimeSystem/plugin',

    './lapDistanceTimeSystem/plugin',

    './remoteClock/plugin',
    './localTimeSystem/plugin',
    './ISOTimeFormat/plugin',
    './myItems/plugin',
    '../../example/generator/plugin',
    '../../example/eventGenerator/plugin',
    './autoflow/AutoflowTabularPlugin',
    './timeConductor/plugin',
    '../../example/imagery/plugin',
    '../../example/faultManagement/exampleFaultSource',
    './imagery/plugin',
    './summaryWidget/plugin',
    './URLIndicatorPlugin/URLIndicatorPlugin',
    './telemetryMean/plugin',
    './plot/plugin',
    './charts/bar/plugin',
    './charts/scatter/plugin',
    './telemetryTable/plugin',
    './staticRootPlugin/plugin',
    './notebook/plugin',
    './displayLayout/plugin',
    './formActions/plugin',
    './folderView/plugin',
    './flexibleLayout/plugin',
    './tabs/plugin',
    './LADTable/plugin',
    './filters/plugin',
    './objectMigration/plugin',
    './goToOriginalAction/plugin',
    './openInNewTabAction/plugin',
    './clearData/plugin',
    './webPage/plugin',
    './condition/plugin',
    './conditionWidget/plugin',
    './themes/espresso',
    './themes/snow',
    './themes/redbull',
    './URLTimeSettingsSynchronizer/plugin',
    './notificationIndicator/plugin',
    './newFolderAction/plugin',
    './persistence/couch/plugin',
    './defaultRootName/plugin',
    './plan/plugin',
    './viewDatumAction/plugin',
    './viewLargeAction/plugin',
    './interceptors/plugin',
    './performanceIndicator/plugin',
    './CouchDBSearchFolder/plugin',
    './timeline/plugin',
    './hyperlink/plugin',
    './clock/plugin',
    './DeviceClassifier/plugin',
    './timer/plugin',
    './userIndicator/plugin',
    '../../example/exampleUser/plugin',
    './localStorage/plugin',
    './operatorStatus/plugin',
    './gauge/GaugePlugin',
    './timelist/plugin',
    './faultManagement/FaultManagementPlugin',
    '../../example/HistoricalTelemetry/HistoricalTelemetry-plugin',
    '../../example/RealtimeTelemetry/RealtimeTelemetry-plugin',
    '../../example/exampleTags/plugin',
    '../../example/F1_T00_Motion/F1_T00_Motion-plugin',
    '../../example/F1_T01_Session/F1_T01_Session-plugin',
    '../../example/F1_T02_Lap_Data/F1_T02_Lap_Data-plugin',
    '../../example/F1_T03_Event/F1_T03_Event-plugin',
    '../../example/F1_T04_Participants/F1_T04_Participants-plugin',
    '../../example/F1_T05_Car_Setups/F1_T05_Car_Setups-plugin',
    '../../example/F1_T06_Car_Telemetry/F1_T06_Car_Telemetry-plugin',
    '../../example/F1_T07_Car_Status/F1_T07_Car_Status-plugin',
    '../../example/F1_T08_Final_Classification/F1_T08_Final_Classification-plugin',
    '../../example/F1_T09_Lobby_Info/F1_T09_Lobby_Info-plugin',
    '../../example/F1_T10_Car_Damage/F1_T10_Car_Damage-plugin',
    '../../example/F1_T11_Session_History/F1_T11_Session_History-plugin',

    '../../example/TelemetryDecode/TelemetryDecodePlugin',
    '../../example/GPSTrackMap/GPSTrackMapPlugin',
    '../../example/CircleMap/CircleMapPlugin',
    '../../example/RevLights/RevLightsPlugin',
    //'../../example/simpleVuePlugin/plugin',
], function (
    _,
    UTCTimeSystem,

    LapDistanceTimeSystem,

    RemoteClock,
    LocalTimeSystem,
    ISOTimeFormat,
    MyItems,
    GeneratorPlugin,
    EventGeneratorPlugin,
    AutoflowPlugin,
    TimeConductorPlugin,
    ExampleImagery,
    ExampleFaultSource,
    ImageryPlugin,
    SummaryWidget,
    URLIndicatorPlugin,
    TelemetryMean,
    PlotPlugin,
    BarChartPlugin,
    ScatterPlotPlugin,
    TelemetryTablePlugin,
    StaticRootPlugin,
    Notebook,
    DisplayLayoutPlugin,
    FormActions,
    FolderView,
    FlexibleLayout,
    Tabs,
    LADTable,
    Filters,
    ObjectMigration,
    GoToOriginalAction,
    OpenInNewTabAction,
    ClearData,
    WebPagePlugin,
    ConditionPlugin,
    ConditionWidgetPlugin,
    Espresso,
    Snow,
    RedBull,
    URLTimeSettingsSynchronizer,
    NotificationIndicator,
    NewFolderAction,
    CouchDBPlugin,
    DefaultRootName,
    PlanLayout,
    ViewDatumAction,
    ViewLargeAction,
    ObjectInterceptors,
    PerformanceIndicator,
    CouchDBSearchFolder,
    Timeline,
    Hyperlink,
    Clock,
    DeviceClassifier,
    Timer,
    UserIndicator,
    ExampleUser,
    LocalStorage,
    OperatorStatus,
    GaugePlugin,
    TimeList,
    FaultManagementPlugin,
    HistoricalTelemetryPlugin,
    RealtimeTelemetryPlugin,
    ExampleTags,
    F1_T00_MotionPlugin,
    F1_T01_SessionPlugin,
    F1_T02_Lap_DataPlugin,
    F1_T03_EventPlugin,
    F1_T04_ParticipantsPlugin,
    F1_T05_Car_SetupsPlugin,
    F1_T06_Car_TelemetryPlugin,
    F1_T07_Car_StatusPlugin,
    F1_T08_Final_ClassificationPlugin,
    F1_T09_Lobby_InfoPlugin,
    F1_T10_Car_DamagePlugin,
    F1_T11_Session_HistoryPlugin,
    TelemetryDecodePlugin,
    GPSTrackMapPlugin,
    CircleMapPlugin,
    RevLightsPlugin
    //SimpleVuePlugin
) {
    const plugins = {};

    plugins.example = {};
    plugins.example.ExampleUser = ExampleUser.default;
    plugins.example.ExampleImagery = ExampleImagery.default;
    plugins.example.ExampleFaultSource = ExampleFaultSource.default;
    plugins.example.EventGeneratorPlugin = EventGeneratorPlugin.default;
    plugins.example.ExampleTags = ExampleTags.default;
    plugins.example.Generator = () => GeneratorPlugin;

    plugins.UTCTimeSystem = UTCTimeSystem.default;

    plugins.LapDistanceTimeSystem = LapDistanceTimeSystem.default;

    plugins.LocalTimeSystem = LocalTimeSystem;
    plugins.RemoteClock = RemoteClock.default;

    plugins.MyItems = MyItems.default;

    plugins.StaticRootPlugin = StaticRootPlugin.default;

    /**
     * A tabular view showing the latest values of multiple telemetry points at
     * once. Formatted so that labels and values are aligned.
     *
     * @param {Object} [options] Optional settings to apply to the autoflow
     * tabular view. Currently supports one option, 'type'.
     * @param {string} [options.type] The key of an object type to apply this view
     * to exclusively.
     */
    plugins.AutoflowView = AutoflowPlugin;

    plugins.Conductor = TimeConductorPlugin.default;

    plugins.CouchDB = CouchDBPlugin.default;

    plugins.ImageryPlugin = ImageryPlugin;
    plugins.Plot = PlotPlugin.default;
    plugins.BarChart = BarChartPlugin.default;
    plugins.ScatterPlot = ScatterPlotPlugin.default;
    plugins.TelemetryTable = TelemetryTablePlugin;

    plugins.SummaryWidget = SummaryWidget;
    plugins.TelemetryMean = TelemetryMean;
    plugins.URLIndicator = URLIndicatorPlugin;
    plugins.Notebook = Notebook.NotebookPlugin;
    plugins.RestrictedNotebook = Notebook.RestrictedNotebookPlugin;
    plugins.DisplayLayout = DisplayLayoutPlugin.default;
    plugins.FaultManagement = FaultManagementPlugin.default;
    plugins.FormActions = FormActions;
    plugins.FolderView = FolderView;
    plugins.Tabs = Tabs;
    plugins.FlexibleLayout = FlexibleLayout;
    plugins.LADTable = LADTable.default;
    plugins.Filters = Filters;
    plugins.ObjectMigration = ObjectMigration.default;
    plugins.GoToOriginalAction = GoToOriginalAction.default;
    plugins.OpenInNewTabAction = OpenInNewTabAction.default;
    plugins.ClearData = ClearData;
    plugins.WebPage = WebPagePlugin.default;
    plugins.Espresso = Espresso.default;
    plugins.Snow = Snow.default;
    plugins.RedBull = RedBull.default;
    plugins.Condition = ConditionPlugin.default;
    plugins.ConditionWidget = ConditionWidgetPlugin.default;
    plugins.URLTimeSettingsSynchronizer = URLTimeSettingsSynchronizer.default;
    plugins.NotificationIndicator = NotificationIndicator.default;
    plugins.NewFolderAction = NewFolderAction.default;
    plugins.ISOTimeFormat = ISOTimeFormat.default;
    plugins.DefaultRootName = DefaultRootName.default;
    plugins.PlanLayout = PlanLayout.default;
    plugins.ViewDatumAction = ViewDatumAction.default;
    plugins.ViewLargeAction = ViewLargeAction.default;
    plugins.ObjectInterceptors = ObjectInterceptors.default;
    plugins.PerformanceIndicator = PerformanceIndicator.default;
    plugins.CouchDBSearchFolder = CouchDBSearchFolder.default;
    plugins.Timeline = Timeline.default;
    plugins.Hyperlink = Hyperlink.default;
    plugins.Clock = Clock.default;
    plugins.Timer = Timer.default;
    plugins.DeviceClassifier = DeviceClassifier.default;
    plugins.UserIndicator = UserIndicator.default;
    plugins.LocalStorage = LocalStorage.default;
    plugins.OperatorStatus = OperatorStatus.default;
    plugins.Gauge = GaugePlugin.default;
    plugins.Timelist = TimeList.default;
    
    plugins.HistoricalTelemetryPlugin = HistoricalTelemetryPlugin;
    plugins.RealtimeTelemetryPlugin = RealtimeTelemetryPlugin;
    plugins.F1_T00_MotionPlugin  = F1_T00_MotionPlugin;
    plugins.F1_T01_SessionPlugin = F1_T01_SessionPlugin;
    plugins.F1_T02_Lap_DataPlugin = F1_T02_Lap_DataPlugin;
    plugins.F1_T03_EventPlugin = F1_T03_EventPlugin;
    plugins.F1_T04_ParticipantsPlugin = F1_T04_ParticipantsPlugin;
    plugins.F1_T05_Car_SetupsPlugin = F1_T05_Car_SetupsPlugin;
    plugins.F1_T06_Car_TelemetryPlugin = F1_T06_Car_TelemetryPlugin;
    plugins.F1_T07_Car_StatusPlugin = F1_T07_Car_StatusPlugin;
    plugins.F1_T08_Final_ClassificationPlugin = F1_T08_Final_ClassificationPlugin;
    plugins.F1_T09_Lobby_InfoPlugin = F1_T09_Lobby_InfoPlugin;
    plugins.F1_T10_Car_DamagePlugin = F1_T10_Car_DamagePlugin;
    plugins.F1_T11_Session_HistoryPlugin = F1_T11_Session_HistoryPlugin;

    plugins.TelemetryDecode = TelemetryDecodePlugin.default;
    plugins.GPSTrackMap = GPSTrackMapPlugin.default;
    plugins.CircleMap = CircleMapPlugin.default;
    plugins.RevLights = RevLightsPlugin.default;
    

    //plugins.SimpleVuePlugin = SimpleVuePlugin;

    return plugins;
});
