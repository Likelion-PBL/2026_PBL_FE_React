import PropTypes from "prop-types";

export default function Controls({ totalCount }) {
    return (
      <section className="controls" aria-label="명단 조작">
        <div className="controls-row">
          <button type="button" className="control-btn" id="addLionBtn">
            아기 사자 추가
          </button>
          <button type="button" className="control-btn" id="removeLionBtn">
            마지막 아기 사자 삭제
          </button>
          <p className="lion-count" id="lionCount">
            총 {totalCount}명
          </p>
        </div>
  
        <div className="controls-row controls-row--secondary" aria-label="외부 데이터 불러오기">
          <button type="button" className="control-btn" id="appendOneBtn">
            랜덤 1명 추가
          </button>
          <button type="button" className="control-btn" id="appendFiveBtn">
            랜덤 5명 추가
          </button>
          <button type="button" className="control-btn" id="refreshAllBtn">
            전체 새로고침
          </button>
  
          <p className="fetch-status" id="fetchStatus" role="status" aria-live="polite">
            준비 완료
          </p>
  
          <button type="button" className="control-btn retry-btn" id="retryFetchBtn" hidden>
            재시도
          </button>
        </div>
  
        <div className="controls-row controls-row--secondary" aria-label="보기 옵션">
          <label className="control-label" htmlFor="partFilter">
            파트
          </label>
          <select className="control-input" id="partFilter" defaultValue="ALL">
            <option value="ALL">전체</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
  
          <label className="control-label" htmlFor="sortSelect">
            정렬
          </label>
          <select className="control-input" id="sortSelect" defaultValue="latest">
            <option value="latest">최신추가순</option>
            <option value="name">이름순</option>
          </select>
  
          <label className="control-label" htmlFor="nameSearch">
            검색
          </label>
          <input
            className="control-input"
            id="nameSearch"
            type="search"
            placeholder="이름으로 검색"
            autoComplete="off"
          />
        </div>
      </section>
    );
  }

Controls.propTypes = {
  totalCount: PropTypes.number.isRequired,
};