import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-category',
    templateUrl: './category-modal-window.component.html',
    styleUrls: ['./category-modal-window.component.css']
})
export class CategoryModalWindowComponent implements OnInit {
    @Input() currentCategoryName = "";
    categoryName: string = "";

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.categoryName = this.currentCategoryName;
    }

    save(){
        if (this.categoryName !== "")
            this.activeModal.close(this.categoryName);
        else
            alert("Введите название категории");
    }

}
