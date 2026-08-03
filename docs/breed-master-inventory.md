# 견종 마스터 인벤토리 160종

- 문서 상태: 카탈로그 확장을 위한 편집 초안
- 기준일: 2026-08-03
- 범위: FCI 10개 그룹을 기반으로, 한국 사용자가 검색하거나 접할 가능성이 있는 견종을 우선 선정한 160종 후보군
- 용도: 검색·발견·관심 견종 담기를 위한 얇은 마스터 데이터. 건강·행동·사육 정보가 검수된 상세 페이지 데이터가 아니다.

## 먼저 적용할 규칙

1. `registryStatus` 중 `non-fci`는 “FCI가 인정하지 않는다”는 뜻일 뿐, 다른 단체의 인정 여부나 견종의 가치를 판단하는 표현이 아니다.
2. FCI가 한 견종 안의 바라이어티로 분류하는 벨지언 셰퍼드, 닥스훈트, 저먼 스피츠, 푸들은 원칙적으로 한 행으로 유지한다. 서비스 검색에서는 포메라니안·말리노이즈·토이 푸들 같은 통용명을 별칭으로 연결한다.
3. 한글명은 FCI 공식 번역이 아니라 국내 통용명을 우선한 편집 라벨이다. `ko-name-review`는 희귀 견종의 표기를 국내 견종 단체·수의 자료로 추가 확인해야 함을 뜻한다.
4. `detailPriority`는 서비스 편집 순서를 기록한 코호트이며 견종의 우열이 아니다. `core`는 최초 상세 5종, `next`는 2026-08-03에 추가한 상세 15종, `later`는 목록·검색 우선 후보다.
5. 인정 상태는 바뀐다. 발행 직전에 FCI 노멘클레이처에서 다시 확인한다.

## 현황 요약

| 구분 | 개수 |
|---|---:|
| FCI definitive | 154 |
| FCI provisional | 4 |
| non-FCI | 2 |
| 전체 | 160 |

| 상세 제작 단계 | 개수 | 의미 |
|---|---:|---|
| core | 5 | 최초 상세 콘텐츠로 제작한 견종 |
| next | 15 | 초기 20종 확장에서 상세 콘텐츠를 추가한 견종 |
| later | 140 | 우선 검색·발견용 마스터에만 포함할 견종 |

| FCI 그룹 | 편집 라벨 | 개수 |
|---:|---|---:|
| 1 | 목양견·목축견 | 20 |
| 2 | 핀셔·슈나우저·몰로서·스위스 마운틴독 | 23 |
| 3 | 테리어 | 18 |
| 4 | 닥스훈트 | 1 |
| 5 | 스피츠·원시형 | 27 |
| 6 | 후각 하운드·관련견 | 12 |
| 7 | 포인팅독 | 11 |
| 8 | 리트리버·플러싱독·워터독 | 16 |
| 9 | 반려견·토이독 | 20 |
| 10 | 시각 하운드 | 10 |
| null | FCI 미인정 후보 | 2 |

## 마스터 인벤토리

`verification` 값이 `verified-fci`면 영문명·그룹·인정 상태를 FCI 목록에서 확인했다는 뜻이다. `ko-name-review`가 붙은 행은 한글 표기를 발행 전 추가 검수한다.

| slug | nameKo | nameEn | fciGroupNo | registryStatus | detailPriority | verification |
|---|---|---|---:|---|---|---|
| australian-kelpie | 오스트레일리안 켈피 | Australian Kelpie | 1 | definitive | later | verified-fci |
| belgian-shepherd-dog | 벨지안 셰퍼드 독 | Belgian Shepherd Dog | 1 | definitive | later | verified-fci; FCI-varieties |
| czechoslovakian-wolfdog | 체코슬로바키안 울프독 | Czechoslovakian Wolfdog | 1 | definitive | later | verified-fci; ko-name-review |
| beauceron | 보세론 | Beauce Sheepdog | 1 | definitive | later | verified-fci; ko-name-review |
| briard | 브리아드 | Briard | 1 | definitive | later | verified-fci |
| german-shepherd-dog | 저먼 셰퍼드 독 | German Shepherd Dog | 1 | definitive | next | verified-fci |
| bearded-collie | 비어디드 콜리 | Bearded Collie | 1 | definitive | later | verified-fci |
| border-collie | 보더콜리 | Border Collie | 1 | definitive | core | verified-fci |
| collie-rough | 러프 콜리 | Collie Rough | 1 | definitive | later | verified-fci |
| old-english-sheepdog | 올드 잉글리시 시프독 | Old English Sheepdog | 1 | definitive | later | verified-fci |
| shetland-sheepdog | 셔틀랜드 시프독 | Shetland Sheepdog | 1 | definitive | later | verified-fci |
| puli | 풀리 | Puli | 1 | definitive | later | verified-fci |
| white-swiss-shepherd-dog | 화이트 스위스 셰퍼드 독 | White Swiss Shepherd Dog | 1 | definitive | later | verified-fci |
| dutch-shepherd-dog | 더치 셰퍼드 독 | Dutch Shepherd Dog | 1 | definitive | later | verified-fci |
| australian-shepherd | 오스트레일리안 셰퍼드 | Australian Shepherd | 1 | definitive | later | verified-fci |
| australian-cattle-dog | 오스트레일리안 캐틀 독 | Australian Cattle Dog | 1 | definitive | later | verified-fci |
| bouvier-des-flandres | 부비에 데 플랑드르 | Bouvier des Flandres | 1 | definitive | later | verified-fci; ko-name-review |
| welsh-corgi-cardigan | 웰시 코기 카디건 | Welsh Corgi (Cardigan) | 1 | definitive | later | verified-fci |
| welsh-corgi-pembroke | 웰시 코기 펨브로크 | Welsh Corgi (Pembroke) | 1 | definitive | later | verified-fci |
| miniature-american-shepherd | 미니어처 아메리칸 셰퍼드 | Miniature American Shepherd | 1 | provisional | later | verified-fci |
| dobermann | 도베르만 | Dobermann | 2 | definitive | later | verified-fci |
| miniature-pinscher | 미니어처 핀셔 | Miniature Pinscher | 2 | definitive | later | verified-fci |
| giant-schnauzer | 자이언트 슈나우저 | Giant Schnauzer | 2 | definitive | later | verified-fci |
| schnauzer | 스탠더드 슈나우저 | Schnauzer | 2 | definitive | later | verified-fci |
| miniature-schnauzer | 미니어처 슈나우저 | Miniature Schnauzer | 2 | definitive | later | verified-fci |
| shar-pei | 샤페이 | Shar Pei | 2 | definitive | later | verified-fci |
| dogo-argentino | 도고 아르헨티노 | Dogo Argentino | 2 | definitive | later | verified-fci |
| dogue-de-bordeaux | 도그 드 보르도 | Dogue de Bordeaux | 2 | definitive | later | verified-fci; ko-name-review |
| boxer | 복서 | Boxer | 2 | definitive | later | verified-fci |
| great-dane | 그레이트 덴 | Great Dane | 2 | definitive | later | verified-fci |
| rottweiler | 롯트와일러 | Rottweiler | 2 | definitive | later | verified-fci |
| bulldog | 불독 | Bulldog | 2 | definitive | later | verified-fci |
| bullmastiff | 불마스티프 | Bullmastiff | 2 | definitive | later | verified-fci |
| mastiff | 마스티프 | Mastiff | 2 | definitive | later | verified-fci |
| cane-corso | 카네 코르소 | Italian Cane Corso | 2 | definitive | later | verified-fci |
| neapolitan-mastiff | 네아폴리탄 마스티프 | Neapolitan Mastiff | 2 | definitive | later | verified-fci |
| newfoundland | 뉴펀랜드 | Newfoundland | 2 | definitive | later | verified-fci |
| leonberger | 레온베르거 | Leonberger | 2 | definitive | later | verified-fci |
| pyrenean-mountain-dog | 그레이트 피레니즈 | Pyrenean Mountain Dog | 2 | definitive | next | verified-fci |
| saint-bernard | 세인트 버나드 | St. Bernard | 2 | definitive | later | verified-fci |
| tibetan-mastiff | 티베탄 마스티프 | Tibetan Mastiff | 2 | definitive | later | verified-fci |
| bernese-mountain-dog | 버니즈 마운틴 독 | Bernese Mountain Dog | 2 | definitive | later | verified-fci |
| continental-bulldog | 컨티넨탈 불독 | Continental Bulldog | 2 | provisional | later | verified-fci; ko-name-review |
| airedale-terrier | 에어데일 테리어 | Airedale Terrier | 3 | definitive | later | verified-fci |
| border-terrier | 보더 테리어 | Border Terrier | 3 | definitive | later | verified-fci |
| smooth-fox-terrier | 스무드 폭스 테리어 | Fox Terrier (Smooth) | 3 | definitive | later | verified-fci |
| wire-fox-terrier | 와이어 폭스 테리어 | Fox Terrier (Wire) | 3 | definitive | later | verified-fci |
| soft-coated-wheaten-terrier | 소프트 코티드 휘튼 테리어 | Irish Soft Coated Wheaten Terrier | 3 | definitive | later | verified-fci |
| kerry-blue-terrier | 케리 블루 테리어 | Kerry Blue Terrier | 3 | definitive | later | verified-fci |
| cairn-terrier | 케언 테리어 | Cairn Terrier | 3 | definitive | later | verified-fci |
| jack-russell-terrier | 잭 러셀 테리어 | Jack Russell Terrier | 3 | definitive | later | verified-fci |
| norfolk-terrier | 노퍽 테리어 | Norfolk Terrier | 3 | definitive | later | verified-fci |
| norwich-terrier | 노리치 테리어 | Norwich Terrier | 3 | definitive | later | verified-fci |
| scottish-terrier | 스코티시 테리어 | Scottish Terrier | 3 | definitive | later | verified-fci |
| west-highland-white-terrier | 웨스트 하이랜드 화이트 테리어 | West Highland White Terrier | 3 | definitive | later | verified-fci |
| bull-terrier | 불테리어 | Bull Terrier | 3 | definitive | later | verified-fci |
| miniature-bull-terrier | 미니어처 불테리어 | Miniature Bull Terrier | 3 | definitive | later | verified-fci |
| staffordshire-bull-terrier | 스태포드셔 불테리어 | Staffordshire Bull Terrier | 3 | definitive | later | verified-fci |
| american-staffordshire-terrier | 아메리칸 스태포드셔 테리어 | American Staffordshire Terrier | 3 | definitive | later | verified-fci |
| australian-silky-terrier | 오스트레일리안 실키 테리어 | Australian Silky Terrier | 3 | definitive | later | verified-fci |
| yorkshire-terrier | 요크셔 테리어 | Yorkshire Terrier | 3 | definitive | later | verified-fci |
| dachshund | 닥스훈트 | Dachshund | 4 | definitive | next | verified-fci; FCI-varieties |
| samoyed | 사모예드 | Samoyed | 5 | definitive | core | verified-fci |
| alaskan-malamute | 알래스칸 말라뮤트 | Alaskan Malamute | 5 | definitive | later | verified-fci |
| siberian-husky | 시베리안 허스키 | Siberian Husky | 5 | definitive | next | verified-fci |
| finnish-spitz | 핀니시 스피츠 | Finnish Spitz | 5 | definitive | later | verified-fci |
| karelian-bear-dog | 카렐리안 베어 독 | Karelian Bear Dog | 5 | definitive | later | verified-fci |
| norwegian-elkhound-grey | 노르웨이지안 엘크하운드 그레이 | Norwegian Elkhound Grey | 5 | definitive | later | verified-fci; ko-name-review |
| norwegian-lundehund | 노르웨이지안 룬데훈트 | Norwegian Lundehund | 5 | definitive | later | verified-fci; ko-name-review |
| finnish-lapponian-dog | 핀니시 라포니안 독 | Finnish Lapponian Dog | 5 | definitive | later | verified-fci; ko-name-review |
| icelandic-sheepdog | 아이슬란딕 시프독 | Icelandic Sheepdog | 5 | definitive | later | verified-fci |
| swedish-vallhund | 스웨디시 발훈트 | Swedish Vallhund | 5 | definitive | later | verified-fci; ko-name-review |
| german-spitz | 저먼 스피츠 | German Spitz | 5 | definitive | later | verified-fci; FCI-varieties |
| italian-volpino | 볼피노 이탈리아노 | Italian Volpino | 5 | definitive | later | verified-fci; ko-name-review |
| chow-chow | 차우차우 | Chow Chow | 5 | definitive | later | verified-fci |
| eurasier | 유라시어 | Eurasian | 5 | definitive | later | verified-fci; ko-name-review |
| akita | 아키타 | Akita | 5 | definitive | later | verified-fci |
| american-akita | 아메리칸 아키타 | American Akita | 5 | definitive | later | verified-fci |
| hokkaido | 홋카이도견 | Hokkaido | 5 | definitive | later | verified-fci |
| japanese-spitz | 재패니즈 스피츠 | Japanese Spitz | 5 | definitive | core | verified-fci |
| kai | 카이견 | Kai | 5 | definitive | later | verified-fci |
| kishu | 키슈견 | Kishu | 5 | definitive | later | verified-fci |
| shiba | 시바견 | Shiba | 5 | definitive | later | verified-fci |
| shikoku | 시코쿠견 | Shikoku | 5 | definitive | later | verified-fci |
| korea-jindo-dog | 진돗개 | Korea Jindo Dog | 5 | definitive | next | verified-fci |
| basenji | 바센지 | Basenji | 5 | definitive | next | verified-fci |
| canaan-dog | 카나안 독 | Canaan Dog | 5 | definitive | later | verified-fci |
| xoloitzcuintle | 숄로이츠퀸틀레 | Xoloitzcuintle | 5 | definitive | later | verified-fci; ko-name-review |
| yakutian-laika | 야쿠티안 라이카 | Yakutian Laika | 5 | provisional | later | verified-fci; ko-name-review |
| bloodhound | 블러드하운드 | Bloodhound | 6 | definitive | later | verified-fci |
| basset-hound | 바셋 하운드 | Basset Hound | 6 | definitive | later | verified-fci |
| beagle | 비글 | Beagle | 6 | definitive | next | verified-fci |
| harrier | 해리어 | Harrier | 6 | definitive | later | verified-fci |
| english-foxhound | 잉글리시 폭스하운드 | English Foxhound | 6 | definitive | later | verified-fci |
| otterhound | 오터하운드 | Otterhound | 6 | definitive | later | verified-fci |
| petit-basset-griffon-vendeen | 페티 바셋 그리폰 방데앙 | Petit Basset Griffon Vendeen | 6 | definitive | later | verified-fci; ko-name-review |
| finnish-hound | 핀니시 하운드 | Finnish Hound | 6 | definitive | later | verified-fci |
| alpine-dachsbracke | 알파인 닥스브라케 | Alpine Dachsbracke | 6 | definitive | later | verified-fci; ko-name-review |
| bavarian-mountain-scent-hound | 바바리안 마운틴 센트 하운드 | Bavarian Mountain Scent Hound | 6 | definitive | later | verified-fci |
| dalmatian | 달마시안 | Dalmatian | 6 | definitive | later | verified-fci |
| rhodesian-ridgeback | 로디지안 리지백 | Rhodesian Ridgeback | 6 | definitive | later | verified-fci |
| german-short-haired-pointing-dog | 저먼 쇼트헤어드 포인터 | German Short-Haired Pointing Dog | 7 | definitive | later | verified-fci |
| german-wire-haired-pointing-dog | 저먼 와이어헤어드 포인터 | German Wire-Haired Pointing Dog | 7 | definitive | later | verified-fci |
| weimaraner | 와이머라너 | Weimaraner | 7 | definitive | later | verified-fci |
| vizsla | 비즐라 | Hungarian Short-Haired Pointer (Vizsla) | 7 | definitive | later | verified-fci |
| italian-pointing-dog | 브라코 이탈리아노 | Italian Pointing Dog | 7 | definitive | later | verified-fci; ko-name-review |
| brittany-spaniel | 브리트니 스패니얼 | Brittany Spaniel | 7 | definitive | later | verified-fci |
| small-munsterlander | 스몰 문스터랜더 | Kleiner Münsterländer | 7 | definitive | later | verified-fci; ko-name-review |
| wire-haired-pointing-griffon-korthals | 와이어헤어드 포인팅 그리폰 코르탈스 | Wire-Haired Pointing Griffon Korthals | 7 | definitive | later | verified-fci; ko-name-review |
| english-pointer | 잉글리시 포인터 | English Pointer | 7 | definitive | later | verified-fci |
| english-setter | 잉글리시 세터 | English Setter | 7 | definitive | later | verified-fci |
| irish-red-setter | 아이리시 레드 세터 | Irish Red Setter | 7 | definitive | later | verified-fci |
| nova-scotia-duck-tolling-retriever | 노바 스코샤 덕 톨링 리트리버 | Nova Scotia Duck Tolling Retriever | 8 | definitive | later | verified-fci |
| curly-coated-retriever | 커리 코티드 리트리버 | Curly Coated Retriever | 8 | definitive | later | verified-fci |
| flat-coated-retriever | 플랫 코티드 리트리버 | Flat Coated Retriever | 8 | definitive | later | verified-fci |
| golden-retriever | 골든 리트리버 | Golden Retriever | 8 | definitive | next | verified-fci |
| labrador-retriever | 래브라도 리트리버 | Labrador Retriever | 8 | definitive | next | verified-fci |
| chesapeake-bay-retriever | 체서피크 베이 리트리버 | Chesapeake Bay Retriever | 8 | definitive | later | verified-fci |
| clumber-spaniel | 클럼버 스패니얼 | Clumber Spaniel | 8 | definitive | later | verified-fci |
| english-cocker-spaniel | 잉글리시 코커 스패니얼 | English Cocker Spaniel | 8 | definitive | next | verified-fci |
| english-springer-spaniel | 잉글리시 스프링거 스패니얼 | English Springer Spaniel | 8 | definitive | later | verified-fci |
| american-cocker-spaniel | 아메리칸 코커 스패니얼 | American Cocker Spaniel | 8 | definitive | later | verified-fci |
| barbet | 바베 | French Water Dog | 8 | definitive | later | verified-fci; ko-name-review |
| irish-water-spaniel | 아이리시 워터 스패니얼 | Irish Water Spaniel | 8 | definitive | later | verified-fci |
| lagotto-romagnolo | 라고토 로마뇰로 | Romagna Water Dog | 8 | definitive | later | verified-fci |
| portuguese-water-dog | 포르투갈 워터 독 | Portuguese Water Dog | 8 | definitive | later | verified-fci |
| spanish-water-dog | 스페니시 워터 독 | Spanish Water Dog | 8 | definitive | later | verified-fci |
| american-water-spaniel | 아메리칸 워터 스패니얼 | American Water Spaniel | 8 | definitive | later | verified-fci |
| bichon-frise | 비숑 프리제 | Bichon Frise | 9 | definitive | later | verified-fci |
| maltese | 몰티즈 | Maltese | 9 | definitive | core | verified-fci |
| havanese | 하바니즈 | Havanese | 9 | definitive | later | verified-fci |
| bolognese | 볼로네즈 | Bolognese | 9 | definitive | later | verified-fci |
| coton-de-tulear | 코톤 드 툴레아르 | Coton de Tulear | 9 | definitive | later | verified-fci |
| poodle | 푸들 | Poodle | 9 | definitive | next | verified-fci; FCI-varieties |
| chinese-crested-dog | 차이니즈 크레스티드 독 | Chinese Crested Dog | 9 | definitive | later | verified-fci |
| lhasa-apso | 라사압소 | Lhasa Apso | 9 | definitive | later | verified-fci |
| shih-tzu | 시추 | Shih Tzu | 9 | definitive | next | verified-fci |
| tibetan-spaniel | 티베탄 스패니얼 | Tibetan Spaniel | 9 | definitive | later | verified-fci |
| tibetan-terrier | 티베탄 테리어 | Tibetan Terrier | 9 | definitive | later | verified-fci |
| chihuahua | 치와와 | Chihuahua | 9 | definitive | next | verified-fci |
| cavalier-king-charles-spaniel | 캐벌리어 킹 찰스 스패니얼 | Cavalier King Charles Spaniel | 9 | definitive | later | verified-fci |
| pekingese | 페키니즈 | Pekingese | 9 | definitive | later | verified-fci |
| japanese-chin | 재패니즈 친 | Japanese Chin | 9 | definitive | later | verified-fci |
| continental-toy-spaniel | 파피용 | Continental Toy Spaniel | 9 | definitive | later | verified-fci; FCI-varieties |
| pug | 퍼그 | Pug | 9 | definitive | later | verified-fci |
| french-bulldog | 프렌치 불독 | French Bulldog | 9 | definitive | next | verified-fci |
| boston-terrier | 보스턴 테리어 | Boston Terrier | 9 | definitive | later | verified-fci |
| prague-ratter | 프라하 라터 | Prague Ratter | 9 | provisional | later | verified-fci; ko-name-review |
| afghan-hound | 아프간 하운드 | Afghan Hound | 10 | definitive | later | verified-fci |
| saluki | 살루키 | Saluki | 10 | definitive | later | verified-fci |
| borzoi | 보르조이 | Borzoi - Russian Hunting Sighthound | 10 | definitive | later | verified-fci |
| irish-wolfhound | 아이리시 울프하운드 | Irish Wolfhound | 10 | definitive | later | verified-fci |
| greyhound | 그레이하운드 | Greyhound | 10 | definitive | core | verified-fci |
| whippet | 휘펫 | Whippet | 10 | definitive | next | verified-fci |
| italian-sighthound | 이탈리안 그레이하운드 | Italian Sighthound | 10 | definitive | later | verified-fci |
| azawakh | 아자와크 | Azawakh | 10 | definitive | later | verified-fci; ko-name-review |
| sloughi | 슬루기 | Sloughi | 10 | definitive | later | verified-fci; ko-name-review |
| galgo-espanol | 스페니시 그레이하운드 | Spanish Greyhound | 10 | definitive | later | verified-fci |
| american-pit-bull-terrier | 아메리칸 핏불 테리어 | American Pit Bull Terrier | null | non-fci | later | verification-needed; not in FCI nomenclature |
| american-bully | 아메리칸 불리 | American Bully | null | non-fci | later | verification-needed; not in FCI nomenclature |

## 검색 별칭 후보

표의 `nameKo`는 표시용 기본값이다. 다음은 같은 견종으로 찾아야 할 국내 표기·음역·FCI 바라이어티 별칭 후보다. 이후 TypeScript로 옮길 때 `aliasesKo: string[]`로 분리한다.

| slug | aliasesKoCandidate |
|---|---|
| german-shepherd-dog | 저먼 세퍼드, 저먼 셰퍼드, 독일 셰퍼드 |
| old-english-sheepdog | 올드 잉글리시 쉽독, 올드 잉글리쉬 쉽독 |
| shetland-sheepdog | 셰틀랜드 쉽독, 셔틀랜드 쉽독, 셸티, 쉘티 |
| belgian-shepherd-dog | 벨지안 셰퍼드, 말리노이즈, 말리누아, 그로넨달, 테르뷰런, 라케노이즈 |
| miniature-pinscher | 미니핀 |
| west-highland-white-terrier | 웨스티 |
| yorkshire-terrier | 요키, 요크셔 |
| german-spitz | 포메라니안, 포메라니언, 포메, 키스혼드, 울프스피츠 |
| dachshund | 미니어처 닥스훈트, 카니헨 닥스훈트, 장모 닥스훈트, 단모 닥스훈트, 와이어 닥스훈트 |
| poodle | 푸들, 스탠더드 푸들, 미디엄 푸들, 미니어처 푸들, 토이 푸들 |
| korea-jindo-dog | 진도개, 진도견, 코리아 진도 독 |
| xoloitzcuintle | 솔로이츠퀸틀리, 숄로이츠퀸틀리 |
| labrador-retriever | 라브라도 리트리버, 래브라도, 라브라도, 랩 |
| bichon-frise | 비숑, 비숑프리제 |
| maltese | 말티즈 |
| pyrenean-mountain-dog | 그레이트 피레니즈, 피레니안 마운틴독 |
| continental-toy-spaniel | 파피용, 빠삐용, 파렌, 파렌느 |
| italian-sighthound | 이탈리안 그레이하운드, 이탈리언 그레이하운드, 이태리 그레이하운드, 이탈리언 사이트하운드, IG |
| whippet | 휘핏 |

## 공식 출처

- FCI 전체 노멘클레이처·인정 상태: https://www.fci.be/en/Nomenclature/Default.aspx
- FCI 잠정 인정 견종: https://www.fci.be/en/nomenclature/provisoire.aspx
- FCI Group 1: https://www.fci.be/en/nomenclature/1-Sheepdogs-and-Cattledogs-except-Swiss-Cattledogs.html
- FCI Group 2: https://www.fci.be/en/nomenclature/2-Pinscher-and-Schnauzer-Molossoid-and-Swiss-Mountain-and-Cattledogs.html
- FCI Group 3: https://www.fci.be/en/nomenclature/3-Terriers.html
- FCI Group 4: https://www.fci.be/en/nomenclature/4-Dachshunds.html
- FCI Group 5: https://www.fci.be/en/nomenclature/5-Spitz-and-primitive-types.html
- FCI Group 6: https://www.fci.be/en/nomenclature/6-Scent-hounds-and-related-breeds.html
- FCI Group 7: https://www.fci.be/en/nomenclature/7-Pointing-Dogs.html
- FCI Group 8: https://www.fci.be/en/nomenclature/8-Retrievers-Flushing-Dogs-Water-Dogs.html
- FCI Group 9: https://www.fci.be/en/nomenclature/9-Companion-and-Toy-Dogs.html
- FCI Group 10: https://www.fci.be/en/nomenclature/10-Sighthounds.html
- UKC American Pit Bull Terrier 표준: https://www.ukcdogs.com/american-pit-bull-terrier
- UKC American Bully 표준: https://www.ukcdogs.com/american-bully
- 한국애견연맹(KKF) 국내 통용 표기 보조 근거, Group 1~10: `https://www.thekkf.or.kr/new_home/03_kkf_service/03_approval_2.php?gid={1..10}`

## 정확도 및 발행 주의사항

- 이 목록은 FCI 전체 인정 견종의 완전한 복제본이 아니라, 국내 서비스 발견 가치를 고려해 선별한 편집 인벤토리다.
- 공식 영문명은 FCI 페이지의 영문 명칭 또는 영문 병기명을 우선했다. 원어명만 있는 경우는 원어명을 유지했다.
- 주요 표준 조회 페이지의 그룹·인정 상태는 확인했지만, 한글 통용명은 국내 공식 표준이 아니다. `ko-name-review`는 출판 전 필수 검수 항목이다.
- 크기·활동량·독립성·사회성·털 관리·건강 위험을 이 표에서 의도적으로 뺀다. 이 값들은 견종 표준, 수의 자료, 행동학 자료를 분리해 검수한 뒤에만 추가한다.
- `non-fci` 2종은 국내 검색 유입을 놓치지 않기 위한 후보다. 발행 시 다른 등록 단체의 정의·표준과 FCI 미인정 사실을 따로 명시한다.
