/**
 * Realtime telemetry plugin using websockets.
 */

define([

], function (

) {

    function RealtimeTelemetryPlugin(desired_domain_object_type, serverURL, IP) {
        
        return function (openmct) {
            var port = 16969;
            var ip = IP;
            var heartbeatTimeout = 10000;
            let timeOutID;

            // This holds the list of channels that are currently subscribed to
            var listeners = {};


            function heartbeat() {
                //if (!socket) return;
                if (socket.readyState !== 1){
                    console.log("Heartbeat: Socket not open.")
                    return;
                } 
                //if (socket.readyState !== WebSocket.OPEN) return;
                //console.log(socket.readyState);
                socket.send("heartbeat");
                //console.log("Heartbeat", timeOutID ,desired_domain_object_type);
                return setTimeout(heartbeat, heartbeatTimeout);
            }

            // Resubscribes to the channels in the listeners
            function resubscribe(socket){
                keyList = Object.keys(listeners);
                for(var i = 0; i < keyList.length; i++){
                    socket.send('subscribe ' + keyList[i]);
                }
            }

            // Removes the old broken providers from the Telemetry Provider list            
            function removeSelfFromTelemetryProviderList(providerName) {
                var newSubsList = [];
                openmct.telemetry.subscriptionProviders.forEach( 
                    function myF (item, index, arr){
                    
                        if(!item.realTimeTelemetryType){
                            newSubsList.push(item);
                        }
                        else if(item.realTimeTelemetryType != providerName){
                            newSubsList.push(item);
                        }
                    }
                )
                openmct.telemetry.subscriptionProviders = newSubsList;
            }

            // Creates and connects the websocket
            function connectRealTimeWS(ip, port, serverURL){
                
                //console.log(IP);
                socket = null;

                if(ip == "0.0.0.0" || ip == "127.0.0.1" || ip == "localhost"){
                    // Running locally use this:
                    socket = new WebSocket('ws://' + ip + ':' + port + serverURL);
                }
                else{
                    // Running on cloud use this:
                    socket = new WebSocket('wss://' + ip + '/telemetry' + serverURL);
                }

                socket.realTimeTelemetryType = desired_domain_object_type;
                
                socket.onopen = function() {
                    //console.log("Websocket onopen");
                    openmct.telemetry.addProvider(provider);

                    //Resubscribe to all listeners
                    resubscribe(this);

                    // Heartbeat
                    timeOutID = heartbeat();
                    //console.log (timeOutID);

                };

                socket.onmessage = function (event) {
                    // Update timer
                    lastMessageTimestamp = Date.now();

                    // Convert message
                    point = JSON.parse(event.data);
                    //console.log("RealtimeTelemetry-plugin.js: received new data for channel " + point.id + ": time = " + point.timestamp + " value = " + point.value);
                    if (listeners[point.id]) {
                        listeners[point.id].forEach(function (l) {
                            l(point);
                        });
                    }
                };

                socket.onclose = function(e) {
                    //console.log('RealTime Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
                    removeSelfFromTelemetryProviderList(this.realTimeTelemetryType);

                    //console.log("clearing",timeOutID);
                    clearTimeout(timeOutID);
                    
                    // Try to reconnect
                    setTimeout(function() {
                        //console.log("Function to reconnect");
                        //console.log("Onclose, Before reconnect",listeners);
                        var [socket, provider] = connectRealTimeWS(ip, port, serverURL);

                    }, 1000);
                };

                socket.onerror = function(err) {
                    //console.log("Websocket onerror", err);
                    socket.close();
                };

                var provider = {
                    realTimeTelemetryType: desired_domain_object_type,
                    supportsSubscribe: function (domainObject) {
                        return domainObject.type === desired_domain_object_type;
                    },
                    subscribe: function (domainObject, callback, options) {

                        if (!listeners[domainObject.identifier.key]) {
                            listeners[domainObject.identifier.key] = [];
                        }
    
                        if (!listeners[domainObject.identifier.key].length) {
                            socket.send('subscribe ' + domainObject.identifier.key);
                        }
    
                        listeners[domainObject.identifier.key].push(callback);

                        return function () {
                            listeners[domainObject.identifier.key] =
                                listeners[domainObject.identifier.key].filter(function (c) {
                                    return c !== callback;
                                });
    
                            if (!listeners[domainObject.identifier.key].length) {
                                socket.send('unsubscribe ' + domainObject.identifier.key);
                            }
                        };
                    }
                };
                return [socket, provider];
            }
            
            // Create and start the websocket
            var [socket, provider] = connectRealTimeWS(ip, port, serverURL);
            
        };
    }

    return RealtimeTelemetryPlugin;
});
