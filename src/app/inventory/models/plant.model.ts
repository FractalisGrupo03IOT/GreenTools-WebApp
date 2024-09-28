export class Plant {
  id: number;
  image: string;
  name: string;
  station_id: number;

  constructor(id: number, image: string, name: string, station_id: number) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.station_id = station_id;
  }
}
