import { CorsOptions } from "cors";

const allowedDomains = process.env.DOMAINS;

export const corsConfig: CorsOptions = {    
    origin: function(origin, callback){
        if(!origin || allowedDomains?.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by cors'));            
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']    
}


