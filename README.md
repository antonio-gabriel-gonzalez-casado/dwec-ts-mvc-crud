# dwec-ts-mvc-crud

Aplicación en TypeScript que realiza un CRUD sobre una entidad Person implementanda siguiendo la arquitectura MVC


## Configuración de TypeScript

Crear el fichero tsconfig.json mediante el comando:

`tsc --init`

Dejar la configuración que se ha generado por defecto y además descomentar y cambiar las siguientes propiedades del fichero tsconfig.json

`"outDir": "./dist",        /* Directorio donde se generará el código transpilado */`  
`"sourceMap": true,         /* Genera un archivo donde se mapean los fuentes para las herramientas de depuración */` 
`"allowJs": true,           /* Permite el uso de JS dentro de TS */`


## Transpilación del código de forma manual
Para transpilar el código fuente lanzamos el siguiente comando:

`tsc --build tsconfig.json`

Para transpilar el código a medida que vamos programando usar el siguiente comando:

`tsc --build tsconfig.json --watch`

## Transpilación automática (recomendada)

La mejor opción para transpilar el código TS y obtener el JS consolidad listo para usarlo en el `<script>` del HTML es usar un empaquetador. En este caso se usará uno de los más populares: webpack


### Instalar webpack-cli y ts-loader

`npm install --save-dev webpack webpack-cli typescript ts-loader`

### Fichero de configuración de webpack 

Ver configuración establecida en el fichero `webpack.config.js`

### Fichero de configuración de vscode

Ver configuración establecida en el fichero launch.json

## Escucha automática de webpack 

Mientras estamos desarrollando en TS se necesita que el código se vaya transpilando automáticamnte a JS para ir realizando pruebas. Para ello debemos lanzar el siguiente comando:

`npx webpack -w`

## Estructura del proyecto
```bash
├───.vscode/
│   └───launch.json
├───dist/
│   ├───assets/
│   │   ├───css/
│   │   │   └───styles.css
│   │   ├───fonts/
│   │   ├───icons/
│   │   ├───img/
│   │   └───js/
│   │       ├───app-bundle.js
│   │       └───app-bundle.js.map
│   └───index.html
├───src/
│   ├───controllers/
│   │   └───person.controller.ts
│   ├───models/
│   │   └───person.model.ts
│   ├───services/
│   │   └───person.service.ts
│   ├───views/
│   │   └───person.view.ts
│   └───app.ts
├───.DS_Store
├───LICENSE
├───README.md
├───tsconfig.json
└───webpack.config.js
```
