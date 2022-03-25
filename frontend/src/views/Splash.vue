<template>
  <section class="full-page">
    <div class="vertical-center">
      <div class="container main-actions">
        <!-- Logo & Title section -->
        <img
          :src="require('../assets/space-miner-logo.svg')"
          slot="aside"
          height="130"
          alt="Space Miner Logo"
        />
        <img
          id="pirate-logo"
          :src="require('../assets/space-miner-typeface.svg')"
          slot="aside"
          height="85"
          alt="Medium Chest"
          class="Space Miner Typeface"
        />
        <h5 class="font-weight-bold text-white mt-2 text-uppercase">The search for EOS has begun!</h5>
        <SplashAuth
          :scatter="scatter"
          :account="account"
          :login="login"
          :logout="logout"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ScatterJS, { Network } from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
// Import Lynx
import ScatterLynx from "scatterjs-plugin-lynx";
import Eos from "eosjs";
import SplashAuth from '../components/SplashAuth';

// Scatter & Lynx Plugins
ScatterJS.plugins(new ScatterEOS(), new ScatterLynx());

// Chain Network
const network = Network.fromJson({
  // Mainnet
  // blockchain: "eos",
  // host: "nodes.get-scatter.com",
  // port: 443,
  // protocol: "https",
  // chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"

  // Jungle 2
  blockchain: "eos",
  host: "jungle2.cryptolions.io",
  port: 80,
  protocol: "http",
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
});

// EosJS reference
let eos;

export default {
  name: "Splash",
  data() {
    return {
      scatter: null
    };
  },
  components: {
    SplashAuth
  },
  computed: {
    account() {
      // No scatter or no Identity/Login
      if (!this.scatter || !this.scatter.identity) return null;

      // Returning EOSIO account
      this.$store.commit("updateAccountStatus", true);
      return this.scatter.identity.accounts[0];
    }
  },
  methods: {
    login() {
      // Connect Scatter to specific account (user account) and network (CHAIN_ID)
      this.scatter.getIdentity({
        accounts: [network]
      });
    },
    logout() {
      // Scatter forget identity API
      this.scatter.forgetIdentity();
    },
    setEosInstance() {
      if (this.account) {
        // Since we have a user with Scatter we're going to overwrite the eosjs instance
        // with one that can sign transactions with Scatter.
        eos = this.scatter.eos(network, Eos);
      } else {
        // There is no user, so we're using a fallback eosjs instance so we can still fetch things
        // from chain.
        eos = Eos({ httpEndpoint: network.fullhost() });
      }
    }
  },
  mounted() {
    // Eosjs setup
    this.setEosInstance();

    // Connecting Scatter first to make sure the user has Scatter installed.
    ScatterJS.scatter.connect("SPACE_MINER").then(connected => {
      if (!connected) {
        // IF the user doesn't have Scatter, or it's closed.
        console.error("Could not connect to Scatter.");
        return;
      }
      // If connected, reference to the Scatter object.
      this.scatter = ScatterJS.scatter;
    });

    // Show How To play modal on page load

    if (localStorage.isShownHowToModal !== "true") {
      this.showHowModal();
      localStorage.isShownHowToModal = "true";
    }
  },
  watch: {
    account(val) {
      if (val.length > 0) {
        console.log(val);
        this.$store.commit("updateAccountStatus", true);
      }
    }
  }
};
</script>

<style lang="scss">
/* Main Container - Full Screen */
.full-page {
  padding: 0;
  margin: 0;
  /* Background Image - Cover full screen */
  background: rgba(142, 45, 226, 0.9);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

/* Main container */
.full-page {
  min-height: 100vh;
  width: 100%;
}

.main-actions {
  z-index: 500;
}

/* Content elements - Div horizontal center */
.vertical-center {
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */
  display: flex;
  align-items: center;
}

/* Content elements - Div vertical center */
.vertical-center > .container {
  max-width: 100%;
  display: inline-block;
  vertical-align: middle; /* vertical alignment of the inline element */
  /* reset the font property */
}

#splash-yellow-button {
  width: 150px;
}
</style>
