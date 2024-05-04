export {default} from 'next-auth/middleware';

export const config ={
    matcher: ['/konto','/karteneditor','/uben','/api/user/:path']
};