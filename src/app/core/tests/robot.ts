export class Robot {
  usuario: string;
  bateria = 100;

  funcionalidades: string[] = ['parlantes', 'wifi', 'bluetooth'];

  constructor(usuario: string) {
    this.usuario = usuario;
  }

  encender(): void {
    if (this.bateria > 0) {
      console.log(`Hola ${this.usuario}!`);
      this.bateria -= 50;
    } else {
      this.mostrarErrorBateria();
    }
  }

  lavar(): void {
    if (this.bateria > 0) {
      this.bateria -= 20;
    } else {
      this.mostrarErrorBateria();
    }
  }

  mostrarErrorBateria(): void {
    console.error('No hay bateria');
  }
}
