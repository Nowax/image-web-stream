const functions = require('firebase-functions');

const admin = require('firebase-admin');
const dayjs = require('dayjs')

admin.initializeApp(functions.config().firebase);
admin.app().firestore().settings({timestampsInSnapshots: true});

const daysAgo = 1
const dayToClean = () => dayjs().subtract(daysAgo, 'day').format('YYYY-MM-DD');

exports.dailyCleanup = functions.https.onRequest((req, res) => {
  if (req.method === 'POST' && req.get('content-type') === 'application/json' ) {
    const collectionName = `${req.body.user}-${dayToClean()}`

    console.log("Staring cleanup for:", collectionName)
    cleanFirestore(collectionName)
      // .then( () => cleanStorage(collectionName))
      .then( () => {
        console.log("Cleanup done")
        res.status(200).end()
      })
      .catch( err => console.log(err))

  } else {
    res.status(405).end();
  }
  });

const cleanFirestore = (collectionName) => {
  return admin.app().firestore().collection(collectionName).get().then( queySnapshot => {
    return Promise.all([], queySnapshot.forEach(doc => {
      return queySnapshot.query.firestore.batch().delete(doc.ref).commit()
    }))
  }).then(responses => {
    responses.forEach(res => console.log("Response:", res))
    console.log("Deletion of files references from firestore succeed from collection:", `garage/${collectionName}`)
  }).catch( err => console.log("Error during firestore cleanup:", err) )
}

const cleanStorage = (collectionName) => {
  return admin.app()
    .storage()
    .bucket('gs://monitor-garage.appspot.com')
    .deleteFiles({prefix: `garage/${collectionName}`})
    .then( () => {
      console.log("Deletion of images files from firebase storage succeed from directory:", `garage/${collectionName}`)
    }).catch( err => console.log("Error during image deletions:", err))
}