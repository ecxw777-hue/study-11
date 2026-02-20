# Nomad Korea - 개선 실행 계획 (SPEC)

> **작성일**: 2026-02-20
> **데이터베이스**: 사용하지 않음 (가짜 데이터로 진행)
> **각 Phase는 독립적으로 실행 가능하며, 점진적으로 프로젝트를 개선합니다.**

---

## 현재 프로젝트 상태 요약

| 항목 | 상태 |
|---|---|
| 프레임워크 | Next.js 16.1.6 (App Router) + React 19 |
| 스타일링 | Tailwind CSS v4 + shadcn/ui (new-york) |
| 인증 | Supabase Auth (이메일/비밀번호) - 동작함 |
| 테마 | 다크 모드 고정 (`<html class="dark">`) |
| 도시 데이터 | 6개 도시 (하드코딩, `src/data/cities.ts`) |
| 페이지 | `/` (홈), `/login`, `/register`, `/auth/confirm` |

### 현재 작동하지 않는 기능 (Placeholder)

- FilterSortBar: UI만 존재, 실제 필터/정렬 미연동
- MapViewPlaceholder: 빈 박스, 지도 라이브러리 없음
- Email 뉴스레터 폼: `preventDefault()`만 호출, API 없음
- 멤버십 "프로 시작하기" 버튼: 결제 연동 없음
- Footer/Editorial 링크: 모두 `href="#"` (dead link)
- 회원가입 비밀번호 확인: 수집만 하고 검증 안 함
- 회원가입 이름/닉네임: 수집만 하고 Supabase에 전달 안 함
- "비밀번호 찾기" 링크: `href="#"` (dead link)
- Footer 소셜 아이콘: 이모지만 있고 링크 없음
- 미인증 사용자 홈페이지 접근 불가 (미들웨어가 `/login`으로 리다이렉트)

---

## - [x] Phase 1: 핵심 UX 수정 및 기반 정비

### 오버뷰

사용자가 사이트를 처음 방문했을 때 겪는 핵심 문제들을 해결합니다. 미인증 사용자도 홈페이지를 볼 수 있도록 미들웨어를 수정하고, 회원가입 폼의 검증 누락을 고치며, 작동하지 않는 Dead Link들을 정리합니다.

### 기술 컨텍스트

- **미들웨어**: `src/middleware.ts` → `src/lib/supabase/middleware.ts` (현재 홈페이지도 인증 필요)
- **회원가입**: `src/app/register/actions.ts` + `src/app/register/page.tsx` (RegisterForm)
- **로그인**: `src/app/login/actions.ts` + `src/app/login/page.tsx` (LoginForm)
- **네비게이션 데이터**: `src/data/navigation.ts` (mainNav, footerSections)
- **Footer**: `src/components/layout/footer.tsx`
- **Navbar**: `src/components/layout/navbar.tsx`, `navbar-mobile-menu.tsx`

### 수정/개선 기능

- [x] 미들웨어 수정: `/` (홈페이지)를 인증 없이 접근 가능하도록 공개 경로에 추가
- [x] 회원가입 폼 비밀번호 확인 검증 추가 (password !== confirmPassword 시 에러 표시)
- [x] 회원가입 시 이름/닉네임을 Supabase user_metadata에 전달
- [x] 회원가입/로그인 폼 클라이언트 측 유효성 검사 추가 (빈 필드, 이메일 형식, 비밀번호 최소 길이)
- [x] Footer 링크를 실제 섹션 앵커(`#cities`, `#seasonal` 등) 또는 향후 페이지 경로로 변경
- [x] Footer 소셜 아이콘에 실제 링크 추가 (placeholder URL이라도 `<a>` 태그로 변경)
- [x] "비밀번호 찾기" 링크를 안내 페이지 또는 Supabase 비밀번호 리셋 플로우로 연결
- [x] Navbar에서 로그인/비로그인 상태별 메뉴 항목 분리 정리
- [x] 모바일 메뉴(Sheet)에서도 로그인 상태 반영 확인

### 검증/확인 항목

- [x] 비로그인 사용자가 홈페이지(`/`)에 접근 가능한지 확인
- [x] 비로그인 사용자가 `/login`, `/register`에 정상 접근 가능한지 확인
- [x] 로그인된 사용자가 `/login`, `/register` 접근 시 홈으로 리다이렉트되는지 확인
- [x] 회원가입 시 비밀번호 불일치하면 에러 메시지가 표시되는지 확인
- [x] 회원가입 후 Supabase user_metadata에 이름이 저장되는지 확인
- [x] Footer의 모든 링크가 `href="#"`가 아닌 유효한 경로를 가지는지 확인
- [x] 모바일/데스크톱 Navbar가 로그인 상태에 따라 올바르게 렌더링되는지 확인
- [x] 빈 필드로 폼 제출 시 적절한 에러 메시지가 표시되는지 확인

---

## - [ ] Phase 2: 필터/정렬 기능 연동 및 도시 데이터 확장

### 오버뷰

현재 UI만 존재하는 FilterSortBar를 실제 도시 카드 그리드와 연동합니다. 도시 데이터를 확장하여 사이트 퀵스탯의 "42개 도시" 주장에 부합하도록 더 많은 가짜 데이터를 추가하고, 필터링/정렬이 의미있게 작동하도록 합니다.

### 기술 컨텍스트

- **FilterSortBar**: `src/components/sections/filter-sort-bar.tsx` (Client Component, 로컬 state만 보유)
- **CityCardGrid**: `src/components/sections/city-card-grid.tsx` (현재 전체 cities 배열 렌더링)
- **MainContent**: `src/components/sections/main-content.tsx` (Grid + Sidebar 레이아웃 래퍼)
- **도시 데이터**: `src/data/cities.ts` (6개 도시, `City` 타입)
- **타입 정의**: `src/types/index.ts` (`City` 인터페이스)
- **QuickStatsBar**: `src/components/sections/quick-stats-bar.tsx` (42개 도시라고 표시)
- **홈 페이지**: `src/app/page.tsx` (모든 섹션 조합)

### 수정/개선 기능

- [ ] 도시 데이터를 최소 15~20개로 확장 (다양한 지역, 점수, 비용 범위 포함)
- [ ] FilterSortBar의 지역 필터 상태를 상위 컴포넌트(page 또는 MainContent)로 끌어올리기 (state lifting)
- [ ] 지역 필터 선택 시 해당 지역 도시만 CityCardGrid에 표시
- [ ] 정렬 옵션 연동: 노마드 점수순, 비용순, 인터넷 속도순, 안전도순, 좋아요순 등
- [ ] Grid/List 토글 연동: 리스트 뷰 레이아웃 구현 (카드 가로 배치)
- [ ] 필터 결과가 0개일 때 "조건에 맞는 도시가 없습니다" 빈 상태 UI 표시
- [ ] QuickStatsBar 숫자를 실제 데이터 길이와 동기화 (또는 의도적으로 "전체 데이터베이스" 수치로 유지)
- [ ] URL 쿼리 파라미터로 필터/정렬 상태 동기화 (선택사항: 공유 가능한 필터 링크)

### 검증/확인 항목

- [ ] 지역 필터 "전체"를 선택하면 모든 도시가 표시되는지 확인
- [ ] 특정 지역을 선택하면 해당 지역 도시만 표시되는지 확인
- [ ] 각 정렬 옵션이 올바른 순서로 도시를 정렬하는지 확인
- [ ] Grid ↔ List 토글이 레이아웃을 전환하는지 확인
- [ ] 결과 0개 시 빈 상태 메시지가 표시되는지 확인
- [ ] 필터 + 정렬 조합이 올바르게 작동하는지 확인
- [ ] 새로 추가된 도시 데이터의 모든 필드가 올바르게 렌더링되는지 확인
- [ ] 모바일에서 필터/정렬 UI가 정상 작동하는지 확인

---

## - [x] Phase 3: 도시 상세 페이지 추가

### 오버뷰

현재 도시 카드를 클릭해도 아무 곳으로도 이동하지 않습니다. 각 도시의 상세 정보를 보여주는 개별 페이지를 추가하여 사이트의 핵심 콘텐츠 깊이를 확보합니다. 가짜 데이터를 활용하여 상세 정보 페이지를 구성합니다.

### 기술 컨텍스트

- **CityCard**: `src/components/sections/city-card.tsx` (현재 클릭 이벤트/링크 없음)
- **도시 데이터**: `src/data/cities.ts` + `src/types/index.ts`의 `City` 인터페이스
- **레이아웃**: `src/app/layout.tsx` (Navbar, Footer는 root layout에 없고 page.tsx에서 직접 포함)
- **스타일**: `src/app/globals.css` (커스텀 CSS 변수, 다크 테마)
- **공유 컴포넌트**: `src/components/shared/` (NomadScoreBar, SafetyBar, 각종 Badge 등)

### 수정/개선 기능

- [x] `/cities/[slug]` 동적 라우트 생성 (`src/app/cities/[slug]/page.tsx`)
- [x] City 타입에 상세 정보 필드 추가 (장문 설명, 장단점, 코워킹 스페이스 목록, 카페 추천 등)
- [x] 도시 상세 페이지 레이아웃 구성:
  - [x] 히어로 이미지 + 도시명 + 지역
  - [x] 핵심 지표 대시보드 (노마드 점수, 인터넷, 안전도, PM2.5, 비용)
  - [x] 상세 설명 섹션
  - [x] 장단점 (Pros/Cons) 리스트
  - [x] 코워킹 스페이스 / 추천 카페 목록 (가짜 데이터)
  - [x] "비슷한 도시" 추천 섹션
- [x] CityCard 컴포넌트를 클릭 가능한 링크로 변환 (`/cities/[slug]`로 이동)
- [x] 도시 상세 페이지에 Navbar, Footer 포함
- [x] 존재하지 않는 slug 접근 시 404 처리 (`notFound()`)
- [x] 뒤로가기 네비게이션 또는 브레드크럼 추가

### 검증/확인 항목

- [x] 홈페이지에서 도시 카드 클릭 시 상세 페이지로 이동하는지 확인
- [x] 모든 도시의 상세 페이지가 올바르게 렌더링되는지 확인
- [x] 상세 페이지의 모든 지표(점수, 배지 등)가 홈 카드와 일치하는지 확인
- [x] 존재하지 않는 slug 접근 시 404 페이지가 표시되는지 확인
- [x] 상세 페이지에서 홈으로 돌아갈 수 있는지 확인
- [x] 모바일에서 상세 페이지 레이아웃이 정상인지 확인
- [x] Navbar, Footer가 상세 페이지에서 정상 렌더링되는지 확인

---

## - [x] Phase 4: 인터랙티브 지도 구현

### 오버뷰

현재 빈 플레이스홀더인 지도 섹션을 실제 인터랙티브 지도로 교체합니다. 지도 위에 도시 마커를 표시하고, 마커 클릭 시 도시 정보를 팝업으로 보여줍니다. 데이터베이스 없이 기존 가짜 데이터의 좌표를 활용합니다.

### 기술 컨텍스트

- **MapViewPlaceholder**: `src/components/sections/map-view-placeholder.tsx` (빈 점선 박스)
- **도시 데이터**: `src/data/cities.ts` — `City` 타입에 `lat`, `lng` 필드 존재 여부 확인 필요
- **홈 페이지**: `src/app/page.tsx`에서 `<MapViewPlaceholder />` 호출 위치 확인
- **추천 라이브러리**: `react-leaflet` (무료, 오픈소스) 또는 `@vis.gl/react-google-maps`
- **스타일**: 다크 테마에 맞는 지도 타일 스타일 필요

### 수정/개선 기능

- [x] 지도 라이브러리 설치 (react-leaflet + leaflet 권장, 무료)
- [x] City 타입 및 데이터에 위도/경도 좌표 추가 (없는 경우)
- [x] MapViewPlaceholder를 실제 지도 컴포넌트로 교체
- [x] 각 도시 위치에 마커 표시
- [x] 마커 클릭/호버 시 도시 요약 팝업 (이름, 노마드 점수, 월 비용)
- [x] 팝업에서 도시 상세 페이지(`/cities/[slug]`)로 이동하는 링크 추가
- [x] 다크 테마에 어울리는 지도 타일 적용 (CartoDB Dark Matter 등)
- [x] 지도 초기 뷰: 한국 전체가 보이는 줌 레벨 + 중심 좌표
- [x] 지도 컴포넌트를 Client Component로 구현 (`"use client"`)
- [ ] 필터와 연동: 필터된 도시만 지도에 마커로 표시 (Phase 2 완료 후)

### 검증/확인 항목

- [x] 지도가 홈페이지에서 정상 렌더링되는지 확인
- [x] 모든 도시에 마커가 올바른 위치에 표시되는지 확인
- [x] 마커 클릭 시 팝업이 도시 정보를 올바르게 표시하는지 확인
- [x] 팝업 내 링크가 도시 상세 페이지로 이동하는지 확인
- [x] 다크 테마 지도 타일이 사이트 디자인과 조화를 이루는지 확인
- [x] 모바일에서 지도 터치 조작(줌, 패닝)이 정상인지 확인
- [x] 지도가 페이지 스크롤을 방해하지 않는지 확인 (스크롤 트랩 방지)
- [x] SSR 환경에서 에러 없이 렌더링되는지 확인 (dynamic import / lazy load)

---

## - [x] Phase 5: 사이드바 콘텐츠 및 뉴스레터 기능 완성

### 오버뷰

사이드바 위젯들의 콘텐츠를 풍성하게 하고, 뉴스레터 이메일 구독 폼에 동작을 추가합니다. 데이터베이스 없이 로컬 스토리지 기반의 가짜 구독 처리와 토스트 피드백을 구현합니다.

### 기술 컨텍스트

- **Sidebar 위젯**: `src/components/sections/sidebar-*.tsx` (meetups, monthly-stay, community, editorial, ad)
- **데이터 파일**: `src/data/meetups.ts`, `monthly-stay.ts`, `community-feed.ts`, `seasonal-picks.ts`
- **EmailSignupForm**: `src/components/shared/email-signup-form.tsx` (현재 `preventDefault()`만)
- **HeroSection**: `src/components/sections/hero-section.tsx` (EmailSignupForm 포함)
- **SidebarEditorial**: `src/components/sections/sidebar-editorial.tsx` (인라인 하드코딩 배열)

### 수정/개선 기능

- [x] 뉴스레터 이메일 폼에 제출 피드백 추가 (성공 토스트/메시지, 로컬 스토리지에 이메일 저장)
- [x] 이메일 유효성 검사 추가 (형식 확인)
- [x] 이미 구독한 이메일 재제출 시 안내 메시지 표시
- [x] SidebarEditorial 데이터를 `src/data/` 파일로 분리
- [x] 사이드바 밋업 데이터 확장 (5~8개 항목)
- [x] 사이드바 월간 숙소 데이터 확장 (5~8개 항목)
- [x] 사이드바 커뮤니티 피드 데이터 확장 (5~8개 항목)
- [x] 사이드바 위젯에 "더보기" 링크 추가 (현재는 3개씩만 표시)
- [x] StickyBottomCta의 CTA 버튼에 유의미한 동작 연결 (스크롤 이동 또는 모달)

### 검증/확인 항목

- [x] 뉴스레터 폼 제출 시 성공 메시지가 표시되는지 확인
- [x] 잘못된 이메일 형식 입력 시 에러가 표시되는지 확인
- [x] 동일 이메일 재제출 시 중복 안내 메시지가 표시되는지 확인
- [x] 사이드바의 모든 위젯이 확장된 데이터를 올바르게 표시하는지 확인
- [x] SidebarEditorial이 외부 데이터 파일에서 데이터를 가져오는지 확인
- [x] "더보기" 링크가 존재하고 의미있는 경로를 가리키는지 확인
- [x] 모바일에서 사이드바가 메인 콘텐츠 아래에 올바르게 배치되는지 확인

---

## - [x] Phase 6: 멤버십/프라이싱 UI 및 프로필 페이지

### 오버뷰

멤버십 CTA 섹션의 "프로 시작하기" 버튼에 가짜 결제 플로우를 연결하고, 로그인한 사용자의 프로필 페이지를 추가합니다. 실제 결제는 구현하지 않고 UI 플로우만 완성합니다.

### 기술 컨텍스트

- **MembershipCta**: `src/components/sections/membership-cta.tsx` (Free/Pro 카드 + 3 후기)
- **Navbar**: `src/components/layout/navbar.tsx` (로그인 시 이메일 표시)
- **인증 상태**: `src/lib/supabase/server.ts`로 서버에서 사용자 정보 접근 가능
- **데이터**: `src/data/testimonials.ts`

### 수정/개선 기능

- [x] `/profile` 페이지 생성 (로그인 필수)
  - [x] 사용자 정보 표시 (이메일, 이름, 가입일)
  - [x] 멤버십 플랜 표시 (Free/Pro — 로컬 스토리지 기반)
  - [x] 프로필 수정 기능 (이름 변경)
  - [x] 로그아웃 버튼
- [x] 멤버십 "프로 시작하기" 버튼 클릭 시 가짜 결제 확인 모달/페이지 표시
- [x] 가짜 결제 완료 시 로컬 스토리지에 Pro 상태 저장 + 성공 메시지
- [x] Navbar에 프로필 드롭다운 메뉴 추가 (프로필, 멤버십, 로그아웃)
- [x] Pro 사용자에게 배지 또는 시각적 구분 표시

### 검증/확인 항목

- [x] `/profile` 페이지가 로그인 사용자에게만 접근 가능한지 확인
- [x] 프로필 페이지에 사용자 정보가 올바르게 표시되는지 확인
- [x] 이름 변경이 정상 동작하는지 확인
- [x] "프로 시작하기" 클릭 시 결제 확인 UI가 표시되는지 확인
- [x] 가짜 결제 후 Pro 상태가 유지되는지 확인 (페이지 새로고침 후에도)
- [x] Navbar 프로필 드롭다운이 정상 작동하는지 확인
- [x] 모바일에서 프로필 페이지 레이아웃이 정상인지 확인
- [x] 비로그인 상태에서 `/profile` 접근 시 로그인 페이지로 리다이렉트되는지 확인

---

## - [ ] Phase 7: 전체 레이아웃 리팩토링 및 접근성 개선

### 오버뷰

현재 홈페이지에 직접 포함된 Navbar/Footer를 Root Layout으로 이동하여 모든 페이지에서 일관되게 사용하도록 리팩토링합니다. 접근성(a11y)을 개선하고, SEO 메타데이터를 추가합니다.

### 기술 컨텍스트

- **Root Layout**: `src/app/layout.tsx` (현재 TooltipProvider만 래핑, Navbar/Footer 없음)
- **홈 페이지**: `src/app/page.tsx` (Navbar, Footer를 직접 포함)
- **Login/Register**: 각각 Navbar만 직접 포함
- **메타데이터**: 현재 기본 Next.js 메타데이터만 설정

### 수정/개선 기능

- [ ] Navbar와 Footer를 Root Layout(`layout.tsx`)으로 이동
- [ ] 각 페이지에서 중복된 Navbar/Footer import 제거
- [ ] 로그인/회원가입 페이지 전용 레이아웃 그룹 생성 (Footer 숨김 등 필요 시)
- [ ] 모든 페이지에 적절한 `<title>`, `description` 메타데이터 추가
- [ ] Open Graph / Twitter Card 메타데이터 추가
- [ ] 시맨틱 HTML 태그 점검 (`<main>`, `<nav>`, `<article>`, `<aside>` 등)
- [ ] 이미지에 의미있는 `alt` 텍스트 추가/개선
- [ ] 키보드 네비게이션 점검 및 `focus-visible` 스타일 확인
- [ ] `aria-label` 추가가 필요한 인터랙티브 요소 점검
- [ ] 색상 대비 확인 (WCAG AA 기준)

### 검증/확인 항목

- [ ] 모든 페이지(홈, 로그인, 회원가입, 도시 상세, 프로필)에서 Navbar가 일관되게 표시되는지 확인
- [ ] 모든 페이지에서 Footer가 일관되게 표시되는지 확인 (예외 페이지 제외)
- [ ] 각 페이지의 `<title>`이 고유하고 적절한지 확인
- [ ] 키보드만으로 주요 기능(네비게이션, 필터, 카드 클릭)에 접근 가능한지 확인
- [ ] 스크린 리더로 주요 콘텐츠를 이해할 수 있는지 확인
- [ ] Lighthouse 접근성 점수 확인 (80점 이상 목표)
- [ ] 기존 기능이 리팩토링 후에도 정상 작동하는지 확인 (회귀 테스트)

---

## Phase 의존성 관계

```
Phase 1 (핵심 UX 수정)
  └── Phase 2 (필터/정렬 + 데이터 확장)
        ├── Phase 3 (도시 상세 페이지)
        │     └── Phase 4 (인터랙티브 지도) ← Phase 2 필터 연동
        └── Phase 5 (사이드바 + 뉴스레터)
              └── Phase 6 (멤버십 + 프로필)
                    └── Phase 7 (레이아웃 리팩토링 + 접근성)
```

> **참고**: Phase 1은 반드시 먼저 완료해야 합니다. Phase 2 이후는 의존성을 고려하되, Phase 3과 Phase 5는 병렬 진행이 가능합니다.
