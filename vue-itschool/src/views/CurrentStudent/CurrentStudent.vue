<template>
<head>
  <title>LIT.com</title>
  <meta charset="utf-8">
  <link rel = "stylesheet" href="style.css">
  
</head>
<body>
  <h1><span>To</span>Current students</h1>
  <img alt="Vue logo" src="../CurrentStudent/image.png" width="400" height="400">
  <article>
        <section>
            <!-- boutons de routeur -->
            <nav class="flex jc-center">
                <button id="Announce" class="mlr-2r"  @click="router('/ex3/Announce')" >Announce</button>
                <button id="Login" class="mlr-2r"  @click="router('/ex3/Login')">Login</button>
                <button id="Schedule" class="mlr-2r"  @click="router('/ex3/Schedule')">Schedule</button>
                <button id="Event" class="mlr-2r" @click="router('/ex3/Event')">Event</button>
                <button id="Map" class="mlr-2r" @click="router('/ex3/Map')">Map</button>
                <button id="Question" class="mlr-2r" @click="router('/ex3/Question')">Question</button>
            </nav>
            <router-view></router-view>

        </section>
    </article>
 
    
  
</body>

</template>

<style scoped>

h1 {
    position: relative;
    overflow: hidden;
    font-size: 50px;
    padding: 1.5rem 2rem 1.5rem 130px;
    border-top: 3px solid #000;
  }
  
  h1:before {
    position: absolute;
    top: -150%;
    left: -100px;
    width: 225px;
    height: 300%;
    content: '';
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
    background: #000;
  }
  
  h1 span {
    font-size: 40px;
    font-size: 4rem;
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

<script Scoped>
export default {
    methods: {
        router(nomPage){
            this.$router.push({path:nomPage}) //prendre le rôle de router
        },
    }
}

</script>

