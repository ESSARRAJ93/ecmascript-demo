import Student from "./student.js";

const filters = {
    'column': 'name',
    'desc': true
}
let initial_loading = true

const onDisplay = async function() {
    return Student.onList().then(function(response){
        response.sort((a,z) => {
            console.log(typeof a[filters.column])
            if(typeof a[filters.column] === 'number')
                return filters.desc ? z[filters.column] - a[filters.column] : a[filters.column] - z[filters.column]
            return filters.desc ? z[filters.column].localeCompare(a[filters.column]) : a[filters.column].localeCompare(z[filters.column])
        })
        return response.map(data => {
            const {id, name, birthday, note} = data
            const student = new Student(name, birthday, note)
            return `
                <tr class="border-b">
                    <td class="py-3 px-6 text-left">${id}</td>
                    <td class="py-3 px-6 text-left">${student.name}</td>
                    <td class="py-3 px-6 text-left">${student.onGetAge()} Years old</td>
                    <td class="py-3 px-6 text-left"> <span class="rounded-full ${student.is_admitted() ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} px-3 py-1">${student.note} / ${Student.max_point}</span> </td>
                    <td class="flex py-3 px-6 text-center justify-center items-center gap-3">
                        <button class="text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        </button>
                        <button class="text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>

                        </button>
                        <button class="text-red-400 delete" data-id="${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                        </svg>

                        </button>
                    </td>
                </tr>
            `
        })
    })
}

const onCreate = function(event) {
    event.preventDefault()
    const [name, birthday, note] = document.querySelectorAll('#name, #birthday, #note')
    const student = Student.onCreate(name.value, birthday.value, note.value)
    console.log(student)
}

window.onDelete = function(id) {
    Student.onDelete(id).then(() => alert('Student is deleted'))
}

window.filterToggler = () => {
    filters.desc = !filters.desc
    clearFilter()
    onFilter(filters.column)
    onRender()
}

window.clearFilter = () => {
    document.querySelectorAll('.filter-element span').forEach(span => {
        span.innerHTML = ''
    })

    document.querySelectorAll('.filter-element').forEach(attr => {
        attr.classList.remove('flex', 'gap-2', 'items-center')
    })

}

const onFilter = function(column) {

    if(filters.column === column){
        const element = document.querySelector('.filter-element[data-column="'+ column + '"] span')
        document.querySelector('.filter-element[data-column="'+ column + '"]').classList.add('flex', 'gap-2', 'items-center')
        element.innerHTML = `
        <button>
            ${!filters.desc
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>'}
            </button>
        `
    }
}




const onInitial = function() {
    const _refresh = document.querySelector('#refresh')
    _refresh.addEventListener('click', () => {
        onRender()
    })

    const _create = document.querySelector('#create')
    _create.addEventListener('click', (event) =>{
        onCreate(event)
    })

    const _delete = document.querySelectorAll('.delete')
    _delete.forEach( (button) => {
        button.addEventListener('click', (event) => {
            onDelete(button.dataset.id)
        })
    })

    const _filter = document.querySelectorAll('.filter-element')
    _filter.forEach( (button) => {
        button.addEventListener('click', () => {
            filters.column = button.dataset.column
            filterToggler()
            onFilter(filters.column)
        })
    })
    _filter.innerHTML = ` flex items-center gap-2`
}

const onRender = function() {
    const row = document.querySelector('.table-rows')
    onDisplay().then(data => {
        row.innerHTML = data.join(' ')
        if(initial_loading) onInitial()
        initial_loading = false;
    })
}

onFilter('id')
onFilter('name')
onFilter('birthday')
onFilter('note')
filterToggler()
onRender()
