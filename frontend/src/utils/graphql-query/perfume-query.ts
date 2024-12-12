export const getAllProductsByQuery = `
    {
        products {
            id
            productTitle
            productr
            price
            filename
            productRating
        }
    }
`;

export const getProductByQuery = (id: string) => `
    {
        product(id: ${id}) {
            id
            productTitle
            productr
            year
            country
            productGender
            fragranceTopNotes
            fragranceMiddleNotes
            fragranceBaseNotes
            filename
            price
            volume
            type
            productRating
            reviews {
                id
                author
                message
                date
                rating
            }
        }
    }
`;

export const geProductsByIdsQuery = (ids: Array<number>) => `
    {
        productsIds(ids: [${ids}]) {
            id
            productTitle
            productr
            price
            filename
            productRating
        }
    }
`;
