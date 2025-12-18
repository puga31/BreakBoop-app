import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'breakbook-front';

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Limpia clases anteriores del body
        this.renderer.removeClass(document.body, 'bg-index-login-register');

        // Aplica la clase si la ruta coincide con las deseadas
        const allowedRoutes = ['/', '/index', '/login', '/register'];
        if (allowedRoutes.includes(event.urlAfterRedirects)) {
          this.renderer.addClass(document.body, 'bg-index-login-register');
        }
      }
    });
  }
}
