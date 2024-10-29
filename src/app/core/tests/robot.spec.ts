import { Robot } from './robot';

describe('Pruebas de Robot', () => {
  let robot = new Robot('Matias');

  beforeEach(() => {
    robot = new Robot('Naruto');
  });

  it('Al instanciar el robot, el usuario debe ser "Matias"', () => {
    robot = new Robot('Matias');
    expect(robot.usuario).toBe('Matias');
  });

  it('Al instanciar a robot, la bateria debe ser 100', () => {
    expect(robot.bateria).toBe(100);
  });

  it("Al instanciar robor, debe tener en sus funcionalidades: 'wifi', 'bluetooth', 'parlantes'", () => {
    expect(robot.funcionalidades).toContain('wifi');
    expect(robot.funcionalidades).toContain('bluetooth');
    expect(robot.funcionalidades).toContain('parlantes');
  });

  it('Al encender, el robot debe saludar al usuario', () => {
    const spyOnLog = spyOn(console, 'log');

    robot.encender();
    expect(spyOnLog).toHaveBeenCalled(); // Ha sido llamado
    expect(spyOnLog).toHaveBeenCalledOnceWith('Hola Naruto!');
  });

  it('Al encender el robot, la bateria debe restar en 50', () => {
    robot.encender();
    expect(robot.bateria).toBe(50);
  });

  it('Si no hay bateria, deberia mostrar un error al intentar lavar', () => {
    const spyOnMostrarErrorBateria = spyOn(robot, 'mostrarErrorBateria');

    robot.encender();
    robot.bateria = 0;
    robot.lavar();
    expect(spyOnMostrarErrorBateria).toHaveBeenCalled();
  });

  it('La funcion lavar debe restar 20 de bateria', () => {
    robot.encender();
    robot.lavar();

    expect(robot.bateria).toBe(30);
  });
});
