import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://localhost:5000/';

interface GetSliamgeImage {
    images: string;
}

interface Location {
    province: string;
    city: string;
}

interface SendSubscriber {
    email: string;
}

interface Product {
    ProductId: string;
    TitleState: string;
    Type: string;
    Price: number;
    Code: string;
    Location: Location;
    PropertyType: string;
    Bathrooms: string;
    ParkingLot: string;
    LotFloor: string;
    Bedrooms: string;
    Unit: string;
    Images: string[];
  }

interface PropsSendMessage {
    FullName: string;
    Email: string;
    ContactNumber: string;
    Subject: string;
    Message: string;
    LookF: string;
    TypeP: string;
}

export const RealtyApi = createApi({
    reducerPath: 'AuthRealty',
    baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
    endpoints: (builder) => ({
        getSlideImage: builder.query<GetSliamgeImage[], void>({
            query: () => ({
                url: '/page/slideimagejama',
                method: "GET",
            })
        }),
        getProperty: builder.query<Product[], void>({
            query: () => ({
                url: '/jamarealty/get/realstateprods',
                method: "GET",
            })
        }),
        sendMessageCustomer: builder.mutation<void, PropsSendMessage>({
            query: (send) => ({
                url: '/customersend',
                method: "POST",
                body: send,
            })
        }),
        sendSubsriber: builder.mutation<void, SendSubscriber>({
            query: (subscribe) => ({
                url: '/subcribe',
                method: "POST",
                body: subscribe,
            })
        }),
    })
});

export const {
    useSendMessageCustomerMutation,
    useSendSubsriberMutation,

    useGetSlideImageQuery,
    useGetPropertyQuery,
} = RealtyApi;