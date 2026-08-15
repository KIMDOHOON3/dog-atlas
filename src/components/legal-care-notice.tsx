import styles from "./legal-care-notice.module.css";

export function LegalCareNotice({ breedName }: { breedName: string }) {
  return (
    <aside className={styles.notice} aria-labelledby="legal-care-title">
      <div>
        <span>대한민국 법령상 맹견</span>
        <h2 id="legal-care-title">{breedName}, 멋보다 먼저 확인할 책임이 있어요.</h2>
        <p>사육허가와 등록·책임보험·중성화, 기질평가와 정기교육, 외출 시 안전장비 등 현재 적용되는 의무를 선택 전에 확인하세요.</p>
      </div>
      <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=1&cnpClsNo=2&csmSeq=1968&menuType=cnpcls&popMenu=ov" target="_blank" rel="noreferrer">공식 기준 확인하기 →</a>
      <small>견종만으로 개별 개의 행동을 단정할 수는 없습니다. 법적 분류와 개체의 성향은 구분해 살펴봐 주세요.</small>
    </aside>
  );
}
