#APIRESTful con sistema de autenticación construida con nodeJS y express

Desarrollado en typescript
Usa prisma para la conexión con una base de datos PostgreSQL
Usa docker para hacer un contenedor de la aplicación


##Funcionamiento

Se proporciona una API RESTful que registra o logea a un usuario.
Desde frontend como postman se puede verificar el funcionamiento.
Cuando un usuario está correctamente logeado o registrado se genera un token que se envía por el header de la solicitud en "Authorization" para ser manejado por el frontend.

Adicionalmente se programó para que desde el mismo backend podamos simular cuando un token es válido y por ende permita acceso a los métodos GET, PUT, PATCH Y DELETE para controlar los usuarios creados y poder interactuar con ellos.
