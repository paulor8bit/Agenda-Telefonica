<template>
    <div class="ramal-admin">
        <b-form>
            <input id="ramal-id" type="hidden" v-model="ramal.id" />
            <b-form-group label="Nome:" label-for="ramal-name">
                <b-form-input id="ramal-name" type="text"
                    v-model="ramal.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>


           <b-form-group label="Setor" label-for="ramal-setor">
                <b-form-input id="ramal-setor" type="text"
                    v-model="ramal.setor" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Setor..." />
            </b-form-group>

           <b-form-group label="Telefone1" label-for="ramal-telefoneum">
                <b-form-input id="ramal-telefoneum" type="text"
                    v-model="ramal.telefoneum" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Numero do telefone 1..." />
            </b-form-group>

           <b-form-group label="Telefone2" label-for="ramal-telefonedois">
                <b-form-input id="ramal-telefonedois" type="text"
                    v-model="ramal.telefonedois" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Numero do telefone 2..." />
            </b-form-group>

           <b-form-group label="Email" label-for="ramal-emailcop">
                <b-form-input id="ramal-emailcop" type="text"
                    v-model="ramal.emailcop" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe Email" />
            </b-form-group>
 
           
           
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="ramais" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadRamal(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadRamal(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'RamalAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            ramal: {},
            Ramais: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                // { key: 'description', label: 'Descrição', sortable: true },
                { key: 'setor', label: 'Setor' }, 
                { key: 'telefoneum', label: 'Telefone1' },
                { key: 'telefonedois', label: 'Telefone2' },
                { key: 'emailcop', label: 'Email' },                                      
                { key: 'actions', label: 'Ações' }

                
            ]
        }
    },
    methods: {
        loadRamais() {
            const url = `${baseApiUrl}/ramais?page=${this.page}`
            axios.get(url).then(res => {
                this.ramais = res.data.data 
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.ramal = {}
            this.loadRamais()
        },
        save() {
            const method = this.ramal.id ? 'put' : 'post'
            const id = this.ramal.id ? `/${this.ramal.id}` : ''
            axios[method](`${baseApiUrl}/ramais${id}`, this.ramal)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.ramal.id
            axios.delete(`${baseApiUrl}/ramais/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadRamal(ramal, mode = 'save') {
            this.mode = mode
            this.ramal = { ...ramal }
            // axios.get(`${baseApiUrl}/ramais/${ramal.id}`)
            //     .then(res => this.ramal = res.data)
        }
    },
    watch: {
        page() {
            this.loadRamais()
        }
    },
    mounted() {
        this.loadRamais()
    }
}
</script>

<style>

</style>