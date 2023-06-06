<?php

require_once(__DIR__ . '/connection.php');

class Votaciones
{
    static public function getRegiones()
    {
        try {
            $sql = Connection::Connect()->prepare('SELECT * FROM regiones');
            $sql->execute();
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return [
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
    }

    static public function getComunas($id_region = null)
    {
        try {
            if ($id_region) {
                $sql = Connection::Connect()->prepare('SELECT * FROM comunas WHERE id_region = :id_region');
                $sql->bindParam(':id_region', $id_region, PDO::PARAM_INT);
                $sql->execute();
                return $sql->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $sql = Connection::Connect()->prepare('SELECT * FROM comunas');
                $sql->execute();
                return $sql->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch (\Throwable $th) {
            return [
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
    }

    static public function getCandidatos($id_comuna = null)
    {
        try {
            if ($id_comuna) {
                $sql = Connection::Connect()->prepare('SELECT * FROM candidatos WHERE id_comuna = :id_comuna');
                $sql->bindParam(':id_comuna', $id_comuna, PDO::PARAM_INT);
                $sql->execute();
                return $sql->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $sql = Connection::Connect()->prepare('SELECT * FROM candidatos');
                $sql->execute();
                return $sql->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch (\Throwable $th) {
            return [
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
    }

    static public function saveVoto($name, $nickname, $rut, $email, $candidate, $how)
    {
        try {
            /* check if rut already voted */
            $sql = Connection::Connect()->prepare('SELECT * FROM votaciones WHERE rut_votante = :rut_votante');
            $sql->bindParam(':rut_votante', $rut, PDO::PARAM_STR);
            $sql->execute();
            $exists = $sql->fetchAll(PDO::FETCH_ASSOC);
            if(count($exists) > 0){
                return [
                    'status' => 'error',
                    'message' => 'El RUT '.$rut.' ya cuenta con un voto registrado'
                ];
            }

            /* register vote */
            $sql = Connection::Connect()->prepare('INSERT INTO votaciones() VALUES(NULL,:id_candidato,:rut_votante,:nombre_votante,:alias_votante,:email_votante,:como_se_entero)');
            $sql->bindParam(':id_candidato', $candidate, PDO::PARAM_STR);
            $sql->bindParam(':rut_votante', $rut, PDO::PARAM_STR);
            $sql->bindParam(':nombre_votante', $name, PDO::PARAM_STR);
            $sql->bindParam(':alias_votante', $nickname, PDO::PARAM_STR);
            $sql->bindParam(':email_votante', $email, PDO::PARAM_STR);
            $sql->bindParam(':como_se_entero', $how, PDO::PARAM_STR);
            $sql->execute();
            return [
                'status' => 'success',
                'message' => 'Se registró el voto con éxito'
            ];
        } catch (\Throwable $th) {
            return [
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
    }
}
