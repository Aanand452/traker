import express from 'express';
import swaggerTools from 'swagger-tools';
import http from 'http';
import fs from 'fs';
import jsyaml from 'js-yaml';
import dotenv from 'dotenv';

class Server {
  
  constructor() {
    this.app = express();
  }

  start() {
    dotenv.config({ path: __dirname  + '/../../db/.env' });
    let options = {
      controllers: __dirname  + '/controllers', 
    };
    
    let swaggerDoc = jsyaml.safeLoad(fs.readFileSync(__dirname  + '/../api.yaml', 'utf8'));
    let serverPort = process.env.NODE_ENV === 'stable' || process.env.NODE_ENV === 'test' ? 80 : 3000;

    swaggerTools.initializeMiddleware(swaggerDoc,  (middleware) => {
      this.app.use(middleware.swaggerMetadata());
      this.app.use(middleware.swaggerValidator());
      this.app.use(middleware.swaggerRouter(options));
      this.app.use(middleware.swaggerUi());
      http.createServer(this.app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      });
    });
  }
}

const server = new Server();
server.start();
