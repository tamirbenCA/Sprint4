<template>
    <section class="adm">
        <div v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading2.gif">
        </div>
        <div v-else>
            <el-table :data="sellers" :default-sort="{prop: 'Name', order: 'descending'}" style="width: 100%">
                <el-table-column prop="id" label="id" sortable width="180">
                </el-table-column>
                <el-table-column prop="name" label="Name" sortable width="180">
                </el-table-column>
                <el-table-column prop="address" label="Address" width="180">
                </el-table-column>
                <el-table-column prop="email" label="Email" width="180">
                </el-table-column>
                <el-table-column prop="itemsForSale" label="# of items for sale" sortable width="180">
                </el-table-column>
                <el-table-column label="Operations">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isActive" size="mini" type="danger" @click="disableSeller(scope.row.id)">Disable</el-button>
                        <el-button v-else size="mini" type="success" @click="disableSeller(scope.row.id)">Enable</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
import swal from 'sweetalert'
import { LOAD_SELLERS, UPDATE_SELLER_STATUS } from '../modules/ShopModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {
            pageReady: false
        }
    },
    methods: {
        disableSeller(sellerId) {
            // console.log(sellerId)
            this.$store.dispatch({ type: UPDATE_SELLER_STATUS, sellerId })
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_SELLERS })
            .then((sellers) => {
                console.log('sellers', sellers)
                this.pageReady = true;
            })
    },
    computed: {
        sellers() {
            return (this.$store.getters.items).map(seller => {
                return {
                    id: seller._id,
                    name: seller.name,
                    address: seller.address.city,
                    email: seller.email,
                    itemsForSale: seller.itemsForSale.length,
                    isActive: seller.isActive
                }
            })
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adm {
    text-transform: capitalize;
    max-width: 1000px;
    width: 100%;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
}

.cell {
    text-transform: capitalize;
}

@media screen and (max-width: 480px) {
    .adm {
        width: 90%;
    }
}
</style>
