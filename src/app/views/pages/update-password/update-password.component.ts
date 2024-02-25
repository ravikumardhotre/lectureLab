import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  isLoading: boolean = false;
  newPassword: any;
  confirmPassword: any;
  constructor(private router: Router, private utilservice: UtilService, private apiservice: ApiserviceService, public toasterService: ToasterService) {
  }

  ngOnInit(): void {
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
      confirmPassword: this.confirmPassword
    }
    this.isLoading = true;
    try {
      const res = await this.apiservice.updatePassword(param);
      this.isLoading = false
      if (res.data.status) {
        this.toasterService.showSuccess(res.data.message, "");
        window.location.reload();
      }
    } catch (e: any) {
      this.toasterService.showWarning(e.response.data.message, "");
      this.isLoading = false
      if (e.response.status == 401) {
        this.router.navigateByUrl('/login');
      }
    }
  }
}
