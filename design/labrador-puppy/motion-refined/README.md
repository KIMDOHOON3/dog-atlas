# 래브라도 — 달리기 관절 보정

기존 `motion-run`의 48프레임 달리기를 보존하고 피부와 털의 변형을 바꾼 수정 4다. 발목의 단차와 접힌 다리의 납작해짐을 줄이는 작업이며 얼굴·모션 타이밍·기본 조형은 같다. `review.html`의 비교 메뉴로 같은 방향·프레임에서 전후를 전환한다.

## 수정

기존 선형 위치 혼합을 Geometry Nodes의 dual quaternion skinning으로 교체했다. 22개 컨트롤러와 기존 가중치를 그대로 사용하고, 메시와 Hair Curves에 동일한 변환을 적용한다. Python 실행 핸들러 없이 저장된 노드와 키프레임으로 재생한다. 알고리즘 참고는 [Kavan 등의 Skinning with Dual Quaternions](https://users.cs.utah.edu/~ladislav/dq/index.html)다.

10·27·35프레임의 실제 Cycles 렌더에서 발목 단차와 접힌 앞다리의 형태를 비교했다. 35프레임 가까운 앞발목의 고정 표면 영역 면적/휴지 자세 면적은 0.586에서 0.943으로 바뀌었다. 이는 표면 면적 진단값이며 체적이나 해부학 정확도 측정이 아니다. 일부 뒷무릎은 여전히 눌리고 뒷발목은 부풀어 보일 수 있다. 모든 관절이 개선됐다는 판정은 하지 않는다.

## 파일과 실행

- `exports/puppy-run-study.blend`: 새 변형 노드, 컨트롤러, 털 포함 Blender 원본. Blender 4.5.9에서 제작했다.
- `textures/`: 기존 4K 맵 4장. 원본과 함께 폴더 구조를 유지한다.
- `frames/side`, `frames/three-quarter`: Cycles·AgX·960×720·24 samples 각 48장.
- `preview-*.webp`: 정상 0.8초/¼ 속도 3.2초 주기의 실제 렌더 미리보기 4종.
- `../puppy-refined-run.zip`: 원본·텍스처·새 프레임·플레이어·검수 기록과 비교용 이전 96프레임. 압축을 풀고 `motion-refined/review.html`을 연다. 정적 모델로 돌아가는 상위 링크는 전체 프로젝트에서만 유효하다.

`.blend` 열기와 키프레임 재생에는 제작 스크립트가 필요 없다. 재생성은 전체 프로젝트와 기존 `motion-run` 원본을 요구한다. Blender의 `--python build_refined.py -- build`로 생성하고 `-- render side`, `-- render three-quarter`로 각 방향을 렌더한다. `package_motion.py`는 Pillow가 있는 Python으로 실행한다.

## 검증 범위

`reports/verification.json`은 재열기 후 1–49프레임의 좌표·루프·접지·텍스처 검사를 기록한다. 몸체/얼굴/털 루프 차이와 비정상 좌표, 누락 텍스처는 0이다. 몸통 상하 폭은 19.95mm, 발바닥/발톱 최저점은 +1.20mm다.

`reports/deformation-comparison.json`은 여섯 자세에서 Blender 노드 결과를 독립 NumPy 계산과 비교한다. 표본 정점 최대 오차는 0.000000047m 미만이며 혼합 회전의 정규화 분모는 0.897 이상이다. 같은 보고서에 고정 관절 영역의 면적 변화를 전후로 기록했다. 전체 자가 교차나 모든 털의 충돌을 검사한 것은 아니다.

플레이어 검사는 JSDOM 기반 프레임 이동·반복·속도·비교 시 프레임 유지·화면 밖 정지와 이미지 경로 검사다. 실제 브라우저 렌더링 검증은 포함하지 않는다.

뒷무릎과 어깨/골반의 기본 조형, 변형용 쿼드 리토폴로지와 프로덕션 뼈 리그, 얼굴·털의 포토리얼 완성도는 남아 있다. 상업용 완성 에셋으로 판정하지 않으며 푸터에는 아직 적용하지 않았다.
