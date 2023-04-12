import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  userValue = '';
  transactionValue = '';
  productValue = '';

  ngOnInit() {
    // Generate random values for the first 3 seconds
    let count = 0;
    const interval = setInterval(() => {
      if (count < 3) {
        this.userValue = Math.floor(Math.random() * 2000 + 1000).toString();
        this.transactionValue = Math.floor(Math.random() * 5000 + 2000).toString();
        this.productValue = Math.floor(Math.random() * 1000 + 500).toString();
        count++;
      } else {
        clearInterval(interval);
        this.userValue = '1,236';
        this.transactionValue = '4,592';
        this.productValue = '789';
      }
    }, 500);
    this.startAnimation(0);
  }
 
  lines=[
    { text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse nihil maxime ad.', visible: false },
    { text: 'Vero fugit est nulla ratione consectetur pariatur eius dicta?', visible: false },
    { text: 'Eos veritatis quisquam assumenda dolorem sequi dolorum, modi officiis.', visible: false }
  ];
  startAnimation(index: number) {
    if (index < this.lines.length) {
      this.lines[index].visible = true;
      const lineElement = document.querySelector(`#lora .line:nth-child(${index + 1})`) as HTMLElement;
      lineElement.style.setProperty('--line-index', `${index}`);
      const duration = this.lines[index].text.length * 50;
      setTimeout(() => {
        this.startAnimation(index + 1);
        console.log("animation" + index);
      }, duration);
    }
  }
}
