import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginRequest } from './dto/login.request';
import { AuthenticationService } from './authentication.service';
import { RegisterRequest } from './dto/register.request';
import { JwtResponse } from './dto/jwt.response';
import { AuthGuard } from './guard/auth.guard';
import { MemberProfileResponse } from '../../member/dto/member-profile.response';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginRequest: LoginRequest): Promise<JwtResponse> {
    return await this.authenticationService.login(loginRequest);
  }

  @Post('register')
  async register(@Body() registerRequest: RegisterRequest): Promise<any> {
    const registeredMember = await this.authenticationService.register(
      registerRequest,
    );
    if (registeredMember) return { success: true };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getMyProfile(@Request() req): Promise<MemberProfileResponse> {
    const member = await this.authenticationService.getMyProfile(req.member);
    return new MemberProfileResponse(member);
  }
}
