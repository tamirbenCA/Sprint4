<template>
    <section>
        <tags-bar @resetTag="initPage"> </tags-bar>
        <div class="items-container" v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading2.gif">
        </div>
        <div class="items-container" v-else>
            <ul>
                <li class="animated pulse" v-for="(item, idx) in itemsToDisplay" :key="idx">
                    <div class="item">
                        <div class="img-item" @click="showDetails(item)" v-bind:style="{backgroundImage : 'url(\'' + item.imgUrl + '\')'}">
                        </div>
                        <div class="item-footer">
                            <div class="chef-details">
                                <img class="chef" :src="item.seller.sellerImgUrl" />
                                <p class="chef-nm">{{item.seller.sellerName}}</p>
                            </div>
                            <div class="name">
                                <p>{{item.name}}</p>
                            </div>
                            <div class="rnk-and-prc">
                                <div class="rank">
                                    <div v-for="(star,idx) in item.rank" :key="idx">
                                        <span class="star">★</span>
                                    </div>
                                </div>

                                <p class="price">{{item.price}}$</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { LOAD_ITEMS_BY_TAG, LOAD_SEARCHED_ITMES } from '../modules/ShopModule';
import TagsBar from './TagsBar.vue';

export default {

    data() {
        return {
            pageReady: false,
        }
    },
    created() {
        this.initPage()
    },
    methods: {
        showDetails(item) {
            this.$router.push('/itemdetails/' + item._id);
        },
        initPage() {
            this.pageReady = false
            var query = this.$route.query;
            this.$store.dispatch({ type: LOAD_SEARCHED_ITMES, query })
                .then((items) => {
                    this.pageReady = true;
                })
        }
    },
    computed: {
        itemsToDisplay() {
            return this.$store.getters.items
        },
        seller() {
            return this.$store.getters.chefs
        }
    },
    components: {
        TagsBar
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rnk-and-prc {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.gif-loading {
    width: 100px;
    height: 100px;
}

.rank {
    display: flex;
    flex-direction: row;
    color: gold;
    width: 100px;
}

h1,
h2 {
    font-weight: normal;
}

.chef-details {
    display: flex;
    flex-direction: row;
    width: 30%;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-top: 5px;
}

.chef-nm {
    text-transform: capitalize;
    padding-left: 5px;
    width: 71%;
    text-align: left;
}

.name {
    text-transform: capitalize;
    font-size: 15px;
}

.chef {
    width: 24px;
    height: 24px;
    border-radius: 50px;
}


.fa-shopping-cart {
    font-size: 30px;
    color: darkcyan;
}

.items-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

p {
    margin: 0;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: center; */
}

.item {
    cursor: pointer;
    height: 280px;
    width: 320px;
    /* box-shadow: 1px 2px 6px 0px black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item-footer {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
    justify-content: space-around;
    background-color: white;
    box-sizing: border-box;
    padding-bottom: 5px;
}

.img-item {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 80%;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.rank {
    color: gold;
}

select {
    height: 30px;
}

@media screen and (max-width: 480px) {
    .items-container {
        width: 79%;
    }
}
</style>
