var F1_T04_ParticipantsCreateDict = require('./F1_T04_ParticipantsCreateDict');

define([
    //"./F1_T04_ParticipantsLimitProvider_Test",
], function (
    //F1_T04_ParticipantsLimitProvider
) {

    function F1_T04_ParticipantsPlugin() {


        // This creates a local dictionary so we don't have to fetch it from the server repeatedly.
        // Important as we have lots of channels. It loops a lot of times.
        const localDictionary = new F1_T04_ParticipantsCreateDict;
        const localDictResponse = new Response(JSON.stringify(localDictionary));
        const localDictResponseJSON = localDictResponse.json();


        function getF1_T04_ParticipantsDictionary() {
            // This grabs the local dictionary instead
            //response = new Response(JSON.stringify(localDictionary));
            //return response.json();
            return localDictResponseJSON;

            //This requires a fetch across the internet for every channel. Gets very slow for 500+ channels!
            //return fetch('/example/F1_T04_Participants/F1_T04_Participantsdictionary.json').then(function (response) {
            //    return response.json();
            //});

        }

        // An object provider builds Domain Objects
        var F1_T04_Participants_objectProvider = {
            get: function (identifier) {
                return getF1_T04_ParticipantsDictionary().then(function (dictionary) {
                    //console.log("F1_T04_Participants-dictionary-plugin.js: identifier.key = " + identifier.key);
                    if (identifier.key === 'F1_T04_Participants') {
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
                            type: 'F1_T04_Participants.telemetry',
                            telemetry: {
                                values: measurement.values
                            },
                            location: 'F1_T04_Participants.taxonomy:F1_T04_Participants'
                        };
                    }
                });
            }
        };

        // The composition of a domain object is the list of objects it contains, as shown (for example) in the tree for browsing.
        // Can be used to populate a hierarchy under a custom root-level object based on the contents of a telemetry dictionary.
        // "appliesTo"  returns a boolean value indicating whether this composition provider applies to the given object
        // "load" returns an array of Identifier objects (like the channels this telemetry stream offers)
        var F1_T04_Participants_compositionProvider = {
            appliesTo: function (domainObject) {
                return domainObject.identifier.namespace === 'F1_T04_Participants.taxonomy'
                    && domainObject.type === 'folder';
            },
            load: function (domainObject) {
                return getF1_T04_ParticipantsDictionary()
                    .then(function (dictionary) {
                        return dictionary.measurements.map(function (m) {
                            return {
                                namespace: 'F1_T04_Participants.taxonomy',
                                key: m.key
                            };
                        });
                    });
            }
        };

        return function install(openmct) {
            // The addRoot function takes an "object identifier" as an argument
            openmct.objects.addRoot({
                namespace: 'F1_T04_Participants.taxonomy',
                key: 'F1_T04_Participants'
            });

            openmct.objects.addProvider('F1_T04_Participants.taxonomy', F1_T04_Participants_objectProvider);

            openmct.composition.addProvider(F1_T04_Participants_compositionProvider);

            //openmct.telemetry.addProvider(new F1_T04_ParticipantsLimitProvider());

            openmct.types.addType('F1_T04_Participants.telemetry', {
                name: 'F1_T04_Participants Telemetry Point',
                description: 'Telemetry of F1_T04_Participants',
                cssClass: 'icon-telemetry'
            });
        };
    }

    return F1_T04_ParticipantsPlugin;
});
