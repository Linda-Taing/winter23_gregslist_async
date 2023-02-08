import { sandboxApi } from "./AxiosService.js";
import { House } from "../Models/House.js";
import { appState } from "../AppState.js";




class HousesService {
    async getHouses() {
        const response = await sandboxApi.get('/houses')
        console.log('[Get Houses]', response.data);
        appState.houses = response.data.map(house => new House(house))

    }
    async createHouse(formData) {
        const res = await sandboxApi.post('/houses', formData)
        console.log('[create house]', res.data);
        let actualHouse = new House(res.data)
        appState.houses.push(actualHouse)
        appState.emit('houses')
    }
    async removeHouse(houseId) {
        const res = await sandboxApi.delete('/houses/' + houseId)
        console.log('[removing house]', res.data);
        appState.houses = appState.houses.filter(house => house.id != houseId)
    }
    async removeHouse(houseId) {
        const res = await sandboxApi.delete('/houses/' + houseId)
        console.log('[removing 🏡]', res.data);
        appState.houses = appState.houses.filter(house => house.id != houseId)
    }
    async editHouse(formData, houseId) {
        const res = await sandboxApi.put(`/houses/${houseId}`, formData)
        console.log('[edit house]', res.data);
        let oldHouseIndex = appState.houses.findIndex(h => h.id = houseId)
        appState.houses.splice(oldHouseIndex, 1, new House(res.data))
        appState.emit('houses')
    }

}

export const housesService = new HousesService()