
class NetManager {
	constructor(dataManager, navManager) {
		this.dataManager = dataManager;
		this.navManager = navManager;
		this.url = 'http://localhost:3000/';
	}

	init() {
		this.requestData();
	}


	requestData() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'data', true);
		request.setRequestHeader("Access-Control-Allow-Origin", "*");
		request.onreadystatechange = this.requestDataCallback.bind(this);
		request.send();
	}


	requestDataCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var data = JSON.parse(request.responseText);

				var places = data.response.groups[0].items;

				places.forEach(element => {
					this.dataManager.places.push(element);
				});
				this.navManager.showPlaces();
				this.requestPostNewVenue(places);
				// this.putVenue(places);
			} else {
				console.log('Error on request');
			}
		}
	}

	sendNewVenue(event) {
		var request = event.target;
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				this.requestData();
			} else {
				console.log('Error on request', request.status);
			}
		}
	}

	requestPostNewVenue(places) {

		var venuesUpdate = [];
		var newVenueUpdate = {};

		places.forEach(element => {

			var element = element.venue;

			newVenueUpdate.id = element.id;
			newVenueUpdate.name = element.name;
			newVenueUpdate.address = element.location.address;
			newVenueUpdate.lat = element.location.lat;
			newVenueUpdate.lng = element.location.lng;

			// '{ "id":' + JSON.stringify(element.id)
			// + ', "name":' + JSON.stringify(element.name)
			// + ', "address":' + '"' + element.location.address + '"'
			// + ', "lat":' + '"' + element.location.lat + '"'
			// + ', "lng":' + '"' + element.location.lng + '"' + '}';

			venuesUpdate.push(newVenueUpdate);

		});

		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'data', true);
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		// request.onreadystatechange = this.sendNewVenue.bind(this);
		request.send(JSON.stringify(venuesUpdate));
	}
}
