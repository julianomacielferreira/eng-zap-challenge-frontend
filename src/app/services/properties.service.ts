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

  private propertiesForZAP: Array<Property> = [];
  private rentPropertiesForZAP: Array<Property> = [];
  private sellPropertiesForZAP: Array<Property> = [];

  private propertiesForVivaReal: Array<Property> = [];
  private rentPropertiesForVivaReal: Array<Property> = [];
  private sellPropertiesForVivaReal: Array<Property> = [];

  constructor() { 

    this.loadElegibleProperties();
  }

  public listPropertiesForZAP():  Array<Property> {

    return this.propertiesForZAP;
  }

  public listPropertiesForVivaReal():  Array<Property> {
    
    return this.propertiesForVivaReal;
  }

  public listRentPropertiesForZAP(limit: number, offset:number = 0): Array<Property> {

    return this.rentPropertiesForZAP.slice(offset, limit);
  }

  public listSellPropertiesForZAP(limit: number, offset:number = 0): Array<Property> {

    return this.sellPropertiesForZAP.slice(offset, limit);
  }

  public listRentPropertiesForVivaReal(limit: number, offset:number = 0): Array<Property> {

    return this.rentPropertiesForVivaReal.slice(offset, limit);
  }

  public listSellPropertiesForVivaReal(limit: number, offset:number = 0): Array<Property> {

    return this.sellPropertiesForVivaReal.slice(offset, limit);
  }

  private loadElegibleProperties() : void {

    for(let propertyJson of PropertiesJson) {

      // A property is not eligible under ANY PORTAL if: It has lat and lon equal to 0.
      if(this.isElegible(propertyJson)) {

        const property: Property = new Property(propertyJson);

        if(property.isRentPropertiesForZAP()) {

          this.rentPropertiesForZAP.push(property); 
          this.propertiesForZAP.push(property);   
        }

        if(property.isSellPropertiesForZAP()) {

          this.sellPropertiesForZAP.push(property);
          this.propertiesForZAP.push(property);   
        }

        if(property.isRentPropertiesForVivaReal()) {

          this.rentPropertiesForVivaReal.push(property);
          this.propertiesForVivaReal.push(property);
        }

        if(property.isSellPropertiesForVivaReal()) {

          this.sellPropertiesForVivaReal.push(property);
          this.propertiesForVivaReal.push(property);
        }
      }      
    }
  }

  private isElegible(property: any): boolean {

    const longitude: number = property.address.geoLocation.location.lon;
    const latitute: number = property.address.geoLocation.location.lat;

    return (longitude !== 0 && latitute !== 0);
  } 
  
}
