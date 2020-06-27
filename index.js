var faces=document.getElementsByClassName("fac");
faces[3].style.transform='scale(0.9)';
var fact=40/faces.length;
var sfact=fact*0.01;
var temp;
var ishome=true;
arrange();

//arranging all with the corresponding position
function arrange(){
    for(var i=0;i<faces.length;i++){    
        faces[i].style.transform=`scaleX(${0.7+i*sfact}) translateY(${-40+i*fact}px)`;
        faces[i].style.zIndex=i;
    }
}

//back to front for divs
function tofront(){
    var temps=new Array(faces.length);
    temp=faces[faces.length-1];
    for(var i=1;i<faces.length;i++){
        temps[i]=faces[i-1];
    }
    temps[0]=temp;
    faces=temps;
    faces[0].style.transition=`all 0.2s`;
    faces[0].style.transform=`scale(0.9) translateY(-50%) rotateX(-90deg)`;
    setTimeout(()=>{
        faces[0].style.zIndex=0;
        faces[0].style.transition=`all 0.5s`;
        setTimeout(()=>{
            arrange();
        },10)
    },200)
}

//front to back for divs
function toback(){
    var temps=new Array(faces.length);
    temp=faces[0];
    for(var i=0;i<faces.length-1;i++){
        temps[i]=faces[i+1];
    }
    temps[faces.length-1]=temp;
    faces=temps;
    faces[faces.length-1].style.transition=`all 0.2s`;
    faces[faces.length-1].style.transform=`scale(0.9) translateY(-50%) rotateX(-90deg)`;
    setTimeout(()=>{
        faces[faces.length-1].style.zIndex=0;
        faces[faces.length-1].style.transition=`all 0.5s`;
        setTimeout(()=>{
            arrange();
        },10)
    },200)
}

//touch --swipes

document.getElementById('box').addEventListener('touchstart',handlestart,false);
document.getElementById('box').addEventListener('touchmove',handlemove,false);
document.getElementById('box').addEventListener('touchend',handleend,false);

var touchx=null;
var touchy=null;
var deltatouchx=null;
var deltatouchy=null;
function getTouches(){
    return event.touches||event.originalEvent.touch;
}
function handlestart(){
    if(menubt){
        menushow();
    }
    if(!ishome){
        return;
    }
    val=getTouches()[0];
    touchx=val.clientX;
    touchy=val.clientY;
}
function handlemove(){
    if(!ishome){
        return;
    }
    val=getTouches()[0];
    deltatouchx=val.clientX-touchx;
    deltatouchy=val.clientY-touchy;
    if(Math.abs(deltatouchx)>Math.abs(deltatouchy)){
        if(deltatouchx>0){
            //console.log('swiping right');
        }
        else{
            //console.log('swiping left')
        }
    }
    else{
        if(deltatouchy>0){
            if(Math.abs(deltatouchy)<50){
                //console.log('changing vals');
                faces[0].style.zIndex=Math.floor(Math.abs(deltatouchy)/10);
                faces[0].style.transform=`scale(0.9) translateY(${-deltatouchy}%) rotateX(${0.1*deltatouchy}deg)`;
            }
            else{
                console.log('swiping down');
            }
        }
        else{
            if(Math.abs(deltatouchy)<50){
                //console.log('changing vals');
                faces[faces.length-1].style.transform=`scale(0.9) translateY(${deltatouchy}%) rotateX(${1.4*deltatouchy}deg)`;
            }
            else{
                //console.log('swiping up');
            }
        }
    }
}
function handleend(){
    if(!deltatouchx && !deltatouchy){
        return;
    }
    if(Math.abs(deltatouchx)>Math.abs(deltatouchy)){
        if(deltatouchx>0){
            console.log('swiped right');
        }
        else{
            console.log('swiped left')
        }
    }
    else{
        if(deltatouchy>0){
            console.log('swiped down');
            if(Math.abs(deltatouchy)>50){
                toback();
            }
        }
        else{
            console.log('swiped up');
            if(Math.abs(deltatouchy)>50){
                tofront();
            }
        }
    }
    arrange();
    touchx=null;
    touchy=null;
    deltatouchy=null;
    deltatouchx=null;
}

//mousepointer swipes....

document.getElementById('box').addEventListener('mousedown',mousestart,false);
document.getElementById('box').addEventListener('mousemove',mousemove,false);
document.getElementById('box').addEventListener('mouseup',mouseend,false);
var clicked=false;

var mousex=null;
var mousey=null;
var deltamousex=null;
var deltamousey=null;
function mousestart(){
    if(menubt){
        menushow();
    }
    mousex=event.pageX;
    mousey=event.pageY;
    clicked=true;
}
function mousemove(){
    if(!clicked){
        return;
    }
    deltamousex=event.pageX-mousex;
    deltamousey=event.pageY-mousey;
    if(Math.abs(deltamousex)>Math.abs(deltamousey)){
        if(deltamousex>0){
            //console.log('mouse moving right');
        }
        else{
            //console.log('mouse moving left')
        }
    }
    else{
        if(deltamousey>0){
            if(Math.abs(deltamousey)<50){
                //console.log('changing vals');
                faces[0].style.zIndex=Math.floor(Math.abs(deltamousey)/10);
                faces[0].style.transform=`scale(0.9) translateY(${-deltamousey}%) rotateX(${0.1*deltamousey}deg)`;
            }
            else{
                //console.log('mouse moving down');
            }
        }
        else{
            if(Math.abs(deltamousey)<50){
                //console.log('changing vals');
                faces[faces.length-1].style.transform=`scale(0.9) translateY(${deltamousey}%) rotateX(${1.4*deltamousey}deg)`;
            }
            else{
                //console.log('mouse moving up');
            }
        }
    }
}
function mouseend(){
    clicked=false;
    if(!deltamousex && !deltamousey){
        return;
    }
    if(Math.abs(deltamousex)>Math.abs(deltamousey)){
        if(deltamousex>0){
            console.log('mouse moved right');
        }
        else{
            console.log('mouse moved left')
        }
    }
    else{
        if(deltamousey>0){
            console.log('mouse moved down');
            if(Math.abs(deltamousey)>50){
                toback();
            }
        }
        else{
            console.log('mouse moved up');
            if(Math.abs(deltamousey)>50){
                tofront();
            }
        }
    }
    arrange();
    mousex=null;
    mousey=null;
    deltamousey=null;
    deltamousex=null;
}

//main player playing code

var player=document.getElementsByTagName('audio')[0];
var boolplay=false;
var pausingforbuffering;
function play(){
    if(boolplay){
        player.pause();
        document.getElementById('power').innerHTML=`<i class="fa fa-play" aria-hidden="true"></i>`;
        document.getElementById('power').classList.remove('pow');
        document.getElementById('power').classList.remove('load');
        document.getElementById('hed').classList.remove('pow');
        document.getElementById('power').classList.remove('err');
        boolplay=false;
    }
    else{
        document.getElementById('power').classList.add('load');
        document.getElementById('power').classList.remove('err');
        if(player.play()!==undefined){
            player.play().then(()=>{
                document.getElementById('power').innerHTML=`<i class="fa fa-pause" aria-hidden="true"></i>`;
                document.getElementById('power').classList.add('pow');
                document.getElementById('hed').classList.add('pow');
                document.getElementById('power').classList.remove('load');
                boolplay=true;
            })
            .catch(error=>{
                console.log('error');
                document.getElementById('power').classList.add('err');
                document.getElementById('power').classList.remove('load');
                return;
            });
        }
    }
}

//timer -- for async functions

function timer(ms){
    return new Promise(res=>setTimeout(res,ms))
}

//ensure image cannot be dragged
var images;
function init(){
    topheadchange('Home','home');
    menushow();
    images=document.getElementsByTagName('img');
    for(var i=0;i<images.length;i++){
        images[i].draggable=false;
        images[i].alt="image can't be rendered";
    }
}

//random color
function ran(){
    return(Math.floor(Math.random()*16));
}
//change background color every 10000ms
setInterval(()=>{
    tar=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    tempcolor=tar[ran()]+tar[ran()]+tar[ran()];
    document.getElementById('box').style.background=`linear-gradient(135deg,#${tempcolor},black)`;
    console.log('colour change');
},15000);


//menu transition-- handburger
let menubt=false;
async function menushow(){
    sbar=document.getElementById('sbar');
    menu=document.getElementById('menu');
    menutext=document.getElementById('menutext');
    menubar=document.getElementById('menubar');
    if(!menubt){
        menu.classList.add('open');
        menubar.style.width='220px';
        menutext.innerHTML='Menu';
        //call();
        sbar.style.height='auto';
    }
    else{
        menu.classList.remove('open');
        menubar.style.width='0px';
        menutext.innerHTML='';
        await timer(500);
        sbar.style.height='0px';
    }
    menubt=!menubt;
}
function checkmenu(){
    if(menubt){
        menushow();
    }
}


/*
menuanimtext='Menu';
async function call(){
    for(var animi=0;animi<menuanimtext.length;animi++){
        menutext.innerHTML+=menuanimtext[animi];
        await timer(100);
    }
}
*/


var onscerrenwin=null;
async function topheadchange(x){
    if(onscerrenwin==x){
        menushow();
        return;
    }
    else{
        if(onscerrenwin){
            document.getElementById(onscerrenwin).classList.remove('cur');
        }
        onscerrenwin=x;
        document.getElementById(onscerrenwin).classList.add('cur');
    }
    html=`<p>This is under development</p><br>`;
    var curobj;
    otabs.forEach(element => {
        if(element.label==x){
            curobj=element;
        }
    });
    html+=curobj.html;
    document.getElementById('OTbody').style.opacity='0';
    if(x=='Home'){
        document.getElementById('OTbody').style.width='0px';
        ishome=true;
    }
    else{
        await timer(100);
        document.getElementById('OTbody').style.width='95%';
        document.getElementById('OTbody').style.opacity='1';
        ishome=false;
    }
    menushow();
    document.getElementById('topheader').style.opacity='0';
    document.getElementById('topheader').style.transform='translateY(-100%)';
    await timer(100);
    document.getElementById('topheader').innerHTML=`
        <i class="fab fa-${curobj.icon} fa" id='curicon'></i>
        <div class="headtitle" id='curhead'>${x}</div>
        <div class="menutext" id='menutext'></div>
        <div class="menu open" id='menu' onclick="menushow()">
            <span></span>
        </div>`;
    document.getElementById('otabshtml').innerHTML=html;
    document.getElementById('topheader').style.opacity='1';
    document.getElementById('topheader').style.transform='translateY(0%)';
    await timer(100);
    document.getElementById('menu').classList.remove('open');
    console.log('tet');
}

//is user is playing then boolplay is true
var pretime;
var buffering=0;
var called=false;
setInterval(()=>{
    if(!boolplay){
        return;
    }
    if(player.currentTime==pretime){
        buffering++;
        if(buffering>2 && !called){
            play();
            play();
            called=true;
        }
    }
    else{
        buffering=0;
        called=false;
    }
    pretime=player.currentTime;
},100)


//Notifications
/*
function AskNotificationPermission(){
    function HandlePermission(permission){
        if(!('permission' in Notification)){
            Notification.permission=permission;
        }
        if(Notification.permission=='denied' || Notification.permission=='default'){
            console.log('denied or default');
        }else{
            console.log('granted');
        }
    }
    if(!('Notification' in window)){
        console.log('This browser doesnot support notifications');
    }
    else{
        if(CheckNotificationPromise()){
            Notification.requestPermission().then((permission)=>{
                HandlePermission(permission);
            })
        }
        else{
            Notification.requestPermission(function(permission){
                HandlePermission(permission);
            });
        }
    }
}
function CheckNotificationPromise(){
    try{
        Notification.requestPermission().then();
    }catch(e){
        return false;
    }
    return true;
}


var img='images/nitcpic.png';
var text=`Radio running in background.`;
var notification;

function shownotification(){
    notification=new Notification('Radio',{
        body:text,
        icon:img,
    });
}

document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState=='visible'){
        notification.close;
    }
    else{
        shownotification();
    }
})
*/
