import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { Subject } from 'rxjs';
import { ApiserviceService } from '../../../services/apiservice.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent {
  isLoading: boolean = false;
  courseName: any;
  courselevel: any;
  courseDescription: any;
  image_FileList: any = [];
  allCourse: any;
  selectedDept: any;
  selectedcourse: any;


  constructor(private router: Router, private NgbModal: NgbModal, private utilservice: UtilService, private apiservice: ApiserviceService, public toasterService: ToasterService) {

  }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  async ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      //   lengthMenu: [
      //     [5, 10, 25, 50, -1 ],
      //     [ '5 rows','10 rows', '25 rows', '50 rows', 'Show all' ]
      // ],
    }
   await this.getcoursesData()
  }

  async getcoursesData() {
    this.isLoading = true;
    try {
      const res = await this.apiservice.getcourses();
      this.allCourse = res.data.data;
      console.log(this.allCourse)
      this.isLoading = false;
      this.dtTrigger.next('');
    } catch (e: any) {
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  getImages(event: any) {
    this.image_FileList = event.target.files;
    console.log(this.image_FileList);
  }
  async addCourse() {
    if (!this.courseName) {
      this.toasterService.showWarning("Please enter course name", "");
      return;
    }
    if (!this.courselevel) {
      this.toasterService.showWarning("Please enter course level", "");
      return;
    }
    if (!this.courseDescription) {
      this.toasterService.showWarning("Please enter course description", "");
      return;
    }
 

   
    this.isLoading = true;

    try {
    var bodyFormData = new FormData();
    bodyFormData.append('name', this.courseName);
    bodyFormData.append('level', this.courselevel);
    bodyFormData.append('description', this.courseDescription);

      if (this.image_FileList.length > 0) {
        for (let i = 0; i < this.image_FileList.length; i++) {
          let file: File = this.image_FileList[i];
          console.log(file);
          bodyFormData.append('file', file, file.name);
        }
      }
      const res = await this.apiservice.addcourse(bodyFormData);
      this.isLoading = false;
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message, "");
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, "");
      this.isLoading = false;

      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }
  async updateCourse() {
    if (!this.courseName) {
      this.toasterService.showWarning("Please enter meeting course name", "");
      return;
    }
    let param = {
      name: this.courseName,
      isActive: 1,
      id: this.selectedcourse.id
    }
    this.isLoading = true;

    try {
      const res = await this.apiservice.updatecourse(param);
      this.isLoading = false;
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message, "");
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, "");
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async deleteCourse(d: any) {

    let param = {
      name: d.name,
      isActive: 0,
      id: d.id
    }
    this.isLoading = true;

    try {
      const res = await this.apiservice.updatecourse(param);
      this.isLoading = false;
      if (res.data.status) {
        this.toasterService.showSuccess('course deleted succesfully', "");
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, "");
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async openLgModalAdd(content: TemplateRef<any>, d: any) {
    this.selectedcourse = d
    this.courseName = d.name
  
    this.NgbModal.open(content, {backdrop:'static'}).result.then((result: any) => {
      this.courseName=''
    }).catch((res: any) => { });
    
  }

}
