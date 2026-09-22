import { contador } from "./contador"


const mainDiv = document.querySelector('#main')
const titleElement = document.createElement('h2')
const path = window.location.href

const tools = ['Counter', 'Time-Calculator']

const createTitle = (title: string) => {
	titleElement.setAttribute('class', 'justify-text-center')
	titleElement.innerHTML = title 
	mainDiv?.appendChild(titleElement)
}

const clearMainDiv = () => {
	mainDiv?.replaceChildren()
}

const pushRoute = (tool: string) => {
	window.history.pushState(null, '', `/${tool}`)
}

const toolChooser = (tool: string) => {
	if (mainDiv) {
		switch (tool) {
			case 'Counter':
				clearMainDiv()
				createTitle('Contador')
				contador(mainDiv)
				pushRoute(tool)
			
			case 'Time-Calculator':

		}
	}
}

const buildChooser = () => {
	clearMainDiv()
	const toolPath = path.split('/')
	if (toolPath.length > 3 && tools.includes(toolPath[3]!) ) {
		toolChooser(toolPath[3]!)
 } else {
		toolChooser(toolPath[3]!);
	
		createTitle('Ferramentas disponíveis')

		const upperDiv = document.createElement('div')
		const selectionDiv = document.createElement('div')
		selectionDiv.setAttribute('id', 'selection-div')
		upperDiv.appendChild(selectionDiv)
		mainDiv?.appendChild(upperDiv)

		tools.forEach(tool => {
			const button = document.createElement('button')
			button.setAttribute('class', 'btn btn-success col-lg-3 col-12 my-2 me-2')
			button.innerHTML = tool
			button.addEventListener('click', () => toolChooser(tool))
			selectionDiv.appendChild(button)
		})
	}
}

window.addEventListener('popstate', buildChooser)


buildChooser()