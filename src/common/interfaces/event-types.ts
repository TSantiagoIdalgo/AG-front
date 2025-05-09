export enum EventTypes {
    PAYMENT = 'PAYMENT',
    NEW_PAYMENT_RECEIVED = 'NEW_PAYMENT_RECEIVED'
}

export interface EventReceived<T> {
    type: EventTypes;
    data: T
}