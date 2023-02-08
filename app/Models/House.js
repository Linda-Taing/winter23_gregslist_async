export class House {

  constructor(data) {
    this.id = data.id || ''
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description


  }
  get HouseCard() {
    return `
        <div class="col-md-4 mb-3">
          <div class="card">
            <img src="${this.imgUrl}" class="card-img-top car-img"
              alt="car">
            <div class="card-body">
              <div class="card-title fs-5">This home has ${this.bedrooms + ' bathrooms and ' + this.bathrooms} bathrooms.</div>
              <p>${this.description ? this.description : "Could be your new 🏡"}</p>
              <div class="d-flex justify-content-between">
              <button class="btn ms-1 btn-danger" type="button" onclick="app.housesController.removeHouse('${this.id}')">Delete House!</button>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn ms-1 btn-info" type="button" onclick="app.housesController.drawForm('${this.id}')">Edit Home!</button>
              </div>
              </div>
          </div>
        </div>
        `
  }

  static FormButton() {
    return `
        <button onclick="app.housesController.drawForm()" class="btn btn-success ms-3 mb-2" data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <i class="mdi mdi-plus"></i>
        </button>
        `
  }
  static HouseForm(editable) {
    if (!editable.id) {
      editable = new House({
        bedrooms: 3,
        bathrooms: 2,
        levels: 1,
        imgUrl: 100,
        year: 2000,
        price: 200000,
        description: ''
      })

    }

    return `
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form ${editable.id ? `onsubmit="app.housesController.editHouse('${editable.id}')"` : 'onsubmit="app.housesController.createHouse()"'}>
            <div class="modal-body">
              <div class="mb-3">
                <label for="bedrooms" class="form-label">bedrooms</label>
                <input required type="number" value="${editable.bedrooms}" class="form-control" id="make" placeholder= "number of bedrooms" name="bedrooms">
              </div>
              <div class="mb-3">
                <label for="bathrooms" class="form-label">bathrooms</label>
                <input required type="number" value="${editable.bathrooms}" class="form-control" id="model" placeholder="number of bathrooms..." name="bathrooms">
              </div>
              <div class="mb-3">
                <label for="levels" class="form-label">levels</label>
                <input required type="number" value="${editable.levels}" class="form-control" id="levels" placeholder="number of levels" name="level">
              </div>
              <div class="mb-3">
                <label for="imgUrl" class="form-label">imgUrl</label>
                <input required type="text" value="${editable.imgUrl}" class="form-control" id="imgUrl" placeholder="imgUrl..." name="imgUrl">
              </div>
              <div class="mb-3">
            <label for="year" class="form-label">year</label>
            <input required type="number" value="${editable.year}" class="form-control" id="year" placeholder="year..." name="year">
          </div>
              <div class="mb-3">
                <label for="price" class="form-label">price</label>
                <input required type="number" value="${editable.price}" class="form-control" id="price" placeholder="price..." name="price">
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">description</label>
                <textarea name="description" class="form-control" id="description" rows="3">
                ${editable.description}
                </textarea>
              </div>

              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        `
  }
}


