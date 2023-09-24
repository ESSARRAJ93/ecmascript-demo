import { DB_URI } from "../config/constants.js"
export default class Student {
    
    static max_point = 20

    constructor(name, birthday, note){
        this.name = name
        this.birthday = birthday
        this.note = note
    }

    static onList = async function() {
        const response = await fetch(DB_URI)
        const students = await response.json()
        return students
    }

    static onCreate = async function(name, birthday, note) {
        const response = await fetch(DB_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                birthday: birthday,
                note: note
            })
        })
        return response
    }

    static onDelete = async function (id) {
        const response = await fetch(DB_URI+'/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }

    is_admitted = () => this.note >= 10

    onGetAge = () => {
        let currentYear = (new Date()).getFullYear()
        let oldYear = new Date(this.birthday).getFullYear()
        return currentYear - oldYear
    }
}