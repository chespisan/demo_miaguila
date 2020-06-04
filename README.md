
# MiaguilaTest

Este proyecto es un prototipo de para pintar rutas dinamicas consumidas por un json y otras funcionalidades, esta desarrollado en Angular V9

# Información

1.Se utilizo la librería de MapBox para realizar el ruteo de rutas dinámicas consumidas por un JSON
2.Se utilizo varios métodos de la librería y se consumió la API de Mapbox
3.Se creo un json para las direcciones favoritas, una dirección por defecto y una de origen
4.Se creo un servicio para consumir el JSON, este cuenta con dos métodos, uno que consume el json con HTTPCLIENT y otra forma con una promesa
5.Se configuro Variables de entorno para tener diferentes entornos, Production y Develop
6.En los Environments se agrego el access token y el api de MapBox
7.Se creo un servicio que consume la api de mapBox, en este se encuentra un servicio de Geocodificación directa, la manera de la que sirve es para pasarle un string de un lugar conocido, podrá hacer pruebas  agregando el nombre de un centro comercial o lugar reconocido, podrá escribir direcciones pero el modulo no esta 100% configurado para encontrar una dirección exacta,  por parámetros se paso lenguaje, ubicación de país etc., es un prototipo de geocodificación
8.Se creo una vista llamada home, en la cual se iniciara la app por defecto, en esta consumirá el json y pintara una ruta con el punto(a,b) que vienen en el JSON, se podrá modificar el json para cambiar la ubicación de los puntos a y b
9. El mapa ocupara el 100% de la pantalla, al costado izquierdo encontrara un menú flotante  con dos tabs, para mostrar las direcciones favoritas y la por defecto que vienen del json, el 2do tab solo tendrá un formulario con un solo input, el cual se utilizara para la geocodificación
10. Podrá seleccionar una dirección de destino de la sección  favoritos, haciendo clic en ella, la ruta del mapa se repintara a la nueva ubicación del destino, también podrá  cambiar el destino con el modulo de geocodificación
11. El  inicio de partía y el destino, en el mapa contaran con un circulo con la letra a y b, cada punto podrá arrastrarlo hacia cualquier dirección y crear una ruta nueva
12. Se adapto en modo responsive la vista para verla  en tamaños igual o menores a 600px

# Recomendaciones

1. Por utilizar la version de desarrollo, podra existir algun tipo de intermitencia cuando inicie la app
2. Si inicia y no se pinta la ruta, por favor recargar, ya que  en modo desarrollo sera mas lento 
3. EL proyecto se realizo en Angular 9, y con Node 12.16.1


## Development server

Para inciiar el proyecto el comando es: `ng serve --configuration=develop`, ya que esta  con las configuraciones para trabajar con diferentes entornos

## Build
Para inciiar el proyecto el comando es: `ng build  --configuration=develop`, ya que esta  con las configuraciones para trabajar con diferentes entornos
Run `ng build  --configuration=develop` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


