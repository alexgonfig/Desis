## Instalación
1. Clonar este repositorio
2. Mover el proyecto y todo su contenido a directorio "htdocs" de algun entorno para servidor apache/php/mysql (por ejemplo: XAMPP, WAMPP, etc.)
3. Importar en su gestor de base de datos (por ejemplo "phpmyadmin") el script de base de datos desde documento "desis_test" ubicado dentro de la carpeta "SQL"

## Configuración
En la carpeta "backend" del proyecto, debera editar el archivo "config.php" asignando los valores a las constantes con los datos correspondientes a su base de datos, los cuales son:
-   DB_HOST: dirección del host (por ejemplo localhost)
-   DB_NAME: nombre de la base de datos (por ejemplo desis_test)
-   DB_USER: credencial de nombre de usuario de la base de datos
-   DB_PASS: credencial contraseña de usuario de la base de datos

## Requerimientos
El proyecto fue desarrollado para las versiones:	
- Versión de PHP: 7.4.29
- Versión de servidor de base de datos: 10.4.24-MariaDB
