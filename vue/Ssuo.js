var Ssuo = new Vue({
    el:"#Ssuo",
    data:{
        Ssuotext:'',
        isShow:false,
        NO:[],
        dataList:["aaa","abc","bbb","cba","dfg","ggg"],
        dataListFu:["aaa","abc","bbb","cba","dfg","ggg"], 

    },
    methods:{
      SsuoClick(){
        console.log(this.Ssuotext)
            var newList = this.dataListFu.filter(item=>item.indexOf(this.Ssuotext)>-1)
            this.dataList = newList;
            this.isShow = true;
            
            
      },

      headerSpan(){
          this.dataList = this.NO;
      },

   
    }

})