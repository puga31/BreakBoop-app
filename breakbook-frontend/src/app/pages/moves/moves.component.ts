import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MoveService } from '../../services/moves.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthService, User } from '../../services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-moves',
  standalone: true,
  imports: [
    SharedModule,
    MatIconModule,
  ],
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit, AfterViewInit {
  moves: any[] = [];
  showSuccess = false;
  successMessage = '';  
  showError = false;
  errorMessage = '';
  showForm = false;
  currentMoveId: number | null = null;
  selectedMove: any = null;

  moveForm: FormGroup;

  displayedColumns: string[] = ['name', 'type', 'user', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchTerm: string = '';

  constructor(
    private movesService: MoveService,
    private fb: FormBuilder,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.moveForm = this.fb.group({
      name: ['', Validators.required],
      video: [''],
      origin: [''],
      history: [''],
      type: ['']
    });
  }

  ngOnInit(): void {
    this.loadMoves();
  }

  ngAfterViewInit(): void {
  }

  loadMoves(): void {
    this.movesService.getAll().subscribe({
      next: data => {
        this.moves = data.map(move => ({
          ...move,
          video_iframe: this.transformVideo(move.video)
        }));

        this.dataSource = new MatTableDataSource(this.moves);
        this.dataSource.filterPredicate = (data: any, filter: string) =>
          data.name.toLowerCase().includes(filter);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: err => {
        console.error('Error al cargar movimientos:', err);
        this.showError = true;
        this.errorMessage = 'Hubo un problema al cargar los movimientos.';
        setTimeout(() => this.showError = false, 5000);
      }
    });
  }

  filterMoves(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  transformVideo(video: string): SafeHtml | null {
    if (!video) return null;

    if (video.includes('<iframe')) {
      return this.sanitizer.bypassSecurityTrustHtml(video);
    }

    try {
      const url = new URL(video);
      let videoId = '';

      if (url.hostname === 'youtu.be') {
        videoId = url.pathname.substring(1);
      } else if (url.hostname.includes('youtube.com')) {
        videoId = url.searchParams.get('v') || '';
      }

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const iframe = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
        return this.sanitizer.bypassSecurityTrustHtml(iframe);
      }

      return null;
    } catch {
      return null;
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.currentMoveId = null;
      this.moveForm.reset();
    }
  }

  addMove(): void {
    if (this.moveForm.invalid) return;

    const currentUser: User | null = this.authService.getCurrentUser();

    if (!currentUser) {
      this.showError = true;
      this.errorMessage = 'No hay usuario logueado.';
      return;
    }

    const moveData = {
      ...this.moveForm.value,
      user: { iduser: currentUser.iduser }
    };

    this.movesService.addMove(moveData).subscribe({
      next: newMove => {
        newMove.video_iframe = this.transformVideo(newMove.video);
        this.moves.push(newMove);
        this.dataSource.data = this.moves;
        this.moveForm.reset();
        this.showForm = false;

        this.successMessage = 'Movimiento guardado correctamente';
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 5000);
      },
      error: err => {
        console.error('Error al añadir el movimiento:', err);
        this.showError = true;
        this.errorMessage = 'Hubo un problema al añadir el movimiento.';
        setTimeout(() => this.showError = false, 5000);
      }
    });
  }

  updateMove(): void {
    if (this.moveForm.invalid || this.currentMoveId === null) return;

    const currentUser: User | null = this.authService.getCurrentUser();

    if (!currentUser) {
      this.showError = true;
      this.errorMessage = 'No hay usuario logueado.';
      return;
    }

    const moveData = {
      ...this.moveForm.value,
      user: { iduser: currentUser.iduser }
    };

    this.movesService.updateMove(this.currentMoveId, moveData).subscribe({
      next: updatedMove => {
        updatedMove.video_iframe = this.transformVideo(updatedMove.video);
        const index = this.moves.findIndex(m => m.idmove === this.currentMoveId);
        if (index !== -1) this.moves[index] = updatedMove;
        this.dataSource.data = this.moves;
        this.moveForm.reset();
        this.showForm = false;
        this.currentMoveId = null;

        this.successMessage = 'Movimiento actualizado correctamente';
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 5000);
      },
      error: err => {
        console.error('Error al actualizar el movimiento:', err);
        this.showError = true;
        this.errorMessage = 'Hubo un problema al actualizar el movimiento.';
        setTimeout(() => this.showError = false, 5000);
      }
    });
  }

  deleteMove(idmove: number): void {
    this.movesService.deleteMove(idmove).subscribe({
      next: () => {
        this.moves = this.moves.filter(move => move.idmove !== idmove);
        this.dataSource.data = this.moves;

        this.successMessage = 'Movimiento eliminado correctamente';
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 5000);
      },
      error: err => {
        console.error('Error al eliminar el movimiento:', err);
        this.showError = true;
        this.errorMessage = 'Hubo un problema al eliminar el movimiento.';
        setTimeout(() => this.showError = false, 5000);
      }
    });
  }

  editMove(move: any): void {
    this.currentMoveId = move.idmove;
    this.moveForm.patchValue({
      name: move.name,
      video: move.video,
      origin: move.origin,
      history: move.history,
      type: move.type
    });
    this.showForm = true;
  }

  openDetailModal(move: any): void {
    this.selectedMove = move;
  }
}
