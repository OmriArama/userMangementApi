export interface IConfigInterface {
    mongoConnectionString: string
}


export const Config: IConfigInterface = {
    mongoConnectionString: 'mongodb+srv://Admin:Jbz5rkMXBS6n6MyX@cluster0-cfbwn.mongodb.net/production?retryWrites=true&w=majority'
}