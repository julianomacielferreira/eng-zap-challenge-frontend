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

		if (property !== undefined) {

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

	public isRentPropertiesForZAP(): boolean {

		// When renting and at least the amount is $3,500.00.
		return (
			this.isRental() &&
			this.isRentalTotalPriceAtLeast(3500)
		);
	}

	public isSellPropertiesForZAP(): boolean {

		if (
			this.isSale() &&
			this.isSaleTotalPriceAtLeast(600000) &&
			this.isSquareMeterValueGreaterThan(3500)
		) {

			this.calculateZAPBoundingBox();

			return true;
		}

		return false;
	}

	public isRentPropertiesForVivaReal(): boolean {

		const PERCENTAGE = 30;

		if (
			this.isRental() &&
			this.isRentalTotalPriceAtLeast(4000) &&
			this.isMonthlyCondoFeeNotGreaterThanOrEqualTo(PERCENTAGE)
		) {

			this.calculateVivaRealBoundingBox();

			return true;
		}

		return false;
	}

	public isSellPropertiesForVivaReal(): boolean {

		if (
			this.isSale() &&
			this.isSaleTotalPriceAtLeast(700000)
		) {

			return true;
		}

		return false;
	}

	private isRental(): boolean {

		const businessType: string = this.pricingInfos.businessType;

		return (businessType === 'RENTAL');
	}

	private isRentalTotalPriceAtLeast(amount: number): boolean {

		const rentalTotalPrice: number = parseInt(this.pricingInfos.rentalTotalPrice, 10);

		return (rentalTotalPrice >= amount);
	}

	private isSale(): boolean {

		const businessType: string = this.pricingInfos.businessType;

		return (businessType === 'SALE');
	}

	private isSaleTotalPriceAtLeast(amount: number): boolean {

		const price: number = parseInt(this.pricingInfos.price, 10);

		return (price >= amount);
	}

	private isSquareMeterValueGreaterThan(amount: number): boolean {

		const usableAreas: number = this.usableAreas;

		// Only considering properties that have usableAreas above 0 (properties with usableAreas = 0 are not eligible).
		if (usableAreas <= 0) {
			return false;
		}

		// Divide price by usableAreas to know the square meter value
		const squareMeterValue: number = parseInt(this.pricingInfos.price, 10) / usableAreas;

		// The square meter value  cannot be less than / equal to amount.
		return (squareMeterValue > amount);
	}

	private calculateZAPBoundingBox(): void {

		// When the property is within the bounding box of the surroundings of the ZAP Group,
		// consider the 10% lower minimum property value rule
		if (this.isAtGroupZAPBoundingBox()) {

			const price: number = parseInt(this.pricingInfos.price, 10);

			const TEN_PERCENT: number = (price * 10) / 100;

			this.pricingInfos.price = (price + TEN_PERCENT).toString();
		}
	}

	private isAtGroupZAPBoundingBox(): boolean {

		const MIN_LONGITUDE = -46.693419;
		const MIN_LATITUDE = -23.568704;
		const MAX_LONGITUDE = -46.641146;
		const MAX_LATITUDE = -23.546686;

		const location = this.address.geoLocation.location;

		return (location.lon >= MIN_LONGITUDE && location.lon <= MAX_LONGITUDE) &&
			(location.lat >= MIN_LATITUDE && location.lat <= MAX_LATITUDE);
	}

	private isMonthlyCondoFeeNotGreaterThanOrEqualTo(percentage: number): boolean {

		// Properties with non-numeric or invalid "monthlyCondoFee" are not eligible.
		if (this.pricingInfos.monthlyCondoFee === '0') {
			return;
		}

		const monthlyCondoFee: number = parseInt(this.pricingInfos.monthlyCondoFee, 10);

		// "percentage" of the rental amount (rentalTotalPrice).
		const amount: number = (parseInt(this.pricingInfos.rentalTotalPrice, 10) * percentage) / 100;

		return (monthlyCondoFee < amount);
	}

	private calculateVivaRealBoundingBox(): void {

		// When the property is within the bounding box of the surroundings of the ZAP Group, 
		// consider the 50% higher maximum value rule (of the rental of the property).
		if (this.isAtGroupZAPBoundingBox()) {

			const rentalTotalPrice: number = parseInt(this.pricingInfos.rentalTotalPrice, 10);

			const FIFTY_PERCENT: number = (rentalTotalPrice * 50) / 100;

			this.pricingInfos.rentalTotalPrice = (rentalTotalPrice + FIFTY_PERCENT).toString();
		}
	}
}
