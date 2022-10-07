import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  day:any;
  days:any;
  month:any;
  year:any;
   
  order_transaction=[];
  order_length=[];
  msg_news=[];
  msg_length=[];
  msg_news_string:string;
  intervalVar;

  table1="#192a56";
  table2="#273c75";
  color1:any = "#0000ff";
  color2:any = "#4d4dff";
  head_size:any = 20;
  head_color:any ="#ffffff";
  text_color:any ="#ffffff";
  text_size:any = 22;
  
  min1:any;
  max1:any;

  today:any

  min_in1:any = 0;
  max_in1:any = 16;

  public ddd : number  = Date.now();

  clockElts = [];
  clockTimer = null;
  cpt = 0;

  constructor(private socket: Socket,private http:HttpClient) {
    this.socket.connect();

  }

  ngOnInit(){
    document.documentElement.style.setProperty("--main-background-color1", this.table1);
    document.documentElement.style.setProperty("--main-background-color2", this.table2);

    this.socket.fromEvent('day').subscribe(message => {
    this.day = message;
    })
    this.socket.fromEvent('days').subscribe(message => {
      this.days = message;
      })
    this.socket.fromEvent('month').subscribe(message => {
     this.month = message;
     })
     this.socket.fromEvent('year').subscribe(message => {
      this.year = message;
     })

    this.socket.fromEvent('time').subscribe(message => {
      this.today = message;
    })

    this.socket.fromEvent('order_transaction_head_next').subscribe(message => {

      this.order_length=[];
      this.order_transaction=[];
     this.order_length.push(message);
      console.log(message);
      for(let i =0; i< 100; i++){
          if(i < this.order_length[0].length){ 
         this.order_transaction.push(message[i]);
         console.log(this.order_transaction);
          }else{
            this.order_transaction.push({hn: "xxxxxx",
            internal_que: "xxxx",
            order_state: "xxxxxxx",
            state_color: "xxxxxxx",
            state_description: "xxxxxxx",
            state_name: "xxxxxxx"});
          }
      }
    })
    
    this.http.get('http://192.168.15.245:3030/api/news').subscribe((response) => {
      console.log(response);
      this.msg_news.push(response);  
          
      for(let i =0; i < this.msg_news[0].length; i++){
        setTimeout(()=>{
           this.msg_length=[];
           this.msg_length.push(response[i].msg);
           this.msg_news_string = this.msg_length[0];
      },20000*i)
     }

  });
  this.min1 = this.min_in1;
  this.max1 = this.max_in1;
 
  document.documentElement.style.setProperty("--main-background-color1", this.color1);
  document.documentElement.style.setProperty("--main-background-color2", this.color2); 
  document.documentElement.style.setProperty("--color-head", this.head_color); 
  document.documentElement.style.setProperty("--color-text", this.text_color); 

}



  _currentDate$(){
let monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
 let dayNames = ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"];
var d = new Date();
    this.day= dayNames[d.getDay()];
    this.days=d.getDate();
    this.month=monthNamesThai[d.getMonth()];
    this.year=d.getFullYear()+543;
 console.log("The current Date is  " + this.day+"  "+this.days+""+this.month+"  "+this.year);
  }

  setting(){
    this.min1 = this.min_in1;
    this.max1 = this.max_in1;
    document.documentElement.style.setProperty("--main-background-color1", this.color1);
    document.documentElement.style.setProperty("--main-background-color2", this.color2); 
    document.documentElement.style.setProperty("--color-head", this.head_color); 
    document.documentElement.style.setProperty("--color-text", this.text_color); 
  }


  
}
