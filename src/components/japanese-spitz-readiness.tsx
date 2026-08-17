"use client";

import { useMemo, useState } from "react";
import { BeginnerGuide } from "./beginner-guide";
import styles from "./japanese-spitz-readiness.module.css";

type Choice = { label: string; detail: string; score: 0 | 2 | 4 };
type Question = {
  category: "주거 환경" | "시간과 활동" | "비용과 돌봄" | "가족과 생활" | "견종 이해";
  prompt: string;
  helper: string;
  critical?: boolean;
  choices: readonly Choice[];
};

const questions: readonly Question[] = [
  { category: "주거 환경", prompt: "현재 거주지에서 반려견을 키울 수 있나요?", helper: "계약서와 관리 규약까지 확인한 상태를 기준으로 답해주세요.", critical: true, choices: [
    { label: "명확히 허용돼요", detail: "계약과 관리 규약을 확인했어요.", score: 4 },
    { label: "확인 중이에요", detail: "허용 여부를 서면으로 다시 확인해야 해요.", score: 2 },
    { label: "허용되지 않아요", detail: "현재 조건에서는 먼저 주거 문제를 해결해야 해요.", score: 0 },
  ] },
  { category: "주거 환경", prompt: "실내에 편안히 쉬고 이동할 공간을 만들 수 있나요?", helper: "집의 크기보다 잠자리와 이동 동선이 안정적인지가 중요해요.", choices: [
    { label: "전용 휴식 공간이 있어요", detail: "사람의 동선과 분리된 조용한 자리를 마련할 수 있어요.", score: 4 },
    { label: "가구 배치를 바꿀 수 있어요", detail: "데려오기 전에 안전한 공간을 만들 계획이에요.", score: 2 },
    { label: "공간 확보가 어려워요", detail: "현재는 방해받지 않는 자리를 만들기 어려워요.", score: 0 },
  ] },
  { category: "주거 환경", prompt: "알림 짖음이 생겼을 때 이웃과 환경을 함께 관리할 수 있나요?", helper: "재패니즈 스피츠는 낯선 소리와 움직임을 알리는 행동이 나타날 수 있어요.", choices: [
    { label: "원인과 환경을 조정할 수 있어요", detail: "차단·휴식·교육을 함께 시도할 수 있어요.", score: 4 },
    { label: "방법을 더 배워야 해요", detail: "민원 가능성과 훈련 방법을 알아보는 중이에요.", score: 2 },
    { label: "짖음은 절대 곤란해요", detail: "조금의 알림 행동도 받아들이기 어려워요.", score: 0 },
  ] },
  { category: "주거 환경", prompt: "더운 날에도 시원하게 쉴 환경을 유지할 수 있나요?", helper: "풍성한 이중모를 가진 개가 실내에서 편안히 쉴 수 있는 환경을 생각해보세요.", choices: [
    { label: "온도와 산책 시간을 조절할 수 있어요", detail: "실내 온도와 한낮 활동을 관리할 수 있어요.", score: 4 },
    { label: "일부 보완이 필요해요", detail: "냉방이나 휴식 공간을 더 준비해야 해요.", score: 2 },
    { label: "꾸준한 관리가 어려워요", detail: "더운 시기에 환경 조절이 쉽지 않아요.", score: 0 },
  ] },
  { category: "시간과 활동", prompt: "매일 돌봄을 책임질 사람이 정해져 있나요?", helper: "산책, 급여, 배변 관리와 상태 확인을 맡을 사람을 기준으로 답해주세요.", critical: true, choices: [
    { label: "주 책임자가 분명해요", detail: "요일과 시간까지 현실적으로 나눠두었어요.", score: 4 },
    { label: "가족과 조율 중이에요", detail: "역할을 구체적으로 정해야 해요.", score: 2 },
    { label: "아직 정하지 않았어요", detail: "누군가 하겠지 하는 상태에 가까워요.", score: 0 },
  ] },
  { category: "시간과 활동", prompt: "평일에 혼자 있는 시간을 어떻게 줄이고 적응시킬 계획인가요?", helper: "사람 곁을 좋아하는 경향과 혼자 쉬는 능력은 별도로 천천히 살펴야 해요.", choices: [
    { label: "점진적인 연습 계획이 있어요", detail: "짧은 시간부터 적응시키고 반응을 기록할 수 있어요.", score: 4 },
    { label: "돌봄 대안을 알아보는 중이에요", detail: "가족·방문 돌봄 등 보완책을 정해야 해요.", score: 2 },
    { label: "대부분 오래 혼자 있어야 해요", detail: "현재 일정에는 별도 대안이 없어요.", score: 0 },
  ] },
  { category: "시간과 활동", prompt: "매일 산책과 냄새 탐색 시간을 낼 수 있나요?", helper: "작아 보인다는 이유로 활동이 거의 필요 없는 개는 아니에요.", critical: true, choices: [
    { label: "매일 일정에 넣을 수 있어요", detail: "날씨와 상태에 맞춰 산책과 탐색을 제공할 수 있어요.", score: 4 },
    { label: "일부 요일은 조정이 필요해요", detail: "바쁜 날의 대안을 준비해야 해요.", score: 2 },
    { label: "규칙적인 활동은 어려워요", detail: "현재 생활에서는 매일 시간을 내기 힘들어요.", score: 0 },
  ] },
  { category: "시간과 활동", prompt: "짧은 훈련과 놀이를 생활에 넣을 수 있나요?", helper: "산책 외에도 학습과 탐색으로 일상에 변화를 주는 시간이 필요해요.", choices: [
    { label: "짧게라도 매일 가능해요", detail: "보상 기반 훈련과 놀이를 반복할 수 있어요.", score: 4 },
    { label: "주 몇 회부터 시작할 수 있어요", detail: "일정에 넣는 연습이 필요해요.", score: 2 },
    { label: "산책 외 시간은 어려워요", detail: "추가 상호작용 시간을 내기 힘들어요.", score: 0 },
  ] },
  { category: "비용과 돌봄", prompt: "사료·예방·정기 진료 비용을 매달 마련할 수 있나요?", helper: "용품 구매보다 매달 반복되는 기본 비용을 먼저 생각해보세요.", choices: [
    { label: "월 예산을 따로 잡았어요", detail: "정기적으로 지출할 범위를 계산했어요.", score: 4 },
    { label: "대략만 생각했어요", detail: "실제 비용을 더 조사해야 해요.", score: 2 },
    { label: "별도 예산이 없어요", detail: "현재 지출에서 감당 가능한지 확인하지 않았어요.", score: 0 },
  ] },
  { category: "비용과 돌봄", prompt: "갑작스러운 검사나 치료비에 대응할 방법이 있나요?", helper: "저축, 보험 또는 가족 지원처럼 실제로 사용할 수 있는 방법을 생각해주세요.", critical: true, choices: [
    { label: "긴급비용 계획이 있어요", detail: "별도 자금이나 보장 수단을 마련했어요.", score: 4 },
    { label: "마련하는 중이에요", detail: "입양 전에 금액과 방식을 확정해야 해요.", score: 2 },
    { label: "대응 방법이 없어요", detail: "갑작스러운 비용을 감당하기 어려워요.", score: 0 },
  ] },
  { category: "비용과 돌봄", prompt: "털갈이 시기의 잦은 빗질과 청소를 감당할 수 있나요?", helper: "풍성한 이중모는 보기 좋은 외형만큼 반복적인 관리가 필요해요.", choices: [
    { label: "일상 관리로 받아들일 수 있어요", detail: "빗질과 청소 시간을 꾸준히 낼 수 있어요.", score: 4 },
    { label: "도구와 방법을 더 배워야 해요", detail: "관리 빈도와 방법을 알아보는 중이에요.", score: 2 },
    { label: "털과 청소가 큰 부담이에요", detail: "반복적인 피모 관리를 지속하기 어려워요.", score: 0 },
  ] },
  { category: "비용과 돌봄", prompt: "아프거나 바쁜 날 대신 돌봐줄 사람이 있나요?", helper: "갑작스러운 야근, 입원, 여행 상황까지 포함해 생각해주세요.", choices: [
    { label: "믿을 수 있는 대안이 있어요", detail: "가족·지인·돌봄 서비스를 실제로 이용할 수 있어요.", score: 4 },
    { label: "후보만 있어요", detail: "가능 여부와 비용을 확인해야 해요.", score: 2 },
    { label: "대안이 없어요", detail: "주 돌봄자가 불가능하면 공백이 생겨요.", score: 0 },
  ] },
  { category: "가족과 생활", prompt: "함께 사는 사람 모두가 반려견 양육에 동의했나요?", helper: "좋아하는 마음뿐 아니라 소음·털·비용·역할 분담까지 이야기했는지 확인해요.", critical: true, choices: [
    { label: "모두 구체적으로 동의했어요", detail: "생활 변화와 역할까지 함께 이야기했어요.", score: 4 },
    { label: "대화가 더 필요해요", detail: "일부 걱정이나 역할 문제가 남아 있어요.", score: 2 },
    { label: "반대하는 사람이 있어요", detail: "먼저 가족의 합의를 해결해야 해요.", score: 0 },
  ] },
  { category: "가족과 생활", prompt: "어린이·고양이·다른 반려동물과의 만남을 천천히 관리할 수 있나요?", helper: "품종명만으로 관계를 예측하지 말고 실제 반응과 안전한 거리를 확인해야 해요.", choices: [
    { label: "분리와 점진적 소개가 가능해요", detail: "각자의 휴식 공간과 감독 계획이 있어요.", score: 4 },
    { label: "방법을 더 배워야 해요", detail: "환경 분리와 소개 순서를 준비해야 해요.", score: 2 },
    { label: "바로 함께 지내야 해요", detail: "분리하거나 천천히 적응시킬 여건이 부족해요.", score: 0 },
  ] },
  { category: "가족과 생활", prompt: "이사·출산·직장 변화가 생겨도 돌봄을 이어갈 계획이 있나요?", helper: "현재 일정뿐 아니라 앞으로 10년 이상 이어질 생활 변화를 떠올려보세요.", choices: [
    { label: "변화별 대안을 생각했어요", detail: "주거와 돌봄 책임을 계속 유지할 방법이 있어요.", score: 4 },
    { label: "큰 변화는 아직 불확실해요", detail: "가능한 상황을 가족과 더 논의해야 해요.", score: 2 },
    { label: "현재만 생각했어요", detail: "장기적인 돌봄 계획은 아직 없어요.", score: 0 },
  ] },
  { category: "가족과 생활", prompt: "가족의 알레르기와 위생 부담을 확인했나요?", helper: "흰 털이나 특정 품종이라는 이유로 알레르기가 없다고 단정할 수 없어요.", choices: [
    { label: "함께 지낼 사람 모두 확인했어요", detail: "필요하면 의료 상담과 실제 접촉도 고려했어요.", score: 4 },
    { label: "확인할 사람이 있어요", detail: "입양 전에 반응과 관리 가능성을 살펴야 해요.", score: 2 },
    { label: "문제가 생기면 생각할게요", detail: "현재는 확인하거나 대비하지 않았어요.", score: 0 },
  ] },
  { category: "견종 이해", prompt: "재패니즈 스피츠의 활동량을 어떻게 예상하나요?", helper: "외형이나 체구만 보고 필요한 활동을 줄여 생각하지 않았는지 확인해요.", choices: [
    { label: "매일 산책과 놀이가 필요해요", detail: "개체 상태에 맞춘 규칙적인 활동을 예상해요.", score: 4 },
    { label: "짧은 산책이면 충분할 것 같아요", detail: "실제 반응에 따라 계획을 보완할 수 있어요.", score: 2 },
    { label: "실내 생활만으로 충분해요", detail: "작은 체구라 활동이 거의 필요 없다고 생각해요.", score: 0 },
  ] },
  { category: "견종 이해", prompt: "알림 짖음이 보이면 어떻게 접근할 건가요?", helper: "행동을 없애는 것보다 자극과 감정, 환경을 함께 살피는 질문이에요.", choices: [
    { label: "원인을 찾고 대체 행동을 알려줄게요", detail: "환경 조정과 보상 기반 교육을 먼저 시도해요.", score: 4 },
    { label: "전문가에게 방법을 배울게요", detail: "혼내지 않는 관리 방법을 찾아볼 수 있어요.", score: 2 },
    { label: "짖을 때마다 강하게 제지할게요", detail: "원인보다 즉시 멈추게 하는 데 집중해요.", score: 0 },
  ] },
  { category: "견종 이해", prompt: "풍성한 털을 짧게 밀면 관리가 쉬워진다고 생각하나요?", helper: "이중모는 외형만이 아니라 피부 상태와 관리 방식까지 함께 살펴야 해요.", choices: [
    { label: "빗질과 피부 확인이 우선이에요", detail: "필요한 관리는 개별 상태와 전문가 조언으로 정해요.", score: 4 },
    { label: "관리 방법을 더 알아볼게요", detail: "임의로 결정하기 전에 정보를 확인해요.", score: 2 },
    { label: "털갈이 때마다 짧게 밀 거예요", detail: "편의를 위해 일괄적으로 미는 것이 좋다고 생각해요.", score: 0 },
  ] },
  { category: "견종 이해", prompt: "견종 설명과 다른 성격을 보이는 개체도 받아들일 수 있나요?", helper: "견종 정보는 일반적인 경향이며 개별 강아지의 행동을 보장하지 않아요.", choices: [
    { label: "개체의 반응을 다시 배울게요", detail: "관찰하고 필요하면 전문가 도움을 받을 수 있어요.", score: 4 },
    { label: "예상과 다르면 당황할 것 같아요", detail: "기대와 현실의 차이를 더 생각해봐야 해요.", score: 2 },
    { label: "설명과 반드시 같아야 해요", detail: "견종 정보가 성격을 보장한다고 생각해요.", score: 0 },
  ] },
];

const categoryAdvice: Record<Question["category"], string> = {
  "주거 환경": "계약·공간·소음 관리 조건을 입양 전에 구체적으로 확인해보세요.",
  "시간과 활동": "매일 가능한 산책·탐색·휴식 연습 시간을 실제 일정표에 넣어보세요.",
  "비용과 돌봄": "월 고정비와 긴급 의료비, 돌봄 공백을 메울 방법을 숫자로 적어보세요.",
  "가족과 생활": "함께 사는 사람과 역할, 장기 변화, 다른 가족 구성원의 안전을 다시 합의해보세요.",
  "견종 이해": "활동·알림 행동·이중모 관리가 개체마다 어떻게 달라질 수 있는지 다시 살펴보세요.",
};

export function JapaneseSpitzReadiness() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(Array(questions.length).fill(undefined));
  const [finished, setFinished] = useState(false);
  const selected = answers[current];

  const result = useMemo(() => {
    const total = answers.reduce<number>((sum, choiceIndex, questionIndex) => {
      if (choiceIndex === undefined) return sum;
      return sum + questions[questionIndex].choices[choiceIndex].score;
    }, 0);
    const score = Math.round(total / (questions.length * 4) * 100);
    const criticalFailures = questions.flatMap((question, index) => {
      const answer = answers[index];
      return question.critical && answer !== undefined && question.choices[answer].score === 0 ? [question.prompt] : [];
    });
    const strengths = questions.flatMap((question, index) => {
      const answer = answers[index];
      return answer !== undefined && question.choices[answer].score === 4 ? [question.prompt] : [];
    }).slice(0, 3);
    const concerns = questions.flatMap((question, index) => {
      const answer = answers[index];
      return answer !== undefined && question.choices[answer].score <= 2 ? [{ category: question.category, text: question.choices[answer].detail }] : [];
    });
    const weakCategories = [...new Set(concerns.map((item) => item.category))].slice(0, 3);
    const level = criticalFailures.length > 0 || score < 70 ? "pause" : score >= 90 ? "ready" : "prepare";
    return { score, criticalFailures, strengths, concerns: concerns.slice(0, 4), weakCategories, level };
  }, [answers]);

  function choose(choiceIndex: number) {
    setAnswers((previous) => previous.map((answer, index) => index === current ? choiceIndex : answer));
  }

  function next() {
    if (selected === undefined) return;
    if (current === questions.length - 1) {
      setFinished(true);
      requestAnimationFrame(() => document.querySelector("#readiness-result")?.scrollIntoView?.({ behavior: "smooth", block: "start" }));
      return;
    }
    setCurrent((value) => value + 1);
  }

  function restart() {
    setAnswers(Array(questions.length).fill(undefined));
    setCurrent(0);
    setFinished(false);
  }

  if (finished) {
    const copy = result.level === "ready"
      ? { label: "기본 준비를 갖춘 단계", title: "기본적인 맞이 준비를 갖춘 것 같아요.", body: "점수는 결정을 대신하지 않아요. 실제로 만날 개체의 반응과 기록을 확인한 뒤 다음 준비를 이어가세요." }
      : result.level === "prepare"
        ? { label: "조금 더 준비할 단계", title: "조금 더 준비하면 현실적인 선택이 될 수 있어요.", body: "보완할 조건을 구체적인 일정과 비용으로 바꾼 뒤 다시 확인해보세요." }
        : { label: "조건을 먼저 해결할 단계", title: "지금은 입양을 결정하기 전에 해결해야 할 조건이 있어요.", body: "재패니즈 스피츠가 맞지 않다는 뜻은 아니에요. 현재 생활에서 바꿔야 할 조건을 먼저 확인해보세요." };
    return (
      <>
        <section className={`${styles.result} ${styles[result.level]}`} id="readiness-result" aria-live="polite">
          <header>
            <div className={styles.score}><strong>{result.score}</strong><span>/ 100</span></div>
            <div><p>{copy.label}</p><h2>{copy.title}</h2><span>{copy.body}</span></div>
          </header>
          {result.criticalFailures.length > 0 && <div className={styles.required}><strong>점수보다 먼저 해결할 필수 조건</strong><ul>{result.criticalFailures.map((item) => <li key={item}>{item}</li>)}</ul></div>}
          <div className={styles.resultGrid}>
            <article><span>잘 준비된 부분</span><ul>{result.strengths.length ? result.strengths.map((item) => <li key={item}>{item}</li>) : <li>아직 확실하게 준비됐다고 답한 항목이 없어요.</li>}</ul></article>
            <article><span>현재 걸리는 조건</span><ul>{result.concerns.length ? result.concerns.map((item, index) => <li key={`${item.text}-${index}`}>{item.text}</li>) : <li>응답에서 큰 걸림 조건은 보이지 않았어요.</li>}</ul></article>
            <article><span>다음 준비 항목</span><ul>{result.weakCategories.length ? result.weakCategories.map((category) => <li key={category}>{categoryAdvice[category]}</li>) : <li>아래 체크리스트로 실제 맞이 준비를 이어가세요.</li>}</ul></article>
          </div>
          <div className={styles.resultActions}>
            <button type="button" className={styles.restart} onClick={restart}>처음부터 다시 답하기</button>
            <a href="#arrival-checklist">맞이 준비 체크리스트로 이어가기 ↓</a>
          </div>
        </section>
        <section className={styles.checklist} id="arrival-checklist" aria-labelledby="arrival-checklist-title">
          <header><p>진단 다음 단계</p><h2 id="arrival-checklist-title">이제 실제 맞이 준비를 차례로 확인해요.</h2><span>진단 결과에서 발견한 조건을 보완하면서, 데려오기 전 필요한 준비를 이어가세요.</span></header>
          <BeginnerGuide slug="japanese-spitz" nameKo="재패니즈 스피츠" />
        </section>
      </>
    );
  }

  const question = questions[current];
  return (
    <section className={styles.assessment} aria-labelledby="readiness-title">
      <header className={styles.intro}>
        <div><p>재패니즈 스피츠 시범 진단</p><h2 id="readiness-title">좋아하는 마음을 현실적인 생활 조건과 함께 확인해요.</h2></div>
        <span>약 5분 · 20문항</span>
      </header>
      <div className={styles.progress}>
        <div><span>{question.category}</span><strong>{current + 1} / {questions.length}</strong></div>
        <div aria-hidden="true"><span style={{ width: `${(current + 1) / questions.length * 100}%` }} /></div>
      </div>
      <div className={styles.questionCard}>
        {question.critical && <span className={styles.critical}>필수 조건</span>}
        <h3>{question.prompt}</h3>
        <p>{question.helper}</p>
        <div className={styles.choices} role="radiogroup" aria-label={question.prompt}>
          {question.choices.map((choice, index) => (
            <button type="button" role="radio" aria-checked={selected === index} onClick={() => choose(index)} key={choice.label}>
              <span aria-hidden="true">{selected === index ? "✓" : String.fromCharCode(65 + index)}</span>
              <span><strong>{choice.label}</strong><small>{choice.detail}</small></span>
            </button>
          ))}
        </div>
      </div>
      <footer className={styles.controls}>
        <button type="button" onClick={() => setCurrent((value) => Math.max(0, value - 1))} disabled={current === 0}>← 이전</button>
        <button type="button" className={styles.next} onClick={next} disabled={selected === undefined}>{current === questions.length - 1 ? "결과 확인하기" : "다음 질문"} →</button>
      </footer>
    </section>
  );
}
