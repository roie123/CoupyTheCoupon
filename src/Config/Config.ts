class Config {

}

class DevConfig extends Config {
readonly adminApiUrl :  string = "http://localhost:8080/api/admin";
readonly companyApiUrl :  string = "http://localhost:8080/api/company";
readonly customerApiUrl :  string = "http://localhost:8080/api/customer";

}

class ProdConfig extends Config {
    readonly adminApiUrl :  string = "http://localhost:8080/api/admin";
    readonly companyApiUrl :  string = "http://localhost:8080/api/company";
    readonly customerApiUrl :  string = "http://localhost:8080/api/customer";
}

const appConfig = process.env.NODE_ENV === 'development' ? new DevConfig() : new ProdConfig();

export default appConfig;