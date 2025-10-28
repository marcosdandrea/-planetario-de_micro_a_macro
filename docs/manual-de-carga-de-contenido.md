# Manual de Carga de Contenido - De Micro a Macro
## Guía para Administradores

**Versión:** 0.1.8  
**Autor:** Proyecciones Digitales  
**Fecha:** Octubre 2025

---

## Índice

1. [Introducción](#introducción)
2. [Acceso al Panel de Administración](#acceso-al-panel-de-administración)
3. [Estructura de Datos](#estructura-de-datos)
4. [Crear Nuevos Objetos](#crear-nuevos-objetos)
5. [Editar Objetos Existentes](#editar-objetos-existentes)
6. [Eliminar Objetos](#eliminar-objetos)
7. [Gestión de Imágenes](#gestión-de-imágenes)
8. [Configuración de Escalas y Tamaños](#configuración-de-escalas-y-tamaños)
9. [Ordenamiento y Organización](#ordenamiento-y-organización)
10. [Mejores Prácticas](#mejores-prácticas)
11. [Resolución de Problemas](#resolución-de-problemas)
12. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Introducción

Este manual está diseñado para administradores y curadores de contenido que necesitan agregar, modificar o gestionar los objetos y escalas visualizados en la aplicación **De Micro a Macro**.

La aplicación utiliza un sistema de gestión de contenido intuitivo que permite:
- Agregar nuevos objetos con sus respectivas imágenes
- Definir tamaños utilizando diferentes unidades de medida
- Establecer puntos de inicio para la experiencia del usuario
- Organizar objetos en una secuencia lógica de escalas

### Conceptos Clave

- **Sprite:** Representa cada objeto visualizable en la aplicación
- **Base10Size:** Tamaño del objeto expresado en metros (unidad base)
- **Punto de Inicio:** Objeto en el que inicia la experiencia del usuario
- **Panel de Administración:** Interfaz web para gestionar contenido
- **Imagen Principal:** Representación visual del objeto (PNG transparente)
- **Fondo:** Imagen contextual opcional que acompaña al objeto

---

## Acceso al Panel de Administración

### Iniciar la Aplicación en Modo Administrador

1. **Ejecutar la aplicación**
2. **Acceder al panel:**
   - Mediante navegación interna (si está configurada)
   - O accediendo a través de una ruta específica (URL local)

### Autenticación

El panel está protegido por contraseña para prevenir modificaciones no autorizadas.

**Pasos:**
1. Al ingresar al panel, se mostrará una pantalla de protección
2. Ingrese la contraseña de administrador
3. Una vez autenticado, tendrá acceso completo al panel de gestión

**Nota:** La contraseña predeterminada debe cambiarse en el primer uso por seguridad.

### Navegación en el Panel

El panel se divide en tres secciones principales:

```
┌─────────────────────────────────────────┐
│           HEADER / ENCABEZADO           │
├──────────────────┬──────────────────────┤
│                  │                      │
│   SELECCIÓN DE   │   CONFIGURACIÓN DE   │
│     SPRITES      │       SPRITES        │
│   (Izquierda)    │      (Derecha)       │
│                  │                      │
├──────────────────┴──────────────────────┤
│            PIE DE PÁGINA                │
└─────────────────────────────────────────┘
```

---

## Estructura de Datos

### Modelo de Datos de un Sprite

Cada objeto en la aplicación tiene la siguiente estructura:

```json
{
  "id": "uuid-unico",
  "displayName": "Nombre del Objeto",
  "description": "Descripción detallada del objeto",
  "image": "data:image/png;base64,...",
  "isIndex": false,
  "base10Size": 1.5,
  "unit": "metro",
  "background": {
    "image": "data:image/jpeg;base64,..."
  }
}
```

### Descripción de Campos

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `id` | String | Identificador único del objeto | Sí (auto-generado) |
| `displayName` | String | Nombre visible del objeto | Sí |
| `description` | String | Descripción educativa del objeto | Sí |
| `image` | String (Base64) | Imagen principal del objeto en formato PNG | Sí |
| `isIndex` | Boolean | Define si es el punto de inicio | No (default: false) |
| `base10Size` | Number | Tamaño en metros (base 10) | Sí |
| `unit` | String | Unidad de medida seleccionada | Sí |
| `background.image` | String (Base64) | Imagen de fondo opcional | No |

### Unidades de Medida Disponibles

La aplicación soporta las siguientes unidades:

| Unidad | Símbolo | Conversión a Metros | Ejemplo de Uso |
|--------|---------|---------------------|----------------|
| Picómetro | pm | 1 pm = 10⁻¹² m | Átomos, partículas subatómicas |
| Nanómetro | nm | 1 nm = 10⁻⁹ m | Moléculas, virus |
| Micrómetro | µm | 1 µm = 10⁻⁶ m | Células, bacterias |
| Milímetro | mm | 1 mm = 10⁻³ m | Insectos pequeños |
| Metro | m | 1 m = 1 m | Humanos, objetos cotidianos |
| Kilómetro | km | 1 km = 10³ m | Edificios, montañas |
| Radio Terrestre | R⊕ | 1 R⊕ = 6.371 × 10⁶ m | Planetas pequeños |
| Radio Solar | R☉ | 1 R☉ = 6.957 × 10⁸ m | Estrellas |
| Unidad Astronómica | AU | 1 AU = 1.496 × 10¹¹ m | Sistema Solar |
| Año Luz | ly | 1 ly = 9.461 × 10¹⁵ m | Distancias galácticas |

---

## Crear Nuevos Objetos

### Proceso Paso a Paso

#### 1. Iniciar Creación

1. En el panel de administración, localice el botón **"Crear Nuevo"** en la parte inferior derecha
2. Haga clic en el botón
3. Se abrirá un formulario vacío en la sección de configuración

#### 2. Completar Información Básica

**Campo: Nombre**
- Ingrese un nombre descriptivo y conciso
- Máximo recomendado: 50 caracteres
- Ejemplo: "Molécula de ADN", "Bacteria E. Coli", "Planeta Tierra"

**Campo: Descripción**
- Proporcione información educativa sobre el objeto
- Sea claro y preciso
- Máximo recomendado: 200 caracteres
- Ejemplo: "El ADN es una molécula que contiene las instrucciones genéticas usadas en el desarrollo y funcionamiento de todos los organismos vivos conocidos."

#### 3. Definir Tamaño

**Seleccionar Unidad:**
1. Haga clic en el selector de unidades (desplegable)
2. Elija la unidad más apropiada para la escala del objeto
3. Ejemplos:
   - Para un átomo → Picómetro (pm)
   - Para un humano → Metro (m)
   - Para una galaxia → Año luz (ly)

**Ingresar Valor:**
1. En el campo numérico, ingrese el tamaño del objeto
2. Use números decimales si es necesario (separador: punto)
3. Ejemplos:
   - Átomo de hidrógeno: `120` pm
   - Persona adulta: `1.75` m
   - Vía Láctea: `100000` ly

**Conversión Automática:**
- La aplicación convierte automáticamente el valor a la unidad base (metros)
- Este valor se almacena como `base10Size`
- No es necesario calcular manualmente

#### 4. Cargar Imagen Principal

**Requisitos:**
- **Formato:** PNG obligatorio
- **Resolución:** 1000 x 1000 píxeles
- **Fondo:** Transparente recomendado
- **Tamaño de archivo:** < 5 MB recomendado

**Pasos:**
1. Haga clic en el área de selección de imagen principal
2. Se abrirá un diálogo de selección de archivos
3. Navegue hasta la imagen deseada
4. Seleccione el archivo
5. La aplicación validará:
   - Formato correcto (PNG)
   - Dimensiones exactas (1000x1000)
6. Si es válida, se mostrará una vista previa

**Vista Previa:**
- Se mostrará la imagen cargada en el panel
- Podrá visualizar cómo se verá en la aplicación

#### 5. Cargar Fondo Opcional

**Requisitos:**
- **Formato:** JPG o PNG
- **Resolución:** 2160 x 3840 píxeles (proporción 9:16)
- **Tamaño de archivo:** < 10 MB recomendado

**Pasos:**
1. Haga clic en el área de selección de fondo
2. Seleccione la imagen de fondo deseada
3. La aplicación validará formato y dimensiones
4. Se mostrará una vista previa si es válida

**Cuándo usar fondos:**
- Para proporcionar contexto visual
- Para crear atmósfera educativa
- Para mostrar el entorno natural del objeto
- No es obligatorio, pero mejora la experiencia

**Eliminar Fondo:**
- Si necesita quitar un fondo ya cargado, use el botón "Eliminar" en el área de fondo

#### 6. Establecer como Punto de Inicio (Opcional)

**¿Qué es el punto de inicio?**
- Es el objeto que se muestra al abrir la aplicación
- Es la posición de retorno tras inactividad
- Solo puede haber uno marcado como punto de inicio

**Cómo establecerlo:**
1. Haga clic en el botón "Establecer como punto de inicio"
2. El botón cambiará a azul y mostrará "Desmarcar como punto de inicio"
3. Si otro objeto tenía esta marca, se removerá automáticamente

**Recomendación:**
- Seleccione un objeto en escala humana (metros) para mejor orientación inicial
- Ejemplo: "Persona adulta", "Pelota de baloncesto"

#### 7. Guardar el Objeto

1. Revise todos los campos completados
2. Verifique que las imágenes se hayan cargado correctamente
3. Haga clic en el botón **"Guardar"**
4. Verá un mensaje de confirmación:
   - **Éxito:** "Item creado correctamente"
   - **Error:** "Error al crear el item" (revise los campos)

**Validaciones automáticas:**
- Nombre no vacío
- Descripción no vacía
- Imagen principal cargada
- Tamaño válido (mayor que 0)
- Unidad válida seleccionada

---

## Editar Objetos Existentes

### Seleccionar Objeto

1. En el panel izquierdo ("Selección de Sprites"), verá la lista de todos los objetos
2. Cada objeto muestra:
   - Nombre
   - Tamaño con unidad
3. Haga clic en el objeto que desea editar
4. Sus datos se cargarán en el panel derecho

### Modificar Campos

Puede editar cualquier campo del objeto:

**Cambiar Nombre:**
1. Edite el campo "Nombre"
2. El cambio se guarda al hacer clic en "Guardar"

**Cambiar Descripción:**
1. Edite el campo "Descripción"
2. Puede expandir el texto si es necesario

**Modificar Tamaño:**
1. Cambie el valor numérico
2. O cambie la unidad de medida
3. La conversión se actualiza automáticamente

**Reemplazar Imágenes:**
1. Haga clic en el área de imagen
2. Seleccione una nueva imagen
3. La anterior será reemplazada
4. Debe cumplir los mismos requisitos de formato y dimensiones

**Cambiar Punto de Inicio:**
1. Marque o desmarque el botón "Establecer como punto de inicio"
2. Solo un objeto puede ser punto de inicio

### Guardar Cambios

1. Después de realizar todas las modificaciones
2. Haga clic en **"Guardar"**
3. Mensaje de confirmación: "Item actualizado correctamente"

**Nota:** Los cambios no se aplican hasta que haga clic en "Guardar"

---

## Eliminar Objetos

### Proceso de Eliminación

**ADVERTENCIA:** Esta acción es irreversible. Asegúrese antes de eliminar.

**Pasos:**
1. Seleccione el objeto que desea eliminar de la lista
2. Sus datos se mostrarán en el panel derecho
3. Revise que sea el objeto correcto
4. Haga clic en el botón **"Eliminar"** (generalmente en rojo)
5. Confirme la acción si se solicita
6. Mensaje de confirmación: "Item eliminado correctamente"

### Consideraciones

**Antes de eliminar:**
- Verifique que no necesitará el objeto en el futuro
- Tenga una copia de las imágenes si las necesitará
- Si es el punto de inicio, marque otro objeto como tal

**Después de eliminar:**
- El objeto desaparece inmediatamente de la lista
- El formulario se limpia
- Los usuarios ya no verán este objeto en la aplicación

---

## Gestión de Imágenes

### Preparación de Imágenes Principales

**Herramientas Recomendadas:**
- Adobe Photoshop
- GIMP (gratuito)
- Photopea (online, gratuito)

**Proceso:**
1. **Obtener imagen:** Busque una imagen de alta calidad del objeto
2. **Recortar y centrar:** Centre el objeto en el canvas
3. **Ajustar tamaño:** Redimensione a exactamente 1000x1000 px
4. **Remover fondo:** Use herramientas de selección para hacer el fondo transparente
5. **Optimizar:** Reduzca el tamaño del archivo sin perder calidad
6. **Exportar:** Guarde como PNG con transparencia

**Consejos:**
- Use imágenes con alta resolución original
- Mantenga proporciones naturales del objeto
- Evite distorsiones
- Centro del objeto = centro de la imagen

### Preparación de Fondos

**Requisitos específicos:**
- **Orientación:** Vertical (portrait)
- **Resolución:** 2160 x 3840 píxeles
- **Proporción:** 9:16 (coincide con proyección vertical)

**Consideraciones de diseño:**
- El fondo debe complementar, no distraer
- Use colores que contrasten con el objeto principal
- Evite elementos que compitan visualmente con el objeto
- Contexto apropiado (ej: espacio para objetos astronómicos)

**Fuentes de imágenes:**
- Fotografías propias
- Bancos de imágenes libres (Unsplash, Pexels)
- Imágenes de dominio público (NASA, ESA)
- Imágenes con licencia apropiada

### Optimización de Archivos

**Tamaño de archivo:**
- **Imágenes principales:** 1-5 MB ideal
- **Fondos:** 2-10 MB ideal

**Herramientas de compresión:**
- TinyPNG (online)
- ImageOptim (Mac)
- RIOT (Windows)

**Compresión sin pérdida:**
- Mantiene calidad visual
- Reduce tamaño de archivo
- Mejora rendimiento de la aplicación

---

## Configuración de Escalas y Tamaños

### Comprender la Escala Base 10

La aplicación utiliza potencias de 10 para organizar los objetos:

```
10⁻¹² m → Picómetros (átomos)
10⁻⁹ m  → Nanómetros (moléculas)
10⁻⁶ m  → Micrómetros (células)
10⁻³ m  → Milímetros (insectos)
10⁰ m   → Metros (humanos)
10³ m   → Kilómetros (montañas)
10⁶ m   → Megametros (planetas)
10⁹ m   → Gigametros (sistema solar)
10¹² m  → Terametros (estrellas cercanas)
10¹⁵ m  → Años luz (galaxias)
```

### Calcular Tamaños Correctos

**Ejemplo 1: Bacteria E. Coli**
- Tamaño real: 2 micrómetros de longitud
- Unidad a usar: Micrómetro (µm)
- Valor a ingresar: `2`
- Base10Size resultante: `2 × 10⁻⁶ = 0.000002` metros

**Ejemplo 2: Torre Eiffel**
- Altura real: 330 metros
- Unidad a usar: Metro (m)
- Valor a ingresar: `330`
- Base10Size resultante: `330` metros

**Ejemplo 3: Vía Láctea**
- Diámetro aproximado: 100,000 años luz
- Unidad a usar: Año luz (ly)
- Valor a ingresar: `100000`
- Base10Size resultante: `9.461 × 10²⁰` metros

### Verificar Escalas

**Consistencia de escala:**
- Los objetos deben estar ordenados de menor a mayor
- La diferencia entre objetos consecutivos debe ser coherente
- Use saltos lógicos (por ejemplo: 10×, 100×, 1000×)

**Herramienta de verificación:**
- La lista en el panel muestra todos los tamaños
- Revise visualmente que el ordenamiento sea correcto
- Los tamaños se muestran automáticamente en la unidad original

---

## Ordenamiento y Organización

### Secuencia Lógica

**Principio básico:**
Los objetos deben estar ordenados de menor a mayor tamaño para crear una experiencia de navegación fluida.

**Secuencia recomendada:**
1. Partículas subatómicas (pm)
2. Átomos (pm)
3. Moléculas (nm)
4. Virus (nm)
5. Bacterias (µm)
6. Células (µm)
7. Insectos (mm)
8. Objetos pequeños (cm)
9. Humanos y animales (m)
10. Edificios (m - km)
11. Geografía terrestre (km)
12. Planetas (R⊕)
13. Estrellas (R☉)
14. Sistema Solar (AU)
15. Estrellas cercanas (ly)
16. Galaxias (ly)
17. Universo observable (ly)

### Separadores Visuales

**Uso de separadores:**
Puede crear objetos "separadores" sin imagen que marquen transiciones:

**Crear un separador:**
1. Nombre: Dejar vacío o usar "[Separador]"
2. Descripción: Puede incluir texto educativo
3. Imagen: No cargar ninguna imagen
4. Tamaño: Colocar entre dos escalas

**Propósito:**
- Marcar transición entre escalas (micro → macro)
- Crear pausas en la navegación
- Agregar contexto textual sin objeto visual

### Reorganizar Objetos

**Para cambiar el orden:**
1. Ajuste el tamaño (base10Size) del objeto
2. Guarde los cambios
3. La lista se reordena automáticamente

**Alternativa:**
- Elimine el objeto
- Créelo nuevamente con el tamaño correcto en la secuencia

---

## Mejores Prácticas

### Contenido Educativo

**Nombres descriptivos:**
✅ Correcto: "Bacteria Escherichia Coli"
❌ Incorrecto: "bacteria1"

**Descripciones útiles:**
- Sea educativo pero conciso
- Use lenguaje accesible
- Incluya datos interesantes
- Evite jerga innecesaria

**Ejemplo:**
```
Nombre: Glóbulo Rojo
Descripción: Célula sanguínea encargada de transportar oxígeno 
por todo el cuerpo. Tiene forma de disco bicóncavo y mide 
aproximadamente 7.5 micrómetros de diámetro.
```

### Calidad Visual

**Imágenes:**
- Alta resolución
- Fondo transparente cuando sea posible
- Iluminación uniforme
- Objeto centrado y bien enfocado

**Fondos:**
- Relacionados temáticamente con el objeto
- No demasiado recargados visualmente
- Colores armoniosos
- Resolución perfecta (2160x3840)

### Coherencia

**Estilo visual:**
- Mantenga un estilo consistente entre objetos similares
- Use fotografías reales cuando sea posible
- Use ilustraciones científicas cuando la fotografía no sea viable

**Nomenclatura:**
- Use nomenclatura científica correcta
- Sea consistente con mayúsculas/minúsculas
- Evite abreviaturas confusas

### Rendimiento

**Optimización:**
- Comprima imágenes sin perder calidad visible
- No exceda los tamaños de archivo recomendados
- Limite el número total de objetos (< 100 recomendado)

**Testing:**
- Pruebe la experiencia después de agregar múltiples objetos
- Verifique la fluidez de navegación
- Compruebe tiempos de carga

---

## Resolución de Problemas

### Error: "Error al crear el item"

**Posibles causas:**

1. **Campo obligatorio vacío**
   - Solución: Complete todos los campos requeridos (nombre, descripción, tamaño, imagen)

2. **Imagen con formato incorrecto**
   - Solución: Verifique que la imagen principal sea PNG

3. **Imagen con dimensiones incorrectas**
   - Solución: Redimensione a 1000x1000 (principal) o 2160x3840 (fondo)

4. **Tamaño de archivo excesivo**
   - Solución: Comprima la imagen antes de cargar

### Error: "Error al actualizar el item"

**Posibles causas:**

1. **Conexión perdida con base de datos**
   - Solución: Reinicie la aplicación

2. **Objeto eliminado por otro usuario**
   - Solución: Recargue la lista de objetos

3. **Permisos insuficientes**
   - Solución: Verifique credenciales de administrador

### Las imágenes no se visualizan correctamente

**Diagnóstico:**

1. **Verifique el formato:**
   ```bash
   - Principal: Solo PNG
   - Fondo: PNG o JPG
   ```

2. **Verifique dimensiones exactas:**
   - Use herramientas de edición para confirmar píxeles exactos

3. **Verifique codificación:**
   - Las imágenes se almacenan como Base64
   - No edite manualmente el archivo db.json

### La aplicación no muestra el objeto nuevo

**Soluciones:**

1. **Recargue la vista:**
   - Cierre y reabra la vista del juego
   - O use Ctrl+R para recargar

2. **Verifique que se guardó:**
   - Busque el objeto en la lista del panel
   - Confirme que aparece con su nombre

3. **Verifique la base de datos:**
   - Abra `database/db.json`
   - Busque el objeto por ID o nombre
   - Verifique que no esté corrupto el JSON

### Rendimiento lento tras agregar objetos

**Optimizaciones:**

1. **Reducir tamaño de imágenes:**
   - Use herramientas de compresión
   - Mantenga calidad pero reduzca bytes

2. **Limitar objetos simultáneos:**
   - Configure distancia de culling apropiadamente
   - Ajuste distancia de spawn

3. **Verificar recursos del sistema:**
   - Cierre aplicaciones innecesarias
   - Verifique uso de memoria

---

## Ejemplos Prácticos

### Ejemplo 1: Agregar "Átomo de Carbono"

**Paso a paso completo:**

1. **Clic en "Crear Nuevo"**

2. **Completar campos:**
   - Nombre: `Átomo de Carbono`
   - Descripción: `El carbono es la base de toda la vida conocida. Sus átomos forman estructuras complejas que permiten la existencia de moléculas orgánicas.`

3. **Configurar tamaño:**
   - Unidad: Seleccionar "Picómetro (pm)"
   - Valor: `140`
   - (Radio atómico del carbono ≈ 140 pm)

4. **Cargar imagen principal:**
   - Preparar imagen PNG 1000x1000 con modelo 3D del átomo
   - Fondo transparente
   - Clic en selector de imagen
   - Seleccionar archivo

5. **Cargar fondo (opcional):**
   - Imagen de espacio estrellado o fondo científico
   - 2160x3840 píxeles
   - Seleccionar archivo

6. **No marcar como punto de inicio**
   (Muy pequeño para ser punto de inicio)

7. **Clic en "Guardar"**

8. **Verificar:**
   - Aparece en la lista
   - Tamaño muestra: "140 pm"

---

### Ejemplo 2: Agregar "Estadio de Fútbol"

**Paso a paso completo:**

1. **Clic en "Crear Nuevo"**

2. **Completar campos:**
   - Nombre: `Estadio de Fútbol`
   - Descripción: `Un estadio de fútbol típico tiene capacidad para 50,000 espectadores y cubre un área aproximada de 100 metros de largo por 70 metros de ancho.`

3. **Configurar tamaño:**
   - Unidad: Seleccionar "Metro (m)"
   - Valor: `100`
   - (Longitud del campo)

4. **Cargar imagen principal:**
   - Vista aérea de estadio en PNG 1000x1000
   - Fondo transparente o cielo limpio
   - Clic en selector de imagen
   - Seleccionar archivo

5. **Cargar fondo:**
   - Ciudad vista aérea al atardecer
   - 2160x3840 píxeles
   - Seleccionar archivo

6. **Considerar como punto de inicio:**
   - Si desea que sea el punto de inicio, marcar el botón
   - (Escala apropiada para orientación humana)

7. **Clic en "Guardar"**

8. **Verificar:**
   - Aparece en la lista entre objetos de escala humana
   - Tamaño muestra: "100 m"

---

### Ejemplo 3: Agregar "Nebulosa de Orión"

**Paso a paso completo:**

1. **Clic en "Crear Nuevo"**

2. **Completar campos:**
   - Nombre: `Nebulosa de Orión (M42)`
   - Descripción: `Una de las nebulosas más brillantes del cielo nocturno. Es una región de formación estelar ubicada a 1,344 años luz de la Tierra, con un diámetro aproximado de 24 años luz.`

3. **Configurar tamaño:**
   - Unidad: Seleccionar "Año luz (ly)"
   - Valor: `24`

4. **Cargar imagen principal:**
   - Imagen del Telescopio Hubble de M42
   - Procesada a 1000x1000 PNG
   - Fondo negro (espacio)
   - Seleccionar archivo

5. **Cargar fondo:**
   - Campo estelar profundo
   - 2160x3840 píxeles
   - Predominantemente negro con estrellas
   - Seleccionar archivo

6. **No marcar como punto de inicio**
   (Escala demasiado grande para inicio)

7. **Clic en "Guardar"**

8. **Verificar:**
   - Aparece al final de la lista (objeto grande)
   - Tamaño muestra: "24 ly"

---

## Checklist de Calidad

### Antes de Guardar un Objeto Nuevo

- [ ] Nombre descriptivo y correcto ortográficamente
- [ ] Descripción educativa y clara (50-200 caracteres)
- [ ] Tamaño verificado con fuentes confiables
- [ ] Unidad apropiada seleccionada
- [ ] Imagen principal PNG 1000x1000 cargada
- [ ] Imagen principal con buena calidad visual
- [ ] Fondo (si aplica) JPG/PNG 2160x3840 cargado
- [ ] Fondo apropiado temáticamente
- [ ] Punto de inicio marcado correctamente (solo uno)
- [ ] Objeto en posición lógica en la secuencia de escalas

### Después de Guardar

- [ ] Objeto aparece en la lista
- [ ] Tamaño se muestra correctamente
- [ ] Probar en la vista de juego
- [ ] Navegación fluida hasta el objeto
- [ ] Imagen se visualiza correctamente
- [ ] Fondo se visualiza correctamente
- [ ] Texto legible y sin errores

---

## Base de Datos y Respaldo

### Ubicación de la Base de Datos

**Archivo principal:**
```
de_micro_a_macro/
└── database/
    └── db.json
```

Este archivo contiene todos los objetos y sus datos.

### Realizar Respaldo Manual

**Antes de modificaciones importantes:**

1. Navegue a la carpeta `database/`
2. Copie el archivo `db.json`
3. Guárdelo con nombre descriptivo:
   ```
   db_backup_2025-10-28.json
   ```
4. Almacene en ubicación segura

**Restaurar desde respaldo:**

1. Localice el archivo de respaldo
2. Copie el contenido
3. Reemplace el archivo `db.json` actual
4. Reinicie la aplicación

### Estructura del Archivo db.json

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "displayName": "Ejemplo",
    "description": "Descripción del objeto",
    "image": "data:image/png;base64,iVBORw0KG...",
    "isIndex": false,
    "base10Size": 1.0,
    "unit": "metro",
    "background": {
      "image": "data:image/jpeg;base64,/9j/4AAQ..."
    }
  }
]
```

**Advertencia:** No edite manualmente este archivo a menos que sea absolutamente necesario. Use el panel de administración.

---

## Recursos Adicionales

### Fuentes de Información Científica

**Para tamaños precisos:**
- **Wikipedia** (científica)
- **NASA** (objetos astronómicos)
- **Libros de texto universitarios** (partículas y células)
- **Publicaciones científicas revisadas por pares**

### Fuentes de Imágenes

**Fotografías de calidad:**
- **NASA Image Gallery** (dominio público)
- **ESA/Hubble** (imágenes espaciales)
- **Unsplash** (fotografías libres)
- **Wikimedia Commons** (licencias variadas)

**Ilustraciones científicas:**
- **Protein Data Bank** (estructuras moleculares)
- **Cell Image Library** (células)
- **Illustraciones médicas de Blausen Medical**

### Herramientas Recomendadas

**Edición de imágenes:**
- Adobe Photoshop (comercial)
- GIMP (gratuito, open source)
- Photopea (online, gratuito)
- Affinity Photo (comercial, pago único)

**Conversión y optimización:**
- TinyPNG (online)
- ImageMagick (línea de comandos)
- XnConvert (batch processing, gratuito)

**Validación de dimensiones:**
- ImageMagick: `identify image.png`
- ExifTool: detalles completos de la imagen

---

## Apéndice: Tabla de Conversión de Unidades

| De → A | Picómetro | Nanómetro | Micrómetro | Milímetro | Metro | Kilómetro |
|--------|-----------|-----------|------------|-----------|-------|-----------|
| 1 pm | 1 | 0.001 | 10⁻⁶ | 10⁻⁹ | 10⁻¹² | 10⁻¹⁵ |
| 1 nm | 1000 | 1 | 0.001 | 10⁻⁶ | 10⁻⁹ | 10⁻¹² |
| 1 µm | 10⁶ | 1000 | 1 | 0.001 | 10⁻⁶ | 10⁻⁹ |
| 1 mm | 10⁹ | 10⁶ | 1000 | 1 | 0.001 | 10⁻⁶ |
| 1 m | 10¹² | 10⁹ | 10⁶ | 1000 | 1 | 0.001 |
| 1 km | 10¹⁵ | 10¹² | 10⁹ | 10⁶ | 1000 | 1 |

### Unidades Astronómicas

| Unidad | Equivalente en Metros | Uso Típico |
|--------|----------------------|------------|
| Radio Terrestre (R⊕) | 6.371 × 10⁶ m | Planetas terrestres |
| Radio Solar (R☉) | 6.957 × 10⁸ m | Estrellas |
| Unidad Astronómica (AU) | 1.496 × 10¹¹ m | Sistema Solar |
| Año luz (ly) | 9.461 × 10¹⁵ m | Distancias estelares/galácticas |

---

## Glosario

**Base10Size:** Tamaño del objeto expresado en metros, almacenado internamente para cálculos.

**Culling Distance:** Distancia a partir de la cual los objetos desaparecen para optimizar rendimiento.

**Panel de Administración:** Interfaz web para gestionar el contenido de la aplicación.

**Punto de Inicio (Index):** Objeto que se muestra al abrir la aplicación y tras inactividad.

**Spawn Distance:** Distancia a la que aparecen los objetos al navegar.

**Sprite:** Término técnico para cada objeto visualizable en la aplicación.

**Travel Speed:** Velocidad de navegación controlada por la rueda del mouse.

**z-Position:** Posición virtual del usuario en el espacio de navegación.

---

## Contacto y Soporte Técnico

Para asistencia con la carga de contenido:

**Email de Soporte:** [contenido@proyeccionesdigitales.com]  
**Documentación Técnica:** [docs.proyeccionesdigitales.com]  
**Foro de Usuarios:** [forum.proyeccionesdigitales.com]

### Reportar Problemas de Contenido

Al reportar problemas relacionados con contenido:

1. Describa el problema específico
2. Incluya capturas de pantalla
3. Especifique el objeto problemático (nombre e ID)
4. Proporcione el archivo db.json si es posible
5. Indique pasos para reproducir el problema

---

**© 2025 Proyecciones Digitales**  
**Versión del Manual:** 1.0  
**Última Actualización:** Octubre 2025

---

**¡Gracias por crear contenido educativo excepcional!**

Su trabajo ayuda a miles de visitantes a comprender mejor las increíbles escalas de nuestro universo, desde lo infinitamente pequeño hasta lo inconmensurablemente grande.
