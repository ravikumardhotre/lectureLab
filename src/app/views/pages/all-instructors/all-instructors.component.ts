import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-instructors',
  templateUrl: './all-instructors.component.html',
  styleUrls: ['./all-instructors.component.scss'],
})
export class AllInstructorsComponent {
  allInstructors: any;
  isLoading: boolean;
  allCourse: any;
  selectedUser: any;
  instructorId: any;
  courseId: any;
  batchName: any;
  allBatches: { name: string; id: number }[];
  Batch: any;
  courseName: any;
  assignedDate: Date;
  allAssignedBatches: any;

  constructor(
    private router: Router,
    private NgbModal: NgbModal,
    private utilservice: UtilService,
    private apiservice: ApiserviceService,
    public toasterService: ToasterService
  ) {
  
  }

  async ngOnInit() {
    await this.getInstructorData();
  }
  async getcoursesData() {
    this.isLoading = true;
    try {
      const res = await this.apiservice.getcourses();
      this.allCourse = res.data.data;
      this.isLoading = false;
    } catch (e: any) {
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async getInstructorData() {
    this.isLoading = true;
    try {
      const res = await this.apiservice.getInstructorData();

      this.allInstructors = res.data;
      console.log(this.allInstructors, res);
      this.isLoading = false;
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, '');
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async delete(instructor: any) {
    this.isLoading = true;
    try {
      const res = await this.apiservice.deleteInstructor({
        instructorId: instructor._id,
      });
      this.isLoading = false;
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message, '');
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, '');
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async openLgModal(content: TemplateRef<any>, instructor: any) {
    this.selectedUser = instructor;
    this.instructorId = instructor._id;

    await this.getcoursesData();
    this.NgbModal.open(content, { backdrop: 'static' })
      .result.then((result: any) => {})
      .catch((res: any) => {});
  }

  async assignBatch() {
    if (!this.courseId) {
      this.toasterService.showWarning('Please enter course name', '');
      return;
    }
    if (!this.Batch) {
      this.toasterService.showWarning('Please enter batch', '');
      return;
    }
    if (!this.assignedDate) {
      this.toasterService.showWarning('Please seelect date', '');
      return;
    }

    this.isLoading = true;

    try {
      let param = {
        courseId: this.courseId,
        batchName: this.Batch,
        date: this.assignedDate,
        instructorId: this.instructorId,
      };
      const res = await this.apiservice.assignBatch(param);
      this.isLoading = false;
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message, '');
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, '');
      this.isLoading = false;

      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async openLgModalview(content: TemplateRef<any>, instructor: any) {
    this.selectedUser = instructor;
    this.instructorId = instructor._id;
    try {
      const res = await this.apiservice.getAssignedBatches({
        instructorId: this.instructorId,
      });
      this.allAssignedBatches = res.data;
      this.isLoading = false;
      
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, '');
      this.isLoading = false;

      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
    this.NgbModal.open(content, { backdrop: 'static' })
      .result.then((result: any) => {})
      .catch((res: any) => {});
  }

  async getBatch(courseId:any){
   
    this.isLoading = true;
    try {
      const res = await this.apiservice.getBatch({courseId:courseId});
      this.allBatches = res.data
      if(res.data.length==0){
        this.Batch = null
        this.toasterService.showWarning('No Batch Found', '');
        return;
      }
      this.isLoading = false;
    } catch (e: any) {
      
      this.toasterService.showError(e.response.data.message, '');
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }
}
