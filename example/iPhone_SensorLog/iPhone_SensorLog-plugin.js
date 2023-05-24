var iPhone_SensorLogCreateDict = require('./iPhone_SensorLogCreateDict');

define([
    //"./iPhone_SensorLogLimitProvider_Test",
], function (
    //iPhone_SensorLogLimitProvider
) {

    function iPhone_SensorLogPlugin() {

        // This creates a local dictionary so we don't have to fetch it from the server repeatedly.
        // Important as we have lots of channels. It loops a lot of times.
        const localDictionary = new iPhone_SensorLogCreateDict;
        const localDictResponse = new Response(JSON.stringify(localDictionary));
        const localDictResponseJSON = localDictResponse.json();


        function getiPhone_SensorLogDictionary() {
            // This grabs the local dictionary instead
            //response = new Response(JSON.stringify(localDictionary));
            //return response.json();
            return localDictResponseJSON;

            //This requires a fetch across the internet for every channel. Gets very slow for 500+ channels!
            //return fetch('/example/iPhone_SensorLog/iPhone_SensorLogdictionary.json').then(function (response) {
            //    return response.json();
            //});

        }

        // An object provider builds Domain Objects
        var iPhone_SensorLog_objectProvider = {
            get: function (identifier) {
                return getiPhone_SensorLogDictionary().then(function (dictionary) {
                    //console.log("iPhone_SensorLog-dictionary-plugin.js: identifier.key = " + identifier.key);
                    if (identifier.key === 'iPhone_SensorLog') {
                        return {
                            identifier: identifier,
                            name: dictionary.name,
                            type: 'folder',
                            location: 'ROOT'
                        };
                    } else {
                        var measurement = dictionary.measurements.filter(function (m) {
                            return m.key === identifier.key;
                        })[0];

                        return {
                            identifier: identifier,
                            name: measurement.name,
                            type: 'iPhone_SensorLog.telemetry',
                            telemetry: {
                                values: measurement.values
                            },
                            location: 'iPhone_SensorLog.taxonomy:iPhone_SensorLog'
                        };
                    }
                });
            }
        };

        // The composition of a domain object is the list of objects it contains, as shown (for example) in the tree for browsing.
        // Can be used to populate a hierarchy under a custom root-level object based on the contents of a telemetry dictionary.
        // "appliesTo"  returns a boolean value indicating whether this composition provider applies to the given object
        // "load" returns an array of Identifier objects (like the channels this telemetry stream offers)
        var iPhone_SensorLog_compositionProvider = {
            appliesTo: function (domainObject) {
                return domainObject.identifier.namespace === 'iPhone_SensorLog.taxonomy'
                    && domainObject.type === 'folder';
            },
            load: function (domainObject) {
                return getiPhone_SensorLogDictionary()
                    .then(function (dictionary) {
                        return dictionary.measurements.map(function (m) {
                            return {
                                namespace: 'iPhone_SensorLog.taxonomy',
                                key: m.key
                            };
                        });
                    });
            }
        };

        return function install(openmct) {
            // The addRoot function takes an "object identifier" as an argument
            openmct.objects.addRoot({
                namespace: 'iPhone_SensorLog.taxonomy',
                key: 'iPhone_SensorLog'
            });

            openmct.objects.addProvider('iPhone_SensorLog.taxonomy', iPhone_SensorLog_objectProvider);

            openmct.composition.addProvider(iPhone_SensorLog_compositionProvider);

            //openmct.telemetry.addProvider(new iPhone_SensorLogLimitProvider());

            openmct.types.addType('iPhone_SensorLog.telemetry', {
                name: 'iPhone_SensorLog Telemetry Point',
                description: 'Telemetry of iPhone_SensorLog',
                cssClass: 'icon-telemetry'
            });
        };
    }

    return iPhone_SensorLogPlugin;
});
