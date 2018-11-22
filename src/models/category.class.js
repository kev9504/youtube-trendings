export class CategoryClass {
  id='';
  name='';

  constructor(data) {
    if (!data) {
      return;
    }
    this.id = data[ 'id' ];
    this.name = data.snippet['title'];
  }
}