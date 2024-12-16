import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  averageRating: number;
  createdDate: string;
  birthDate: string;
  city: string;
}

interface VerificationRequest {
  id: number;
  requestDate: string;
  user: User;
  requestComment: string | null;
  employeeId: number | null;
}

@Component({
  selector: 'app-verification-request',
  templateUrl: './verification-request.component.html',
  styleUrls: ['./verification-request.component.css']
})
export class VerificationRequestComponent implements OnInit {
  requests: VerificationRequest[] = [];
  filteredRequests: VerificationRequest[] = [];
  selectedRequest: VerificationRequest | null = null;
  filter: string = 'all';
  employeeId: number = 1; // Placeholder for logged-in employee's ID

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.http.get<VerificationRequest[]>('/api/verification-requests').subscribe(
      (data) => {
        this.requests = data;
        this.filterRequests();
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  filterRequests(): void {
    if (this.filter === 'active') {
      this.filteredRequests = this.requests.filter((req) => req.employeeId === null);
    } else if (this.filter === 'approved') {
      this.filteredRequests = this.requests.filter((req) => req.employeeId !== null);
    } else {
      this.filteredRequests = this.requests;
    }
  }

  selectRequest(request: VerificationRequest): void {
    this.selectedRequest = request;
  }

  approveRequest(requestId: number): void {
    this.http.put(`/api/verification-requests/${requestId}/approve`, { employeeId: this.employeeId }).subscribe(
      () => {
        const request = this.requests.find((req) => req.id === requestId);
        if (request) {
          request.employeeId = this.employeeId;
        }
        this.filterRequests();
        this.selectedRequest = null;
      },
      (error) => {
        console.error('Error approving request:', error);
      }
    );
  }

  deleteRequest(requestId: number): void {
    this.http.delete(`/api/verification-requests/${requestId}`).subscribe(
      () => {
        this.requests = this.requests.filter((req) => req.id !== requestId);
        this.filterRequests();
        this.selectedRequest = null;
      },
      (error) => {
        console.error('Error deleting request:', error);
      }
    );
  }
}

