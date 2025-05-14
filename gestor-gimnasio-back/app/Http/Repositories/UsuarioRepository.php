<?php

namespace App\Http\Repositories;

use App\Models\Usuario;

class UsuarioRepository
{
    /**
     * Obtener todos los usuarios.
     *
     * @return \Illuminate\Database\Eloquent\Collection Una colección de todos los usuarios.
     */
    public function getAll()
    {
        return Usuario::with('tipoUsuario')
            ->orderBy('id')
            ->get();
    }

    /**
     * Obtener un usuario por su ID.
     *
     * @param int $id El ID del usuario.
     * @return \App\Models\Usuario|null El usuario encontrado o null si no se encuentra.
     */
    public function getById(int $id)
    {
        return Usuario::with('tipoUsuario')
            ->where('id', $id)
            ->first();
    }

    /**
     * Crear un nuevo usuario.
     *
     * @param array $data Los datos del nuevo usuario.
     * @return \App\Models\Usuario El usuario creado.
     */
    public function create(array $data)
    {
        return Usuario::create($data);
    }

    /**
     * Actualizar un usuario existente.
     *
     * @param int $id El ID del usuario a actualizar.
     * @param array $data Los nuevos datos del usuario.
     * @return \App\Models\Usuario|null El usuario actualizado o null si no se encuentra.
     */
    public function update(int $id, array $data)
    {
        $usuario = $this->getById($id);

        if ($usuario) {
            $usuario->update($data);
            return $usuario;
        }

        return null;
    }

    /**
     * Eliminar un usuario por su ID.
     *
     * @param int $id El ID del usuario a eliminar.
     * @return bool Verdadero si se eliminó correctamente, falso de lo contrario.
     */
    public function delete(int $id)
    {
        $usuario = $this->getById($id);

        if ($usuario) {
            return $usuario->delete();
        }

        return false;
    }
}
