# Manual de Uso - De Micro a Macro
## Planetario Digital

**Versión:** 0.1.8  
**Autor:** Proyecciones Digitales  
**Fecha:** Octubre 2025

---

## Índice

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación](#instalación)
4. [Interfaz de Usuario](#interfaz-de-usuario)
5. [Controles de Navegación](#controles-de-navegación)
6. [Funcionalidades Principales](#funcionalidades-principales)
7. [Solución de Problemas](#solución-de-problemas)
8. [Contacto y Soporte](#contacto-y-soporte)

---

## Introducción

**De Micro a Macro** es una aplicación interactiva educativa desarrollada para planetarios que permite a los usuarios explorar visualmente la escala del universo, desde los objetos microscópicos más pequeños hasta las estructuras cósmicas más grandes.

La aplicación ofrece una experiencia inmersiva donde los visitantes pueden viajar a través de diferentes escalas de tamaño utilizando controles intuitivos, visualizando objetos en su contexto dimensional real.

### Características Principales

- **Navegación fluida** entre diferentes escalas de tamaño
- **Visualización en alta resolución** de objetos e imágenes de fondo
- **Interfaz adaptativa** con relación de aspecto 9:16 optimizada para proyección vertical
- **Sistema de reinicio automático** después de periodos de inactividad
- **Panel de administración** protegido por contraseña para la gestión de contenido
- **Visualización en tiempo real** de objetos con sus tamaños reales

---

## Requisitos del Sistema

### Requisitos Mínimos

- **Sistema Operativo:** Windows 10/11, macOS 10.15+, o Linux (Ubuntu 20.04+)
- **Procesador:** Intel Core i5 o equivalente AMD
- **Memoria RAM:** 8 GB
- **Tarjeta Gráfica:** Compatible con OpenGL 3.3+
- **Espacio en Disco:** 500 MB libres
- **Resolución de Pantalla:** 1920x1080 píxeles mínimo

### Requisitos Recomendados

- **Procesador:** Intel Core i7 o equivalente AMD Ryzen
- **Memoria RAM:** 16 GB o más
- **Tarjeta Gráfica:** Dedicada con 4GB VRAM
- **Espacio en Disco:** 2 GB libres
- **Resolución de Pantalla:** 2160x3840 píxeles (9:16)

---

## Instalación

### Windows

1. Descargue el instalador `de_micro_a_macro-Setup-X.X.X.exe`
2. Ejecute el instalador con permisos de administrador
3. Siga las instrucciones del asistente de instalación
4. Una vez completada, encontrará el acceso directo en el menú de inicio

### macOS

1. Descargue el archivo `.dmg` correspondiente a su arquitectura:
   - **Apple Silicon (M1/M2/M3):** `de_micro_a_macro-arm64.dmg`
   - **Intel:** `de_micro_a_macro-x64.dmg`
2. Abra el archivo `.dmg`
3. Arrastre la aplicación a la carpeta "Aplicaciones"
4. En el primer inicio, haga clic derecho sobre la app y seleccione "Abrir" para autorizar la ejecución

### Linux

1. Descargue el paquete `.AppImage`
2. Otorgue permisos de ejecución:
   ```bash
   chmod +x de_micro_a_macro-X.X.X.AppImage
   ```
3. Ejecute el archivo:
   ```bash
   ./de_micro_a_macro-X.X.X.AppImage
   ```

---

## Interfaz de Usuario

### Pantalla Principal (Vista de Juego)

La interfaz principal presenta una experiencia minimalista enfocada en la visualización del contenido:

- **Área de Visualización Central:** Muestra los objetos en escala con sus imágenes de fondo correspondientes
- **Sin controles visibles:** La navegación se realiza mediante gestos del mouse (rueda de desplazamiento)
- **Relación de aspecto 9:16:** Optimizada para proyección vertical

### Panel de Administración

Accesible mediante una URL o acceso específico (requiere contraseña):

#### Secciones del Panel

1. **Encabezado (Header)**
   - Logo e información del proyecto
   - Indicadores de estado

2. **Selección de Sprites (Izquierda)**
   - Lista vertical con todos los objetos cargados
   - Cada elemento muestra:
     - Nombre del objeto
     - Tamaño con su unidad de medida
   - Indicador visual del elemento seleccionado actualmente

3. **Configuración de Sprites (Derecha)**
   - Formulario detallado para editar propiedades del objeto seleccionado
   - Campos de entrada para nombre y descripción
   - Control de tamaño con selector de unidades
   - Gestión de imágenes
   - Botones de acción (Guardar, Crear nuevo, Eliminar)

4. **Pie de Página**
   - Información de copyright: "Proyecciones Digitales 2025"

---

## Controles de Navegación

### Navegación Principal

**Rueda del Mouse / Trackpad:**
- **Desplazar hacia arriba:** Aumenta el zoom (objetos más pequeños)
- **Desplazar hacia abajo:** Disminuye el zoom (objetos más grandes)

**Velocidad de Navegación:**
- La velocidad predeterminada es configurable (valor por defecto: 4)
- Ajustable desde el contexto del juego para experiencias más rápidas o lentas

### Límites de Navegación

- **Límite mínimo:** 400 unidades (protege de salir del rango inferior)
- **Límite máximo:** Calculado dinámicamente según la cantidad de objetos cargados

### Reinicio Automático

- **Tiempo de inactividad:** 120 segundos (2 minutos) por defecto
- **Comportamiento:** Después del periodo de inactividad, la vista regresa automáticamente al objeto marcado como "punto de inicio"
- **Propósito:** Ideal para instalaciones de uso público en museos y planetarios

---

## Funcionalidades Principales

### 1. Exploración de Escalas

Los usuarios pueden viajar fluidamente entre diferentes órdenes de magnitud, desde escalas subatómicas hasta dimensiones cósmicas. Cada objeto aparece en su contexto visual apropiado con información contextual.

**Ejemplos de escalas:**
- **Picómetros (pm):** Partículas subatómicas
- **Nanómetros (nm):** Moléculas, ADN
- **Micrómetros (µm):** Células, bacterias
- **Milímetros (mm):** Insectos pequeños
- **Metros (m):** Objetos cotidianos, personas
- **Kilómetros (km):** Edificios, montañas, ciudades
- **Años luz (ly):** Distancias astronómicas, galaxias

### 2. Visualización de Objetos

Cada objeto en la aplicación incluye:
- **Imagen principal:** Representación visual del objeto (formato PNG, 1000x1000 px)
- **Fondo opcional:** Imagen de contexto ambiental (formato JPG/PNG, 2160x3840 px)
- **Información textual:**
  - Nombre descriptivo
  - Descripción detallada
  - Tamaño real con unidad apropiada

### 3. Sistema de Unidades

La aplicación soporta múltiples unidades de medida y realiza conversiones automáticas:

- **Unidades pequeñas:** picómetro, nanómetro, micrómetro, milímetro
- **Unidades medianas:** metro, kilómetro
- **Unidades astronómicas:** radio terrestre, radio solar, unidad astronómica, año luz

### 4. Puntos de Referencia

Cualquier objeto puede establecerse como **"punto de inicio"**, que será:
- La posición inicial al abrir la aplicación
- El punto de retorno tras el reinicio automático por inactividad
- Útil para centrar la experiencia en un concepto o escala específica

---

## Solución de Problemas

### La aplicación no inicia

**Posibles causas y soluciones:**

1. **Permisos insuficientes:**
   - Windows: Ejecutar como administrador
   - macOS: Verificar en "Preferencias > Seguridad y Privacidad"
   - Linux: Verificar permisos de ejecución del archivo

2. **Requisitos del sistema no cumplidos:**
   - Verificar especificaciones mínimas de hardware
   - Actualizar drivers de la tarjeta gráfica

3. **Archivos corruptos:**
   - Reinstalar la aplicación
   - Verificar integridad del archivo descargado

### Las imágenes no se cargan correctamente

**Verificar:**
- Formato de archivo correcto (PNG para objetos, PNG/JPG para fondos)
- Resolución adecuada (1000x1000 para objetos, 2160x3840 para fondos)
- Tamaño de archivo no excesivamente grande (< 10 MB recomendado)
- Base de datos no corrupta (verificar archivo `database/db.json`)

### Rendimiento lento o entrecortado

**Optimizaciones:**
- Cerrar otras aplicaciones que consuman recursos
- Reducir el número de objetos cargados simultáneamente
- Optimizar tamaño de imágenes antes de cargarlas
- Actualizar drivers gráficos

### El panel de administración no responde

**Soluciones:**
- Verificar que la contraseña sea correcta
- Limpiar caché del navegador si se accede vía web
- Reiniciar la aplicación
- Verificar que el puerto no esté siendo utilizado por otra aplicación

### Reinicio automático no funciona

**Verificar configuración:**
- El tiempo mínimo debe ser al menos 5000 ms (5 segundos)
- El tiempo configurado por defecto es 120000 ms (2 minutos)
- Verificar que haya un objeto marcado como "punto de inicio"

---

## Contacto y Soporte

### Soporte Técnico

Para asistencia técnica, problemas o preguntas:

**Email:** [soporte@proyeccionesdigitales.com]  
**Sitio Web:** [www.proyeccionesdigitales.com]

### Reportar Errores

Al reportar un error, por favor incluya:
- Versión de la aplicación
- Sistema operativo y versión
- Descripción detallada del problema
- Pasos para reproducir el error
- Capturas de pantalla si es posible
- Archivos de log (ubicados en la carpeta `logs/`)

### Actualizaciones

Las actualizaciones de la aplicación se publican regularmente e incluyen:
- Corrección de errores
- Mejoras de rendimiento
- Nuevas funcionalidades
- Optimizaciones de compatibilidad

Para verificar actualizaciones disponibles, visite el sitio web oficial.

---

## Licencia

**De Micro a Macro** © 2025 Proyecciones Digitales

Este software está licenciado bajo la Licencia MIT. Consulte el archivo LICENSE para más detalles.

---

## Créditos

**Desarrollo:** Proyecciones Digitales  
**Versión del Documento:** 1.0  
**Última Actualización:** Octubre 2025

---

**¡Gracias por utilizar De Micro a Macro!**

Esperamos que esta herramienta enriquezca la experiencia educativa en su planetario y ayude a los visitantes a comprender mejor las increíbles escalas de nuestro universo.
