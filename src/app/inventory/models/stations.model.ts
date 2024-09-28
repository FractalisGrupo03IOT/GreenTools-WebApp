export class Station {
  id: number;
  image: string;
  name: string;
  dateCreation: string;

  constructor(id: number, image: string, name: string, dateCreation: string) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.dateCreation = dateCreation;
  }
}
