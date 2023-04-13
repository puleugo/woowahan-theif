import {Module} from "@nestjs/common";
import {AuthorizationModule} from "./authorization/authorization.module";
import {AuthenticationModule} from "./authentication/authentication.module";

@Module({
    imports: [AuthorizationModule, AuthenticationModule, AuthModule]
})
export class AuthModule {}
