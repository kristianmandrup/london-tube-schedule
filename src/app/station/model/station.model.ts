/**
 * Represents The ApiResponse simplified
 */
export interface Arrival {
    lineId: string;
    stationName: string;
    platformName: string;
    towards: string;
    expectedArrival: string;
}

/**
 * The object response from the api
 */
export interface ApiResponse {
    'id': string;
    'operationType': number;
    'vehicleId': string;
    'naptanId': string;
    'stationName': string;
    'lineId': string;
    'lineName': string;
    'platformName': string;
    'direction': string;
    'bearing': string;
    'destinationNaptanId': string;
    'destinationName': string;
    'timestamp': string;
    'timeToStation': 0;
    'currentLocation': string;
    'towards': string;
    'expectedArrival': string;
    'timeToLive': string;
    'modeName': string;
    'timing': {
        'countdownServerAdjustment': string;
        'source': string;
        'insert': string;
        'read': string;
        'sent': string;
        'received': string;
    };
}
