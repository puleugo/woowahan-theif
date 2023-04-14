import { Controller } from '@nestjs/common';

@Controller()
export class MemberController {
  // 정산 어드민에 접근하는 우아한형제들 직원을 의미하며 일반회원/관리자로 구분됩니다.
  // 회원가입, 로그인, 권한관리 기능
  // 관리자: 모든 데이터 CRUD 가능
  // 일반 회원: 정보 검색 가능
}
