import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogInService} from './services/login/log-in.service';
import {DataService} from "./services/data/data.service";
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
