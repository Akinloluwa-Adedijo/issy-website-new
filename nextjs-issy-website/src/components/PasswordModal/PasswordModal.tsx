import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  onPasswordSuccess?: () => void;
}

const transition = { duration: 0.5, ease: [0.65, 0, 0.35, 1] };

const PasswordModal = ({
  isOpen,
  onClose,
  projectTitle,
  onPasswordSuccess,
}: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState("");

  const handleEmailClick = () => {
    window.location.href =
      "mailto:contact@issyidehen.com?subject=Access Request for " +
      projectTitle;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can change this password to whatever you want
    if (password === "dream2025") {
      setError("");
      onPasswordSuccess?.();
      onClose();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleTryPassword = () => {
    setShowPasswordInput(true);
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80  z-50 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-neutral-50 border border-neutral-800 p-8 max-w-3xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition }}
            exit={{ scale: 0.9, opacity: 0, transition }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-5 items-center justify-center">
              <h2 className="text-6xl font-medium mb-4 text-neutral-950">
                Password Protected
              </h2>

              {!showPasswordInput ? (
                <>
                  <p className="text-neutral-800 mb-6 text-center">
                    "{projectTitle}" is password protected. Please email to
                    request access or enter the password if you have it.
                  </p>
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={handleEmailClick}
                      className="w-full bg-white text-black px-6 py-3 text-lg font-medium hover:bg-neutral-950 hover:text-neutral-50 transition-colors cursor-pointer"
                    >
                      Request Access
                    </button>
                    <button
                      onClick={handleTryPassword}
                      className="w-full bg-neutral-950 text-neutral-50 px-6 py-3 text-lg font-medium hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      Enter Password
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="w-full">
                  <div className="flex flex-col gap-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 text-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 text-neutral-950"
                      autoFocus
                    />
                    {error && (
                      <p className="text-red-600 text-sm text-center">
                        {error}
                      </p>
                    )}
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-neutral-950 text-white px-6 py-3 text-lg font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordInput(false);
                          setPassword("");
                          setError("");
                        }}
                        className="flex-1 bg-neutral-200 text-neutral-950 px-6 py-3 text-lg font-medium hover:bg-neutral-300 transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <button
                onClick={onClose}
                className="block w-full mt-4 text-neutral-800 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;
