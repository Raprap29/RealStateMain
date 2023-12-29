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

interface DescriptionArray {
    image: string,
    descriptionImage: string,
}

interface ForEnlistproperty {
    FullName: string;
    Email: string;
    ContactNumber: string;
    PropertyName: string;
    WhatProperty: string;
    LocationProperty: string;
    PropertyPrice: number;
    Type: string;
    Images: string[];
}

interface FormDeveloperGet {
    _id: string;
    nameDeveloper: string;
    logo: string;
    descriptionLogo: string;
    desciptionImagesOfLogo: DescriptionArray[],
    desciptionImagesForView: string[]
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
    lat: number;
    lon: number;
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

interface InquireForm {
    fullname: string;
    email: string;
    contact: string;
    subject: string;
    inquire: string;
    url: string;
    title: string;
    category: string;
    property: string;
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
        sendMessageCustomerToEmail: builder.mutation<void, InquireForm>({
            query: (message) => ({
                url: '/sendmessage/customer',
                method: "POST",
                body: message,
            })
        }),
        ViewDetailsProducts: builder.query<Product[], {_id: string}>({
            query: ({_id}) => ({
                url: `/jamarealty/realstateprods/${_id}`,
                method: "GET",
            })
        }),
        getDeveloper: builder.query<FormDeveloperGet[], void>({
            query: () => ({
                url: `/developer`,
                method: "GET",
            })
        }),
        sendEnlistProperty: builder.mutation<void, ForEnlistproperty>({
            query: (item) => ({
                url: `/jamarealty/uploadproperty`,
                method: "POST",
                body: item,
            })
        }),
    })
});

export const {
    useSendMessageCustomerMutation,
    useSendSubsriberMutation,
    useSendMessageCustomerToEmailMutation,
    useSendEnlistPropertyMutation,

    useViewDetailsProductsQuery,
    useGetSlideImageQuery,
    useGetPropertyQuery,
    useGetDeveloperQuery,
} = RealtyApi;