<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Ramais">
                        <RamaisAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'
import RamaisAdmin from './RamaisAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin, RamaisAdmin }
}
</script>

<style>

</style>
