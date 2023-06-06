<?php

require_once __DIR__ . '/votaciones.php';

if (isset($_GET['api_function'])) {

    switch ($_GET['api_function']) {
        case 'getRegiones':
            echo json_encode(Votaciones::getRegiones(), JSON_PRETTY_PRINT);
            break;

        case 'getComunas':
            echo json_encode(Votaciones::getComunas($_GET['id_region']), JSON_PRETTY_PRINT);
            break;

        case 'getCandidatos':
            echo json_encode(Votaciones::getCandidatos($_GET['id_comuna']), JSON_PRETTY_PRINT);
            break;

        default:
            echo json_encode([
                'status' => 'error',
                'message' => 'invalid API function',
                'formdata' => json_encode($_GET)
            ]);
            break;
    }
    exit;
}


if (isset($_POST['api_function'])) {
    switch ($_POST['api_function']) {

        case 'saveVoto':
            echo json_encode(Votaciones::saveVoto(
                $_POST["nombre"],
                $_POST["alias"],
                $_POST["rut"],
                $_POST["email"],
                $_POST["candidato"],
                json_encode([
                    'web' => isset($_POST["web"]) ? '1' : '0',
                    'tv' => isset($_POST["tv"]) ? '1' : '0',
                    'sociales' => isset($_POST["sociales"]) ? '1' : '0',
                    'amigo' => isset($_POST["amigo"]) ? '1' : '0'
                ])
            ), JSON_PRETTY_PRINT);
            break;

        default:
            echo json_encode([
                'status' => 'error',
                'message' => 'invalid API function',
                'formdata' => json_encode($_POST)
            ]);
            break;
    }
    exit;
}
