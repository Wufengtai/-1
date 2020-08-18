var G = new Vue({
    el:"#Gren",
    data:{
        number1:0,
        number2:0,
    },

    methods:{
        zhan(){
            console.log("阅读者点击了赞")
            this.number1++;
        },
        shou(){
            console.log("阅读者点击了收藏")
            this.number2++;
        }
    }


})