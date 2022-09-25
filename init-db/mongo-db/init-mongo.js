db = db.getSiblingDB('bd2');

db.createCollection('project');
db.createCollection('activity');
db.createCollection('dataset_metadata_schema');

datasetsPerProject = [6, 8, 2, 2, 7, 6, 5, 6, 5, 3, 7, 9, 8, 5, 11, 3, 10, 6, 5, 3, 8, 8, 1, 8, 6, 4, 6, 4, 3, 10, 9, 6, 3, 7, 14, 6, 10, 7, 6, 3, 6, 2, 13, 2, 5, 10, 1, 1, 1, 8, 4, 2, 1, 5, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 6, 6, 1, 6, 9, 9, 9, 1, 5, 1, 1, 3, 5, 6, 9, 5, 8, 4, 6, 11, 7, 1, 2, 2, 2, 3, 6, 1, 7, 1, 1, 3, 8, 4, 6, 9, 10, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 8, 6, 8, 9, 9, 9, 9, 9, 9, 6, 3, 6, 3, 6, 1, 8, 1, 1, 1, 2, 9, 12, 4, 8, 10, 3, 7, 7, 3, 7, 8, 7, 6, 2, 7, 5, 8, 5, 8, 9, 6, 5, 7, 7, 1, 4, 1, 1, 3, 3, 1, 3, 6, 6, 2, 2, 6, 4, 8, 12, 4, 2, 4, 8, 11, 2, 1, 1, 2, 5, 4, 12, 6, 3, 4, 3, 3, 6, 4, 3, 4, 8, 4, 2, 3, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 6, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 9, 1, 6, 9, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 1, 6, 6, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 3, 12, 3, 8, 3, 5, 3, 5, 1, 3, 8, 2, 4, 3, 7, 2, 2, 5, 2, 8, 4, 2, 3, 1, 13, 2, 4, 1, 2, 6, 3, 7, 5, 9, 1, 5, 2, 4, 11, 4, 3, 6, 2, 2, 5, 4, 13, 1, 14, 1, 5, 4, 4, 6, 5, 11, 3, 1, 3, 4, 6, 2, 3, 4, 5, 5, 4, 1, 7, 8, 3, 6, 9, 8, 7, 5, 3, 6, 9, 5, 6, 5, 10, 9, 6, 4, 6, 2, 7, 7, 1, 1, 3, 3, 1, 5, 11, 2, 1, 2, 1, 6, 6, 5, 10, 5, 1, 1, 3, 3, 7, 3, 10, 5, 8, 5, 6, 3, 4, 8, 1, 6, 12, 7, 3, 3, 2, 2, 10, 2, 3, 3, 6, 1, 1, 1, 1, 3, 3, 7, 7, 2, 2, 5, 5, 2, 2, 2, 4, 3, 4, 2, 2, 3, 1, 9, 1, 7, 5, 8, 1, 6, 5, 1, 11, 1, 6, 1, 1, 1, 2, 1, 1, 13, 2, 4, 6, 4, 10, 4, 11, 3, 8, 3, 13, 5, 4, 8, 2, 4, 5, 10, 7, 8]
datasetMetadataSchemas = [
    {
        datasetMetadataTitle: 'transcription',
        nextDatasetMetadataSchema: null
    },
    {
        datasetMetadataTitle: 'specimen_sample_collection',
        nextDatasetMetadataSchema: 'transcription'
    },
    {
        datasetMetadataTitle: 'site_selection_description',
        nextDatasetMetadataSchema: 'specimen_sample_collection'
    },
    {
        datasetMetadataTitle: 'problem_solving',
        nextDatasetMetadataSchema: 'site_selection_description'
    },
    {
        datasetMetadataTitle: 'photography',
        nextDatasetMetadataSchema: 'problem_solving'
    },
    {
        datasetMetadataTitle: 'observation',
        nextDatasetMetadataSchema: 'photography'
    },
    {
        datasetMetadataTitle: 'measurement',
        nextDatasetMetadataSchema: 'observation'
    },
    {
        datasetMetadataTitle: 'learning',
        nextDatasetMetadataSchema: 'measurement'
    },
    {
        datasetMetadataTitle: 'identification',
        nextDatasetMetadataSchema: 'learning'
    },
    {
        datasetMetadataTitle: 'geolocation',
        nextDatasetMetadataSchema: 'identification'
    },
    {
        datasetMetadataTitle: 'finding_entities',
        nextDatasetMetadataSchema: 'geolocation'
    },
    {
        datasetMetadataTitle: 'data_entry',
        nextDatasetMetadataSchema: 'finding_entities'
    },
    {
        datasetMetadataTitle: 'data_analysis',
        nextDatasetMetadataSchema: 'data_entry'
    },
    {
        datasetMetadataTitle: 'classification_tagging',
        nextDatasetMetadataSchema: 'data_analysis'
    }
]

for (var i = 0; i < datasetsPerProject.length; i++) {
    // CREO PROYECTO
    db.project.insertOne({
        projectName: "collaborativescience.org" + i,
        projectUrl: "http://www.nws.noaa.gov/skywarn/",
        hasTag: "Skywarn, weather, spotter, flood, tornado, thunderstorm. hurricane, typhoon, snow, ice, wind, damage, storm, NOAA, NWS, training, meteorology",
        projectIsPublic: true,
        projectImage: "NOAA NWS SKYWARN® Weather Spotter Program_img",
        difficultyLevel: "HARD",
        projectEndDate: "2022-12-18T19:07:46.094Z",
        language: "portugues",
        projectIsFeatured: false,
        projectDateCreated: "2022-09-19T19:07:46.075Z",
        projectDuration: 0,
        projectInstitution: "National Oceanic and Atmospheric Administration (NOAA)",
        projectStatus: "DRAFT",
        projectLocality: "Argentina",
        projectStartDate: "2015-06-12T03:00:00.000Z",
        projectLastUpdatedDate: "2022-09-19T19:07:46.075Z",
        projectDescription: "SKYWARN® is a National Weather Service (NWS) program developed in the 1960s that consists of trained weather spotters who provide reports of severe and hazardous weather to help meteorologists and emergency managers make life-saving warning decisions. There are well over 300,000 active SKYWARN Weather Spotters in the U.S. Spotters are concerned citizens, amateur radio operators, truck drivers, mariners, airplane pilots, emergency management personnel, and public safety officials who volunteer their time and energy to report on hazardous weather impacting their community. The first steps in becoming an official NWS SKYWARN Weather Spotter is to complete training on weather hazards and their reporting in your area. Classroom type training is typically offered each Spring and Fall. To find the next available training provided by your local NWS forecast office please visit this interactive map: http://www.nws.noaa.gov/skywarn/skywarn.htm In partnership with the COMET® Program, which is part of the University Corporation for Atmospheric Research&#39;s Community Programs supplemental national web-based training was also created. For more information please visit: https://www.meted.ucar.edu/training_course.php?id=23",
        projectAim: "NOAA NWS SKYWARN® Weather Spotter Program",
        projectVersion: 1
    })

    // CREO TAREAS PARA EL PROTOCOLO
    last_inserted_dataset_name = ""
    for (var j = 0; j < datasetsPerProject[i]; j++) {
        dms = datasetMetadataSchemas[j]
        last_inserted_dataset_name = dms['datasetMetadataTitle']  + i 
        db.dataset_metadata_schema.insertOne({
            datasetMetadataTitle:  last_inserted_dataset_name,
            nextDatasetMetadataSchema: (dms['nextDatasetMetadataSchema'] == null) ? null : db.dataset_metadata_schema.findOne({datasetMetadataTitle: dms['nextDatasetMetadataSchema']  + i})._id,
            isEnabled: true,
            datasetMetadataUpdatedAt: "2022-09-19T19:07:46.126Z"
        })
    }

    /*
    * CREO PROTOCOLO PARA EL PROYECTO.
    * APUNTA A LA PRIMERA TAREA.   
    */
    db.activity.insertOne({
        activityName: "Protocolo collaborativescience.org",
        isActive: true,
        version: 0,
        status: "DRAFT",
        projectId: db.project.findOne({projectName: "collaborativescience.org"  + i })._id,
        nextDatasetMetadataSchema: db.dataset_metadata_schema.findOne({datasetMetadataTitle: last_inserted_dataset_name})._id
    })
}