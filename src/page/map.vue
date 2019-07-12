<template>
    <div>
        <NavTop></NavTop>
        <router-view></router-view>
    </div>
</template>

<script>
import NavTop from '@/components/navTop.vue';
    export default {
        name: "map",
        components:{
            NavTop
        },
        mounted() {},
        methods: {
            btn() {}
        }
    };
</script>

<style lang='less' scoped>

</style>