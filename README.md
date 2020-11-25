# Data Warehouse

Herramienta que permite a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

1. Instale y configure el motor de base de datos [MYSQL](https://www.mysql.com/downloads/).
2. Instale [NodeJS](https://nodejs.org/es/).
3. Debe contar con un editor de codigo, recomiendo [VScode](https://code.visualstudio.com/)

### Instalación 🔧

Estos son los pasos que deberás seguir para tener un entorno de desarrollo local

1. Ejecute el comando npm install dentro de la carpeta /Back-End, en su consola o terminal asi instalamos todos los paquetes necesarios para ejecutar el proyecto.

```Bash
npm install
```

Para iniciar el proyecto en el Front-End debe haber por lo menos un usuario Administrator registrado en la base de datos

2. Por lo tanto debemos ejecutar el archivo database.sql ubicado dentro de la carpeta /Back-End en su Base de datos MYSQL, el mismo le creara la base de datos con su respectivas tablas y le añadira informacion como un usuario administrador para el cual al iniciar el proyecto en el lado del Front-End nos servira para poder acceder a nuestra app.

3. Dentro de la carpeta /Back-End cree un archivo .env donde guardara las siguientes variables de entorno

```Bash
USER = Usuario de base de datos
PASS = Contraseña de su usuario de base de datos

NAME_DB = datawarehouse
HOST = localhost

JWT_SECRET = Una clave secreta para validadcion del Json Web Token
```

Una vez tenemos todos estos aspectos cubiertos ahora si podemos ejecutar nuestro proyecto

4. Estando dentro de la carpeta /Back-End desde la terminal ejecutamos el siguiente comando

```Bash
npm start
```

En la terminal despues de ejecutar el comando anterior van a poder visualizar algo muy parecido a lo siguiente

```Bash
$ npm start

> datawarehouse@1.0.0 start C:\Users\diazk\Documents\Projects\DataWarehouse\DataWarehouse\Back-End
> node index.js

Server started...
Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER(10) NOT NULL auto_increment , `firstName` VARCHAR(50) NOT NULL, `lastName` VARCHAR(50) NOT NULL, `email` VARCHAR(50) NOT NULL, `profile` VARCHAR(20) NOT NULL, `password` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): CREATE TABLE IF NOT EXISTS `Contacts` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(50) NOT NULL, `lastname` VARCHAR(50) NOT NULL, `email` VARCHAR(50) NOT NULL, `company` VARCHAR(50) NOT NULL, `region` VARCHAR(50) NOT NULL, `country` VARCHAR(50) NOT NULL, `city` VARCHAR(50) NOT NULL, `address` VARCHAR(50) NOT NULL, `interest` VARCHAR(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): CREATE TABLE IF NOT EXISTS `Companies` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(50) NOT NULL, `country` VARCHAR(50) NOT NULL, `city` VARCHAR(50) NOT NULL, `address` VARCHAR(50) NOT NULL, `email` VARCHAR(50) NOT NULL, `phone` VARCHAR(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): CREATE TABLE IF NOT EXISTS `Region` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(50), PRIMARY KEY (`id`)) ENGINE=InnoDB;
DB is connected
Executing (default): CREATE TABLE IF NOT EXISTS `Country` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(50), `RegionId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`RegionId`) REFERENCES `Region` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): CREATE TABLE IF NOT EXISTS `City` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(15), `CountryId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`CountryId`) REFERENCES `Country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Companies`
Executing (default): SHOW INDEX FROM `Contacts`
Executing (default): SHOW INDEX FROM `Users`
Executing (default): SHOW INDEX FROM `Country`
Executing (default): SHOW INDEX FROM `Region`
Executing (default): SHOW INDEX FROM `City`

```

## Ejecutando las pruebas ⚙️

Para hacer las pruebas debe de abrir en su navegador el archivo index.html e ingresar con alguno de los email y contraseña que se guardo en la base de datos al momento de ejecutar el archivo database.sql. Para mayor alcance de pruebas recomiendo el uso de los siguientes datos de un usuario administrador

```Bash
Email : juan@correo.com
Contraseña : 1234
```

---

Hecho ⌨️ con ❤️ por [Junior Medina](https://github.com/juniiormediina) 😊
