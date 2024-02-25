import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-assigned-batches',
  templateUrl: './all-assigned-batches.component.html',
  styleUrls: ['./all-assigned-batches.component.scss']
})
export class AllAssignedBatchesComponent {
  isLoading:boolean=false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  selectedUser: any;
  allAssigned: any;
  userDetails: any;
  userData: any;



  constructor(private router: Router, private NgbModal: NgbModal, private utilservice: UtilService, private apiservice: ApiserviceService, public toasterService: ToasterService) {
    this.userData = localStorage.getItem('userDetails');
    this.userDetails= JSON.parse(this.userData);
  }

  async ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }

    await this.getAllAssignedBatches();
  }

  async getAllAssignedBatches() {
    this.isLoading = true
    try {
      const res = await this.apiservice.getAssignedBatches({instructorId: this.userDetails._id});
      this.allAssigned = res.data;
    this.isLoading = false
      this.dtTrigger.next('');
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message,"");
    this.isLoading = false
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

 
}
