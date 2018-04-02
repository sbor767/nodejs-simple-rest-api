export default class NotificationResource {
  allTokens = []
  tokensLoaded = false
  user = null

  constructor(messaging, database) {
    this.messaging = messaging
    this.database = database
    this.messaging
      .requestPermission()
      .then(res => console.log('Permission granted!'))
      .catch(err => console.log('no access', err))
    // this.messaging.getToken().then(res => console.log(res))

    this.setupTokenRefresh()
    this.database.ref('/fcmTokens').on('value', snapshot => {
      this.allTokens = snapshot.val()
      this.tokensLoaded = true
    })
  }

  setupTokenRefresh() {
    this.messaging.onTokenRefresh(() => this.saveTokenToServer())
  }

  saveTokenToServer() {
    // Get token.
    this.messaging.getToken().then(res => {
      // Look for existing token.
      if (this.tokensLoaded) {
        const existingToken = this.findExistingToken(res)
        if (existingToken) {
          // Replace existing token.
          // @TODO Delete this.
          console.log('Existing Token: ', existingToken)
          firebase
            .database()
            .ref(`/fcmTokens/${existingToken}`)
            .set({
              token: res,
              user_id: this.user.uid
            })
        } else {
          // Otherwise, create a new one.
          this.registerToken(res)
        }
      }
    })
  }

  registerToken(token) {
    firebase
      .database()
      .ref('fcmTokens/')
      .push({
        token,
        user_id: this.user.uid
      })
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token
      if (token === tokenToSave) return tokenKey
    }
    return false
  }

  changeUser(user) {
    this.user = user
    this.saveTokenToServer()
  }
}
