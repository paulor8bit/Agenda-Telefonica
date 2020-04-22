const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const ramal = { ...req.body }
        if(req.params.id) ramal.id = req.params.id

        try {
            existsOrError(ramal.name, 'Nome não informado')
            existsOrError(ramal.setor, 'Setor não informado')
            existsOrError(ramal.telefoneum, 'Ramal 1 não informado')
          

        } catch(msg) {
            res.status(400).send(msg)
        }

        if(ramal.id) {
            app.db('ramais')
                .update(ramal)
                .where({ id: ramal.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('ramais')
                .insert(ramal)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('ramais')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('ramais').count('id').first()
        const count = parseInt(result.count)

        app.db('ramais')
            .select('id', 'name', 'setor', 'telefoneum', 'telefonedois', 'emailcop')
            .limit(limit).offset(page * limit - limit)
            .then(ramais => res.json({ data: ramais, count, limit }))
            .catch(err => res.status(500).send(err))
    }



    const getById = (req, res) => {
        app.db('ramais')
            .where({ id: req.params.id })
            .first()
            .then(ramal => {
                ramal.content = ramal.content.toString()
                return res.json(ramal)
            })
            .catch(err => res.status(500).send(err))
    }

   

    return { save, remove, get, getById}
}