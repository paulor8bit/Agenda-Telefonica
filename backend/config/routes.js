const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
     
        // .post(admin(app.api.user.save))
        // .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

        // .put(admin(app.api.user.save))
        // .get(admin(app.api.user.getById))
        // .delete(admin(app.api.user.remove))


   

//RAMAIS

app.route('/ramais')
.all(app.config.passport.authenticate())
// .get(admin(app.api.ramais.get))
// .post(admin(app.api.ramais.save))
.get(app.api.ramais.get)
.post(app.api.ramais.save)


app.route('/ramais/:id')
.all(app.config.passport.authenticate())
.get(app.api.ramais.getById)
// .put(admin(app.api.ramais.save))
// .delete(admin(app.api.ramais.remove))
.put(app.api.ramais.save)
.delete(app.api.ramais.remove)



    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}