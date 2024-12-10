import React, { useState } from 'react';
import { FaGift, FaTimes, FaCopy, FaLink } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const SupportModal = ({ isOpen, handleClose }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);

  // The account details
  const accounts = [
    { bank: 'Zenith Bank', accountNumber: '2289132623' },
    // { bank: 'FirstBank', accountNumber: '2396893309' },
    // { bank: 'Access Bank', accountNumber: '2396893309' },
    // { bank: 'MoniePoint', accountNumber: '2396893309' },
  ];

  const otherMethods = {
    PayPal: 'https://paypal.me/dubemumeh',
    USDT: '6487874826871871546878',
    BTC: '6884165454563896482634682',
    ETH: '7523475362736431673416436',
  };

  const [paypalLink, setPaypalLink] = useState(
    'https://paypal.me/dubemumeh'
  );

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast(`Copied: ${text} to clipboard`);
  };

  // Variants for Framer Motion Drawer
  const drawerVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center !z-[200]"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-[#bebea8e8] rounded-lg p-9 w-11/12 h-auto max-w-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <div className="flex justify-end relative -top-5 left-5">
                <button
                  className="text-gray-600 hover:text-gray-800 border border-black w-10 h-10 rounded-full flex text-center justify-center relative"
                  onClick={() => { handleClose(); setIsDrawerOpen(true); }}
                >
                  <span className="text-2xl absolute top-[50%] translate-y-[-50%]">
                    <FaTimes />
                  </span>
                </button>
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-center mb-10 -mt-8 to-gray-800 tracking-tighter leading-9 font-custom">
                <span>Thank You for your RSVP</span>
              </h2>

              {/* Message */}
              <p className="text-xl font-gFont1 text-center text-black tracking-normal">
                <span>
                  We're so grateful to celebrate this special day with you! If
                  you'd like to send a gift or contribution, we truly appreciate
                  your love and support. Click below to find out how you can
                  contribute, or contact us.
                </span>
              </p>

              {/* Call-to-Action Button */}
              <div className="flex justify-center items-center mt-10 relative">
                <span>
                  <button
                    className="bg-[#64003c] text-gray-200 px-6 py-2 rounded-md hover:bg-[#6e204f] transition-colors delay-100 flex items-center justify-center gap-2 font-custom2"
                    onClick={() => { handleClose(); setIsDrawerOpen(true); }} // Open drawer
                  >
                    <FaGift />
                    <span className='mt-1'>Send a Gift</span>
                  </button>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 shadow-lg z-[250]"
        initial="closed"
        animate={isDrawerOpen ? 'open' : 'closed'}
        variants={drawerVariants}
      >
        {/* Drawer content */}
        <div className="p-4">
          <h2 className="text-lg font-bold font-custom">Send a Gift 😊</h2>
          <div className="text-gray-400 mt-4">
            <p className="mb-8 text-gray-200 font-gFont1 text-lg">Please choose you desirable method:</p>
            <ul className="space-y-5">
              {/* Bank Transfer Accordion */}
              <li>
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => setIsBankOpen(!isBankOpen)}
                >
                  <span className='text-gray-400'>Bank Transfer</span>
                  <span className='text-gray-200 text-[25px]'>{isBankOpen ? '-' : '+'}</span>
                </div>
                {isBankOpen && (
                  <ul className='mt-3 ml-4 space-y-4'>
                    {accounts.map(({ bank, accountNumber }) => (
                      <li
                        key={bank}
                        className='flex justify-between items-center'
                      >
                        <span>
                          {bank}: <span className='font-medium'>{accountNumber}</span>
                        </span>
                        <FaCopy 
                          className='text-gray-200 cursor-pointer hover:text-gray-500'
                          onClick={() => copyToClipboard(accountNumber)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {/* Other Transfer Methods */}
              {Object.entries(otherMethods).map(([method, address]) => (
                <li
                  key={method}
                  className='flex justify-between items-center'
                >
                  <span className='text-gray-400'>{method}</span>
                  {method === 'PayPal' ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Amount"
                        className="border border-gray-300 rounded-md p-2 text-black w-24"
                        onChange={(e) =>
                          setPaypalLink(
                            `https://www.paypal.com/donate?business=umehraphael36@gmail.com&amount=${e.target.value}`
                          )
                        }
                      />
                      <a
                        href={paypalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 cursor-pointer hover:text-gray-500"
                      >
                        <FaLink />
                      </a>
                    </div>
                    ) : (
                    <FaCopy 
                    className='text-gray-50 cursor-pointer hover:text-gray-500'
                    onClick={() => copyToClipboard(address)}
                  />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)} // Close drawer
            className="bg-red-500 hover:bg-red-700 transition-colors ease-in-out delay-75 text-white pt-3 px-4 py-2 rounded mt-20 font-custom"
          >
            Close
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default SupportModal;
