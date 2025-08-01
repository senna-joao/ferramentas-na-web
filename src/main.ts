const mainDiv = document.querySelector('#main')

let contValue = 0

const inputFieldCreator = () => {
	const inputField = document.createElement('input')
	inputField.setAttribute('type', 'number')
	inputField.setAttribute('id', 'input-field')
	inputField.setAttribute('class', 'form-control text-end my-2')
	inputField.value = String(contValue)
	inputField.setAttribute('readonly', '')
	mainDiv?.appendChild(inputField)
}

const updateValue = () => {
		const inputField: HTMLInputElement | null = document.querySelector('#input-field')
		if ( inputField) { inputField.value = String(contValue) } 
}

const createAddButton = (buttonsDiv: HTMLElement) => {
	const button = document.createElement('button')
	button.setAttribute('class', 'btn btn-primary col-lg-3 col-12 my-2 me-2')
	button.innerHTML = 'Add'
	button.addEventListener('click', () => {
		contValue++
		updateValue()
	})

	buttonsDiv.appendChild(button)
}

const createResetButton = (buttonsDiv: HTMLElement) => {
	const button = document.createElement('button')
	button.setAttribute('class', 'btn btn-danger col-lg-3 col-12 my-2')
	button.innerHTML = 'Reset'
	button.addEventListener('click', () => {
		contValue = 0
		updateValue()
	 })

	buttonsDiv.appendChild(button)
}

const createButtonsDiv = () => {
	const upperDiv = document.createElement('div')
	const buttonsDiv = document.createElement('div')
	buttonsDiv.setAttribute('id', 'buttons-div ')
	upperDiv.appendChild(buttonsDiv)
	mainDiv?.appendChild(upperDiv)
	
	createAddButton(buttonsDiv)
	createResetButton(buttonsDiv)
}

const createTitle = () => {
	const title = document.createElement('h2')
	title.setAttribute('class', 'justify-text-center')
	title.innerHTML = 'Contador'
	mainDiv?.appendChild(title)
}


const main = () => {
	createTitle()
	inputFieldCreator()
	createButtonsDiv()
}

main()