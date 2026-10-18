import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { EVENT_DETAILS, LINKS, COMPETITION_TRACKS } from '../config/constants';

interface RegistrationFormData {
  teamName: string;
  track: string;
  projectTitle: string;
  summary: string;
  teamSize: '2' | '3' | '4';
  hasFemaleRep: boolean;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadDept: string;
  leadLevel: string;
  leadInstitution: string;
  backupName: string;
  backupPhone: string;
  backupDept?: string;
  deckLink: string;
}

interface FieldErrors {
  teamName?: string;
  projectTitle?: string;
  summary?: string;
  hasFemaleRep?: string;
  leadName?: string;
  leadPhone?: string;
  leadEmail?: string;
  leadDept?: string;
  leadInstitution?: string;
  backupName?: string;
  backupPhone?: string;
}

const STORAGE_KEY = 'apwen_registration_draft_v3';

const initialFormData: RegistrationFormData = {
  teamName: '',
  track: COMPETITION_TRACKS[0]?.title || 'Technology & AI',
  projectTitle: '',
  summary: '',
  teamSize: '2',
  hasFemaleRep: true,
  leadName: '',
  leadEmail: '',
  leadPhone: '',
  leadDept: '',
  leadLevel: '300L',
  leadInstitution: 'Lagos State University (LASU)',
  backupName: '',
  backupPhone: '',
  backupDept: '',
  deckLink: '',
};

const trackIconMap: Record<string, string> = {
  'tech-ai': 'solar:cpu-bolt-bold',
  'energy-env': 'solar:leaf-bold',
  'health-biomed': 'solar:heart-pulse-bold',
  'agri-food': 'solar:chart-2-bold',
  'infra-mobility': 'solar:buildings-bold',
};

interface RegistrationPageProps {
  onBack: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [stepError, setStepError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [draftRestored, setDraftRestored] = useState<boolean>(false);

  // Restore draft from localStorage on load
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
        setDraftRestored(true);
        setTimeout(() => setDraftRestored(false), 3500);
      }
    } catch (err) {
      console.warn('Could not load draft from localStorage:', err);
    }
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-save changes to localStorage & clear individual field error
  const updateField = <K extends keyof RegistrationFormData>(field: K, value: RegistrationFormData[K]) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage save failed:', err);
      }
      return updated;
    });

    // Clear field-level error immediately when the user enters input
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[field as keyof FieldErrors];
        return next;
      });
    }

    if (stepError) {
      setStepError('');
    }
  };

  // Step 1 Validation with precise field-level errors
  const validateStep1 = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.teamName.trim()) {
      errors.teamName = 'Team name is required.';
    }
    if (!formData.projectTitle.trim()) {
      errors.projectTitle = 'Project / Innovation title is required.';
    }
    if (!formData.summary.trim()) {
      errors.summary = 'Please provide a brief problem & solution summary.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStepError('Please fill in all required fields highlighted below.');
      return false;
    }

    setStepError('');
    return true;
  };

  // Step 2 Validation with precise field-level errors
  const validateStep2 = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.hasFemaleRep) {
      errors.hasFemaleRep = 'Competition guidelines require at least 1 female team member.';
    }
    if (!formData.leadName.trim()) {
      errors.leadName = 'Team leader full name is required.';
    }
    if (!formData.leadPhone.trim()) {
      errors.leadPhone = 'WhatsApp / Phone number is required for cohort invite.';
    }
    if (!formData.leadEmail.trim()) {
      errors.leadEmail = 'Email address is required.';
    } else if (!formData.leadEmail.includes('@') || !formData.leadEmail.includes('.')) {
      errors.leadEmail = 'Please enter a valid email address.';
    }
    if (!formData.leadInstitution.trim()) {
      errors.leadInstitution = 'Institution / University is required.';
    }
    if (!formData.leadDept.trim()) {
      errors.leadDept = 'Department is required.';
    }
    if (!formData.backupName.trim()) {
      errors.backupName = 'Backup teammate name is required.';
    }
    if (!formData.backupPhone.trim()) {
      errors.backupPhone = 'Backup teammate WhatsApp / Phone number is required.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStepError('Please complete the highlighted contact fields below.');
      return false;
    }

    setStepError('');
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 80, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 80, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    setFieldErrors({});
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    setStatus('submitting');
    setStepError('');

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
        edition: EVENT_DETAILS.edition,
        event: EVENT_DETAILS.title,
      };

      // Send to Google Apps Script Web App
      await fetch(LINKS.googleAppsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });

      // Clear draft on success
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        // ignore
      }

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setStatus('error');
      setStepError('Network connection error while submitting. Please check your data connection or retry.');
    }
  };

  const stepsList = [
    { number: 1, title: 'Idea & Track', icon: 'solar:plain-bold' },
    { number: 2, title: 'Team Contacts', icon: 'solar:users-group-two-rounded-bold' },
    { number: 3, title: 'Review & Submit', icon: 'solar:verified-check-bold' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-pink-500 selection:text-white pb-20 relative overflow-x-hidden">
      
      {/* Luminous Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dot-grid opacity-30"></div>
        <div className="absolute top-[5%] -left-[100px] w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[140px]"></div>
        <div className="absolute top-[40%] -right-[150px] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[150px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[130px]"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-white/10 py-3.5 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Summit title */}
          <div 
            onClick={onBack}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img
              src="/apwen_logo.png"
              alt="APWEN Logo"
              className="h-9 w-auto transition-transform group-hover:scale-105"
            />
            <div>
              <span className="block text-xs sm:text-sm font-orbitron font-bold text-white tracking-wider uppercase">
                APWEN LASU
              </span>
              <span className="block text-[10px] sm:text-xs text-pink-400 font-ubuntu">
                Pitch Competition 2.0
              </span>
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-orbitron text-gray-300 hover:text-pink-400 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all"
          >
            <Icon icon="solar:arrow-left-bold" className="w-4 h-4" />
            <span>Back to Summit</span>
          </button>
        </div>
      </header>

      {/* Auto-save Notification Banner */}
      {draftRestored && (
        <div className="bg-pink-500/20 border-b border-pink-500/30 py-2 px-4 text-center text-xs font-ubuntu text-pink-200 flex items-center justify-center space-x-2 animate-fade-in-fast relative z-20">
          <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-pink-400" />
          <span>Restored your saved registration draft.</span>
        </div>
      )}

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12">
        
        {/* Success State Screen */}
        {status === 'success' ? (
          <div className="max-w-2xl mx-auto text-center py-12 px-6 sm:px-10 glass-panel rounded-3xl border border-white/15 shadow-2xl animate-fade-in-fast">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 text-green-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <Icon icon="solar:check-circle-bold" className="w-12 h-12" />
            </div>

            <span className="inline-block text-xs font-orbitron font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Application Confirmed
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-white font-orbitron mb-2">
              Registration Successful!
            </h2>

            <p className="text-pink-400 font-ubuntu text-base sm:text-lg font-medium mb-6">
              Team: <strong className="text-white">{formData.teamName}</strong> • {formData.track}
            </p>

            {/* Crucial Next Step: WhatsApp Cohort Invite */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 text-left mb-8 shadow-xl border border-green-500/30 bg-green-950/10">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-green-500 text-black text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="text-white font-orbitron font-bold text-sm sm:text-base">
                  Required Next Step: Join WhatsApp Cohort
                </h3>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm font-ubuntu leading-relaxed mb-5">
                To receive official pitch deck templates, event schedules, check-in announcements, and submit your final 5-minute deck before <strong>November 6</strong>, join our official participants group now:
              </p>

              <a
                href={LINKS.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-orbitron font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-green-600/30 transform hover:scale-[1.01]"
              >
                <Icon icon="solar:chat-round-dots-bold" className="w-5 h-5" />
                <span>Join Official WhatsApp Cohort</span>
                <Icon icon="solar:arrow-right-bold" className="w-4 h-4 ml-1" />
              </a>

              <p className="text-[11px] text-gray-400 mt-3 font-ubuntu text-center">
                Strictly for registered participants. Keep this link confidential within your team.
              </p>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => {
                setStatus('idle');
                setCurrentStep(1);
                setFormData(initialFormData);
                setFieldErrors({});
                onBack();
              }}
              className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-orbitron text-xs sm:text-sm font-medium transition-colors"
            >
              <Icon icon="solar:home-smile-bold" className="w-4 h-4" />
              <span>Back to Summit Homepage</span>
            </button>
          </div>
        ) : (
          /* Two-Column Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Context, Rules & Deadlines */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-[70px] pointer-events-none"></div>

                <div className="inline-flex items-center space-x-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs font-orbitron font-semibold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span>Registrations Open</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white leading-tight mb-3">
                  Register Your Team for Summit 2.0
                </h1>

                <p className="text-gray-300 font-ubuntu text-xs sm:text-sm leading-relaxed mb-6">
                  Complete this 3-step registration to showcase your engineering solution, win cash prizes, and pitch live at LASU Epe Campus.
                </p>

                {/* Key Rules Card */}
                <div className="space-y-3.5 pt-4 border-t border-white/10 text-xs sm:text-sm font-ubuntu">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon icon="solar:users-group-two-rounded-bold" className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-orbitron text-xs">2 to 4 Students Per Team</strong>
                      <span className="text-gray-400 text-xs">Cross-departmental & multi-faculty teams welcome.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon icon="solar:heart-bold" className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-orbitron text-xs">Female Representation Mandatory</strong>
                      <span className="text-gray-400 text-xs">At least 1 female engineer per team in alignment with APWEN.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon icon="solar:file-check-bold" className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-orbitron text-xs">No Completed Deck Required Today</strong>
                      <span className="text-gray-400 text-xs">Submit team & concept now. Final 5-minute decks are due by Nov 6.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon icon="solar:verified-check-bold" className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-orbitron text-xs">100% Free Registration</strong>
                      <span className="text-gray-400 text-xs">Zero fees for all student participants.</span>
                    </div>
                  </div>
                </div>

                {/* Deadlines Badge */}
                <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-ubuntu flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Submission Deadline</span>
                    <span className="text-pink-400 font-orbitron font-bold">November 6, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block text-[11px]">Grand Finale Venue</span>
                    <span className="text-white font-orbitron font-semibold">LASU Epe Campus</span>
                  </div>
                </div>

              </div>

              {/* Need assistance box */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-ubuntu text-gray-400 flex items-center justify-between">
                <span>Questions about eligibility?</span>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="text-pink-400 hover:text-pink-300 font-medium underline underline-offset-4"
                >
                  Contact Organizers
                </a>
              </div>

            </div>

            {/* Right Column: Progressive 3-Step Wizard */}
            <div className="lg:col-span-7">
              <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
                
                {/* Visual Header Stepper Bar */}
                <div className="mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between relative">
                    
                    {/* Connecting progress bar track */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 -translate-y-1/2 z-0 transition-all duration-500 ease-out"
                      style={{ 
                        width: currentStep === 1 ? '16%' : currentStep === 2 ? '50%' : '100%' 
                      }}
                    ></div>

                    {stepsList.map((step) => {
                      const isCompleted = currentStep > step.number;
                      const isActive = currentStep === step.number;
                      return (
                        <div 
                          key={step.number}
                          onClick={() => {
                            // Allow clicking previous steps
                            if (step.number < currentStep) {
                              setStepError('');
                              setFieldErrors({});
                              setCurrentStep(step.number as 1 | 2 | 3);
                            }
                          }}
                          className={`relative z-10 flex flex-col items-center group ${
                            step.number < currentStep ? 'cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-orbitron font-bold text-xs transition-all duration-300 border ${
                            isCompleted 
                              ? 'bg-green-500 border-green-400 text-black shadow-lg shadow-green-500/20' 
                              : isActive 
                              ? 'bg-pink-500 border-pink-300 text-white ring-4 ring-pink-500/20 shadow-lg shadow-pink-500/30' 
                              : 'bg-gray-900 border-white/20 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <Icon icon="solar:check-circle-bold" className="w-5 h-5" />
                            ) : (
                              <span>{step.number}</span>
                            )}
                          </div>
                          <span className={`text-[10px] sm:text-xs font-ubuntu mt-2 transition-colors hidden sm:block ${
                            isActive ? 'text-pink-400 font-semibold' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* General Notification Banner if any step error exists */}
                {stepError && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start space-x-3 animate-fade-in-fast">
                    <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-ubuntu">{stepError}</span>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 1: Solution Track & Innovation                      */}
                {/* ======================================================== */}
                {currentStep === 1 && (
                  <div key="step-1" className="space-y-6 animate-fade-in-fast">
                    <div>
                      <span className="text-[11px] font-orbitron text-pink-400 uppercase tracking-wider block mb-1">
                        Step 1 of 3
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-orbitron text-white">
                        Your Team & Innovation Track
                      </h2>
                      <p className="text-gray-300 font-ubuntu text-xs sm:text-sm mt-1">
                        Tell us about your team name and which engineering challenge your solution addresses.
                      </p>
                    </div>

                    {/* Team Name Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-200 font-ubuntu mb-1.5">
                        Team Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.teamName}
                        onChange={(e) => updateField('teamName', e.target.value)}
                        placeholder="e.g. EcoSpark, VoltGuard, AgroSense"
                        className={`w-full bg-white/[0.04] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-xs sm:text-sm font-ubuntu outline-none transition-all shadow-inner border ${
                          fieldErrors.teamName
                            ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                            : 'border-white/10 focus:border-pink-500'
                        }`}
                      />
                      {fieldErrors.teamName && (
                        <p className="mt-1.5 text-xs text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                          <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{fieldErrors.teamName}</span>
                        </p>
                      )}
                    </div>

                    {/* Track Selection Cards */}
                    <div>
                      <label className="block text-xs font-medium text-gray-200 font-ubuntu mb-2">
                        Choose Competition Track <span className="text-pink-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {COMPETITION_TRACKS.map((t) => {
                          const isSelected = formData.track === t.title;
                          const icon = trackIconMap[t.id] || 'solar:stars-minimalistic-bold';
                          return (
                            <button
                              type="button"
                              key={t.id}
                              onClick={() => updateField('track', t.title)}
                              className={`p-3.5 rounded-xl text-left border transition-all flex items-start space-x-3 ${
                                isSelected
                                  ? 'bg-pink-500/20 border-pink-500 text-white shadow-lg shadow-pink-500/15'
                                  : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-pink-500/40 hover:bg-white/[0.06]'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-pink-500 text-white' : 'bg-white/5 text-pink-400'
                              }`}>
                                <Icon icon={icon} className="w-4 h-4" />
                              </div>
                              <div className="overflow-hidden">
                                <span className="block font-orbitron font-semibold text-xs sm:text-sm leading-snug">
                                  {t.title}
                                </span>
                                <span className="block text-[11px] text-gray-400 font-ubuntu truncate mt-0.5">
                                  {t.tagline}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Title Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-200 font-ubuntu mb-1.5">
                        Project / Innovation Title <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.projectTitle}
                        onChange={(e) => updateField('projectTitle', e.target.value)}
                        placeholder="e.g. IoT Solar Irrigation Sensor for Smallholder Farmers"
                        className={`w-full bg-white/[0.04] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-xs sm:text-sm font-ubuntu outline-none transition-all shadow-inner border ${
                          fieldErrors.projectTitle
                            ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                            : 'border-white/10 focus:border-pink-500'
                        }`}
                      />
                      {fieldErrors.projectTitle && (
                        <p className="mt-1.5 text-xs text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                          <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{fieldErrors.projectTitle}</span>
                        </p>
                      )}
                    </div>

                    {/* Problem & Solution Summary Textarea */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-gray-200 font-ubuntu">
                          Problem & Solution Summary <span className="text-pink-400">*</span>
                        </label>
                        <span className="text-[11px] text-gray-400 font-ubuntu">Max 150 words</span>
                      </div>
                      <textarea
                        rows={3}
                        value={formData.summary}
                        onChange={(e) => updateField('summary', e.target.value)}
                        placeholder="What specific engineering challenge does your idea solve in Nigeria/Africa, and how does your prototype or technology work?"
                        className={`w-full bg-white/[0.04] rounded-xl p-3.5 text-white placeholder-gray-500 text-xs sm:text-sm font-ubuntu outline-none transition-all shadow-inner leading-relaxed border ${
                          fieldErrors.summary
                            ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                            : 'border-white/10 focus:border-pink-500'
                        }`}
                      />
                      {fieldErrors.summary && (
                        <p className="mt-1.5 text-xs text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                          <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{fieldErrors.summary}</span>
                        </p>
                      )}
                    </div>

                    {/* Step 1 Actions */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={onBack}
                        className="px-5 py-3 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 text-xs sm:text-sm font-ubuntu transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-3.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-orbitron font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 flex items-center space-x-2 group"
                      >
                        <span>Continue to Team Contacts</span>
                        <Icon icon="solar:arrow-right-bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 2: Team Size & Contacts                             */}
                {/* ======================================================== */}
                {currentStep === 2 && (
                  <div key="step-2" className="space-y-6 animate-fade-in-fast">
                    <div>
                      <span className="text-[11px] font-orbitron text-pink-400 uppercase tracking-wider block mb-1">
                        Step 2 of 3
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-orbitron text-white">
                        Team Size & Primary Contacts
                      </h2>
                      <p className="text-gray-300 font-ubuntu text-xs sm:text-sm mt-1">
                        Only primary and secondary contacts are needed now. Full roster details will be verified inside the cohort.
                      </p>
                    </div>

                    {/* Team Size Segmented Picker */}
                    <div>
                      <label className="block text-xs font-medium text-gray-200 font-ubuntu mb-2">
                        Total Team Size (2 to 4 Students) <span className="text-pink-400">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['2', '3', '4'] as const).map((size) => {
                          const isSelected = formData.teamSize === size;
                          return (
                            <button
                              type="button"
                              key={size}
                              onClick={() => updateField('teamSize', size)}
                              className={`py-3 px-4 rounded-xl font-orbitron text-xs sm:text-sm font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 ${
                                isSelected
                                  ? 'bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/20'
                                  : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.06] hover:border-pink-500/40'
                              }`}
                            >
                              <Icon icon="solar:users-group-two-rounded-bold" className="w-4 h-4" />
                              <span>{size} Members</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Female Representation Checkbox */}
                    <div>
                      <label className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        fieldErrors.hasFemaleRep 
                          ? 'bg-red-500/10 border-red-500/60' 
                          : 'bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/15'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.hasFemaleRep}
                          onChange={(e) => updateField('hasFemaleRep', e.target.checked)}
                          className="mt-0.5 rounded text-pink-500 focus:ring-pink-400 focus:ring-offset-gray-900 w-4 h-4"
                        />
                        <div className="text-xs font-ubuntu leading-relaxed">
                          <span className="font-semibold text-white block">
                            Our team includes female representation <span className="text-pink-400">*</span>
                          </span>
                          <span className="text-gray-300 text-[11px]">
                            Each competing team must have at least one female undergraduate engineer in alignment with APWEN guidelines.
                          </span>
                        </div>
                      </label>
                      {fieldErrors.hasFemaleRep && (
                        <p className="mt-1.5 text-xs text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                          <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{fieldErrors.hasFemaleRep}</span>
                        </p>
                      )}
                    </div>

                    {/* Primary Contact: Team Leader */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center space-x-2 text-white font-orbitron text-xs sm:text-sm font-bold">
                          <Icon icon="solar:user-bold" className="w-4 h-4 text-pink-400" />
                          <span>Primary Contact: Team Leader</span>
                        </div>
                        <span className="text-[10px] font-orbitron text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                          Lead Contact
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Lead Full Name */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            Full Name <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.leadName}
                            onChange={(e) => updateField('leadName', e.target.value)}
                            placeholder="First & Last Name"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.leadName
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.leadName && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.leadName}</span>
                            </p>
                          )}
                        </div>

                        {/* Lead Phone / WhatsApp */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            WhatsApp / Phone Number <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.leadPhone}
                            onChange={(e) => updateField('leadPhone', e.target.value)}
                            placeholder="+234 800 000 0000"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.leadPhone
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.leadPhone && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.leadPhone}</span>
                            </p>
                          )}
                        </div>

                        {/* Lead Email */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            Email Address <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.leadEmail}
                            onChange={(e) => updateField('leadEmail', e.target.value)}
                            placeholder="lead@lasu.edu.ng or gmail"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.leadEmail
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.leadEmail && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.leadEmail}</span>
                            </p>
                          )}
                        </div>

                        {/* Lead Institution */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            Institution / University <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.leadInstitution}
                            onChange={(e) => updateField('leadInstitution', e.target.value)}
                            placeholder="e.g. Lagos State University (LASU)"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.leadInstitution
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.leadInstitution && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.leadInstitution}</span>
                            </p>
                          )}
                        </div>

                        {/* Lead Department */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            Department <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.leadDept}
                            onChange={(e) => updateField('leadDept', e.target.value)}
                            placeholder="e.g. Mechanical Engineering"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.leadDept
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.leadDept && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.leadDept}</span>
                            </p>
                          )}
                        </div>

                        {/* Lead Level of Study */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            Level of Study <span className="text-pink-400">*</span>
                          </label>
                          <select
                            value={formData.leadLevel}
                            onChange={(e) => updateField('leadLevel', e.target.value)}
                            className="w-full bg-gray-900 border border-white/10 focus:border-pink-500 rounded-lg px-3 py-2.5 text-white text-xs font-ubuntu outline-none"
                          >
                            <option value="100L">100L (Freshman)</option>
                            <option value="200L">200L (Sophomore)</option>
                            <option value="300L">300L (Junior)</option>
                            <option value="400L">400L (Senior)</option>
                            <option value="500L">500L (Final Year)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Contact: Co-Lead / Alternate Teammate */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center space-x-2 text-white font-orbitron text-xs sm:text-sm font-bold">
                          <Icon icon="solar:user-plus-bold" className="w-4 h-4 text-purple-400" />
                          <span>Secondary Contact: Co-Lead / Alternate Teammate</span>
                        </div>
                        <span className="text-[10px] font-orbitron text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                          Backup Contact
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-400 font-ubuntu">
                        In case the Team Leader's phone has battery or network issues, who can organizers reach?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Backup Name */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            Teammate Full Name <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.backupName}
                            onChange={(e) => updateField('backupName', e.target.value)}
                            placeholder="Teammate Name"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.backupName
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.backupName && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.backupName}</span>
                            </p>
                          )}
                        </div>

                        {/* Backup Phone */}
                        <div>
                          <label className="block text-[11px] font-medium text-gray-300 font-ubuntu mb-1">
                            WhatsApp / Phone Number <span className="text-pink-400">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.backupPhone}
                            onChange={(e) => updateField('backupPhone', e.target.value)}
                            placeholder="+234 800 000 0000"
                            className={`w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-xs font-ubuntu outline-none border transition-all ${
                              fieldErrors.backupPhone
                                ? 'border-red-500/80 bg-red-500/[0.05] focus:border-red-500'
                                : 'border-white/10 focus:border-pink-500'
                            }`}
                          />
                          {fieldErrors.backupPhone && (
                            <p className="mt-1 text-[11px] text-red-400 font-ubuntu flex items-center space-x-1 animate-fade-in-fast">
                              <Icon icon="solar:danger-circle-bold" className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{fieldErrors.backupPhone}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 2 Actions */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-5 py-3 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 text-xs sm:text-sm font-ubuntu transition-colors flex items-center space-x-1.5"
                      >
                        <Icon icon="solar:arrow-left-bold" className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-3.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-orbitron font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 flex items-center space-x-2 group"
                      >
                        <span>Continue to Review</span>
                        <Icon icon="solar:arrow-right-bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 3: Slide Deck (Optional) & Final Review             */}
                {/* ======================================================== */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} key="step-3" className="space-y-6 animate-fade-in-fast">
                    <div>
                      <span className="text-[11px] font-orbitron text-pink-400 uppercase tracking-wider block mb-1">
                        Step 3 of 3
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-orbitron text-white">
                        Slide Deck & Final Confirmation
                      </h2>
                      <p className="text-gray-300 font-ubuntu text-xs sm:text-sm mt-1">
                        Review your team summary and submit your registration.
                      </p>
                    </div>

                    {/* Slide Deck Input (Optional) */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-white font-ubuntu flex items-center space-x-1.5">
                          <Icon icon="solar:plain-bold" className="w-4 h-4 text-pink-400" />
                          <span>Slide Deck or Pitch Draft Link (Optional)</span>
                        </label>
                        <span className="text-[10px] font-orbitron text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                          Due Nov 6
                        </span>
                      </div>
                      <input
                        type="url"
                        value={formData.deckLink}
                        onChange={(e) => updateField('deckLink', e.target.value)}
                        placeholder="https://drive.google.com/... or Canva link"
                        className="w-full bg-white/[0.04] border border-white/10 focus:border-pink-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-xs sm:text-sm font-ubuntu outline-none transition-all"
                      />
                      <p className="text-[11px] text-gray-400 font-ubuntu leading-relaxed pt-1">
                        💡 No deck yet? Don't worry. Register today to secure your spot; you'll submit your final 5-minute deck inside the WhatsApp cohort before <strong>November 6</strong>.
                      </p>
                    </div>

                    {/* Review Summary Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
                          Application Summary
                        </span>
                        <span className="text-xs font-orbitron text-green-400 flex items-center space-x-1">
                          <Icon icon="solar:verified-check-bold" className="w-3.5 h-3.5" />
                          <span>Ready to Submit</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-ubuntu">
                        <div>
                          <span className="text-gray-400 block text-[11px]">Team Name</span>
                          <span className="text-white font-semibold">{formData.teamName}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Track</span>
                          <span className="text-pink-400 font-medium">{formData.track}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-400 block text-[11px]">Project Title</span>
                          <span className="text-white font-medium">{formData.projectTitle}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Team Size</span>
                          <span className="text-white">{formData.teamSize} Members (Female Rep Confirmed ✓)</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Team Leader</span>
                          <span className="text-white">{formData.leadName} ({formData.leadPhone})</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Backup Teammate</span>
                          <span className="text-white">{formData.backupName} ({formData.backupPhone})</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Institution & Dept</span>
                          <span className="text-white">{formData.leadInstitution} • {formData.leadDept} ({formData.leadLevel})</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 Actions */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-5 py-3 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 text-xs sm:text-sm font-ubuntu transition-colors flex items-center space-x-1.5 w-full sm:w-auto justify-center"
                      >
                        <Icon icon="solar:arrow-left-bold" className="w-4 h-4" />
                        <span>Back to Edit</span>
                      </button>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-orbitron font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Team Entry</span>
                            <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default RegistrationPage;
