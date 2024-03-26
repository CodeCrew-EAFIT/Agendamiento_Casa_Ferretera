# **Reglas de programación**

En este documento se detallan las reglas de programación a seguir para garantizar consistencia, calidad y mantenibilidad en el desarrollo del proyecto.

--- 

## **Reglas generales**

### **1. Idioma base para el proyecto**

- El idioma utilizado durante la programación será inglés, esto con el fin de evitar mezclas del español y este, teniendo en cuenta que el código normalmente incluye librerías que vienen por defecto en ingles. 
- Para facilidad del cliente, la documentación se realizará en español.

### **2. Seguimiento de la arquitectura**

- **Es de vital importancia seguir la arquitectura planteada**. Si se tiene alguna duda con el desarollo de esta misma, preguntar al equipo parar aclararla.

### **3. Nomenclatura y convenciones de codificación**

- Se deben seguir las siguientes convenciones de nomenclatura:
  - Utilizar camelCase para nombrar variables y funciones.

    ```JS
    // Variable
    const myVariable = "Hello";

    // Function
    function myFunction(){
        return "Hello World";
    }
    
    ``` 

  - Utilizar UPPER_CASE para constantes.
    
    ```JS
    // Constant
    const M_PI = 3.1415
    
    ```

  - Utilizar la convención PascalCase tanto para nombrar la carpeta del componente y el componente en si mismo.

    ```
    Button/
        Button.js
    ```

### **4. Límite de parámetros**

* Si una función tiene un número de parámetros mayor o igual a cinco, deberá utilizar un objeto o en su caso el operador spread.

### **5. Comentarios de código**

- El código debe tener comentarios descriptivos en las partes más críticas de la aplicación, esto con el fin de explicar lógica compleja. 

### **6. Gestión de errores y excepciones**

- Se deben manejar los errores de forma consistente utilizando bloques try-catch.
- Los errores deben ser registrados de manera adecuada para facilitar la depuración y seguimiento de problemas.
- Si en algún momento se tiene un problema con la implementación de una funcionalidad, se debe pronunciar a todo el equipo para apoyar en el desarrollo.

### **7. Seguridad y privacidad**

- Todas las entradas de usuario deben ser validadas para prevenir ataques de inyección de código.
- Los datos sensibles deben ser encriptados antes de ser almacenados en la base de datos para proteger la privacidad del usuario.

---

## **Frontend**

### **1. Arquitectura y estructura del proyecto**

- **El proyecto debe estar organizado utilizando una arquitectura basada en componentes.**
- Se deben crear carpetas separadas para cada funcionalidad o sección, siguiendo la nomenclatura PascalCase previamente acordada. Por ejemplo: 

```
src/
  components/
    Button/
      index.js
      Button.js
      Button.test.js
  containers/
    App/
      index.js
      App.js
      App.test.js
  pages/
    Home/
      index.js
      Home.js
      Home.test.js
  store/
    index.js
    rootReducer.js
    rootSaga.js
  utils/
    api.js
    constants.js
    helpers.js
    index.js
    validators.js
  index.js
  index.css
```

### 2. **Componentes y reutilización de código**
- Desarollar componentes pequeños y reutilizables que realicen o cumplan con la función específica por la que fueron creado.
- Evitar la duplicación de código mendiante la reutilización de componentes existentes.


### 3. **Estilos en la aplicación**

- Para esta aplicación se utilizará **Tailwind CSS**. Además, se podrá utilizar componentes ya creados de librerías externas, pero estas deberán estar sometidas a un acuerdo por parte del equipo.

- Evitar los estilos en linea en los componentes. Si se necesita hacer  algún estilo que no este disponible con Tailwind CSS, crear una clase donde se pongan los estilos necesarios y utilizarla en el componente como tal.

### 4. **Utilizar Custom Hooks**

- Utilizar custom hooks cuando sea necesario, esto con el fin de reutilizar código y hacerlo de manera más elegante y concisa.

### 5. **Utilizar ESLint** 

- Se utilizará ESLint para garantizar el estandar del código del cliente. Esto nos ayudará a identificar y reportar patrones que puedan repetirse en el código. 

---

## **Backend**

### 1. **Arquitectura y estructura del proyecto**

- **El backend debe seguir una arquitectura en capas, esto con el fin de separar las rutas, los controladores y los modelos de la aplicación**.
- Se deben organizar las carpetas del proyecto separando las rutas, controladores y modelos. Por ejemplo: 

``` 
   .
    └── app/
        ├── backend/            # Backend functionality and configs
        |   ├── config.py         
        │   └── session.py          
        ├── models/             # SQLAlchemy models
        │   ├── auth.py           
        |   ├── base.py            
        |   └── ...               
        ├── routers/            # API routes
        |   ├── auth.py          
        │   └── ...               
        ├── schemas/           
        |   ├── auth.py              
        │   └── ...
        ├── services/           # Business logic
        |   ├── auth.py            
        |   ├── base.py           
        │   └── ...
        └── main.py             # Application runner

```

### 2. **Interacción con la Base de Datos**

- Se debe utilizar un ORM (Object-Relational Mapping), en este caso será **SQLALCHEMY** para interactuar con la base de datos de manera más intuitiva y abstraer la complejidad de las consultas SQL.
- **Tener cuidado con las migraciones hechas a la Base de Datos, estar pendiente cuando se le tenga que hacer una modificación en específico**. 

### 3. **Seguridad y autenticación**

- Se utilizará un sistema de autenticación basado en **JWT (JSON WEB TOKEN)** para proteger las rutas privadas y autenticar a los usuarios.
- Tener presente que la información sensible no debe quemarse en el código como tal, se debe utilizar archivos **.env** para almacenar todas la información sensible que se pueda tener en la aplicación.

---
## **Github**

### 1. **Pull request**
- Se utilizarán los pull request para fusionar

### 2. **Usar ramas para cada funcionalidad o tarea** 
- Se crearán ramas separadas para cada característica, corrección de errores o tarea nueva que se esté trabajando. 

### 3. **Longitud de los commits**
- Procurar hacer los mensajes de los commits pequeños pero que sean entendibles

### 4. **Nomenclatura de commits**
Se debe seguir la siguiente estructura para realizar los commit: 
```
  <commitType> : <briefDescription>
```
Hay diferentes tipos de commits: 

- **feature:** nueva funcionalidad.

- **update:** modificar una funcionalidad creada.

- **bug:** Un problema que surgio mientras estas modificando una funcionalidad ya creada.

- **fix:** Resolver un bug. Tiene que tener el mismo nombre del bug.

- **other:** Alguna modificación que no se considera antes. Puede ser documentación o refactor de código.

---

**Este documento servirá como referencia para todos los miembros del equipo de desarrollo y se actualizará conforme sea necesario durante el ciclo de vida del proyecto.**
