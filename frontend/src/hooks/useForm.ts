

import { useState } from "react";

type ValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

type Errors<T> = {
  [K in keyof T]?: string;
} & {
  submit?: string;
};

function useForm<T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules<T>
) {
  const [formState, setFormState] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors<T>>({});

//   const handleChange = (name: keyof T, value: any) => {
//     setFormState((prev) => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };


// Type-safe handler for file input changes
const handleFileChange = (name: string, file: File | null) => {
  setFormState((prev) => ({
    ...prev,
    [name]: file,
  }));
};



  const handleChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name as keyof T, value);
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormState((prev) => ({
    ...prev,
    [name]: value,
  }));
  validateField(name as keyof typeof formState, value);
};


  const validateField = (name: keyof T, value: any) => {
    const rules = validationRules[name];
    let errorMsg = "";

    if (rules) {
      if (rules.required && !value) {
        errorMsg = `${capitalize(String(name))} is required`;
      } else if (rules.minLength && value.length < rules.minLength) {
        errorMsg = `${capitalize(String(name))} must be at least ${rules.minLength} characters`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        errorMsg = `${capitalize(String(name))} is invalid`;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const validateForm = () => {
    let newErrors: Errors<T> = {};

    for (const field in validationRules) {
      const fieldName = field as keyof T;
      const value = formState[fieldName];
      validateField(fieldName, value);
      if (errors[fieldName]) {
        newErrors[fieldName] = errors[fieldName];
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => !msg);
  };

  // Helper function
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return {
    formState,
    errors,
    handleChange,
    handleSelectChange,
    handleFileChange,
    validateForm,
    setFormState,
    setErrors,
  };
}

export default useForm;
