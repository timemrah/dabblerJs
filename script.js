dab.event('#startBtn', 'click', (e) => {

	const value = dab.intVal('#sayi1') + dab.intVal('#sayi2')
	dab.setHtml('#result', value)

})