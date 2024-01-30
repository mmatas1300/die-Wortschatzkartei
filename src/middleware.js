export {default} from 'next-auth/middleware';

export const config ={
    matcher: ['/dashboard']
}

//con :path* se protegen todas las rutas