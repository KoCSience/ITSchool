<template>
    <!-- composant AjouterTache -->
    <section class="mlr-25">
        <h2>Login Screen</h2>
        <!-- formulaire qui permet d'ajouter une tâche -->
        <form class="mlr-25">
            <h3 class="border-b-blue">Enter your information</h3>
            <div class="left">
                <label  for="titre">Student ID</label>
                <input id="titre" class="w-100" type="text"  v-model="titre" />
            </div>
            <div class="left">
                <label for="description">Password</label>
                <textarea id="description" class="w-100" type="text" v-model="description"/>
            </div>
            <div class="left">
                <label for="">You forget your password?</label>
                <input type="checkbox" name="fini" v-model="fini">
            </div>
            <!-- appeler la méthode add en cliquant le bouton et appeler la méthode ajouterTache qui est dans 'Exerceice1View' -->
            <button @click.prevent="add" >Enter</button>
        </form>
    </section>
</template>

<script>
    export default { 
        name: 'AjouterTache', //nommer ce composant comme 'AjouterTache'
        data: function() {
            return {
                titre: '',
                description: '',
                fini: false
            }
        },
        methods: {
            add: function() {
                this.$emit('taskadded', { //attribut personnel qui permet de passe la méthode de 'Exerceice1View' à ce composant
                    titre: this.titre,
                    description: this.description,
                    fini: this.fini
                })
            }
        }
    }
</script>

<style scoped>
h2 {
        position: relative;
        height: 30px;
        margin-right: 200px;
        margin-left: 200px;
        padding: 0rem 2rem 0 2rem;
        word-break: break-all;
        color: #fff;
        background: #000;
    }
    

</style>