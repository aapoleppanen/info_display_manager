export type ResidentInfo = {
  residentName: string;
  houseNumber: string;
};

export type ApartmentConfig = {
  [FloorNumber: number]: ResidentInfo[];
}
