import { AfterContentChecked, AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fromEvent } from 'rxjs';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';
import { EmployService } from '../employ.service';
import { Employ } from '../modals/employ.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer: any;
  slides: string[] = [
    '/assets/images/image1.jpg',
    '/assets/images/image2.jpg',
    '/assets/images/image3.jpg',
    '/assets/images/image4.jpg',
    '/assets/images/image5.jpg'
  ];

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 600,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      760: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
  };

  employees: Employ[] = [];

  columnToDisplay = ['sn', 'name', 'age', 'contact', 'email', 'skills', 'action'];

  isEdit = false;

  header: any;
  gapFiller: any;
  constructor(
    private $es: EmployService,
    private $dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.header = document.getElementById('header');
    this.gapFiller = document.getElementById('gap-filler');

    fromEvent<Event>(document, 'scroll').subscribe(res => {
      const height = window.pageYOffset;
      if (height > 60) {
        this.header.style.height = '55px';
        this.gapFiller.style.marginTop = '58px';
      } else {
        this.header.style.height = '64px';
        this.gapFiller.style.marginTop = '67px';
      }
    });
  }


  onNavigate(): void {
    this.drawer.close();
  }

  private getEmployees(): void {
    this.$es.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  addEmploy(): void {
    this.openDialog();
  }

  editEmploy(employ: Employ): void {
    this.isEdit = true;
    this.openDialog(employ);
  }

  deleteEmploy(employee: Employ): void {
    const dialogRef = this.$dialog.open(ConfirmBoxComponent, {
      height: 'auto',
      width: '200px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.employees = this.employees.filter(e => e.id !== employee.id);
      }
    });

  }


  private openDialog(data: any = null): void {
    const dialogRef = this.$dialog.open(AddEmployeeComponent, {
      height: 'auto',
      maxHeight: '80vh',
      width: '100%',
      data
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (this.isEdit) {
          this.employees = this.employees.filter(e => e.id !== res.id);
          this.isEdit = false;
        }
        this.employees.push(res);
      }
    });
  }


  calculateAge(dob: string): number {
    const convertAge = new Date(dob);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }



}
