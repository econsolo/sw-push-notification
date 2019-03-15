import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-acao-usuario-bottomsheet',
  templateUrl: './acao-usuario.bottomsheet.component.html',
  styleUrls: ['./acao-usuario.bottomsheet.component.css']
})
export class AcaoUsuarioBottomsheetComponent implements OnInit {

  public is_ativo: boolean;
  public can_notificar: boolean;

  constructor(private bottomSheetRef: MatBottomSheetRef<AcaoUsuarioBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.is_ativo = data.is_ativo;
    this.can_notificar = data.can_notificar;
  }

  ngOnInit() {
  }

  public opcao(event: MouseEvent, opcao: string): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss(opcao);
  }

}
