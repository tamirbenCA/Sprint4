<template>
    <div class="manage-orders">
        <h1>Manage Orders</h1>
        <h2>Items sold</h2>
        <el-table
            :data="sellersItems"
            v-loading="loading2"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            border
            max-height="200"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
            cell-style="background-color: rgba(117, 184, 255, 0.43); text-transform: capitalize;color: #322f2f;"
            row-style="background-color: transparent"
            header-row-style="background-color: transparent"
            header-cell-style="background-color:rgba(117, 184, 255, 0.43);color: #322f2f;"
            class="manage-orders-table">
            <el-table-column
                prop="date"
                label="Sched. Delivery Date"
                sortable
                width="180"
                :formatter="formatter">
            </el-table-column>
            <el-table-column prop="buyerName" label="Buyer Name" sortable width="140">
            </el-table-column>
            <el-table-column prop="buyerAddress" label="Buyer Address" width="180">
            </el-table-column>
            <el-table-column prop="items" label="Items Name" width="300">
            </el-table-column>
            <el-table-column label="Operations">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row.isDelivered" size="mini" type="success" @click="deliverOrder(scope.row.id)">Mark as Shipped
                    </el-button>
                    <el-button v-if="scope.row.isDelivered" size="mini" type="info">Shipped
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>Items bought</h2>
            <el-table
            :data="buyersItems"
            v-loading="loading2"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            border
            max-height="200"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%"
            cell-style="background-color: rgba(117, 184, 255, 0.43); text-transform: capitalize;color: #322f2f;"
            row-style="background-color: transparent"
            header-row-style="background-color: transparent"
            header-cell-style="background-color: rgba(117, 184, 255, 0.43);color: #322f2f;"
            class="manage-orders-table">
            <el-table-column
                prop="date"
                label="Sched. Delivery Date"
                sortable
                width="180"
                :formatter="formatter">
            </el-table-column>
            <el-table-column
                prop="sellers"
                label="Sellers Name"
                sortable
                width="140">
            </el-table-column>
            <el-table-column
                prop="items"
                label="Items Name"
                width="400">
            </el-table-column>
            <el-table-column
                prop="totalSum"
                label="Total Cost"
                width="130">
            </el-table-column>
            <el-table-column
                prop="isDelivered"
                label="Shipped">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { LOAD_SELLERS_ITEMS, LOAD_BUYERS_ITEMS, MARK_DELIVERED } from '../modules/ShopModule';

export default {
    data() {
        return {
            userId: '',
            loading2: true
        }
    },
    created() {
        this.userId = this.$route.params.userid
        var p1 = this.$store.dispatch({ type: LOAD_SELLERS_ITEMS, userId: this.userId });
        var p2 = this.$store.dispatch({ type: LOAD_BUYERS_ITEMS, userId: this.userId });
        console.log(p1, p2)
        Promise.all([p1, p2]).then(_ => this.loading2 = false);
    },
    computed: {
        sellersItems() {
            var orders = this.$store.getters.sellersItems;
            var mapOrders = orders.map(order => {
                return {
                    id: order._id,
                    // date: new Date(order.deliveryDate).toLocaleString('en-GB'),
                    date: order.deliveryDate,
                    buyerName: order.buyer.buyerName,
                    buyerAddress: order.buyer.buyerAddress,
                    items: order.items,
                    isDelivered: order.isDelivered
                }
            });
            mapOrders.forEach(mapOrder => {
                var items = mapOrder.items
                    .filter(item => this.userId === item.seller.sellerId)
                    .map(item => item.itemName + ' X ' + item.qnty)
                    .toString()
                mapOrder.items = items;
            })
            return mapOrders;
        },
        buyersItems() {
            var orders = this.$store.getters.buyersItems;
            var mapOrders = orders.map(order => {
                return {
                    id: order._id,
                    // date: new Date(order.deliveryDate).toLocaleString('en-GB'),
                    date: order.deliveryDate,
                    sellers: order.sellers,
                    items: order.items,
                    isDelivered: order.isDelivered.toString(),
                    totalSum: '$' + order.totalSum
                }
            })
            mapOrders.forEach(mapOrder => {
                var items = mapOrder.items
                    .map(item => item.itemName + ' X ' + item.qnty)
                    .toString()
                mapOrder.items = items;
                var sellers = mapOrder.sellers
                    .map(seller => seller.sellerName)
                    .toString()
                mapOrder.sellers = sellers;
                if (mapOrder.isDelivered === 'false') {
                    mapOrder.isDelivered = 'Not Yet'
                } else {
                    mapOrder.isDelivered = new Date(+mapOrder.isDelivered).toLocaleString('en-GB')
                }
                console.log('line 142', mapOrder.isDelivered)
            })
            return mapOrders;
        },
    },
    methods: {
        deliverOrder(orderId) {
            this.$store.dispatch({ type: MARK_DELIVERED, orderId: orderId })
        },
        formatter(row, column) {
            return new Date(row.date).toLocaleString('en-GB')
            // var d = new Date(row.date).toLocaleString('en-GB')
            // console.log('line 177', d)
            // return d;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manage-orders {
    max-width: 960px;
    width: 100%;
    margin: auto;
    margin-bottom: 50px;
}

.manage-orders-table {
    text-align: left;
}

.manage-orders-table,
td,
tr,
.cell {
    background-color: transparent !important
}

@media screen and (max-width: 480px) {
    .manage-orders {
        width: 90%;
    }
}
</style>


