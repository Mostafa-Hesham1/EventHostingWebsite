import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const handleSendCode = async () => {
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmationResult.verificationId);
      alert('Verification code sent!');
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await firebase.auth().signInWithCredential(credential);
      alert('Phone number verified successfully!');
    } catch (error) {
      console.error('Error verifying phone number:', error);
    }
  };

  return (
    <div>
      <h2>Phone Verification</h2>
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSendCode}>Send Verification Code</button>
      <br />
      {verificationId && (
        <>
          <label>
            Verification Code:
            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </label>
          <br />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </>
      )}
    </div>
  );
};

export default PhoneVerification;
