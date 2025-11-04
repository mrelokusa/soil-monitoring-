import React, { useState, FormEvent } from 'react';

interface EmailSubscriptionProps {
  userEmail: string | null;
  onSetEmail: (email: string) => void;
}

const EmailSubscription: React.FC<EmailSubscriptionProps> = ({ userEmail, onSetEmail }) => {
  const [emailInput, setEmailInput] = useState(userEmail || '');
  const [isEditing, setIsEditing] = useState(!userEmail);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(emailInput)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onSetEmail(emailInput);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEmailInput(userEmail || '');
    setIsEditing(true);
  };
  
  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-800 rounded-lg p-5 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 shadow-sm hover:shadow-md dark:shadow-none">
      <h2 className="text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary mb-4">Email Alerts</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm text-brand-text-secondary dark:text-dark-brand-text-secondary">
            Enter your email to receive critical and warning alerts from the AI analyst.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-grow w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-brand-primary"
              aria-label="Email for alerts"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary text-white dark:bg-dark-brand-primary dark:text-dark-brand-bg font-semibold rounded-md hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
             <p className="text-sm text-brand-text-secondary dark:text-dark-brand-text-secondary">
                Alerts will be sent to:
             </p>
             <p className="font-semibold text-brand-text-primary dark:text-dark-brand-text-primary break-all">{userEmail}</p>
          </div>
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-brand-text-primary dark:text-dark-brand-text-primary font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Change Email
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailSubscription;