/**
 * Basic historical telemetry plugin.
 */

define([

], function (

) {

    function HistoricalTelemetryPlugin(desired_domain_object_type, serverURL, IP) {
    //function HistoricalTelemetryPlugin() {

        return function install(openmct) {
            //var desired_domain_object_type = 'TFLEX.telemetry';

            // Run Locally, port not used for cloud
            var port = 16969;
            
            var provider = {
                supportsRequest: function (domainObject) {
                    return domainObject.type === desired_domain_object_type;
                },
                request: function (domainObject, options) {
                    var url = "";

                    if(IP == "0.0.0.0" || IP == "127.0.0.1" || IP == "localhost"){
                        // Use this url for running locally
                        var url = 'http://' + IP + ':' + port + serverURL
                            + domainObject.identifier.key
                            + '?start=' + options.start
                            + '&end=' + options.end;
                        //console.log('HistoricalTelemetry-plugin.js: send request = ' + url);
                    }
                    else{
                        // Use this URL for running on the cloud
                        var url = 'https://' + IP + '/telemetry' + serverURL
                            + domainObject.identifier.key
                            + '?start=' + options.start
                            + '&end=' + options.end;
                        //console.log('HistoricalTelemetry-plugin.js: send request = ' + url);
                    }
                
                    // Send the fetch
                    return fetch(url).then(function (resp) {
                        //console.log(resp);

                        return resp.json();
                    });
                    // return http.get(url)
                    //     .then(function (resp) {
                    //         return resp.data;
                    //     });
                }
            };

            openmct.telemetry.addProvider(provider);
        };
    }

    return HistoricalTelemetryPlugin;
});
