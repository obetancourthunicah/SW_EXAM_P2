# Instrucciones para realizar el Examen del segundo parcial

Bienvenido al examen de programación para la creación de un REST API de una entidad que fue definida en la plataforma moodle. Este examen tiene como objetivo evaluar su capacidad para diseñar e implementar un API RESTful que cumpla con los estándares y mejores prácticas de la industria utilizando como persistencia una base de datos en MongoDB.

Un API RESTful es un conjunto de reglas y convenciones que permiten que los sistemas se comuniquen entre sí a través de HTTP. Esto se logra mediante la definición de endpoints que representan los recursos que el API proporciona, y utilizando los métodos HTTP adecuados para realizar operaciones en estos recursos.

Con la entidad específica proporcionada deberá diseñar y construir los endpoints necesarios para que los usuarios puedan realizar operaciones CRUD (Create, Read, Update, Delete) en los datos de esta entidad.

## Indicaciones generales

1. Crear una interfaz que representa la entidad solicitada.
2. Crear un modelo de datos (DAO) que implemente la clase Abstracta.
3. Crear una librería que maneje la lógica para la entidad (Librería)
4. Cree e incorpore una definición de endpoint con express (router).

Puede utilizar thunder client o postman para realizar la pruebas.

## Instrucciones para correr el programa

1. Instalar las dependencias

  ``` bash
    npm install
  ```

2. Crear el archivo ```.env``` y actualizar las variables con el string de un cluster de mongodb en Atlas.

3. Ejecutar el programa

  ``` bash
    npm run dev
  ```
