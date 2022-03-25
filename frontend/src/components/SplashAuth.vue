<template>
    <section class="contract">
          <!-- Login with Scatter Button -->
          <b-button
            size="lg"
            class="blue-button mt-5"
            @click="login"
            v-if="scatter && !account"
          >Login with Scatter</b-button>
          <!-- Start Playing Button -->
          <section class="logged-in-with mt-5" v-if="scatter && account">
            <b-button
              to="/home"
              size="lg"
              class="mt-2 yellow-button d-block mx-auto text-uppercase"
              id="splash-yellow-button"
            >PLay Now!</b-button>
          </section>
          <!-- No Scatter detected, you have to download Scatter -->
          <section v-if="!scatter">
            You need Scatter to interact with this website.
            <a
              href="https://get-scatter.com/"
              target="_blank"
            >Click here to get it.</a>
          </section>
          <!-- Logged in as (Account Name) -->
          <div v-if="scatter && account" class="font-weight-light text-white mt-5">
            <span>Logged in as:</span>
            <b-link
              class="mr-2 text-white"
              v-bind:href="'https://bloks.io/account/' + account.name"
            >
              <u>{{account.name}}</u>
            </b-link>
            <!--<span class="mr-2">{{account.name}}</span>-->
            <b-button
              size="sm"
              variant="outline-danger"
              class="small mt-0 mx-auto"
              @click="logout"
            >Logout</b-button>
          </div>
        </section>
</template>

<script>
export default {
    props: {
        scatter: Object,
        account: Object,
        login: Function,
        logout: Function
    }
}
</script>