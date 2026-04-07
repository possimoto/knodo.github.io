# EmailJS 설정 가이드

Contact 페이지의 문의 폼에서 이메일을 발송하려면 EmailJS 설정이 필요합니다.

## 설정 단계

### 1. EmailJS 계정 생성
1. https://www.emailjs.com/ 접속
2. 무료 계정 생성 (월 200건까지 무료)

### 2. Email Service 생성
1. Dashboard에서 "Email Services" 클릭
2. "Add New Service" 클릭
3. Gmail 선택 (권장)
4. Service Name 입력 (예: "Knodo Contact Service")
5. Gmail 계정 연결 및 권한 승인
6. Service ID 복사 (예: "service_abc123")

### 3. Email Template 생성
1. Dashboard에서 "Email Templates" 클릭
2. "Create New Template" 클릭
3. 다음과 같이 템플릿 설정:

**Subject:**
```
[Knodo.kr 문의] {{from_name}}님의 문의사항
```

**Content:**
```
새로운 문의가 접수되었습니다.

발신자 정보:
- 이름: {{from_name}}
- 이메일: {{from_email}}

문의내용:
{{message}}

---
이 메일은 Knodo.kr 웹사이트 Contact 페이지에서 발송되었습니다.
```

**To Email:**
```
{{to_email}}
```

4. Template ID 복사 (예: "template_xyz789")

### 4. Public Key 찾기
1. Dashboard에서 "Account" 클릭
2. "API Keys" 탭에서 Public Key 복사

### 5. ContactPage.tsx 수정
파일에서 다음 부분을 실제 값으로 변경:

```typescript
const SERVICE_ID = 'YOUR_SERVICE_ID';     // 예: 'service_abc123'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // 예: 'template_xyz789'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';     // 예: 'abcdefg123456789'
```

## 테스트
1. 개발 서버 재시작
2. Contact 페이지에서 문의 폼 작성 및 전송
3. knodo.kr@gmail.com으로 이메일 수신 확인

## 대안: 환경 변수 사용 (권장)
보안을 위해 API 키를 환경 변수로 관리하는 것을 권장합니다:

1. `.env` 파일 생성:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

2. ContactPage.tsx에서:
```typescript
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

3. `.gitignore`에 `.env` 추가

## 문제 해결
- 이메일이 전송되지 않는 경우:
  1. 브라우저 콘솔에서 오류 메시지 확인
  2. EmailJS Dashboard에서 사용량 확인
  3. Service와 Template 설정 재확인
  4. Gmail 계정의 보안 설정 확인 

## ✅ Contact 페이지에 문의 폼 추가 완료!

Contact 페이지에 고객이 직접 문의사항을 보낼 수 있는 폼을 추가했습니다. 

### 추가된 기능
1. **문의 폼 필드** [[memory:2688170]]
   - 이름 (필수)
   - 이메일 주소 (필수) 
   - 문의내용 (필수)

2. **반응형 디자인**
   - 데스크탑: 기존 정보와 문의 폼이 나란히 표시
   - 모바일: 세로로 배치되어 가독성 향상

3. **사용자 경험 개선**
   - 폼 전송 중 로딩 상태 표시
   - 성공/실패 메시지 표시
   - 입력 필드 포커스 시 시각적 피드백

### 🚨 중요: EmailJS 설정 필요

현재 이메일 발송 기능을 사용하려면 EmailJS 설정이 필요합니다. `EMAILJS_SETUP.md` 파일에 상세한 설정 가이드를 작성해두었습니다.

**간단한 설정 단계:**
1. https://www.emailjs.com/ 에서 무료 계정 생성
2. Gmail 서비스 연결
3. 이메일 템플릿 생성
4. ContactPage.tsx의 다음 부분을 실제 값으로 변경:
   ```typescript
   const SERVICE_ID = 'YOUR_SERVICE_ID';
   const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```

### 접속 주소
- **로컬**: http://localhost:5173/contact
- **모바일**: http://192.168.0.21:5173/contact 또는 http://192.168.0.12:5173/contact

EmailJS 설정을 완료하면 문의 폼에서 전송한 내용이 **knodo.kr@gmail.com**으로 자동 발송됩니다. 설정에 도움이 필요하시면 말씀해주세요! 