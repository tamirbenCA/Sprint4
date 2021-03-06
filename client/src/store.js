import Vuex from 'vuex';
import usersModule from './modules/UserModule';
import shopModule from './modules/ShopModule';
import cartModule from './modules/CartModule';

// import usersModule from './modules/UserModule';
// import shopModule from './modules/ShopModule';

// const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
    modules: {
      user : usersModule,
      shop: shopModule,
      cart:cartModule
    //   cart : cartModule
    },
    // strict : !isProduction
  })
  