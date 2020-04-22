<template>
    <div class="ramal-admin">
        <hr>
        <b-table hover striped :items="ramais" :fields="fields">
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name: 'Ramal',
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
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'setor', label: 'Setor', sortable: true }, 
                { key: 'telefoneum', label: 'Telefone1', sortable: true },
                { key: 'telefonedois', label: 'Telefone2', sortable: true },
                { key: 'emailcop', label: 'Email', sortable: true },                                      
                

                
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