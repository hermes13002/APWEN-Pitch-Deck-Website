import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { EVENT_DETAILS, LINKS, COMPETITION_TRACKS } from '../config/constants';

interface TeamMember {
  name: string;
  email: string;
  dept: string;
  level: string;
  institution: string;
}

interface RegistrationFormData {
  teamName: string;
  track: string;
  projectTitle: string;
  summary: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadDept: string;
  leadLevel: string;
  leadInstitution: string;
  members: TeamMember[];
  deckLink: string;
}

const STORAGE_KEY = 'apwen_registration_draft_v2';

const initialFormData: RegistrationFormData = {
  teamName: '',
  track: COMPETITION_TRACKS[0]?.title || 'Technology & AI',
  projectTitle: '',
  summary: '',
  leadName: '',
  leadEmail: '',
  leadPhone: '',
  leadDept: '',
  leadLevel: '300L',
  leadInstitution: 'Lagos State University (LASU)',
  members: [
    { name: '', email: '', dept: '', level: '300L', institution: 'Lagos State University (LASU)' }
  ],
  deckLink: '',
};

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [draftRestored, setDraftRestored] = useState<boolean>(false);

  // Restore draft from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const savedDraft = localStorage.getItem(STORAGE_KEY);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          setFormData(parsed);
          setDraftRestored(true);
          setTimeout(() => setDraftRestored(false), 3000);
        }
      } catch (err) {
        console.error('Could not load draft from localStorage:', err);
      }
    }
  }, [isOpen]);

  // Save changes to localStorage in real time
  const updateFormField = <K extends keyof RegistrationFormData>(field: K, value: RegistrationFormData[K]) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage save failed:', err);
      }
      return updated;
    });
  };

  const handleMemberChange = (index: number, key: keyof TeamMember, val: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [key]: val };
    updateFormField('members', newMembers);
  };

  const addMember = () => {
    if (formData.members.length < 3) { // 1 lead + up to 3 members = 4 total
      const newMembers = [...formData.members, { 
        name: '', 
        email: '', 
        dept: '', 
        level: '300L', 
        institution: 'Lagos State University (LASU)' 
      }];
      updateFormField('members', newMembers);
    }
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) { // keep at least 1 member (team size >= 2)
      const newMembers = formData.members.filter((_, i) => i !== index);
      updateFormField('members', newMembers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Client-side validation checks
    if (!formData.teamName.trim() || !formData.projectTitle.trim() || !formData.leadName.trim() || !formData.leadEmail.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields marked with *');
      return;
    }

    if (!formData.members[0]?.name.trim() || !formData.members[0]?.email.trim()) {
      setStatus('error');
      setErrorMessage('Competition rules require a minimum of 2 team members. Please enter Member 2 details.');
      return;
    }

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

      // Clear draft on successful submission
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setStatus('error');
      setErrorMessage('Network error while submitting. Please check your connection or join the WhatsApp cohort directly.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 animate-fade-in-fast">
      <div 
        className="relative glass-panel border border-white/15 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-6 animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-purple-900/60 via-gray-900/80 to-pink-900/60 px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Icon icon="solar:stars-minimalistic-bold" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-orbitron">
                Register for Summit 2.0
              </h2>
              <p className="text-xs text-gray-300 font-ubuntu">
                APWEN-LASU Career & Innovation Summit Pitch Competition
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <Icon icon="solar:close-circle-bold" className="w-6 h-6" />
          </button>
        </div>

        {/* Registration Window & Rule Badge */}
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border-b border-pink-500/20 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-pink-300">
          <span className="flex items-center font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping mr-2 inline-block"></span>
            Entries Open: Oct 19 – Nov 6 • Teams of 2–4 (Female representation required)
          </span>
          <span className="text-gray-400 text-[11px] hidden sm:inline">
            Draft autosaved in browser
          </span>
        </div>

        {/* Draft Restored Notification */}
        {draftRestored && (
          <div className="bg-pink-500/20 border-b border-pink-500/30 px-6 py-1.5 text-xs text-pink-200 flex items-center">
            <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 mr-2 text-pink-400" />
            Restored your previous registration draft.
          </div>
        )}

        {/* Success State */}
        {status === 'success' ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 border-2 border-green-500 text-green-400 flex items-center justify-center mx-auto mb-6">
              <Icon icon="solar:check-circle-bold" className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-orbitron mb-2">
              Registration Confirmed!
            </h3>
            <p className="text-pink-400 font-ubuntu text-base sm:text-lg font-medium mb-4">
              Team: {formData.teamName} ({formData.track})
            </p>
            
            {/* WhatsApp Cohort Box with exact link */}
            <div className="glass-card rounded-2xl p-6 max-w-xl mx-auto text-left mb-8 shadow-xl">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center mr-2">1</span>
                Required Next Step: Join the Participant Cohort
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm font-ubuntu mb-4">
                To receive official pitch deck templates, event schedules, check-in announcements, and submit your final 5-minute deck before November 6, join our WhatsApp group now:
              </p>
              <a
                href={LINKS.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-orbitron font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg transform hover:scale-[1.02]"
              >
                <Icon icon="solar:chat-round-dots-bold" className="w-5 h-5" />
                <span>Join Official WhatsApp Cohort</span>
                <Icon icon="solar:arrow-right-bold" className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Pitch Guide CTA (Uncomment when guide is ready)
              <a
                href={LINKS.pitchGuideDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-700 hover:border-pink-500 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-ubuntu flex items-center justify-center space-x-2"
              >
                <Icon icon="solar:file-download-bold" className="w-4 h-4 text-pink-400" />
                <span>Download Pitch Guide (Google Drive)</span>
              </a>
              */}
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData(initialFormData);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-colors text-xs sm:text-sm font-ubuntu"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          /* Main Registration Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7 max-h-[75vh] overflow-y-auto">
            
            {/* Error Banner */}
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start space-x-3">
                <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Section 1: Team & Project Info */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white font-orbitron border-b border-gray-800 pb-2 flex items-center text-pink-400">
                <Icon icon="solar:stars-minimalistic-bold" className="w-5 h-5 mr-2" />
                1. Project & Solution Track
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={(e) => updateFormField('teamName', e.target.value)}
                    placeholder="e.g. EcoSpark"
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Solution Track *
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => updateFormField('track', e.target.value)}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  >
                    {COMPETITION_TRACKS.map((track) => (
                      <option key={track.id} value={track.title} className="bg-gray-900 text-white">
                        {track.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                  Project / Solution Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectTitle}
                  onChange={(e) => updateFormField('projectTitle', e.target.value)}
                  placeholder="e.g. IoT Solar Irrigation Sensor for Smallholder Farmers"
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                  Brief Problem & Solution Summary * (Max 150 words)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => updateFormField('summary', e.target.value)}
                  placeholder="What specific problem in Nigeria or Africa does this solve, and how does your tech solution work?"
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                />
              </div>
            </div>

            {/* Section 2: Team Lead Details */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white font-orbitron border-b border-gray-800 pb-2 flex items-center text-pink-400">
                <Icon icon="solar:user-bold" className="w-5 h-5 mr-2" />
                2. Team Lead Details (Primary Contact)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.leadName}
                    onChange={(e) => updateFormField('leadName', e.target.value)}
                    placeholder="First & Last Name"
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.leadEmail}
                    onChange={(e) => updateFormField('leadEmail', e.target.value)}
                    placeholder="student@lasu.edu.ng or gmail"
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.leadPhone}
                    onChange={(e) => updateFormField('leadPhone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.leadInstitution}
                    onChange={(e) => updateFormField('leadInstitution', e.target.value)}
                    placeholder="e.g. LASU, UNILAG, Covenant, etc."
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.leadDept}
                    onChange={(e) => updateFormField('leadDept', e.target.value)}
                    placeholder="e.g. Mechanical Engineering"
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 font-ubuntu mb-1">
                    Level of Study *
                  </label>
                  <select
                    value={formData.leadLevel}
                    onChange={(e) => updateFormField('leadLevel', e.target.value)}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
                  >
                    <option value="100L">100L</option>
                    <option value="200L">200L</option>
                    <option value="300L">300L</option>
                    <option value="400L">400L</option>
                    <option value="500L">500L</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Additional Team Members (2 - 4 total) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-orbitron flex items-center text-pink-400">
                    <Icon icon="solar:users-group-two-rounded-bold" className="w-5 h-5 mr-2" />
                    3. Team Members (2 to 4 Students)
                  </h3>
                  <span className="text-[11px] text-pink-300 font-ubuntu">
                    * Remember: All teams must have female representation.
                  </span>
                </div>
                {formData.members.length < 3 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="text-xs bg-pink-500/20 text-pink-300 hover:bg-pink-500 hover:text-white px-3 py-1.5 rounded-full flex items-center space-x-1 transition-colors font-ubuntu"
                  >
                    <Icon icon="solar:user-plus-bold" className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>

              {formData.members.map((member, index) => (
                <div key={index} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-orbitron">
                    <span className="font-semibold text-white">
                      Member #{index + 2} {index === 0 ? '(Required)' : '(Optional)'}
                    </span>
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-400 hover:text-red-300 flex items-center space-x-1"
                        aria-label="Remove member"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required={index === 0}
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      placeholder="Full Name"
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500 font-ubuntu"
                    />
                    <input
                      type="email"
                      required={index === 0}
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      placeholder="Email Address"
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500 font-ubuntu"
                    />
                    <input
                      type="text"
                      required={index === 0}
                      value={member.institution}
                      onChange={(e) => handleMemberChange(index, 'institution', e.target.value)}
                      placeholder="Institution (e.g. LASU)"
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500 font-ubuntu"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required={index === 0}
                        value={member.dept}
                        onChange={(e) => handleMemberChange(index, 'dept', e.target.value)}
                        placeholder="Department"
                        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500 font-ubuntu"
                      />
                      <select
                        value={member.level}
                        onChange={(e) => handleMemberChange(index, 'level', e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-pink-500 font-ubuntu"
                      >
                        <option value="100L">100L</option>
                        <option value="200L">200L</option>
                        <option value="300L">300L</option>
                        <option value="400L">400L</option>
                        <option value="500L">500L</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 4: Slide Deck Link (Optional at stage 1) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-white font-orbitron border-b border-gray-800 pb-2 flex items-center text-pink-400">
                <Icon icon="solar:plain-bold" className="w-5 h-5 mr-2" />
                4. Slide Deck or Proposal Link (Optional)
              </h3>
              <p className="text-xs text-gray-400 font-ubuntu">
                Already have a draft deck, PDF, or Canva link? Paste it below. If not ready yet, you can register now and submit your final 5-minute deck inside the WhatsApp cohort before <strong>November 6</strong>.
              </p>
              <input
                type="url"
                value={formData.deckLink}
                onChange={(e) => updateFormField('deckLink', e.target.value)}
                placeholder="https://drive.google.com/... or Canva link"
                className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-ubuntu transition-colors"
              />
            </div>

            {/* Submit Action Area */}
            <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-xs text-gray-400 font-ubuntu">
                <Icon icon="solar:info-circle-bold" className="w-4 h-4 mr-1 text-pink-400 shrink-0" />
                <span>Zero registration fee. Free for all students.</span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-300 text-xs sm:text-sm font-ubuntu transition-colors w-1/2 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-8 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-orbitron font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 flex items-center justify-center space-x-2 w-1/2 sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Entry</span>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
