import { environment } from '../environments/environment';

export const Constants = {
    API_URL : environment.api,
    TODO_JPA_API_URL : environment.api + "/jpa",
    PRODUCT_API_URL : environment.api + "/products",
    SOCKET_API_URL : environment.api + "/ws",
    SOCKET_TOPIC : "/topic/greetings"
}
