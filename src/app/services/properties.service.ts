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

  public listRentPropertiesForZAP(limit: number, offset:number = 0): Array<Property> {

  	const rentPropertiesForZAP: Array<Property> = [];

    this.properties.forEach((property: Property) => {

      // When renting and at least the amount is $3,500.00.
      if(this.isRental(property) && this.isRentalTotalPriceAtLeast(property, 3500)) {

        rentPropertiesForZAP.push(property);
      }

    });

 	  return rentPropertiesForZAP.slice(offset, limit);
  }

  public listRentPropertiesForVivaReal(limit: number, offset:number = 0): Array<Property> {

    const rentPropertiesForVivaReal: Array<Property> = [];
    const PERCENTAGE: number = 30;

    this.properties.forEach((property: Property) => {

      // When renting and at least the amount is $4,000.00.
      if(
          this.isRental(property) && 
          this.isRentalTotalPriceAtLeast(property, 4000) && 
          this.isMonthlyCondoFeeNotGreaterThanOrEqualTo(property, PERCENTAGE)
        ) {

        // When the property is within the bounding box of the surroundings of the ZAP Group, 
        // consider the 50% higher maximum value rule (of the rental of the property).
        if(this.isAtGroupZAPBoundingBox(property)) {

          const rentalTotalPrice: number = parseInt(property.pricingInfos.rentalTotalPrice);

          const FIFTY_PERCENT: number = (rentalTotalPrice * 50) / 100;

          property.pricingInfos.rentalTotalPrice = (rentalTotalPrice + FIFTY_PERCENT).toString(); 
        }

        rentPropertiesForVivaReal.push(property);
      }
    });

    return rentPropertiesForVivaReal.slice(offset, limit);
  }

  public listSellPropertiesForZAP(limit: number, offset:number = 0): Array<Property> {

    const sellPropertiesForZAP: Array<Property> = [];

    this.properties.forEach((property: Property) => {

        if(
            this.isSale(property) && 
            this.isSaleTotalPriceAtLeast(property, 600000) && 
            this.isSquareMeterValueGreaterThan(property, 3500)
          ) {

          // When the property is within the bounding box of the surroundings of the ZAP Group,
          // consider the 10% lower minimum property value rule
          if(this.isAtGroupZAPBoundingBox(property)) {

            const price: number = parseInt(property.pricingInfos.price);

            const TEN_PERCENT: number = (price * 10) / 100;

            property.pricingInfos.price = (price + TEN_PERCENT).toString(); 
          }

          sellPropertiesForZAP.push(property);
        }
    });
  	
    return sellPropertiesForZAP.slice(offset, limit);
  }

  public listSellPropertiesForVivaReal(limit: number, offset:number = 0): Array<Property> {

  	const sellPropertiesForVivaReal: Array<Property> = [];
    
    this.properties.forEach((property: Property) => {

        if(
            this.isSale(property) && 
            this.isSaleTotalPriceAtLeast(property, 700000)
          ) {

          sellPropertiesForVivaReal.push(property);
        }

    });

    return sellPropertiesForVivaReal.slice(offset, limit);
  }

  private loadElegibleProperties() : void {

    for(let property of PropertiesJson) {

      // A property is not eligible under ANY PORTAL if: It has lat and lon equal to 0.
      if(this.isElegible(property)) {

        this.properties.push(new Property(property));
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

  private isAtGroupZAPBoundingBox(property: Property): boolean {

    const MIN_LONGITUDE:number = -46.693419;;
    const MIN_LATITUDE:number =  -23.568704;;
    const MAX_LONGITUDE:number =  -46.641146;
    const MAX_LATITUDE:number =  -23.546686;

    const location = property.address.geoLocation.location;

    return (location.lon >= MIN_LONGITUDE && location.lon <= MAX_LONGITUDE) && 
           (location.lat >= MIN_LATITUDE && location.lat <= MAX_LATITUDE);
  }

  private isSale(property: Property): boolean {

    const businessType: string = property.pricingInfos.businessType;

    return (businessType === 'SALE');
  }

  private isSaleTotalPriceAtLeast(property: Property, amount: number): boolean {

    const price: number = parseInt(property.pricingInfos.price);

    return (price >= amount);
  }

  private isSquareMeterValueGreaterThan(property: Property, amount: number): boolean {

    const usableAreas: number = property.usableAreas;

    // Only considering properties that have usableAreas above 0 (properties with usableAreas = 0 are not eligible).
    if(usableAreas <= 0) {
      return false;
    }

    // Divide price by usableAreas to know the square meter value
    const squareMeterValue: number = parseInt(property.pricingInfos.price) / usableAreas;

    // The square meter value  cannot be less than / equal to amount.
    return (squareMeterValue > amount);
  }
}
