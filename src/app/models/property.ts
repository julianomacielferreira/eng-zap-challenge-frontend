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
export class Property {

	public id: string;
	public usableAreas: number;
	public parkingSpaces: number;
	public images: string[];
	public address: {
		city: string,
		neighborhood: string,
		geoLocation: {
			precision: string,
			location: {
				lon: number,
				lat: number
			}
		}
	};
	public bathrooms: number;
	public bedrooms: number;
	public pricingInfos: {
		period?: string | undefined,
		yearlyIptu: string | undefined,
		price: string | undefined,
		rentalTotalPrice?: string | undefined,
		businessType: string | undefined,
		monthlyCondoFee: string | undefined
	};

	constructor(private property?: any) {

		if(property !== undefined) {

			// Not all Json properties are necessary
			this.id = property.id,
	        this.usableAreas = property.usableAreas,
	        this.parkingSpaces = property.parkingSpaces,
	        this.images = property.images,
	        this.address = property.address,
	        this.bathrooms = property.bathrooms,
	        this.bedrooms = property.bedrooms,
	        this.pricingInfos = {
	            period: property.pricingInfos.period,
	            yearlyIptu: property.pricingInfos.yearlyIptu,
	            price: property.pricingInfos.price,
	            rentalTotalPrice: property.pricingInfos.rentalTotalPrice,
	            businessType: property.pricingInfos.businessType,
	            monthlyCondoFee: property.pricingInfos.monthlyCondoFee
	        };
		}
	}
}
