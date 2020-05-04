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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertiesService } from './../../services/properties.service';
import { Property } from './../../models/property';

@Component({
  selector: 'mlocks-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

	public origin: string;
	public listProperties: Array<Property> = [];
	public IMAGE_INDEX: number = 0;

	constructor(
		private route: ActivatedRoute,
		private propertiesService: PropertiesService
	) { }

	ngOnInit(): void {

		this.route.params.subscribe(param => {

			this.origin = param['origin'];

			this.IMAGE_INDEX = this.getRandomInt(5);
			
			this.loadPropertiesFor();
		});
	}

	private loadPropertiesFor(): void {

		switch (this.origin) {
			case `zap`:
				this.listProperties = this.propertiesService.listPropertiesForZAP();
				console.log(this.listProperties);
				break;
			
			default:
				this.listProperties = this.propertiesService.listPropertiesForVivaReal();
				console.log(this.listProperties);
				break;
		}
	}

	private getRandomInt(max: number): number {

		return Math.floor(Math.random() * Math.floor(max));
	}
}
