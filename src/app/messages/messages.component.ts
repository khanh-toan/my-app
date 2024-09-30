import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  ngOnInit(): void {
    // Phương thức này sẽ được gọi sau khi component được khởi tạo
    // Bạn có thể thực hiện bất kỳ logic khởi tạo nào ở đây
    console.log('MessagesComponent initialized');
  }
}
