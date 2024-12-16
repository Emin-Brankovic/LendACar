import {VehicleBrandDto} from './VehicleBrandDto';

export interface VehiclesDto {
  id: number;
  modelName: string;  // Use camelCase
  vehicleBrand: VehicleBrandDto;  // Use camelCase
}
