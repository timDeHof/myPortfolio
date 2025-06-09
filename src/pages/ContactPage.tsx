import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { pageSEO } from '../utils/seo';
import { validateContactForm, ValidationErrors } from '../utils/validation';
import { sendEmail } from '../services/emailService';
import { ContactForm } from '../types';

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    value: 'tim@timdehof.dev',
    href: 'mailto:tim@timdehof.dev',
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Location',
    value: 'Available for remote work',
    href: null,
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Clear submit status when user modifies form
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });
      
      setSubmitStatus('success');
      setSubmitMessage("Thank you for your message! I'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage("Sorry, there was an error sending your message. Please try again or contact me directly at tim@timdehof.dev");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead seo={pageSEO.contact} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'd love to hear about your project
              and discuss how we can create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
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
                  
                  {/* Status Message */}
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                        submitStatus === 'success' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700' 
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed">{submitMessage}</p>
                    </motion.div>
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
                          errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
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
                          errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
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
                          errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'
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
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Get in touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm always excited to work on new projects and collaborate with
                  passionate people. Whether you have a specific project in mind
                  or just want to explore possibilities, I'd love to hear from you.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  You can also check out my{' '}
                  <a 
                    href="https://blog.timdehof.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center"
                  >
                    blog
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                  {' '}for insights into my development process and latest projects.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-gray-200 dark:border-slate-600">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    I typically respond to messages within 24 hours. For urgent
                    inquiries, please mention it in your message and I'll prioritize
                    getting back to you as soon as possible.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};