const { Proyecto, Empleado, Tarea, TareaEmpleado } = require('./db');

const root = {
  obtenerProyectos: () => Proyecto.findAll(),
  obtenerEmpleados: () => Empleado.findAll(),
  obtenerTareas: async () => {
    const tareas = await Tarea.findAll({
      include: [
        { model: Proyecto, as: 'proyecto' },
        { model: Empleado, as: 'empleados' }
      ]
    });
    console.log('Tareas con datos relacionados:', JSON.stringify(tareas, null, 2));
    return tareas;
  },
  crearProyecto: ({ nombre }) => Proyecto.create({ nombre }),
  crearEmpleado: ({ nombre }) => Empleado.create({ nombre }),
  crearTarea: ({ titulo, descripcion, proyectoId }) => Tarea.create({ titulo, descripcion, proyectoId }),
  asignarEmpleadoATarea: async ({ tareaId, empleadoId }) => {
    const tarea = await Tarea.findByPk(tareaId);
    const empleado = await Empleado.findByPk(empleadoId);
    await tarea.addEmpleado(empleado);
    return tarea;
  }
};

module.exports = root;
