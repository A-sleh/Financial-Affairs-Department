import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class DatabaseConfiguration {
  @Value('DB_HOST')
  host: string;

  @Value('DB_USER')
  userName: string;

  @Value('DB_PASSWORD')
  passowrd: string;
}
