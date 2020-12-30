import { Component, OnInit ,forwardRef} from '@angular/core';
import {BreadcrumbService} from '../../../../breadcrumb.service';
import {MessageService} from 'primeng/api';
import {ApplicationInitService} from '../../../../services/application-init.service';
import { SexoDTO } from 'src/app/models/generales/sexo-dto';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { FamiliarBeneficiarioDto } from 'src/app/models/familiar_beneficiario/familiar-beneficiario-dto';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-familiar-alta',
  templateUrl: './familiar-alta.component.html',
  styleUrls: ['./familiar-alta.component.css'],
  providers: [MessageService]
})
export class FamiliarAltaComponent implements OnInit {

  public nuevoMiembroArquitecturaDTO: FamiliarBeneficiarioDto;
  sexos: SexoDTO[] = [];
  sexoSeleccionado: SexoDTO;
  es: any;
  puedeRegistrarse = true;
  match = true;
  display = false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private breadcrumbService: BreadcrumbService, private messageService: MessageService,
    private applicationInitService: ApplicationInitService) {

      this.breadcrumbService.setItems([
      { label: 'Registro', routerLink: ['/familiarBeneficiario/registro'] }
      ]);

    }

  ngOnInit(): void {
    this.nuevoMiembroArquitecturaDTO = new FamiliarBeneficiarioDto();

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
          'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'dd/mm/yy'
  };

    this.applicationInitService.getCatalogoSexo().subscribe(data3 => {
      this.blockUI.stop();
      this.sexos = data3;
      this.sexoSeleccionado = this.sexos[0];
    }, error => {
        this.blockUI.stop();
        this.sexos = [];
        this.messageService.add({severity: 'error', summary: 'Error',
                detail: 'Ocurrió un error en la búsqueda de datos requeridos.' +
                ' Vuelva a cargar la página, si el problema persiste, contacte a su administrador'});
    
    });

  }

  registrarUsuario() {
    this.blockUI.start('Guardando...');

    this.applicationInitService.nuevoFamiliarBeneficiario(this.nuevoMiembroArquitecturaDTO).subscribe (any => {
      console.log('resultado '+ any);
    });


  }

  closeDialog() {
    this.display = false;
  }

}
