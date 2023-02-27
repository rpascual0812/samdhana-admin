import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[limit-to]'
})
export class MaxDigitsDirective implements OnInit {
    constructor(private renderer: Renderer2, private el: ElementRef) { }

    @Input('limit-to') limitTo;

    @HostListener('keydown', ['$event']) onKeydown(e: any) {
        const limit = +this.limitTo;

        if (e.keyCode > 47 && e.keyCode < 127) {
            console.log(limit);
            console.log(e.target.value);
            if (e.target.value.length === limit) { e.preventDefault(); }
        }
    }

    ngOnInit() {
        this.renderer.setAttribute(this.el.nativeElement, 'min', '0');
        this.renderer.setAttribute(this.el.nativeElement, 'max', '9'.repeat(this.limitTo));
    }

    _onKeypress(e) {
        const limit = +this.limitTo;
        if (e.target.value.length === limit) e.preventDefault();
    }
}