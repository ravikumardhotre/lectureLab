import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss']
})
export class UpdateUsersComponent {
  isLoading:boolean=false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  selectedUser: any;
  allUserData: any;

  firstName: any;
  lastName: any;
  emailId: any;
  mobileNo:any;
  roleSelect: any = '0';
  userData: any = localStorage.getItem('userDetails');
  userDetails: any = JSON.parse(this.userData);

  newPassword: any;
  confirmPassword: any;


  constructor(private router: Router, private NgbModal: NgbModal, private utilservice: UtilService, private apiservice: ApiserviceService, public toasterService: ToasterService) {
  }

  async ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }

    await this.getUserData();
  }

  async getUserData() {
    this.isLoading = true
    try {
      const res = await this.apiservice.getUsers();
      this.allUserData = res.data.data;
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

  async openLgModal(content: TemplateRef<any>, users: any) {
    this.selectedUser = users
    this.firstName = users.firstName
    this.lastName = users.lastName;
    this.emailId = users.email
    this.mobileNo = users.mobileNo;
console.log(users,"users")
    this.NgbModal.open(content, { size: 'lg' }).result.then((result: any) => {
    }).catch((res: any) => { });
  }

  async openLgModalPassword(content: TemplateRef<any>, users: any) {
    this.newPassword = '';
    this.confirmPassword = '';
    this.selectedUser = users

    this.NgbModal.open(content, { size: 'lg' }).result.then((result: any) => {
    }).catch((res: any) => { });
  }

  async updateUser() {
    if (!this.firstName) {
      this.toasterService.showWarning("Please enter first name", "");
      return;
    }

    if (!this.lastName) {
      this.toasterService.showWarning("Please enter last name", "");
      return;
    }

    if (!this.emailId) {
      this.toasterService.showWarning("Please enter email id", "");
      return;
    }

    const validateEmail = await this.utilservice.validateEmail(this.emailId);
    if (!validateEmail) {
      this.toasterService.showWarning("Please enter valid email id", "");
      return;
    }

    if (!this.mobileNo) {
      this.toasterService.showWarning("Please enter mobile Number", "");
      return;
    }

    const validateMobileNO = await this.utilservice.IsMobileNumber(this.mobileNo);
    if (!validateMobileNO) {
      this.toasterService.showWarning("Please enter valid mobile no", "");
      return;
    }

    let param = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.emailId,
      mobileNo: this.mobileNo,
      id:this.selectedUser.id
    }
    console.log(param);
    

    this.isLoading = true;


    try {
      const res = await this.apiservice.updateUsers(param);
    this.isLoading = false
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message, "");
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message, "");
    this.isLoading = false
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  async updateUserPassword() {
    if (!this.newPassword) {
      this.toasterService.showWarning("Please enter password", "");
      return;
    }

    const validatePassword1 = await this.utilservice.validatePassword(this.newPassword);
    if (!validatePassword1) {
      this.toasterService.showWarning("In new password field need minimum 8 characters in length and At least one uppercase and At least one lowercase and At least one digit and At least one special character", "");
      return;
    }

    if (!this.confirmPassword) {
      this.toasterService.showWarning("Please enter Confirm Password", "");
      return;
    }

    const validatePassword2 = await this.utilservice.validatePassword(this.confirmPassword);
    if (!validatePassword2) {
      this.toasterService.showWarning("In confirm password field need minimum 8 characters in length and At least one uppercase and At least one lowercase and At least one digit and At least one special character", "");
      return;
    }

    if (this.newPassword != this.confirmPassword) {
      this.toasterService.showWarning("Password missmatch", "");
      return;
    }

    let param = {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
      id: this.selectedUser.id
    }
    this.isLoading = true;

    try {
      const res = await this.apiservice.updateUsersPassword(param);
    this.isLoading = false
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message,"");
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showError(e.response.data.message,"");
    this.isLoading = false
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }
}
