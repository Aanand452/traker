import express from 'express';
import swaggerTools from 'swagger-tools';
import http from 'http';
import { verifyToken } from './auth';
import fs from 'fs';
import jsyaml from 'js-yaml';
import dotenv from 'dotenv';
import cors from 'cors';

class Server {
  
  constructor() {
    this.app = express();
  }

  start() {
    !process.env.PORT && dotenv.config({ path: __dirname  + '/../../db/.env' });
    let options = {
      controllers: __dirname  + '/controllers', 
    };
    
    let swaggerDoc = jsyaml.safeLoad(fs.readFileSync(__dirname  + '/../api.yaml', 'utf8'));
    let serverPort = process.env.NODE_ENV === 'stable' || process.env.NODE_ENV === 'test' ? process.env.PORT : 3000;
    this.app.use(cors());

    swaggerTools.initializeMiddleware(swaggerDoc,  (middleware) => {
      this.app.use(middleware.swaggerMetadata());
      /*this.app.use(middleware.swaggerSecurity({
        Bearer: verifyToken
      }));*/

      this.app.use(middleware.swaggerValidator());
      this.app.use(middleware.swaggerRouter(options));
      serverPort === 3000 && this.app.use(middleware.swaggerUi());

      http.createServer(this.app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      });
    });
  }
}

const server = new Server();
server.start();
