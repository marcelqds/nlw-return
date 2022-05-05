import cors from 'cors';
import express  from 'express';
import { routes } from './routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3005, () => {
    console.dir('Server http running in port 3005');
});

//mailtrap -> para testar emails.
