/*
 * The MIT License
 *
 * Copyright 2020 Martha Ribeiro Locks.
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
declare var $: any;

@Component({
  selector: 'mlocks-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.setupNiceSelect();

    this.setupSliderRange();
  }

  private setupNiceSelect(): void {
    /*------------------
        Nice Select
    --------------------*/
    $(document).ready(() => {
      $('.filter-location').niceSelect();
    });

    $(document).ready(() => {
      $('.filter-property').niceSelect();
    });

    $(document).ready(() => {
      $('.date-select').niceSelect();
    });
  }

  private setupSliderRange(): void {

    /*--------------------------------
        Price Slider
    -----------------------------------*/
    $('#slider-range').slider({
      range: true,
      min: 50,
      max: 300,
      step: 50,
      value: 50,
      values: [50, 300],
      slide: (event: any, ui: any) => {
        $('#slider-range .slider-left').text(ui.values[0] + 'k');
        $('#slider-range .slider-right').text(ui.values[1] + 'k');
      }
    });
  }

}
