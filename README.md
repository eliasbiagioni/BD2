# Bases de datos 2 - Trabajo Final

La idea del trabajo es poder mostrar, en términos de tiempos de ejecución, como Neo4j ejecuta consultas de recorridos de grafos de manera más rápida en comparación con MongoDB.

## MongoDB

MongoDB es una base de datos orientada a documentos. Esto quiere decir que en lugar de guardar los datos en registros, guarda los datos en documentos. Estos documentos son almacenados en BSON, que es una representación binaria de JSON. Cada documento es almacenado en una colección. Haciendo una analogia con un RDBMS, una colección seria una tabla y cada documento, una fila dentro de la tabla. 

MongoDB no maneja la noción de esquema. Esto quiere decir que cada documento dentro de una misma colección pueden tener diferentes estructuras.

### Estructura de un documento:

```
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
```

### Relaciones entre documentos

Existen dos estrategias para definir las relaciones entre documentos: modelo de documentos embebidos (embedded documents) y modelo de referencia (document references).

- __Modelo de documentos embebidos:__ los documentos son embebidos uno dentro de otro. Por ejemplo, supongamos 2 documentos ``student`` y ``address``, donde ``student`` contiene la información básica del estudiante y ``address`` la información de la dirección del estudiante. 

```
// Student
{
    _id: ObjectId("123456"),
    name: "Elias Biagioni"
}

// Student address document
{
    student_id: ObjectId("123456"), // reference to student document
    street: "57",
    city: "La Plata",
    state: "BA",
    zip: "1900"
}
```

Si los datos de la dirección se recuperan frecuentemente con la información del estudiante, entonces con la referenciación, se necesitarán ejecutar múltiples consultas para resolver la referencia. Embebiendo la dirección del estudiante:

```
{
    _id: ObjectId("123456"),
    name: "Elias Biagioni",
    address: {
        street: "57",
        city: "La Plata",
        state: "BA",
        zip: "1900"
    }
}
```

Si el estudiante posee multiples direcciones:

```
{
    _id: ObjectId("123456"),
    name: "Elias Biagioni",
    address: [
        {
            street: "57",
            city: "La Plata",
            state: "BA",
            zip: "1900"
        },
        {
            street: "48",
            city: "La Plata",
            state: "BA",
            zip: "1900"
        }
    ]
}
```

- __Modelo de referencia:__ los documentos se matienen separados, pero uno contiene la referencia al otro. Siguiendo con el ejemplo de, la relación entre ``student`` y ``address`` nos queda:

```
// Student
{
    _id: ObjectId("123456"),
    name: "Elias Biagioni"
    address_id: ObjectId("564897") // reference to address document 
}

// Student address document
{
    _id: ObjectId("564897"), 
    street: "57",
    city: "La Plata",
    state: "BA",
    zip: "1900"
}
```

## Neo4j

Neo4j es una base de datos orientada a grafos nativa, NoSQL y de código abierto, que proporciona un backend transaccional compatible con ACID para sus aplicaciones. Almacenar nodos relacionados, aceleran las consultas. Es la  ́unica base de datos orientada a grafos para empresas que combina el almacenamiento nativo de grafos, una arquitectura escalable optimizada para la velocidad, y el cumplimiento de ACID para garantizar la previsibilidad de las consultas basadas en relaciones. La adyacencia libre de ́ındices reduce el tiempo de lectura y mejora aún más a medida que aumenta la complejidad de los datos. Se obtienen transacciones rápidas y fiables con un rendimiento ultra alto en paralelo, incluso cuando sus datos crezcan.

### Estructura de nodos y relaciones

![graph_db_simple_model](https://user-images.githubusercontent.com/26801113/192150060-c498bb61-44a1-4440-a461-eab164fe6d2f.jpg)

Los nodos son las entidades del grafo. Estos pueden ser nombrados utilizando ``labels``, representando sus diferentes roles en el dominio. Estos pueden tener una gran cantidad de pares clave-valor, definiendo así sus ``properties``.

Las relaciones proveen conexiones dirigidas y nombradas, entre los nodos. Cada relación siempre tiene una dirección, un tipo, un nodo de inicio, un nodo de fin, y tambien pueden tener propiedades como los nodos. Los nodos pueden tener cualquier número o tipo de relaciones sin sacrificar el rendimiento.

## ¿Que se mostrará en este trabajo?

Una de las diferencias que hay entre Neo4j y MongoDB, es que en la primera las relaciones son parte de la base de datos, es decir, no es necesario calcularlas cada vez que necesitamos consultar nodos relacionados. En cambio en MongoDB, al no existir las relaciones entre documentos, estas deben ser calculadas en cada consulta que ejecutemos.

Esto, en MongoDB, tiene un impacto adverso en el tiempo de ejecucion cuando necesitamos ejecutar consultas que relacionan multiples colecciones. Neo4j, en cambio, al poseer las relaciones almacenadas, mejora el tiempo de ejecucion en las consultas de recorridos de grafos. 

## Despliegue de la aplicación

Para poder realizar la demostración, se utilizará un modelo simple, extraido del modelo de la aplicación 'Agora'. La aplicación esta desarrollada en Docker (usando Docker compose). Esta aplicación unicamente posee un servicio de base de datos de Neo4j y un servicio de base de datos de MongoDB.

### Modelo

![model](https://user-images.githubusercontent.com/26801113/192168339-d8b060bd-dda3-4214-a5e1-484f29b23115.png)

Como vemos en el modelo:
- cada ``Project`` puede tener muchas ``Activity``.
- cada ``Activity`` puede tener un ``DatasetMetadataSchema``.
- cada ``DatasetMetadataSchema`` puede tener un siguiente ``DatasetMetadataSchema``.

A medida que agregamos ``DatasetMetadataSchema`` relacionado a otro ``DatasetMetadataSchema`` a través de la relación ``nextDatasetMetadataSchema``, vamos formando un grafo de ``DatasetMetadataSchema``. Cada ``Activity`` unicamente posee la relación con el primer ``DatasetMetadataSchema`` del grafo.

### Aplicación

Para levantar la aplicación debemos:
- Clonar el repositorio.
- Asegurarnos de que los puertos a utilizar (7474, 7687, 27017) estan liberados.
- Levantar la aplicación ejecutando: ``docker-compose up``

Cuando se levanten los servicios, se inicializarán las bases de datos con los datos para ``Project``, ``Activity`` y ``DatasetMetadataSchema``.

En Neo4j, la base de datos se llama ``neo4j`` y en MongoDB, se llama ``bd2``.

Podemos acceder a la base de datos utilizando la consola:
- MongoDB:
  - Contenedor: ``docker exec -it mongo-bd2 bash``
  - MongoDB console (dentro del contenedor): ``mongo -u root -p secret``
  - Utilizar base de datos (dentro de MongoDB console): ``use bd2``
- Neo4j:
  - Contenedor: ``docker exec -it neo4j-bd2 cypher-shell``
  - Ingresar:
    - username: ``neo4j``
    - passoword: ``bd2``


## Análisis

Para realizar el análisis, se realizará una comparación de tiempos entre la ejecucion del recorrido de grafos utilizando, en MongoDB, la función de agregación ``$graphLookup`` y, en Neo4j, utilizando una consulta tradicional en Cypher (lenguaje de consultas de Neo4j).

El objetivo de cada consulta es poder obtener, para cada ``Activity``, todos los ``DatasetMetadataSchema`` relacionados y gurdarlos en una variable ``tasks``. Para esto se debe realizar un recorrido en profundidad, desde cada ``Activity`` hasta el ultimo ``DatasetMetadataSchema`` relacionado. 

Ambas bases de datos poseen:
  - 491 ``Project``.
  - 491 ``Activity`` (una por ``Project``).
  - 2774 ``DatasetMetadataSchema`` (__N__ por ``Activity``).

### Tiempos de ejecución - MongoDB

Para ver el tiempo de ejecución estimado para realizar la consulta, debemos:

- Ingresar a nuestra base de datos (``bd2``)
- Ejecutar el comando: 
```
db.activity.explain("executionStats").aggregate([{
    $graphLookup: {
        from: 'dataset_metadata_schema',
        startWith: '$nextDatasetMetadataSchema',
        connectFromField: 'nextDatasetMetadataSchema',
        connectToField: '_id',
        as: 'tasks'
    }
}])
```
Como resultado podemos ver el tiempo estimado de ejecución de la consulta:

![graph-lookup](https://user-images.githubusercontent.com/26801113/192168674-f6e5702c-d6f4-4b3c-a22a-1d0a9d00fa2c.png)

En el campo ``executionTimeMillisEstimate`` vemos el tiempo de ejecución estimado de la consulta.

### Tiempos de ejecución - MongoDB

Para ver el tiempo de ejecución utilizado para realizar una consulta, debemos abrir el archivo de logs de las consultas de Neo4j. Este archivo se encuentra en ``<path_donde_se_clono_el_repo>/BD2/neo4j/logs/query.log``. Allí, podemos ver los logs de todas las consultas ejecutadas. Si nos dirigimos al final del archivo, podremos ir viendo las últimas consultas que vayamos ejecutando. Cada detalle de la consulta se compone de 2 líneas:

```
2022-09-25 22:49:11.513+0000 INFO  Query started: id:294 - 1 ms: (planning: 1, cpu: 0, waiting: 0) - 0 B - 0 page hits, 0 page faults - bolt-session	bolt	neo4j-browser/v4.4.6		client/192.168.64.1:48206	server/192.168.64.2:7687>	system - neo4j - CALL dbms.showCurrentUser() - {} - runtime=null - {type: 'system', app: 'neo4j-browser_v4.4.6'}
2022-09-25 22:49:11.526+0000 INFO  id:294 - 14 ms: (planning: 7, cpu: 5, waiting: 0) - -1 B - 0 page hits, 0 page faults - bolt-session	bolt	neo4j-browser/v4.4.6		client/192.168.64.1:48206	server/192.168.64.2:7687>	system - neo4j - CALL dbms.showCurrentUser() - {} - runtime=system - {type: 'system', app: 'neo4j-browser_v4.4.6'}
```

La linea que nos interesa es la segunda, ya que allí vemos el tiempo de ejecución de la consulta. El tiempo de ejecucion de cada consulta es el siguiente:

![time-neo4j](https://user-images.githubusercontent.com/26801113/192169281-8cca6191-ec8d-4f1c-87b3-4d6aa629fea5.png)


Para analizar el tiempo de ejecucion debemos:
- Ingresar en la consola de Neo4j.
- Ejecutar la consulta para obtener los resultados:
```
MATCH (activity:Activity)-[:NEXT_DATASET_METADATA_SCHEMA*]->(dms:DatasetMetadataSchema) 
RETURN activity, COLLECT(dms) AS tasks;
```
- Observar el tiempo de ejecucion en el archivo ``query.log``

### Resultados

ACLARACIÓN: para medir el tiempo de ejecucion en Neo4j, debemos ignorar el tiempo la primera vez que ejecutamos una consulta. Esto es por que, la primera vez, la consulta es planificada y guardada en una cache para ejecutarla de manera más rapida a futuro.

Luego de ejecutar repetidas veces las consultas para obtener los tiempos de ejecucion tanto en MongoDB como en Neo4j, obtengo que en MongoDB el tiempo estimado va entre 350ms y 365ms. Por el otro lado, en Neo4j, obtengo tiempos de ejecucion entre 32ms y 120ms.

Como podemos ver, el peor tiempo de ejecucion obtenido en Neo4j (120ms) es incluso mejor que el mejor tiempo de ejecución de MongoDB (350ms). De esta manera, podemos ver que el recorrido de un grafo nativo, donde las relaciones estan almacenadas, nos da una mejora en tiempos de ejecución, en comparación con una base de datos (MongoDB) donde debemos calcular las relaciones en cada consulta.