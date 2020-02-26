# Code Challenge Grupo ZAP - Frontend

This is the [Frontend Code Challenge](https://grupozap.github.io/cultura/challenges/engineering.html) project for the [&copy;Grupo ZAP](https://github.com/grupozap).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

# Description

**The below description was taken from the [public available link](https://grupozap.github.io/cultura/challenges/engineering.html).**

At the end of 2017, the country's two largest real estate portals merged. This challenge revolves around our day-to-day to integrate the technologies and business rules of both, in a scalable and sustainable way, to revolutionize the real estate market in Brazil.

## Current code

The current code is very old, simple and raw (not to say crude). It is only used as a quick reference and will serve as a reference for this _challenge_. It works like this:
- Given a data source, it only has the logic of separating properties eligible for ZAP or Viva Real. You can see it [here](http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/).

![](src/assets/screenshots/1.png)

## The current business rules are as follows:

- It is only eligible for the **ZAP** portal:
    - When **renting** and at least the amount is $3,500.00.
    - When **selling** and at least the value is $600,000.00.

- It is only eligible for the **Viva Real** portal:
    - When **renting** and at least the amount is $4,000.00.
    - When **selling** and at least the value is $700,000,00.

**Where:**

```js
...
pricingInfos: {
  price: 200000, // Sale value
  rentalTotalPrice: 1200, // Rent Amount
  businessType: "RENTAL|SALE", // defines whether it is rent or sale
}
```

## The challenge

Well, this is where you come in! We need this logic to be abstracted in the best way for the user. The legacy code is there to clear things up, in case you have any doubts. For the rest, it will not be used for anything.

### What will be evaluated?

- Organization
- Maintainability
- Traceability
- Testability
- Performance
- Portability
- Understanding the problem (your interpretation, as well as your understanding of the proposed rules is also part of the test, as we are evaluating how you understand and solve problems)

It must be **PRODUCTION READY**.

# Option A: Make an interaction interface (frontend)

Redesign the presentation and visual layer of the [legacy site](http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/) the way you prefer, with some mandatory behaviors:

- When you click on a property, it should present a detail screen with its information.
- Allow the user the possibility to navigate between the photos of the property in the listing and / or detail.
- Pagination by 20 elements.
- **Responsive interface** (front) / **adaptable for different screens** (apps).

The logic (and [business rules](https://github.com/julianomacielferreira/eng-zap-challenge-frontend/blob/master/README.md)) in this case is all in the front / app, so you will work with all data **in memory**. The _input_ must be accessed via request http (CORS friendly).

**Use your creativity** and take advantage of the property's information to show the card and the detail as you understand it would be the best form and also the most performative.

You should use <span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">source-1.json</span> (~400 records) as input:

- [http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json](http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json)

# Business rules you need to implement

Now with the merger we have some changes that need to be made. The following rules need to be **added** to the existing rules mentioned at the beginning of this text:

- A property is not eligible under **ANY PORTAL** if:
    - It has <span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">lat</span> and <span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">lon</span> equal to 0.
- If the property is for sale, it is eligible for the **ZAP** portal if:
    - The square meter value (<span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">usableAreas</span> key) cannot be less than / equal to $3,500.00 - only considering properties that have <span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">usableAreas</span> above 0 (properties with _usableAreas = 0_ are not eligible).
    - **When the property is within the bounding box of the surroundings of the ZAP Group** (described below), consider the 10% lower minimum property value rule.
- If the property is for **rent**, it is eligible for the **Viva Real** portal if:
    - The value of the condominium cannot be greater than / equal to 30% of the rental amount - only applied to properties that have a valid and numeric <span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">monthlyCondoFee</span> (properties with non-numeric or invalid <span style="color: #567482; background-color: #f3f6fa;border-radius: 0.3rem;padding: 2px 4px;font-size: 0.9rem;">monthlyCondoFee</span> are not eligible).
    - **When the property is within the bounding box of the surroundings of the ZAP Group** (described below) consider the 50% higher maximum value rule (of the rental of the property).

**Where:**

```js
{
  ...
  updatedAt: "2016-11-16T04:14:02Z", // property update date
  address: {
    geolocation: {
      location: { // latitude / longitude of the property
        "lon": -46.716542,
        "lat": -23.502555
      },
    },
  },
  pricingInfos: {
    monthlyCondoFee: "495"
  }
}
```

### Bounding Box Grupo ZAP

```js
minlon: -46.693419
minlat -23.568704
maxlon: -46.641146
maxlat: -23.546686
```

### Input / Output contract example

JSON with data is minified, so to facilitate its development, here is an example of it:

```js
[
  {
    "usableAreas": 69,
    "listingType": "USED",
    "createdAt": "2016-11-16T04:14:02Z",
    "listingStatus": "ACTIVE",
    "id": "some-id",
    "parkingSpaces": 1,
    "updatedAt": "2016-11-16T04:14:02Z",
    "owner": false,
    "images": [
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id1.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id2.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id3.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id4.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id5.jpg"
    ],
    "address": {
      "city": "",
      "neighborhood": "",
      "geoLocation": {
        "precision": "ROOFTOP",
        "location": {
          "lon": -46.716542,
          "lat": -23.502555
        }
      }
    },
    "bathrooms": 2,
    "bedrooms": 3,
    "pricingInfos": {
      "yearlyIptu": "0",
      "price": "405000",
      "businessType": "SALE",
      "monthlyCondoFee": "495"
    }
  },
  {
    "usableAreas": 70,
    "listingType": "USED",
    "createdAt": "2017-04-22T18:39:31.138Z",
    "listingStatus": "ACTIVE",
    "id": "some-id-2",
    "parkingSpaces": 1,
    "updatedAt": "2017-04-22T18:39:31.138Z",
    "owner": false,
    "images": [
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id-2-1.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id-2-2.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id-2-3.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id-2-4.jpg",
      "https://resizedimgs.vivareal.com/crop/400x300/vr.images.sp/some-id-2-5.jpg"
    ],
    "address": {
      "city": "",
      "neighborhood": "",
      "geoLocation": {
        "precision": "ROOFTOP",
        "location": {
          "lon": -46.716542,
          "lat": -23.502555
        }
      }
    },
    "bathrooms": 1,
    "bedrooms": 2,
    "pricingInfos": {
      "yearlyIptu": "60",
      "price": "276000",
      "businessType": "SALE",
      "monthlyCondoFee": "0"
    }
  }
]
```

In case you need to validate the input and do not want to use the entire sources, there are example sources:

- [http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-sample.json](http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-sample.json)
- [http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-sample](http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-sample)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# References

- Angular: [https://angular.io/](https://angular.io/)

- Bootstrap: [https://getbootstrap.com/](https://getbootstrap.com/)

- Font Awesome&trade;: [https://fontawesome.com/](https://fontawesome.com/)

- Sass&trade;: [https://sass-lang.com/](https://sass-lang.com/)

- Webpack&trade;: [https://webpack.js.org/](https://webpack.js.org/)

- TypeScript: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

- Node.js: [https://nodejs.org/](https://nodejs.org/)

- Code Challenge Grupo ZA: [https://grupozap.github.io/cultura/challenges/engineering.html](https://grupozap.github.io/cultura/challenges/engineering.html)

# License

Please see the [license agreement](https://github.com/julianomacielferreira/eng-zap-challenge-frontend/blob/master/LICENSE).
