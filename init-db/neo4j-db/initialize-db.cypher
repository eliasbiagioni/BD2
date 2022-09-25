MATCH (p:Project)
WITH COUNT(p) = 0 as insertProjects
CALL apoc.do.when(
    insertProjects,
    'CALL apoc.cypher.runFile("agora-project.cypher")'
    )
YIELD value
RETURN value.node AS node;