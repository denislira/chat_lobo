// {
//     id: 'JKHjkghGFJHjty',
//     nombre: 'Hector'
// }

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.getPersonas().filter(persona => {
            return persona.sala === sala
        });
        return personasEnSala
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        //como se filtra aca es lo mismo que en la del metodo getPersona(id)  pero aca esta mas resumido, pero es lo mismo
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}