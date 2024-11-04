
import { useState } from "react"

const useForm = (initialState,validationRules) =>{
    const [formState,setFormState] = useState(initialState);
    const [errors,setErrors] = useState({});
    
    const handleChange = (name,value) =>{
        setFormState({...formState,[name]:value});
        validateField(name,value);
        
    }

    const validateField = (name,value) =>{
        const rules = validationRules[name];
        let errorMsg = "";
        if(rules.required && !value){
            errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        else if(rules?.minLength && value.length < rules.minLength){
            errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
        }
        else if(rules?.pattern && !rules.pattern.test(value)){
            errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} is invalid`;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg,
        }));
    }

    const validateForm = () =>{
        const newErrors = {};
        for(const field in validationRules){
            validateField(field,formState[field]);
            if(errors[field]){
                newErrors[field] = errors[field];
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return {
        formState,
        errors,
        handleChange,
        validateForm,
        setFormState,
        setErrors,
    };

    };
export default useForm;