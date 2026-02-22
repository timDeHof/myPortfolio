import { m } from "framer-motion";
import { AlertCircle, CheckCircle, Send } from "lucide-react";
import React, { useReducer } from "react";

import type { ContactForm as ContactFormData } from "../../types";
import type { ValidationErrors } from "../../utils/validation";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { sendEmail } from "../../services/email-service";
import { validateContactForm } from "../../utils/validation";

type State = {
  formData: ContactFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  submitMessage: string;
};

type Action =
  | { type: "SET_FIELD"; name: string; value: string }
  | { type: "SET_ERRORS"; errors: ValidationErrors }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; message: string }
  | { type: "SUBMIT_ERROR"; message: string }
  | { type: "RESET" };

const initialState: State = {
  formData: { name: "", email: "", message: "" },
  errors: {},
  isSubmitting: false,
  submitStatus: "idle",
  submitMessage: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: "" },
        submitStatus: state.submitStatus !== "idle" ? "idle" : state.submitStatus,
        submitMessage: state.submitStatus !== "idle" ? "" : state.submitMessage,
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, submitStatus: "idle" };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        submitStatus: "success",
        submitMessage: action.message,
        formData: { name: "", email: "", message: "" },
        errors: {},
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        submitStatus: "error",
        submitMessage: action.message,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const ContactForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors, isSubmitting, submitStatus, submitMessage } = state;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", name, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: validationErrors });
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });

      dispatch({
        type: "SUBMIT_SUCCESS",
        message: "Thank you for your message! I'll get back to you within 24 hours.",
      });
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

      if (errorMessage.includes("access key not configured")) {
        dispatch({
          type: "SUBMIT_ERROR",
          message: "Contact form is not configured yet. Please reach out directly at tim@timdehof.dev",
        });
      } else {
        dispatch({
          type: "SUBMIT_ERROR",
          message: "Sorry, there was an error sending your message. Please try again or contact me directly at tim@timdehof.dev",
        });
      }
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="shadow-lg bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Send me a message
          </h2>

          {submitStatus !== "idle" && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                submitStatus === "success"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
              }`}
            >
              {submitStatus === "success"
                ? (
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  )
                : (
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  )}
              <p className="text-sm leading-relaxed">{submitMessage}</p>
            </m.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-400 focus:border-transparent transition-colors disabled:bg-gray-50 dark:disabled:bg-slate-700 disabled:cursor-not-allowed bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
                  errors.name ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-slate-600"
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-400 focus:border-transparent transition-colors disabled:bg-gray-50 dark:disabled:bg-slate-700 disabled:cursor-not-allowed bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
                  errors.email ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-slate-600"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-none disabled:bg-gray-50 dark:disabled:bg-slate-700 disabled:cursor-not-allowed bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
                  errors.message ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-slate-600"
                }`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              size="lg"
            >
              {isSubmitting
                ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  )
                : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </m.div>
  );
};
