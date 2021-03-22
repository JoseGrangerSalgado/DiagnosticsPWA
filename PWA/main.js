
var id = "ijeonbemphhljnnobhndhndooelapeha";
var message = null
var tablelist = [];
var counter = 0;
chrome.runtime.sendMessage(id,{},function(response) {
    message = response
    createTables(message.numOfProcessors);
    console.log(tablelist[0].data.datasets[0].data[0]);
    setInterval("UpdateTable(message.numOfProcessors)", 3000)
});


function createTables(amount){
    for(let i=0; i<=amount-1; i++){
        var mycanvas = document.createElement("canvas")
        mycanvas.id = "canvas"+i;
        mycanvas.getContext("2d")
        var chart = new Chart(mycanvas, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [message.processors[i].usage.user,message.processors[i].usage.kernel,message.processors[i].usage.idle],
                    backgroundColor: ["grey","darkblue","orange"],
                    label:"Core"+i
                }],
          
                labels: 
                [
                    'User (ms)',
                    'Kernel (ms)',
                    'Idle (ms)',
                ]
            },
            options: 
                {title: {
                    display: true,
                    text: 'Core'+i,
                    fontSize: 20
                },
                responsive: false,
            },
                

        });
        Charts.appendChild(mycanvas);
        tablelist.push(chart);
        
    }
}


function UpdateTable(num){

    chrome.runtime.sendMessage(id,{},function(response) {
         message = response
     });
    for(let i=0; i<=(num)-1; i++){
        tablelist[i].data.datasets[0].data[0] = message.processors[i].usage.user;
        tablelist[i].data.datasets[0].data[1] = message.processors[i].usage.kernel;
        tablelist[i].data.datasets[0].data[2] = message.processors[i].usage.idle;
        tablelist[i].update();
    }
    console.log(tablelist[0].data.datasets[0].data[0]);
    return 0;
}


function openSys()
{
  let sysmenu = document.getElementById("wrapper");
  if(counter == 0){
    sysmenu.style.display = "flex";
    counter+=1;
  }
  else{
    sysmenu.style.display = "none";
    counter = 0;
  }
}









