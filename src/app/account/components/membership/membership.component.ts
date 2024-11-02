import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../../public/components/toolbar/toolbar.component";
import { HttpClient } from "@angular/common/http";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { PurchaseDialogComponent } from "../purchase-dialog/purchase-dialog.component";
import {Plan} from "../../models/plan.enum";

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    DatePipe,
    MatCardTitle,
    NgIf,
    TitleCasePipe,
  ],
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  hasMembership: boolean = false;
  membershipPlan: string = '';
  subscriptionExpiration: Date | null = null;
  userId: number = parseInt(localStorage.getItem('user_id') || '0', 10);
  Plan = Plan;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checkMembership();
  }

  checkMembership(): void {
    this.http.get<any>(`https://fractalisbackend-production.up.railway.app/api/v1/payment`)
      .subscribe(response => {
        const userMembership = response.find((payment: any) => payment.user_id === this.userId);
        if (userMembership) {
          this.hasMembership = true;
          this.membershipPlan = userMembership.plan;

          // Asigna la fecha de expiración desde la respuesta
          const expirationDateString = userMembership.datePayment.expirationDate; // '2028-08-01'
          this.subscriptionExpiration = new Date(expirationDateString);
        }
      }, error => {
        console.error('Error al verificar la membresía:', error);
      });
  }

  openPurchaseDialog(plan: Plan): void {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      width: '1000px',
      height: '700px',
      data: { userId: this.userId, plan: plan }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkMembership();
      }
    });
  }
}
