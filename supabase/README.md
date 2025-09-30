# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트 생성
2. 프로젝트 이름과 데이터베이스 비밀번호 설정
3. 리전 선택 (가까운 지역 선택, 예: Northeast Asia - Seoul)

## 2. 데이터베이스 스키마 적용

### 방법 1: SQL Editor 사용 (권장)
1. Supabase 대시보드에서 `SQL Editor` 선택
2. `New query` 클릭
3. `schema.sql` 파일 내용 전체 복사 & 붙여넣기
4. `Run` 버튼 클릭

### 방법 2: CLI 사용
```bash
# Supabase CLI 설치
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 적용
supabase db push
```

## 3. 환경 변수 설정

Supabase 대시보드에서 다음 정보를 복사:

1. `Settings` → `API` 이동
2. 다음 값들을 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY`

프로젝트 루트에 `.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 4. Row Level Security (RLS) 확인

스키마 적용 후 자동으로 다음 정책이 생성됩니다:

- ✅ **공개 읽기**: 발행된 프로젝트는 누구나 볼 수 있음
- ✅ **인증 쓰기**: 로그인한 관리자만 프로젝트 수정 가능
- ✅ **연락 문의**: 누구나 문의 작성 가능, 관리자만 읽기

## 5. 관리자 계정 생성

1. Supabase 대시보드 → `Authentication` → `Users`
2. `Add user` → 이메일/비밀번호 입력
3. 이 계정으로 관리자 페이지 로그인

## 6. 테이블 구조

### `projects` 테이블
주요 필드:
- `title`, `slug`, `description`: 프로젝트 기본 정보
- `thumbnail_url`: Cloudinary public_id (예: `portfolio/project-1/thumb`)
- `gallery_urls`: 갤러리 이미지 배열
- `published`: 공개 여부
- `featured`: 메인 페이지 노출 여부

### `categories` 테이블
프로젝트 카테고리 관리

### `contact_messages` 테이블
연락 문의 저장

## 7. 데이터 관리

### Supabase Dashboard 사용
- `Table Editor`에서 직접 데이터 추가/수정/삭제

### 관리자 페이지 사용 (구현 예정)
- `/admin` 페이지에서 UI로 관리

## 트러블슈팅

### RLS 에러가 발생하는 경우
```sql
-- RLS 비활성화 (개발 중에만)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
```

### 로컬에서 Supabase 사용
```bash
supabase start
# 로컬 Supabase가 http://localhost:54321에서 실행됨
```
