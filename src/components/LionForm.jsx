export default function LionForm() {
    return (
      <section className="lion-form-section" id="lionFormSection" hidden>
        <form className="lion-form" id="lionForm" autoComplete="off">
          <div className="form-row">
            <label className="form-label" htmlFor="lionName">
              이름
            </label>
            <input
              className="form-input"
              id="lionName"
              name="name"
              type="text"
              placeholder="예: 홍아기사자"
              required
            />
          </div>
  
          <div className="form-row">
            <label className="form-label" htmlFor="lionPart">
              파트
            </label>
            <select className="form-input" id="lionPart" name="part" required defaultValue="Frontend">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
          </div>
  
          <div className="form-row form-row--full">
            <label className="form-label" htmlFor="lionSkills">
              관심 기술 (쉼표로 구분)
            </label>
            <input
              className="form-input"
              id="lionSkills"
              name="skills"
              type="text"
              placeholder="예: JavaScript, React, HTML/CSS"
              required
            />
          </div>
  
          <div className="form-row form-row--full">
            <label className="form-label" htmlFor="lionOneLineIntro">
              한 줄 소개 (요약 카드)
            </label>
            <input
              className="form-input"
              id="lionOneLineIntro"
              name="oneLineIntro"
              type="text"
              placeholder="예: 4주차 fetch 연습 중!"
              required
            />
          </div>
  
          <div className="form-row form-row--full">
            <label className="form-label" htmlFor="lionDescription">
              자기소개 (상세 카드)
            </label>
            <textarea
              className="form-input"
              id="lionDescription"
              name="description"
              rows="4"
              placeholder="예: 비동기/데이터 흐름을 학습하며 UI를 다시 그리는 구조를 연습하고 있습니다."
              required
            ></textarea>
          </div>
  
          <div className="form-row">
            <label className="form-label" htmlFor="lionEmail">
              Email
            </label>
            <input
              className="form-input"
              id="lionEmail"
              name="email"
              type="email"
              placeholder="예: lion@example.com"
              required
            />
          </div>
  
          <div className="form-row">
            <label className="form-label" htmlFor="lionPhone">
              Phone
            </label>
            <input
              className="form-input"
              id="lionPhone"
              name="phone"
              type="tel"
              placeholder="예: 010-1234-5678"
              required
            />
          </div>
  
          <div className="form-row form-row--full">
            <label className="form-label" htmlFor="lionWebsite">
              Website
            </label>
            <input
              className="form-input"
              id="lionWebsite"
              name="website"
              type="url"
              placeholder="예: https://example.com"
              required
            />
          </div>
  
          <div className="form-row form-row--full">
            <label className="form-label" htmlFor="lionOneWord">
              한 마디
            </label>
            <input
              className="form-input"
              id="lionOneWord"
              name="oneWord"
              type="text"
              placeholder="예: 데이터가 바뀌면 UI도 바뀐다!"
              required
            />
          </div>
  
          <div className="form-actions">
            <button type="button" className="control-btn" id="fillRandomBtn">
              랜덤 값 채우기
            </button>
  
            <button type="submit" className="control-btn">
              추가하기
            </button>
            <button type="button" className="control-btn" id="cancelLionFormBtn">
              취소
            </button>
          </div>
        </form>
      </section>
    );
  }
  