import React, { useState, useEffect } from 'react';

const CheckPrinter = () => {
  const [printerStatus, setPrinterStatus] = useState('Checking...');

  useEffect(() => {
    const checkPrinter = async () => {
      try {
        const devices = await navigator.usb.getDevices();
        const printer = devices.find(device => device.productName.includes('Printer'));
        if (printer) {
          setPrinterStatus(true);
        } else {
          setPrinterStatus(false);
        }
      } catch (error) {
        setPrinterStatus('ERROR');
      }
    };

    checkPrinter();
  }, []);

  return (
    <div>
      {printerStatus ?
      (<div class="printerStatusOn">
        <p> ON </p>
      </div>) :
      (<div class="printerStatusOff">
        <p> OFF </p>
      </div>)}
    </div>
  );
};

export default CheckPrinter;
