import {Component, inject} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';
import {VehiclesDto} from '../../Models/VehiclesDto';

@Component({
  selector: 'app-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrl: './vehicle-overview.component.css'
})
export class VehicleOverviewComponent {
  ngOnInit(): void {
    this.loadVehicles();
  }
  formIsClosed : boolean = true;
  ServiceVehicle = inject(VehicleService);
  vehicles: VehiclesDto[] = [];

  formVehicle: any = {
    modelName: '',
    vehicleBrandName: ''
  };

  updateFormVehicle: any = {
    updateModelName: '',
    newModelName: '',
    updateBrandName: '',
    newBrandName: ''
  }

  updateFormIsClosed: boolean = true;

  loadVehicles() {
    this.ServiceVehicle.LoadVehicles().subscribe({
      next: data => {
        this.vehicles = (data as VehiclesDto[]).map((v: any) => ({
          id: v.id,
          modelName: v.modelName,
          vehicleBrand: {
            id: v.vehicleBrand.id,
            brandName: v.vehicleBrand.brandName
          }
        }))
        console.log(this.vehicles);
      },
      error: error => console.error('Error loading vehicles:', error)
    });
  }

  openForm() {
    this.formIsClosed = !this.formIsClosed
    this.formVehicle.modelName = '';
    this.formVehicle.vehicleBrandName = '';
  }

  submitVehicleForm() {
    this.ServiceVehicle.AddVehicle(this.formVehicle).subscribe({
      next: () => {
        console.log('Vehicle added successfully');
        this.loadVehicles(); // Refresh vehicle list
        this.formIsClosed = true; // Close the form after success
      },
      error: (error) => {
        console.error('There was an error adding the vehicle:', error);
      }
    });
  }

  submitUpdateForm() {
    this.ServiceVehicle.UpdateVehicle(this.updateFormVehicle).subscribe({
      next: () => {
        console.log('Vehicle updated successfully');
        this.loadVehicles(); // Refresh vehicle list
        this.updateFormIsClosed = true; // Close the form after success
        this.formVehicle.modelName = '';
        this.formVehicle.vehicleBrandName = '';
      },
      error: (error) => {
        console.error('There was an error updating the vehicle:', error);
      }
    });
  }

  cancelAddForm() {
    this.formIsClosed = !this.formIsClosed
  }

  editVehicle(vehicle: VehiclesDto) {
    // Set the fields for updating
    this.updateFormVehicle.updateModelName = vehicle.modelName;
    this.updateFormVehicle.updateBrandName = vehicle.vehicleBrand.brandName;

    this.updateFormVehicle.newModelName = vehicle.modelName;
    this.updateFormVehicle.newBrandName = vehicle.vehicleBrand.brandName;

    // Open the update form
    this.updateFormIsClosed = !this.updateFormIsClosed;
  }

  deleteVehicle(number: number) {
    if(window.confirm("Are you sure you want to delete this vehicle?")){
    this.ServiceVehicle.DeleteVehicle(number).subscribe({
      next: () => {
        console.log('Vehicle deleted successfully');
        this.loadVehicles(); // Refresh vehicle list
      },
      error: (error) => {
        console.error('There was an error deleting the vehicle:', error);
      }
    });
    }
  }

  cancelUpdateForm() {
    this.updateFormIsClosed = !this.updateFormIsClosed
  }
}
