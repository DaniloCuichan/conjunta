const { Usuario, Proyecto, Empleado, Tarea } = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Asegúrate de instalar jsonwebtoken

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave secreta más segura

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
    return tareas;
  },
  
  crearProyecto: ({ nombre }) => Proyecto.create({ nombre }),
  
  crearEmpleado: async ({ nombre, clave }) => {
    // Hashea la contraseña antes de almacenarla
    const claveHasheada = await bcrypt.hash(clave, 10);
    return Empleado.create({ nombre, clave: claveHasheada });
  },
  
  crearTarea: ({ titulo, descripcion, proyectoId }) => Tarea.create({ titulo, descripcion, proyectoId }),
  
  asignarEmpleadoATarea: async ({ tareaId, empleadoId }) => {
    const tarea = await Tarea.findByPk(tareaId);
    const empleado = await Empleado.findByPk(empleadoId);
    await tarea.addEmpleado(empleado);
    return tarea;
  },
  
  autenticarUsuario: async ({ nombreUsuario, clave }) => {
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    
    if (usuario && await bcrypt.compare(clave, usuario.clave)) {
      // Genera un token JWT
      const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' });
      return { token, mensaje: 'Autenticación exitosa' };
    } else {
      return { token: null, mensaje: 'Nombre de usuario o contraseña incorrectos' };
    }
  }
};

module.exports = root;
