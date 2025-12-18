import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../services/auth.service'; // Asegúrate de ajustar la ruta

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideChange', [
      state('0', style({ opacity: 1, transform: 'translateX(0)' })),
      state('1', style({ opacity: 1, transform: 'translateX(0)' })),
      state('2', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('600ms ease-out'),
      ]),
    ]),
  ],
})

//Utilizamos esto para la gestión del slider

export class IndexComponent implements OnInit {
  slides = [
    { title: 'Registra tus movimientos', text: 'Lleva un registro de tus movimientos.' },
    { title: 'Crea tus rondas', text: 'Prepara tus salidas para los próximos eventos.' },
    { title: 'Comparte tus movimientos', text: 'Enseña tus movimientos a otros bboys y bgirls' },
  ];

  currentIndex = 0;
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
