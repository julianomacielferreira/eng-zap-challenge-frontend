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
import { Component, OnInit } from '@angular/core';
import { PropertiesService } from './../../services/properties.service';
import { Property } from './../../models/property';

@Component({
  selector: 'mlocks-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public listRentPropertiesForZAP: Array<Property> = [];
	public listSellPropertiesForZAP: Array<Property> = [];

	public listRentPropertiesForVivaReal: Array<Property> = [];
	public listSellPropertiesForVivaReal: Array<Property> = [];

	constructor(private propertiesService: PropertiesService) { }

	ngOnInit(): void { 

		this.listRentPropertiesForZAP = this.propertiesService.listRentPropertiesForZAP(0, 2);
		this.listSellPropertiesForZAP = this.propertiesService.listSellPropertiesForZAP(0, 2);

		this.listRentPropertiesForVivaReal = this.propertiesService.listRentPropertiesForVivaReal(0, 2);
		this.listSellPropertiesForVivaReal = this.propertiesService.listSellPropertiesForVivaReal(0, 2);
	}

}
