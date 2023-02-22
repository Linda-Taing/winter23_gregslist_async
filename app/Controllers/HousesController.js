import { setText } from "../Utils/Writer.js"
import { Pop } from "../Utils/Pop.js"
import { appState } from "../AppState.js"
import { housesService } from "../Services/HousesService.js"
import { setHTML } from "../Utils/Writer.js"
import { House } from "../Models/House.js"
import { getFormData } from "../Utils/FormHandler.js"


function _drawHouses() {
    let template = ''
    appState.houses.forEach(h => template += h.HouseCard)
    setHTML('listings', template)

}


export class HousesController {

    constructor() {
        this.getHouses()
        console.log('[HOUSE CONTROLLER]')
        // this.show()
        appState.on('houses', _drawHouses)
    }
    show() {
        setText('add-listing-button', '🏡 A new Home?')
        _drawHouses()
    }
    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async createHouse() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            // NOTE make sure your form data is formatted correctly to work with your API!!!
            console.log(formData);
            await housesService.createHouse(formData)
        } catch (error) {
            console.error(error)
            Pop.error(error.message)
        }
    }
    async removeHouse(houseId) {
        try {
            if (await Pop.confirm()) {
                await housesService.removeHouse(houseId)
            }
        } catch (error) {
            console.error(error)
            Pop.error(error.message)
        }
    }
    async editHouse(houseId) {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            console.log(formData);
            await housesService.editHouse(formData, houseId)
        } catch (error) {
            console.error(error)
            Pop.error(error.message)
        }
    }

    drawForm(houseId) {
        try {
            if (houseId) {
                let house = appState.houses.find(house => house.id == houseId)
                setHTML('modal-content', House.HouseForm(house))
            }
            else {
                setHTML('modal-content', House.HouseForm({}))
            }
        } catch (error) {
            console.error(error)
            Pop.error(error.message)
        }
    }
}