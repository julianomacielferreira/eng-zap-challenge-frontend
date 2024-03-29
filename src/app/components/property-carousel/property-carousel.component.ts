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
import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/models/property';
declare var $: any;

@Component({
  selector: 'mlocks-property-carousel',
  templateUrl: './property-carousel.component.html'
})
export class PropertyCarouselComponent implements OnInit {

  @Input()
  public listProperties: Array<Property> = [];

  constructor() { }

  ngOnInit(): void {

    this.startSlider();
  }

  private startSlider(): void {

    setTimeout(() => {
      // Carousel Slider
      $('.slider-active').owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        navText: [`<i class='fa fa-angle-left'></i>`, `<i class='fa fa-angle-right'></i>`]
      });
    }, 100);

  }

}
