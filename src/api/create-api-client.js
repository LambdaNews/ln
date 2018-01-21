import Firebase from 'firebase/app'
import 'firebase/database'

export function createAPI ({ config, version }) {
  if (!Firebase.apps.length) {
    Firebase.initializeApp(config)
  }
  return Firebase.database().ref(version)
}
