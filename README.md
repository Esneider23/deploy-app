### Como ejecutar este servicio
## Primer paso 
Se debe entrar a una cuenta docker hub y crear un repo

## Segundo paso
Se crea un repositorio de github

## Segundo paso
Se crea una cuenta de azure depvops service, se crea un proyecto y a este se le asignan conecciones de github y docker

## tercer paso 
Se crea en la cuenta de azure una app registratión y se crea certificates and secret

## Cuarto paso
En el github se suben los archivos menos el main

## Quinto paso
Se crea el agente este debe tener instalado docker y terraform

## Sexto paso
Se crea un pipelines y se cambia por el archivo azure-pipelines

Esto creara una base de datos, realiza una docker imagen y la sube a docker hub, se crea la app web y se construye el traffic manager profile