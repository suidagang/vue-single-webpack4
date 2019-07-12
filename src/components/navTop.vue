<template>
    <div class="nav-top-box">
        <div class="list-box" @click="goComprehensive" :class="{'active':active[0]}">综合势力</div>
        <div class="list-box" @click="goRoom" :class="{'active':active[1]}">人员住宿</div>
        <div class="list-box" @click="goVisitor" :class="{'active':active[2]}">访客概况</div>
        <div class="list-box" @click="goSecurity" :class="{'active':active[3]}">安保力量</div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data(){
            return{
                active:[1,0,0,0]
            }
        },
        mounted() {
            this.choiceState();
        },
        methods: {
            goComprehensive(){
                this.$router.push("/comprehensive")
            },
            goRoom(){
                this.$router.push("/room")
            },
            goVisitor(){
                this.$router.push("/visitor")
            },
            goSecurity(){
                this.$router.push("/security")
            },
            choiceState(){
                switch(this.$route.path) {
                    case '/comprehensive':
                        this.active = [1,0,0,0];
                        break;
                    case '/room':
                        this.active = [0,1,0,0];
                        break;
                    case '/visitor':
                        this.active = [0,0,1,0];
                        break;
                    case '/security':
                        this.active = [0,0,0,1];
                        break;
                    default:
                        this.active = [1,0,0,0];
                } 
            }
        },
        watch:{
            "$route":"choiceState"
        }
    };
</script>

<style lang='less' scoped>
    .nav-top-box{
        height: 100px;
        overflow: hidden;
        display: flex;
        
    }
    .list-box{
        flex: 1;
        height: 60px;
        line-height: 60px;
        text-align: center;
        line-height: 60px;
    }
    .active{
        color: red;
    }
</style>