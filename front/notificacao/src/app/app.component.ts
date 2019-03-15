import { Component, OnInit } from '@angular/core';
import { HttpStatus } from './common/util/http.status';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public HTTPActivity: boolean;

  constructor(private httpStatus: HttpStatus,
    private swUpdate: SwUpdate) { }

  ngOnInit(): void {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      setTimeout(() => {
        this.HTTPActivity = status;
      }, 0);
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Nova versão do aplicativo disponível. Deseja atualizar?')) {
          window.location.reload();
        }
      });

    }
  }
}
