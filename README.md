# Bases de datos 2 - Trabajo Final

La idea del trabajo es poder mostrar, en terminos de tiempos de ejecución, como Neo4j ejecuta consultas de recorridos de grafos de manera mas rapida en comparacion con MongoDB.

## MongoDB

MongoDB es una base de datos orientada a documentos. Esto quiere decir que en lugar de guardar los datos en registros, guarda los datos en documentos. Estos documentos son almacenados en BSON, que es una representación binaria de JSON.

### Estructura de un documento

```
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
```

## Neo4j

Neo4j es una base de datos orientada a grafos nativa, NoSQL y de código
abierto, que proporciona un backend transaccional compatible con ACID
para sus aplicaciones. Almacenar nodos relacionados, aceleran las consultas. Es la  ́unica base de datos orientada a grafos para empresas que combina el almacenamiento
nativo de grafos, la arquitectura escalable optimizada para la velocidad. La adyacencia libre de  ́ındices reduce el tiempo de lectura y mejora a ́un m ́as a medida que aumenta la complejidad de los datos. Se obtienen transacciones r ́apidas y fiables con un rendimiento ultra alto en paralelo, incluso cuando sus datos crezcan.

![graph_db_simple_model](https://user-images.githubusercontent.com/26801113/192150060-c498bb61-44a1-4440-a461-eab164fe6d2f.jpg)

Una de las diferencias es que en Neo4j las relaciones son parte de la base de datos, es decir, no es necesario calcularlas cada vez que necesitamos consultar nodos relacionados. En cambio en MongoDB, al no existir las relaciones entre documentos, estas deben ser calculadas en cada consulta que ejecutemos.

Neo4j: de 110ms a 450ms
MongoDB: de 430ms a 1090ms

Podemos observar que el tiempo de ejecucion mas lento obtenido en Neo4j, es casi el equivalente al tiempo estimado mas rapido de MongoDB.
