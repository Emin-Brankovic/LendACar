import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isElementAccessExpression } from 'typescript';
import {AdminService} from '../../services/administrator.service';
import {Router} from '@angular/router';

interface VehicleCategory {
  id?: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-vehicle-categories',
  templateUrl: './vehicle-category.component.html',
  styleUrls: ['./vehicle-category.component.css']
})
export class VehicleCategoriesComponent implements OnInit {
  adminService=inject(AdminService);
  router=inject(Router);

  vehicleCategories: VehicleCategory[] = [];
  newCategory: VehicleCategory = { name: '', description: '' };
  editMode = false;
  editCategoryId: number | null = null;

  private apiUrl = 'http://localhost:7000/api/VehicleCategory'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<VehicleCategory[]>(`${this.apiUrl}/get`).subscribe(
      (categories) => (this.vehicleCategories = categories),
      (error) => console.error('Failed to fetch categories:', error)
    );
  }

  saveCategory(): void {
    if (this.editMode && this.editCategoryId !== null) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory(): void {
    this.http.post<VehicleCategory>(`${this.apiUrl}/addNew`, this.newCategory).subscribe(
      (category) => {
        this.vehicleCategories.push(category);
        this.resetForm();
      },
      (error) => console.error('Failed to add category:', error)
    );
  }

  updateCategory(): void {
    this.http.put(`${this.apiUrl}/update/${this.editCategoryId}`, this.newCategory).subscribe(
      () => {
        this.loadCategories();
        this.resetForm();
      },
      (error) => console.error('Failed to update category:', error)
    );
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.http.delete(`${this.apiUrl}/remove/${id}`).subscribe(
        () => (this.vehicleCategories = this.vehicleCategories.filter((cat) => cat.id !== id)),
        (error) => console.error('Failed to delete category:', error)
      );
    }
  }

  editCategory(category: VehicleCategory): void {
    this.newCategory = { ...category };
    this.editMode = true;
    this.editCategoryId = category.id || null;
  }

  onIconChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {

      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    this.newCategory = { name: '', description: '' };
    this.editMode = false;
    this.editCategoryId = null;
  }

  saveButton(): void{
    if(this.editMode == true)
    {
      this.updateCategory();
    }
    else{
      this.addCategory();
    }
  }
}
