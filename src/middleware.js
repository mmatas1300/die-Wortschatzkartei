export {default} from 'next-auth/middleware';

export const config ={
    matcher: ['/dashboard','/uben']
}

//con :path* se protegen todas las rutas