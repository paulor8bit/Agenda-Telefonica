<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Lista Telefones e Emails" />
            <ListaRamais />

            
    </div>    
</template>

<script>
import PageTitle from '../template/PageTitle'
import ListaRamais from './ListaRamais'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat, ListaRamais },
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
