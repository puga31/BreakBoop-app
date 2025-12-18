import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MoveService } from '../../services/moves.service';
import { RoundService } from '../../services/round.service';
import { AuthService, User } from '../../services/auth.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Move {
  idmove: number;
  name: string;
}

@Component({
  selector: 'app-create-round',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  templateUrl: './create-round.component.html',
  styleUrls: ['./create-round.component.css']
})
export class CreateRoundComponent implements OnInit {
  roundForm!: FormGroup; //Nuestro formulario para crear y editar rondas
  moves: Move[] = [];
  user!: User | null;
  selectedRound: any = null;
  editingRoundId: number | null = null;
  searchTerm: string = '';

//Columnas de la tambla

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private moveService: MoveService,
    private roundService: RoundService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roundForm = this.fb.group({
      name: ['', Validators.required],
      selectedMoves: [[]]
    });

//Cargamos los movimientos 

    this.moveService.getAll().subscribe({
      next: (moves) => this.moves = moves,
      error: (err) => console.error('Error cargando movimientos', err)
    });


//Obtenemos el usurio registrado y su rondas
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadRounds(user.iduser);
      }
    });

    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.name.toLowerCase().includes(filter);
  }

  loadRounds(userId: number) {
    this.roundService.getRoundsByUser(userId).subscribe({
      next: (rounds) => {
        this.dataSource = new MatTableDataSource(rounds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: any, filter: string) =>
          data.name.toLowerCase().includes(filter);

        this.filterRounds();
      },
      error: (err) => console.error('Error cargando rondas', err)
    });
  }

  filterRounds() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateModal() {
    this.resetForm();
    const modal = new (window as any).bootstrap.Modal(document.getElementById('createRoundModal'));
    modal.show();
  }


//checkboxes para la selección de movimientos 

  onCheckboxChange(event: any) {
    const selectedMoves = this.roundForm.value.selectedMoves || [];
    const value = +event.source.value;

    if (event.checked) {
      if (!selectedMoves.includes(value)) {
        selectedMoves.push(value);
      }
    } else {
      const index = selectedMoves.indexOf(value);
      if (index !== -1) selectedMoves.splice(index, 1);
    }

    this.roundForm.controls['selectedMoves'].setValue(selectedMoves);
  }

  onSubmit() {
    if (!this.user || this.roundForm.invalid) return;

    const payload = {
      userId: this.user.iduser,
      name: this.roundForm.value.name,
      moveIds: this.roundForm.value.selectedMoves
    };

    if (this.editingRoundId) {
      this.roundService.updateRound({ ...payload, id: this.editingRoundId }).subscribe(() => {
        this.loadRounds(this.user!.iduser);
        this.closeModal('createRoundModal');
        this.resetForm();
      });
    } else {
      this.roundService.createRound(payload).subscribe(() => {
        this.loadRounds(this.user!.iduser);
        this.closeModal('createRoundModal');
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.roundForm.reset();
    this.roundForm.controls['selectedMoves'].setValue([]);
    this.editingRoundId = null;
  }

  getMoveNames(round: any): string[] {
    return round?.moves?.map((m: any) => m.name) || [];
  }

  openModal(round: any) {
    this.selectedRound = round;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('movesModal'));
    modal.show();
  }

  editRound(round: any) {
    this.editingRoundId = round.id;
    this.roundForm.patchValue({
      name: round.name,
      selectedMoves: round.moves.map((m: any) => m.idmove)
    });
    const modal = new (window as any).bootstrap.Modal(document.getElementById('createRoundModal'));
    modal.show();
  }

  deleteRound(roundId: number) {
    if (!this.user) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta ronda?')) {
      this.roundService.deleteRound(roundId, this.user.iduser).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(round => round.id !== roundId);
        this.dataSource._updateChangeSubscription();
        this.snackBar.open('Ronda eliminada correctamente', 'Cerrar', { duration: 3000 });
      }, err => {
        console.error('Error eliminando la ronda:', err);
        this.snackBar.open('Error al eliminar la ronda', 'Cerrar', { duration: 3000 });
      });
    }
  }

  closeModal(id: string) {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
  }
}
