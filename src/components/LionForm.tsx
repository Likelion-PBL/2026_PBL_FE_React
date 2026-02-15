import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Lion, LionFormData, Part } from "../types/lion";

interface FormState {
  name: string;
  part: Part;
  skills: string;
  oneLineIntro: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  oneWord: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  part: "Frontend",
  skills: "",
  oneLineIntro: "",
  description: "",
  email: "",
  phone: "",
  website: "",
  oneWord: "",
};

interface LionFormProps {
  isVisible: boolean;
  isLoading: boolean;
  onSubmit: (formData: LionFormData) => void;
  onCancel: () => void;
  getRandomFormData: () => Promise<Lion>;
  runAction: (actionFn: () => Promise<void>) => Promise<void>;
}

export default function LionForm({
  isVisible,
  isLoading,
  onSubmit,
  onCancel,
  getRandomFormData,
  runAction,
}: LionFormProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape" && isVisible) {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onCancel]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]): void {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function resetForm(): void {
    setFormData(INITIAL_FORM_STATE);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const isFormValid =
      formData.name.trim() &&
      formData.part &&
      formData.skills.trim() &&
      formData.oneLineIntro.trim() &&
      formData.description.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.website.trim() &&
      formData.oneWord.trim();

    if (!isFormValid) return;

    onSubmit(formData);
    resetForm();
  }

  function handleCancel(): void {
    resetForm();
    onCancel();
  }

  async function handleFillRandom(): Promise<void> {
    await runAction(async () => {
      const randomData = await getRandomFormData();
      setFormData({
        name: randomData.name,
        part: randomData.part,
        skills: randomData.skills.join(", "),
        oneLineIntro: randomData.introduction,
        description: randomData.description,
        email: randomData.contacts.email,
        phone: randomData.contacts.phone,
        website: randomData.contacts.website,
        oneWord: randomData.oneWord,
      });
    });
  }

  if (!isVisible) return null;

  return (
    <section className="lion-form-section">
      <form className="lion-form" autoComplete="off" onSubmit={handleSubmit}>
        <FormField
          id="lionName"
          label="이름"
          type="text"
          placeholder="예: 홍아기사자"
          value={formData.name}
          onChange={(value) => updateField("name", value)}
        />

        <FormSelect
          id="lionPart"
          label="파트"
          value={formData.part}
          onChange={(value) => updateField("part", value as Part)}
          options={[
            { value: "Frontend", label: "Frontend" },
            { value: "Backend", label: "Backend" },
            { value: "Design", label: "Design" },
          ]}
        />

        <FormField
          id="lionSkills"
          label="관심 기술 (쉼표로 구분)"
          type="text"
          placeholder="예: JavaScript, React, HTML/CSS"
          value={formData.skills}
          onChange={(value) => updateField("skills", value)}
          fullWidth
        />

        <FormField
          id="lionOneLineIntro"
          label="한 줄 소개 (요약 카드)"
          type="text"
          placeholder="예: 6주차 상태관리 연습 중!"
          value={formData.oneLineIntro}
          onChange={(value) => updateField("oneLineIntro", value)}
          fullWidth
        />

        <FormTextarea
          id="lionDescription"
          label="자기소개 (상세 카드)"
          placeholder="예: useState/useEffect를 학습하며 상태가 UI를 만드는 구조를 연습하고 있습니다."
          value={formData.description}
          onChange={(value) => updateField("description", value)}
        />

        <FormField
          id="lionEmail"
          label="Email"
          type="email"
          placeholder="예: lion@example.com"
          value={formData.email}
          onChange={(value) => updateField("email", value)}
        />

        <FormField
          id="lionPhone"
          label="Phone"
          type="tel"
          placeholder="예: 010-1234-5678"
          value={formData.phone}
          onChange={(value) => updateField("phone", value)}
        />

        <FormField
          id="lionWebsite"
          label="Website"
          type="url"
          placeholder="예: https://example.com"
          value={formData.website}
          onChange={(value) => updateField("website", value)}
          fullWidth
        />

        <FormField
          id="lionOneWord"
          label="한 마디"
          type="text"
          placeholder="예: 상태가 바뀌면 UI도 바뀐다!"
          value={formData.oneWord}
          onChange={(value) => updateField("oneWord", value)}
          fullWidth
        />

        <div className="form-actions">
          <button
            type="button"
            className="control-btn"
            onClick={handleFillRandom}
            disabled={isLoading}
          >
            랜덤 값 채우기
          </button>
          <button type="submit" className="control-btn" disabled={isLoading}>
            추가하기
          </button>
          <button
            type="button"
            className="control-btn"
            onClick={handleCancel}
            disabled={isLoading}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

function FormField({ id, label, type, placeholder, value, onChange, fullWidth }: FormFieldProps) {
  return (
    <div className={`form-row${fullWidth ? " form-row--full" : ""}`}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-input"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

function FormSelect({ id, label, value, onChange, options }: FormSelectProps) {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="form-input"
        id={id}
        name={id}
        required
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function FormTextarea({ id, label, placeholder, value, onChange }: FormTextareaProps) {
  return (
    <div className="form-row form-row--full">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="form-input"
        id={id}
        name={id}
        rows={4}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      />
    </div>
  );
}
