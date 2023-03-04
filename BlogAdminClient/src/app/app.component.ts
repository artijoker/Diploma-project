import {Component, OnInit} from '@angular/core';
import {NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


    constructor(config: NgbModalConfig) {
        config.backdrop = 'static';
    }


    ngOnInit(): void {
    }
}
