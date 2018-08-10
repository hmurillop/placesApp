
class NavManager {
	constructor(dataManager) {
		this.dataManager = dataManager;
		this.dataComponent = document.getElementById('dataComponent');
	}

	showPlaces() {
		this.dataManager.places.forEach(place => {
			// var dataComponent = new DataComponent(place, this.dataComponent, this.dataManager);
		});
	}
}