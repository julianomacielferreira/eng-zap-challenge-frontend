/*
 * The MIT License
 *
 * Copyright 2020 Juliano Maciel Ferreira.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { Injectable } from '@angular/core';
import { Property } from './../models/property';
import PropertiesJson from './../../assets/data/properties.json';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private properties: Array<Property> = [];

  constructor() { 

    this.loadElegibleProperties();
  }

  private loadElegibleProperties() : void {

    for(let property of PropertiesJson) {

      // A property is not eligible under ANY PORTAL if: It has lat and lon equal to 0.
      if(this.isElegible(property)) {

        const validProperty = new Property();

        // Not all Json properties are necessary
        validProperty.id = property.id,
        validProperty.usableAreas = property.usableAreas,
        validProperty.parkingSpaces = property.parkingSpaces,
        validProperty.images = property.images,
        validProperty.address = property.address,
        validProperty.bathrooms = property.bathrooms,
        validProperty.bedrooms = property.bedrooms,
        validProperty.pricingInfos = {
            period: property.pricingInfos.period,
            yearlyIptu: property.pricingInfos.yearlyIptu,
            price: property.pricingInfos.price,
            rentalTotalPrice: property.pricingInfos.rentalTotalPrice,
            businessType: property.pricingInfos.businessType,
            monthlyCondoFee: property.pricingInfos.monthlyCondoFee
        };

        this.properties.push(validProperty);
      }      
    }
  }

  private isElegible(property: any): boolean {

    const longitude: number = property.address.geoLocation.location.lon;
    const latitute: number = property.address.geoLocation.location.lat;

    return (longitude !== 0 && latitute !== 0);
  }

  private isRental(property: Property): boolean {

    const businessType: string = property.pricingInfos.businessType;

    return (businessType === 'RENTAL');
  }

  private isRentalTotalPriceAtLeast(property: Property, amount: number): boolean {

    const rentalTotalPrice: number = parseInt(property.pricingInfos.rentalTotalPrice);

    return (rentalTotalPrice >= amount);
  }

  private isMonthlyCondoFeeNotGreaterThanOrEqualTo(property: Property, percentage: number): boolean {

    // Properties with non-numeric or invalid "monthlyCondoFee" are not eligible.
    if(property.pricingInfos.monthlyCondoFee === "0") {
      return;
    }

    const monthlyCondoFee: number = parseInt(property.pricingInfos.monthlyCondoFee);

    // "percentage" of the rental amount (rentalTotalPrice).
    const amount: number = (parseInt(property.pricingInfos.rentalTotalPrice) * percentage) / 100;

    return (monthlyCondoFee < amount);
  }

  public listRentPropertiesForZAP(limit: number, offset:number = 0): Array<Property> {

  	const rentPropertiesForZAP: Array<Property> = [];

    for(let property of this.properties) {

      // When renting and at least the amount is $3,500.00.
      if(this.isRental(property) && this.isRentalTotalPriceAtLeast(property, 3500)) {

        rentPropertiesForZAP.push(property);
      }
    }

 	  return rentPropertiesForZAP.slice(offset, limit);
  }

  public listRentPropertiesForVivaReal(limit: number, offset:number = 0): Array<Property> {

    const rentPropertiesForVivaReal: Array<Property> = [];

    for(let property of this.properties) {

      // When renting and at least the amount is $4,000.00.
      if(this.isRental(property) && 
        this.isRentalTotalPriceAtLeast(property, 4000) && 
        this.isMonthlyCondoFeeNotGreaterThanOrEqualTo(property, 30)) {

        rentPropertiesForVivaReal.push(property);
      }
    }

    return rentPropertiesForVivaReal.slice(offset, limit);
  }

  public listSellPropertiesForZAP(limit: number): void {

  	console.log('Reading Sell Properties for ZAP from local json file.');
  	//@TODO - Implement business rules
 	  console.log(PropertiesJson);
  }

  public listSellPropertiesForVivaReal(limit: number): void {

  	console.log('Reading Sell Properties for Viva from local json file.');
  	//@TODO - Implement business rules
 	  console.log(PropertiesJson);
  }
}
