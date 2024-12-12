import { FullProductResponse, ProductErrors, ProductResponse, ReviewResponse } from "../../../types/types";

export const mockFullProductResponse: FullProductResponse = {
    id: 34,
    productr: "Creed",
    productTitle: "Aventus",
    country: "France",
    description: "",
    file: null,
    filename: "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
    fragranceBaseNotes: "Ambergris, Oakmoss, Musk",
    fragranceMiddleNotes: "Birch, Jasmine, Patchouli",
    fragranceTopNotes: "Pineapple, Apple, Bergamot, Blackcurrant",
    productGender: "male",
    productRating: 0,
    price: 152,
    reviewsCount: 0,
    type: "Eau de parfum",
    volume: "100",
    year: 2010
};

export const mockCartProductsResponse: Array<ProductResponse> = [
    {
        id: 17,
        productTitle: "Le Gemme Ashlemah",
        productr: "Bvlgari",
        price: 171,
        productRating: 0,
        filename:
            "https://productweb2.s3.eu-central-1.amazonaws.com/956bbe26-c07d-4e32-a567-5e4306388c0e.Bvlgari Le Gemme Ashlemah.jpg",
        reviewsCount: 0,
        volume: "100"
    },
    {
        id: 27,
        productTitle: "Good Girl",
        productr: "Carolina Herrera",
        price: 156,
        productRating: 0,
        filename:
            "https://productweb2.s3.eu-central-1.amazonaws.com/184c9da2-2445-4b01-87b8-b4f8b5f6ab8c.Carolina Herrera Good Girl.jpg",
        reviewsCount: 0,
        volume: "150"
    }
];

export const mockProductsResponse: Array<ProductResponse> = [
    {
        id: 34,
        productr: "Creed",
        productTitle: "Aventus",
        price: 152,
        productRating: 0,
        filename: "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
        reviewsCount: 0,
        volume: "100",
    },
    {
        id: 35,
        productr: "Creed",
        productTitle: "Bois du Portugal",
        price: 110,
        productRating: 0,
        filename: "162cfbe2-2dc2-4271-8a63-23981a7e3cc4.Creed Bois du Portugal.jpg",
        reviewsCount: 0,
        volume: "100",
    },
    {
        id: 38,
        productr: "Creed",
        productTitle: "Aventus for Her",
        price: 141,
        productRating: 0,
        filename: "7d32f694-9cc3-4770-844a-47400e6f5c6b.Creed Aventus for Her.jpg",
        reviewsCount: 0,
        volume: "75",
    }
];

export const mockReviews: Array<ReviewResponse> = [
    { id: 1, author: "John Doe", message: "Hello world", rating: 4, date: "2021-05-08" },
    { id: 2, author: "John Doe", message: "Hello world", rating: 5, date: "2021-05-08" },
    { id: 3, author: "John Doe", message: "Seems good.", rating: 5, date: "2021-05-08" }
];

export const productErrorData: ProductErrors = {
    productTitleError: "Fill in the input field",
    productrError: "Fill in the input field",
    yearError: "Fill in the input field",
    countryError: "Fill in the input field",
    typeError: "Fill in the input field",
    volumeError: "Fill in the input field",
    productGenderError: "Fill in the input field",
    fragranceTopNotesError: "Fill in the input field",
    fragranceMiddleNotesError: "Fill in the input field",
    fragranceBaseNotesError: "Fill in the input field",
    priceError: "Fill in the input field"
};
