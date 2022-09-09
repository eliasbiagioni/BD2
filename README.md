# Bases de datos 2 - Trabajo Final

Se van a replicar los modelos de Agora. Por un lado, el viejo en MongoDB y por el otro, el nuevo en Neo4j.
La idea es mostrar la simpleza y facilidad de crear una lista de registros anidados en Neo4j contra MongoDB. Mostrar tanto la creacion como el recorrido para obtener la lista.

Crear los modelos:
  - Project
  - Activity
  - DatasetMetadataSchema
  
 Project tiene una o muchas Activity
 
 Activity tiene un DatasetMetadataSchema (el inicial)
 
 DatasetMetadataSchema tiene un siguiente DatasetMetadataSchema
