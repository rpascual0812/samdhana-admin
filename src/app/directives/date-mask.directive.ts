import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: "[formControlName][dateMask]"
})
export class DateMaskDirective {
    constructor(public ngControl: NgControl) { }
    // or simplier add dashes US pattern mode
    @HostListener("input", ["$event"])
    onKeyDown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        let trimmed = input.value.replace(/\s+/g, "");

        if (trimmed.length > 10) {
            trimmed = trimmed.substr(0, 10);
        }

        trimmed = trimmed.replace(/-/g, "");

        let numbers = [];
        numbers.push(trimmed.substr(0, 4));
        if (trimmed.substr(2, 2) !== "") numbers.push(trimmed.substr(2, 2));
        if (trimmed.substr(6, 4) != "") numbers.push(trimmed.substr(6, 4));
        input.value = numbers.join("-");
    }
}