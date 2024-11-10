import { jest } from '@jest/globals';
import $ from 'jquery';

jest.mock('jquery', () => ({
  qrcode: jest.fn(),
}));

describe('generateQRCode', () => {

});
it('should generate a QR code with the correct payment amount', () => {
  // Mock the global totalAmount
  global.totalAmount = 100;

  // Create a mock DOM element for the QR code container
  const mockQRCodeContainer = document.createElement('div');
  document.body.appendChild(mockQRCodeContainer);

  // Mock the jQuery qrcode function
  const mockQrcode = jest.fn();
  $.qrcode.mockImplementation(mockQrcode);

  // Call the function with test data
  const testData = 'test_payment_data';
  generateQRCode(testData);

  // Check if the QR code container URL is correctly set
  expect(mockQRCodeContainer.src).toBe('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PaymentAmount:100');

  // Check if the qrcode function was called with the correct parameters
  expect(mockQrcode).toHaveBeenCalledWith({
    text: testData,
    width: 200,
    height: 200,
  });

  // Clean up
  document.body.removeChild(mockQRCodeContainer);
});