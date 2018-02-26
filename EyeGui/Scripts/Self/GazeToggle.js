navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

if (navigator.getUserMedia) {
	navigator.getUserMedia({
		audio: false, // nie chcemy mieć dźwięku z mikrofonu
		video: { // chcemy mieć wideo o określonych maksymalnych wymiarach
			optional: [],
			mandatory: {
				maxWidth: 1280,
				maxHeight: 720
			}
		}
	}, function (stream) { // funkcja sukcesu (success callback)
		// zmieniamy źródło danych w tagu video
		document.getElementById('video').src = window.URL.createObjectURL(stream);
		// ukrywamy przycisk
		//screenShareButton.classList.add('hidden');
	}, function () { // funkcja z obsługą błędu
		alert('Niemożliwe jest pokazanie obrazu z kamer y. Prawdopodobnie korzystasz z przeglądarki, która nie posiada tej funkcjonalności');
	});
};

navigator.mediaDevices.getUserMedia(constraints)
	.then(function (stream) {
		webgazer.setGazeListener(function (data, elapsedTime) {
			var xprediction = data.x;
			var yprediction = data.y;
		}).begin();
	})
	.catch(function (err) {
		/* handle the error */
	});
