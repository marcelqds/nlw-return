import cors from 'cors';
import express  from 'express';
import { routes } from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const port = process.env.PORT || 3005;

const options = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: 'API Widget Feedback',
            description: 'Sistema desenvolvido pela Rocketseat',
            version: '1.0.0'
        }
    },
    apis: ["./src/routes/*router.*"],
    /*components:{
        secutirySchemes:{
            tokenAuth:{
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }*/
};

const openapiOptions = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiOptions));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.dir(`Server http running in port ${port}`);
});

//mailtrap -> para testar emails.

