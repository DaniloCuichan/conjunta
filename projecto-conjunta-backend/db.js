const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('gestion_proyectos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log // Activa el logging de consultas SQL
});

// Modelos
const Proyecto = sequelize.define('Proyecto', {
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'proyectos' });

const Empleado = sequelize.define('Empleado', {
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'empleados' });

const Tarea = sequelize.define('Tarea', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: DataTypes.TEXT
}, { tableName: 'tareas' });

const TareaEmpleado = sequelize.define('TareaEmpleado', {}, { tableName: 'tarea_empleados' });

// Agregar modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nombreUsuario: { type: DataTypes.STRING, allowNull: false, unique: true },
  clave: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'usuarios' });

// Definición de relaciones
Proyecto.hasMany(Tarea, { foreignKey: 'proyectoId', as: 'tareas' });
Tarea.belongsTo(Proyecto, { foreignKey: 'proyectoId', as: 'proyecto' });

Tarea.belongsToMany(Empleado, { through: TareaEmpleado, as: 'empleados', foreignKey: 'tareaId' });
Empleado.belongsToMany(Tarea, { through: TareaEmpleado, as: 'tareas', foreignKey: 'empleadoId' });

// Sincronizar la base de datos
sequelize.sync({ force: false }) // Cambia `force` a `false` si no deseas reiniciar la base de datos
  .then(() => {
    console.log('Base de datos sincronizada');

    // Crear un usuario admin por defecto con contraseña hasheada
    bcrypt.hash('admin', 10, (err, hashedPassword) => {
      if (err) throw err;
      Usuario.findOrCreate({
        where: { nombreUsuario: 'admin' },
        defaults: {
          clave: hashedPassword
        }
      }).then(([user, created]) => {
        if (created) {
          console.log('Usuario admin creado');
        } else {
          console.log('El usuario admin ya existe');
        }
      }).catch(error => {
        console.error('Error al crear el usuario admin:', error);
      });
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = { sequelize, Proyecto, Empleado, Tarea, TareaEmpleado, Usuario };
