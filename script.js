function showSidebar(e){
	e.preventDefault()
	const sidebar = document.querySelector('.sidebar')
	sidebar.style.display = 'flex'
}
function hideSidebar(e){
	e.stopPropagation() // prevent the event from bubbling up to other elements
	e.preventDefault()
	const sidebar = document.querySelector('.sidebar')
	sidebar.style.display = 'none'
}

const fileList = document.getElementById('fileList')
const fileInput = document.getElementById('attachments')
const uploadedFiles = [] // Array to hold files
fileInput.addEventListener('change', function(event) {
	const files = event.target.files
	// Debug file input
	if (files.length > 0) {
			console.log('Files selected:', files)
	} else {
			console.log('No files selected')
	}
	// Loop through selected files and add them to the uploadedFiles array
	for (const file of files) {
		uploadedFiles.push(file) // Store the file in the array

		const listItem = document.createElement('li')
		const text = document.createElement('span')
		text.textContent = file.name // Display the file name
		text.className = 'filename'
		listItem.appendChild(text)

		// Create delete button
		const deleteButton = document.createElement('button')
		deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>'
		deleteButton.className = 'delete-button'
		deleteButton.addEventListener('click', function() {
			fileList.removeChild(listItem) // Remove the file from the list
			const index = uploadedFiles.indexOf(file)
			if (index > -1) {
					uploadedFiles.splice(index, 1) // Remove the file from the array
			}
		})
		listItem.appendChild(deleteButton)

		fileList.appendChild(listItem)
	}

	// Clear input to allow for re-selection of the same files
	fileInput.value = ''
})

document.getElementById('contact-form')
	.addEventListener('submit', async function(event) {
		event.preventDefault() // prevent the default form submission behavior

		// // Get form data
		// const formData = new FormData(event.target)
		
		// // Convert FormData to JSON
		// const formDataObj = {}
		// formData.forEach((value, key) => {
		// 	formDataObj[key] = value
		// })
		// Get form data including files
		// this will include all fields, including file attachments
		const formData = new FormData(event.target)

		// Log the formData content for debugging
		for (let [key, value] of formData.entries()) {
			console.log(key, value)
		}


		// Send POST request to your server
		try {
			const response = await fetch('https://api.honingovanie.ru/enquiry', {
					method: 'POST',
					// headers: {
					// 	'Content-Type': 'application/json' // send the data as JSON
					// },
					// body: JSON.stringify(formDataObj) // convert form data to JSON string
					body: formData // send the FormData object directly
			})

			if (response.ok) {
					// If the server returns a success response
					alert('Form submitted successfully!')
			} else {
					// If there was an error
					alert('Failed to submit form')
			}
		} catch (error) {
			alert('Error: ' + error.message)
		}
	})

// выбираем все миниатюры галереи
const galleryItems = document.querySelectorAll('.gallery-item img')
const overlay = document.getElementById('overlay')
const overlayImg = document.getElementById('overlay-img')
const closeOverlay = document.getElementById('close-overlay')

// функция для отображения увеличенного изображения
galleryItems.forEach(item => {
	item.addEventListener('click', () => {
		// получаем путь к полноразмерному изображению
		const fullSizeSrc = item.getAttribute('data-full')
		overlayImg.src = fullSizeSrc
		overlay.classList.remove('hidden') // показываем оверлей
	})
})

// закрытие оверлея
closeOverlay.addEventListener('click', () => {
	overlay.classList.add('hidden')
	overlayImg.src = '' // убираем src, чтобы избежать задержки при повторном открытии
})

// закрытие оверлея при клике вне изображения
overlay.addEventListener('click', (e) => {
	if (e.target === overlay) {
		overlay.classList.add('hidden')
		overlayImg.src = ''
	}
})