# Contextualização:

Os projetos foram convertidos para containers dockers. Há um container para cada servidor web e para cada api.  

dentro da pasta “web/grupo-2” foram ajustados:
- webserver.js 
- package.json
- Pasta views em que foi colocado todo o conteúdo web
- Dockerfile necessário para executar o projeto
- .dockerignore para exclusão do que não é necessário


Da mesma forma, dentro da pasta “api/grupo-2” foram ajustados:
- server.js 
- package.json
- Dockerfile necessário para executar o projeto


Foi criado o container mongo para um servidor mongo que na porta 27017 do cluster e um mongo-express que é um container que se conecta ao mongo para gerenciamento e atende na porta 8090.


Na pasta raiz do projeto há o arquivo compose.yaml que compila e executa o código de todos os containers. Cada um está associado aos seguintes recursos:
- Servidor web: porta 8002
- Servidor api: porta 3002
- Servidor mongo atendendo na porta 27017
- Servidor mongo-express (Gerenciador Web do Mongo) na porta 8090 


Nas pastas api e web, há um diretório exemplo que possui o código de containers com aplicações web de transferência de arquivos com armazenamento no mongo. O container exemplo da pasta web é um servidor de páginas node que faz requisições para o servidor exemplo da pasta api que salva os arquivos recebidos no mongo. 

# Modelo para rotulação de imagens:
Vocês podem utilizar esse código como modelo para desenvolvimento das requisições de uma aplicação de IA. Há também a pasta api-ia/backend-image que contém o código de modelo de api utilizando recursos de IA para tratamento de imagens e que podem ser utilizadas como modelo para a aplicação de vocês.


# Modelos para reconhecimento de voz:
O arquivo docker compose possui uma receita baseada no container disponível em:


 - https://hub.docker.com/r/onerahmet/openai-whisper-asr-webservice


Esse container possui uma interface que fica disponível em localhost:9000/docs e que oferece a possibilidade de utilizá-la para transcrição de texto a partir de arquivos de gravação de voz no formato mp3. 
Há um segundo modelo na pasta api-ia/backend-files que também faz transcrição de voz, mas com uma implementação diferente dela em que vocês tem acesso aos arquivos que a compõem. 


Utilizando os códigos fornecidos como modelo nos diretórios api e api-ia, vocês devem construir implementações que façam uso do serviço para fornecer alguma funcionalidade baseada nesses recursos para a aplicação. Pode ser extração de texto de áudio de usuários ou a rotulagem e classificação de imagens que sejam enviadas pelos usuários. 


Para criação dos exemplos da pasta web, foram executados as seguintes instruções:

	npm install ejs –save

	npm install body-parser –save

	npm install express –save

	npm install axios –save

        npm install multer –save

Para criação do exemplo da pasta api, foram executados as seguintes instruções:

	npm install body-parser –save

	npm install express –save

        npm install mongoose –save

        npm install multer –save

        npm install dotenv –save


Foi criado o arquivo server.js e o arquivo model.js para armazenar nossas imagens no mongo. 


No exemplo disponível na pasta web, o nosso servidor renderiza a página imagepage.js. Para isso, faz uma requisição ao servidor da api que consulta o servidor mongo e devolve as imagens existentes. O servidor de api também recebe as imagens do formulário e quando o usuário seleciona uma imagem e clica em submit, é utilizado o axios para gerar uma requisição para a api com os dados da imagem que são salvos e retornados para nossa app web. Então, a biblioteca axios que fez a requisição irá renderizar a página com a resposta.


Para ver as aplicações em funcionamento, após efetuar a clonagem do repositório e abrir o diretório pi-inteligencia-artificial com o Visual Studio Code, você poderá executar as seguintes instruções em um terminal:

Para construir e executar todos os containers

           docker compose up -d

Para construir apenas um container:

           docker compose <nome_servico> up -d

           Por exemplo, para iniciar apenas o serviço backend-image:

           docker compose backend-image up -d


