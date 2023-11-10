# Bootcamp del Master en Full Stack Web Development

Este repositorio es una breve guía para que los alumnos del master tengan una base de nodejs y docker de acuerdo al temario impartido en el Bootcamp del Master en Full Stack Web Development de Three Points.

## Descripción de contenidos


* ide_intro: código de muestra en la explicación del IDE.
* node-npm_intro: ejemplos sencillos en node para levantar una app.
* docker_intro: **código semilla para la actividad.**
* db_sample: colección de muestra en formato json si el alumno desea usarla para la actividad.

## Dockerización Base de Datos MongoDB

Dado que en la actividad se pide que la app, desplegada en un Docker se comunique con la base de datos, también desplegada en un Docker container,
se pueden seguir los siguientes pasos para que la app se comunique con el container de mongo.

```bash
docker network create <my-network>
docker run --name <container-name> --hostname <your-hostname> -d -p 27017:27017 --network <my-network> mongo
```

Cada alumno puede incluir en la base de datos la información que desee. 
De todas formas, en este repo se deja una colección de muestra en la carpeta `db_sample/` por si alguien desea usarla por simplicidad.

Se pueden seguir los siguientes pasos para, una vez esté corriendo mongo en le container correspondiente, se incorporen los documentos a una bbdd mockeada.
```bash 
docker cp <your-path-to-db_sample/users.json> <container-name>:/users.json
docker exec -it <container-name> mongoimport --db <your-database-name> --collection <your-collection-name> --file /users.json --jsonArray
```

Se puede levantar la imagen de mongodb con la colección de usuarios y correrá la API en node con el siguiente comando:

```bash
cd docker_compose_intro/
docker-compose up
```
```bash
curl --location 'http://localhost:8080/api/get?gender=Male' \
--data ''
```


## License
MIT License
Copyright (c) 2023
