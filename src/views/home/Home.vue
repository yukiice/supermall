<template>
    <div id="home">
        <nav-bar class="home-nav"><div  slot="center">购物街</div></nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

    export default {
        name:'Home',
        props:[''],
        data () {
            return {

            };
        },
        components: {
            NavBar
        },
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {},
        watch: {}

    }

</script>

<style scoped>
.home-nav {
    background-color: pink;
    color: white
}
</style>