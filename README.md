# Bra-YanarioaApp

PROMPT — BRA-YANARIO · QUIÉN QUIERE SER BRA-YANARIO

Crea una aplicación web interactiva y premium inspirada en los concursos de preguntas de televisión, pero con identidad completamente original.

El nombre de la experiencia es:

¿QUIÉN QUIERE SER BRA-YANARIO?

La primera edición del juego estará personalizada para una amiga llamada Sindy Marin.

IMPORTANTE:
No quiero un simple CRUD con preguntas. Quiero construir una experiencia de juego completa, elegante, cinematográfica y emocionante, que parezca un programa de televisión interactivo.

1. IDENTIDAD VISUAL

La identidad debe girar alrededor de:

Negro profundo como color principal.

Rojo intenso como color de acción.

Blanco para textos.

Pequeños detalles en gris oscuro.

Gradientes negros y rojos.

Iluminación roja.

Efectos de glow muy sutiles.

Bordes luminosos.

Sombras profundas.

Contraste elevado.

La estética debe sentirse:

premium + tecnológica + televisiva + misteriosa + elegante.

Evita que parezca una plantilla genérica de dashboard.

No utilizar demasiados elementos decorativos.

La interfaz debe tener mucho espacio negativo y una jerarquía visual clara.

2. PANTALLA DE INICIO

Crear una landing/pantalla de bienvenida espectacular.

Mostrar:

¿QUIÉN QUIERE SER
BRA-YANARIO?

Debajo:

Edición especial: Sindy Marin

Agregar una frase introductoria configurable, por ejemplo:

"Sindy, tienes una misión. Responde correctamente y demuestra cuánto sabes."

Botón principal:

COMENZAR JUEGO

Agregar una animación de entrada elegante.

Al cargar la aplicación:

fondo negro;

partículas rojas muy sutiles;

iluminación ambiental;

aparición progresiva del logo/título;

sonido opcional;

transición cinematográfica hacia el juego.

No saturar de partículas ni efectos.

3. EXPERIENCIA DEL JUEGO

La pantalla principal debe sentirse como un concurso de televisión.

Distribución:

Centro

Mostrar la pregunta dentro de un panel grande.

Ejemplo:

¿Cuál de estas opciones representa mejor a Sindy?

Debajo mostrar 4 respuestas:

A — Opción 1
B — Opción 2
C — Opción 3
D — Opción 4

Las respuestas deben ser grandes, fáciles de pulsar y perfectamente adaptadas a desktop y móvil.

4. SISTEMA DE PREGUNTAS

Cada pregunta debe soportar:

pregunta;

4 respuestas;

respuesta correcta;

explicación de la respuesta;

imagen opcional;

audio opcional;

video opcional;

categoría;

dificultad;

valor/premio;

tiempo límite;

orden;

etiquetas;

pregunta activa/inactiva.

Permitir preguntas con diferentes niveles:

Fácil

Media

Difícil

Experta

5. ESCALERA DE PREMIOS

Crear una escalera visual de premios.

Ejemplo:

$100
$200
$300
$500
$1.000
$2.000
$4.000
$8.000
$16.000
$32.000
$64.000
$125.000
$250.000
$500.000
$1.000.000

Los valores deben ser completamente configurables desde el panel administrativo.

La pregunta actual debe estar claramente resaltada en la escalera.

Al responder correctamente:

animación de éxito;

sonido opcional;

avance automático;

actualización del premio.

Al responder incorrectamente:

detener el juego;

mostrar animación de fallo;

mostrar respuesta correcta;

mostrar explicación;

mostrar premio obtenido;

botón para finalizar/reiniciar.

6. TEMPORIZADOR

Cada pregunta debe tener un temporizador configurable.

Ejemplo:

30 segundos.

Pero desde el panel administrativo debe poder configurarse:

10 segundos

15 segundos

20 segundos

30 segundos

45 segundos

60 segundos

tiempo ilimitado

El temporizador debe tener una animación visual.

Cuando queden pocos segundos:

cambiar visualmente;

aumentar tensión;

reproducir sonido opcional;

hacer una animación sutil.

Cuando llegue a cero:

Tiempo agotado

y tratar la pregunta como incorrecta.

7. COMODINES

Implementar comodines configurables.

Inicialmente:

50/50

Eliminar dos respuestas incorrectas.

Pregunta al público

Mostrar una gráfica con porcentajes simulados.

Llamar a un amigo

Mostrar una interfaz simulando una llamada y una respuesta.

IMPORTANTE:

Los comodines deben poder activarse/desactivarse desde el panel administrativo.

También debe ser posible crear nuevos comodines en el futuro.

8. IMÁGENES Y MULTIMEDIA

Las preguntas deben permitir imágenes.

Por ejemplo:

Pregunta:
"¿Cuál de estas personas es Sindy?"

Mostrar varias imágenes.

El administrador debe poder:

subir imagen;

reemplazar imagen;

eliminar imagen;

utilizar imagen como contenido de la pregunta;

utilizar imagen como fondo;

utilizar imagen en una respuesta.

También permitir:

audio;

video;

GIF.

Si se utiliza multimedia, la interfaz debe adaptarse automáticamente.

9. PANEL DE ADMINISTRACIÓN

Crear un panel completamente separado del juego.

Ruta conceptual:

/admin

Debe parecer un CMS profesional.

Dashboard principal:

BRA-YANARIO ADMIN

Mostrar:

cantidad de preguntas;

cantidad de partidas;

preguntas activas;

categorías;

dificultad;

partidas completadas;

mejor puntuación;

premio máximo alcanzado.

10. ADMINISTRADOR DE PREGUNTAS

Crear una sección:

Preguntas

Mostrar todas las preguntas en una tabla/listado.

Cada pregunta debe mostrar:

número;

texto;

categoría;

dificultad;

respuesta correcta;

valor;

estado;

fecha de creación.

Acciones:

Editar
Duplicar
Eliminar
Activar/desactivar

Agregar buscador.

Agregar filtros:

categoría;

dificultad;

estado;

valor;

fecha.

11. CREAR / EDITAR PREGUNTA

Crear un editor completo.

Campos:

Pregunta

Textarea grande para escribir la pregunta.

Respuestas

A
B
C
D

Permitir seleccionar cuál es la correcta.

Explicación

Campo para explicar por qué la respuesta es correcta.

Categoría

Seleccionable desde categorías existentes.

Dificultad

Fácil / Media / Difícil / Experta.

Premio

Seleccionar valor de la escalera.

Tiempo

Definir tiempo específico para esa pregunta.

Imagen

Subir imagen.

Audio

Subir audio.

Video

Subir video.

Estado

Activa / Inactiva.

Agregar una vista previa en tiempo real:

"Así verá Sindy esta pregunta."

12. ADMINISTRACIÓN DE CATEGORÍAS

Crear un administrador de categorías.

Ejemplos:

Sindy

Amigos

Recuerdos

Cultura general

Música

Películas

Preguntas personales

Random

Pero NO limitar las categorías a estas.

El administrador debe poder:

crear;

editar;

eliminar;

activar/desactivar.

13. CONFIGURACIÓN DEL JUEGO

Crear sección:

Configuración

Permitir modificar:

Información

nombre del juego;

nombre del participante;

subtítulo;

mensaje de bienvenida;

mensaje final.

Apariencia

color principal;

color secundario;

color de acento;

logo;

imagen de fondo.

Gameplay

número de preguntas;

temporizador;

cantidad de comodines;

permitir repetir preguntas;

mostrar explicación;

activar/desactivar sonidos;

activar/desactivar animaciones.

Premios

Permitir modificar completamente la escalera.

14. PERSONALIZACIÓN PARA SINDY

La aplicación debe estar diseñada para que Sindy sea la primera participante, pero NO debe estar programada específicamente para ella.

Debe existir un sistema de participantes.

Por ejemplo:

Participantes

Sindy Marin

Crear participante

Editar participante

Eliminar participante

Cada participante puede tener:

nombre;

foto;

descripción;

color/acento;

partida;

puntuación;

progreso;

fecha.

Así puedo reutilizar BRA-YANARIO para cualquier amigo, familiar o persona.

15. SISTEMA DE PARTIDAS

Guardar cada partida.

Registrar:

participante;

fecha;

preguntas respondidas;

respuestas correctas;

respuestas incorrectas;

tiempo utilizado;

comodines utilizados;

premio alcanzado;

resultado final.

Crear historial:

Partidas recientes

y permitir revisar una partida.

16. PANTALLA FINAL

Si el participante gana:

Mostrar una celebración espectacular.

Ejemplo:

¡SINDY ES BRA-YANARIA!

Mostrar:

Premio conseguido

$1.000.000

Agregar:

confeti;

iluminación roja;

animación;

sonido opcional.

Si pierde:

Mostrar:

¡CASI, SINDY!

Mostrar:

premio conseguido;

pregunta donde perdió;

respuesta correcta;

explicación.

17. RESPONSIVE

La aplicación debe funcionar perfectamente en:

Desktop

Laptop

Tablet

Smartphone

En móvil, el juego debe sentirse incluso mejor.

Las respuestas deben ser fáciles de tocar.

El panel administrativo también debe ser responsive.

18. MICROINTERACCIONES

Agregar animaciones cuidadosamente.

Ejemplos:

hover de respuestas;

selección de respuesta;

respuesta correcta;

respuesta incorrecta;

transición entre preguntas;

aparición del temporizador;

actualización del premio;

activación de comodines;

transición de pantallas;

entrada y salida de imágenes.

Usar animaciones fluidas.

Evitar animaciones excesivas.

La sensación debe ser:

"esto parece una aplicación profesional, no una demo."

19. SONIDO

Crear sistema de audio configurable.

Sonidos:

inicio;

selección;

cuenta regresiva;

respuesta correcta;

respuesta incorrecta;

comodín;

victoria;

derrota.

Desde configuración permitir:

Sonido ON/OFF

y controlar volumen.

No depender obligatoriamente de sonidos externos.

20. ARQUITECTURA

Construir la aplicación de manera modular y escalable.

Separar claramente:

Game

Toda la experiencia del concurso.

Admin

Toda la administración.

Data

Preguntas, categorías, participantes, partidas y configuración.

Components

Componentes reutilizables.

No duplicar código innecesariamente.

21. EXPERIENCIA DEL ADMINISTRADOR

El administrador debe poder crear una edición completa sin tocar código.

Es decir:

Quiero poder entrar al panel y crear una nueva edición para otra persona.

Ejemplo:

Nueva edición

Nombre:
Sindy Marin

Título:
¿Quién quiere ser BRA-YANARIO?

Preguntas:
20

Tiempo:
30 segundos

Tema:
Negro / Rojo

Y después simplemente comenzar a agregar preguntas.

22. DISEÑO DEL DASHBOARD

El dashboard administrativo debe ser elegante.

No crear el típico dashboard azul y blanco.

Usar:

negro;

rojo;

tarjetas oscuras;

bordes sutiles;

indicadores;

gráficos;

tablas;

sidebar elegante.

Debe mantener exactamente la identidad visual del juego.

23. DETALLES IMPORTANTES

NO utilizar una plantilla genérica.

NO crear un dashboard visualmente desconectado del juego.

NO llenar la interfaz de tarjetas innecesarias.

NO utilizar demasiados colores.

NO hacer que parezca una copia exacta de "¿Quién quiere ser millonario?".

La inspiración debe estar en el concepto de concurso de preguntas, pero toda la identidad visual, nombre, interfaz y experiencia deben ser originales.

24. TECNOLOGÍA

Construir utilizando una arquitectura moderna y mantenible.

Preferiblemente:

React

TypeScript

Tailwind CSS

componentes reutilizables

animaciones modernas

almacenamiento persistente

sistema de subida de imágenes

base de datos para preguntas y partidas

Si se necesita backend, utilizar una solución sencilla y escalable.

La aplicación debe poder desplegarse posteriormente en Vercel/Netlify.

25. PRIORIDAD ABSOLUTA

La prioridad no es crear muchas funciones.

La prioridad es que cuando Sindy abra la aplicación piense:

"¿QUÉ ES ESTO? ESTO ESTÁ BRUTAL."

Debe sentirse como un verdadero programa de concursos creado específicamente para ella.

El juego debe tener:

personalidad + tensión + humor + elegancia + interacción + sorpresa.

El administrador debe sentirse como el backstage del programa.

Crear una experiencia completa donde:

ADMIN → CREA LA EDICIÓN → CREA LAS PREGUNTAS → CONFIGURA EL JUEGO → SINDY JUEGA → SE GUARDA LA PARTIDA → SE MUESTRA EL RESULTADO.

Construir primero una versión funcional completa y después pulir visualmente cada interacción hasta conseguir un resultado de nivel profesional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1f7efbf8-fa14-4146-b5fc-1bd5c886ad1d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
