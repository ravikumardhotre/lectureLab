
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { Subject } from 'rxjs';
import { ApiserviceService } from '../../../services/apiservice.service';
import { UtilService } from '../../../services/util.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assign-batched-to-course',
  templateUrl: './assign-batched-to-course.component.html',
  styleUrls: ['./assign-batched-to-course.component.scss']
})
export class AssignBatchedToCourseComponent {
  isLoading: boolean = false;
  courseId: any;
  
  allCourse: any;
  Batch: any;
  instructorList: any;
  allBatches: { name: string; id: number; }[];


  constructor(private router: Router, private utilservice: UtilService, private apiservice: ApiserviceService, public toasterService: ToasterService) {
this.allBatches=[
  {
    name:"regular",
    id:1
  },
  {
    name:"weekend",
    id:2
  },

]
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
      this.isLoading = false;
    } catch (e: any) {
      this.isLoading = false;
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

 
  async assignBatch() {
    if (!this.courseId) {
      this.toasterService.showWarning("Please enter course name", "");
      return;
    }
    if (!this.Batch) {
      this.toasterService.showWarning("Please enter batch", "");
      return;
    }
    
    this.isLoading = true;

    try {
    let param={
      courseId: this.courseId,
      batchName: JSON.stringify(this.Batch)
    }
      const res = await this.apiservice.assignbatchtocourse(param);
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
}
