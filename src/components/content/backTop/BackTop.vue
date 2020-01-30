<template>
    <div class="back-top" >
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
    export default {
        name:'BackTop',
        props:[''],
        data () {
            return {

            };
        },
        components: {},
        computed: {},
        methods: {

        },

    }

</script>

<style scoped>
.back-top{
    position: fixed;
    right: 5px;
    bottom: 45px;
    
}
.back-top img{
    height: 43px;
    width: 43px;
}
</style>