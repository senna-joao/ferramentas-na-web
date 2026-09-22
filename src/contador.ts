let mainDiv: Element 

let contValue = 0

const validKeys = new Map<string, () => void>([
	['+', () => {
		contValue++
		updateValue()
	}],
	['-', () => {
		contValue--
		updateValue()
	}],
	['Delete', () => {
		contValue = 0
		updateValue()
	}]
])

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

const createButton = (buttonsDiv: HTMLElement, buttonText: string, CSSclass: string, clickEventCallback: () => void) => {
	const button = document.createElement('button')
	button.setAttribute('class', CSSclass)
	button.innerHTML = buttonText 
	button.addEventListener('click', clickEventCallback)
	buttonsDiv.appendChild(button)
}

const createButtonsDiv = () => {
	const upperDiv = document.createElement('div')
	const buttonsDiv = document.createElement('div')
	buttonsDiv.setAttribute('id', 'buttons-div ')
	upperDiv.appendChild(buttonsDiv)
	mainDiv?.appendChild(upperDiv)

	createButton(buttonsDiv, '+', 'btn btn-success col-lg-3 col-12 my-2 me-2', validKeys.get('+')!)
	
	createButton(buttonsDiv, '-', 'btn btn-primary col-lg-3 col-12 my-2 me-2', validKeys.get('-')!)

	createButton(buttonsDiv, 'Reset', 'btn btn-danger col-lg-3 col-12 my-2', validKeys.get('Delete')!)
}



const keyBoardEventHandler = (event: KeyboardEvent) => {
	const key = event.key

	if (validKeys.has(key)) {	validKeys.get(key)!()	}
}


export const contador = (div: Element) => {
	mainDiv = div  
	inputFieldCreator()
	createButtonsDiv()

	window.addEventListener('keydown', keyBoardEventHandler)
}
