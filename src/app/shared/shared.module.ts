import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    exports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ]
})
export class SharedModule{


}