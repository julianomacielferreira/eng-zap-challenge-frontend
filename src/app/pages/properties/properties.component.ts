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
import { Observable, of } from 'rxjs';
import { PropertiesService } from './../../services/properties.service';
import { Property } from './../../models/property';

@Component({
  selector: 'mlocks-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

	public origin: string;
	public listProperties: Observable<Array<Property>>;
	public propertiesTotal: Array<number> = [];
	public IMAGE_INDEX: number = 0;
	public CURRENT_PAGE: number = 1;
	private PAGE_LIMIT: number = 20;

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

	public changePageTo(page: number): void {

		this.CURRENT_PAGE = page;

		const end: number = this.PAGE_LIMIT * page;
		const start: number = end - this.PAGE_LIMIT;
			
		if(this.origin === `zap`) {

			this.listProperties = of(this.propertiesService.listPropertiesForZAP(start, end));

		} else {

			this.listProperties = of(this.propertiesService.listPropertiesForVivaReal(start, end));
		}		
	}

	private loadPropertiesFor(): void {

		if(this.origin === `zap`) {

			this.listProperties = of(this.propertiesService.listPropertiesForZAP(0, this.PAGE_LIMIT));
			this.calculatePagination(this.propertiesService.totalPropertiesForZAP());

		} else {

			this.listProperties = of(this.propertiesService.listPropertiesForVivaReal(0, this.PAGE_LIMIT));
			this.calculatePagination(this.propertiesService.totalPropertiesForVivaReal());
		}
	}

	private calculatePagination(total): void {

		const pages: number = Math.ceil(total / this.PAGE_LIMIT);

		this.propertiesTotal = Array(pages).fill(pages).map((x,i)=> ++i);				
	}

	private getRandomInt(max: number): number {

		return Math.floor(Math.random() * Math.floor(max));
	}
}
