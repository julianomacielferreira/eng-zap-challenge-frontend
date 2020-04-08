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

    // Apply the first business rule
    for(let property of PropertiesJson) {

      // A property is not eligible under ANY PORTAL if: It has lat and lon equal to 0.
      const longitude = property.address.geoLocation.location.lon;
      const latitute = property.address.geoLocation.location.lat;
      
      if(longitude !== 0 && latitute !== 0) {

        const validProperty = new Property();

        // Not all json properties are necessary
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

  public listRentPropertiesForZAP(limit: number): void {

  	console.log('Reading Rent Properties for ZAP from local json file.');
  	//@TODO - Implement business rules
 	  console.log(PropertiesJson);
  }

  public listSellPropertiesForZAP(limit: number): void {

  	console.log('Reading Sell Properties for ZAP from local json file.');
  	//@TODO - Implement business rules
 	  console.log(PropertiesJson);
  }

  public listRentPropertiesForVivaReal(limit: number): void {

  	console.log('Reading Rent Properties for Viva from local json file.');
  	//@TODO - Implement business rules
 	  console.log(PropertiesJson);
  }

  public listSellPropertiesForVivaReal(limit: number): void {

  	console.log('Reading Sell Properties for Viva from local json file.');
  	//@TODO - Implement business rules
 	  console.log(PropertiesJson);
  }
}
