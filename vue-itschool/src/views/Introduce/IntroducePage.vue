<template>
  <aritcle>
    <header>
      <h1><span>IntroduceSchool</span></h1>
    </header>
    <body>
      <section>
        <!-- boutons de routeur -->
        <nav class="flex jc-center">
          <button
            id="Events"
            class="mlr-2r"
            @click="router('/Introduce/Events')"
          >
            Events
          </button>
          <button
            id="Facility"
            class="mlr-2r"
            @click="router('/Introduce/Facility')"
          >
            Facility
          </button>
          <button
            id="Capacity"
            class="mlr-2r"
            @click="router('/Introduce/Capacity')"
          >
            Capacity
          </button>
          <button
            id="Access"
            class="mlr-2r"
            @click="router('/Introduce/Access')"
          >
            Access
          </button>
        </nav>
        <router-view></router-view>
      </section>
    </body>
  </aritcle>
</template>

<script scoped>
export default {
  methods: {
    router(nomPage) {
      this.$router.push({ path: nomPage }); //prendre le rôle de router
    },
  },
};
</script>

<style scoped>
h1 {
  position: relative;
  overflow: hidden;
  padding: 1.5rem 2rem 1.5rem 160px;
  border-top: 3px solid #000;
}

h1:before {
  position: absolute;
  top: -210%;
  left: -150px;
  width: 420px;
  height: 400%;
  content: "";
  -webkit-transform: rotate(25deg);
  transform: rotate(25deg);
  background: #000;
}

h1 span {
  font-size: 2px;
  font-size: 2rem;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: block;
  padding-top: 3px;
  padding-left: 16px;
  color: #fff;
}
</style>
