import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NzFormModule} from "ng-zorro-antd/form";
import {ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSelectModule} from "ng-zorro-antd/select";

@Component({
  selector: 'app-contact-group',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    { provide: ControlContainer, useFactory: () => inject(ControlContainer, { skipSelf: true })}
  ],
  template: `
    <fieldset formGroupName="{{groupName}}">
      <legend>{{ legend }}</legend>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please select relation!">
          <nz-form-label>与本人关系</nz-form-label>
          <nz-select formControlName="relation" class="relation-select">
            <nz-option nzLabel="母子" nzValue="母子"></nz-option>
            <nz-option nzLabel="父子" nzValue="父子"></nz-option>
            <nz-option nzLabel="朋友" nzValue="朋友"></nz-option>
            <nz-option nzLabel="同事" nzValue="同事"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input username!">
          <nz-form-label>姓名</nz-form-label>
          <input type="text" nz-input formControlName="username" placeholder="Please input username" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input phone!">
          <nz-form-label>手机号码</nz-form-label>
          <input type="text" nz-input formControlName="phone" placeholder="Please input phone" />
        </nz-form-control>
      </nz-form-item>
    </fieldset>
  `,
  styles: [``]
})
export class ContactGroup implements OnInit {
  @Input({ required: true }) legend!: string;
  @Input({ required: true }) groupName!: string;
  controlContainer = inject(ControlContainer)

  ngOnInit() {
    const parentFormGroup = this.controlContainer.control as FormGroup;

    parentFormGroup.addControl(this.groupName, new FormGroup({
      username: new FormControl(''),
      relation: new FormControl('朋友'),
      phone: new FormControl(''),
    }))
  }
}

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    ContactGroup,
  ],
  template: `
    <form nz-form [formGroup]="formGroup" class="login-form" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your username!">
          <nz-form-label>姓名</nz-form-label>
          <input type="text" nz-input formControlName="username" placeholder="Please input your username" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your phone!">
          <nz-form-label>手机号码</nz-form-label>
          <input type="text" nz-input formControlName="phone" placeholder="Please input your phone" />
        </nz-form-control>
      </nz-form-item>
      <app-contact-group legend="第一联系人" groupName="firstContact"></app-contact-group>
      <app-contact-group legend="第二联系人" groupName="secondContact"></app-contact-group>
      <app-contact-group legend="第三联系人" groupName="thirdContact"></app-contact-group>
      <button nz-button class="form-button form-margin" [nzType]="'primary'">submit</button>
    </form>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;

      form {
        min-width: 600px;

        .form-button {
          margin-top: 8px;
          width: 100%;
        }
      }
    }
  `]
})
export class AppComponent {
  fb = inject(FormBuilder);

  formGroup = this.fb.group({
    username: [],
    phone: [],
  })

  submitForm() {
    console.log(this.formGroup.value);
    // console.log(this.formGroup);
  }
}
