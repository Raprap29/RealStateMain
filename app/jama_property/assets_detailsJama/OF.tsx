"use client"

import React, {useState, useEffect} from "react";

interface ValueCA {
    FormCA?: Record<string, any>;
}

const OF: React.FC<ValueCA> = ({FormCA}) => {

    function formatPrice(price?: number): string {
        if (price === undefined || price === null) {
            return "N/A"; // or handle it differently based on your requirements
          }
        let priceStr = price.toFixed(2);
        
        const [integerPart, decimalPart] = priceStr.split('.');
        
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedDecimalPart = decimalPart ? `.${decimalPart}` : ".00";

        return formattedIntegerPart + formattedDecimalPart;
    }

    return(
        <React.Fragment>
            <div className="px-[10px]">
            <div className="px-[10px]">
                {FormCA?.Code && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Code:</span> {FormCA.Code}
                    </p>
                    </div>
                )}
                {FormCA?.Unit && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Unit:</span> {FormCA.Unit}
                    </p>
                    </div>
                )}
                {FormCA?.PropertyType && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Property Type:</span> {FormCA.PropertyType}
                    </p>
                    </div>
                )}
                {FormCA?.Type && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Category:</span> {FormCA.Type}
                    </p>
                    </div>
                )}
                {FormCA?.Address && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Address:</span> {FormCA.Address}
                        {FormCA.Location && (
                        <>
                            {FormCA.Location.province && <> {FormCA.Location.province}</>}
                            {FormCA.Location.city && <> {FormCA.Location.city}</>}
                        </>
                        )}
                    </p>
                    </div>
                )}
                {FormCA?.Bedrooms && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Bedrooms:</span> {FormCA.Bedrooms} Bedrooms
                    </p>
                    </div>
                )}
                {FormCA?.Bathrooms && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Bathrooms:</span> {FormCA.Bathrooms} Bathrooms
                    </p>
                    </div>
                )}
                {FormCA?.ParkingLot && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Parking Lot:</span> {FormCA.ParkingLot} sqm
                    </p>
                    </div>
                )}
                {FormCA?.LotFloor && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Floor:</span> {FormCA.LotFloor} sqm
                    </p>
                    </div>
                )}
                {FormCA?.Price && (
                    <div className="mt-3">
                    <p>
                        <span className="font-bold">Price:</span> Php {formatPrice(FormCA.Price)}
                    </p>
                    </div>
                )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default OF;