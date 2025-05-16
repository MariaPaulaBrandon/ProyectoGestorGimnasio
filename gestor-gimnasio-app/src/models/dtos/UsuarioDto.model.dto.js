class UsuarioDto {
    /**
     * @param {object} data
     * @param {number} data.id
     * @param {string} data.apellidos
     * @param {string} data.nombres
     * @param {string} data.email
     * @param {Date|string} data.fechaAlta
     * @param {Date|string|null} data.fechaBaja
     * @param {number} data.idTipoUsuario
     * @param {string} data.descTipoUsuario
     */
    constructor(data = {}) {
        this.id = data.id;
        this.apellidos = data.apellidos;
        this.nombres = data.nombres;
        this.email = data.email;
        this.fechaAlta = data.fechaAlta;
        this.fechaBaja = data.fechaBaja;
        this.idTipoUsuario = data.idTipoUsuario;
        this.descTipoUsuario = data.descTipoUsuario;
    }
}

export default UsuarioDto;
